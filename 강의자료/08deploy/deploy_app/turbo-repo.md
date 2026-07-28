# Turbo Repo를 사용한 배포

## 프로젝트 생성

```bash
npx create-turbo@latest turbo-repo
cd turbo-repo/apps
nest new api --skip-git
```

- GitHub 저장소 생성
- secrets 추가: `BE_PUBLISH_PROFILE`, `FE_PUBLISH_PROFILE`

---

## BE 배포

### be.yml

```yaml
name: Build and deploy api (Nest.js) to Azure Web App - be-nest

on:
  push:
    branches:
      - main
    paths:
      - 'apps/api/**'
      - 'pnpm-lock.yaml'
      - '.github/workflows/be.yml'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '24.x'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm turbo run build --filter=api

      # 워크스페이스와 분리해 독립 설치. hoisted 라야 심볼릭 링크 없이 담긴다.
      - name: Create deployment folder
        run: |
          mkdir -p deploy-out
          cp -r apps/api/dist deploy-out/dist
          cp apps/api/package.json deploy-out/package.json
          cd deploy-out
          pnpm install --prod --ignore-workspace --node-linker=hoisted --no-frozen-lockfile

      - name: Zip artifact for deployment
        run: cd deploy-out && zip -qr "$GITHUB_WORKSPACE/release.zip" .

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: api-app
          path: release.zip

  deploy:
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: api-app

      - name: 'Deploy to Azure Web App'
        uses: azure/webapps-deploy@v3
        with:
          app-name: 'be-nest'
          slot-name: 'Production'
          package: release.zip
          publish-profile: ${{ secrets.BE_PUBLISH_PROFILE }}
```

- 포털에서 실행 명령 수정: `node dist/main.js`
- 실행해서 배포 확인

### `app.service.ts` 수정 (환경변수 확인용)

```ts
export class AppService {
  getHello(): Record<string, string> {
    const dbUrl = process.env.DATABASE_URL ?? '(미설정)';
    const conStr = process.env.BLOB_CONNECTION_STRING ?? '(미설정)';

    return {
      message: 'Hello World!-app service',
      DATABASE_URL: dbUrl,
      BLOB_CONNECTION_STRING: conStr,
    };
  }
}
```

- 포털에서 환경변수 등록: `DATABASE_URL`, `BLOB_CONNECTION_STRING`

```
DefaultEndpointsProtocol=...
<server-name>.postgres.database.azure.com
```

---

## FE 배포

### fe.yml

```yaml
name: Build and deploy web (Next.js) to Azure Web App - fe-next

on:
  push:
    branches:
      - main
    paths:
      - 'apps/web/**'
      - 'packages/**'
      - 'pnpm-lock.yaml'
      - '.github/workflows/fe.yml'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '24.x'
          cache: 'pnpm'

      # hoisted 링커: 심볼릭 링크 없이 실제 파일로 깔아야 Next 파일 추적과
      # zip 배포가 모두 정상 동작한다.
      - name: Install dependencies
        run: pnpm install --frozen-lockfile --config.node-linker=hoisted

      - name: Build (standalone)
        run: pnpm turbo run build --filter=web
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
          NEXT_PUBLIC_BLOB_URL: ${{ secrets.BLOB_URL }}

      # standalone 은 저장소 구조를 유지하므로 server.js 가 apps/web/ 아래에 있다.
      # static / public 은 추적 대상이 아니라 직접 복사한다.
      # cp -rL 은 남은 심볼릭 링크를 실체로 풀어준다.
      - name: Assemble deployment package
        run: |
          cd apps/web
          cp -r .next/static .next/standalone/apps/web/.next/static
          if [ -d public ]; then cp -r public .next/standalone/apps/web/public; fi
          cd "$GITHUB_WORKSPACE"
          cp -rL apps/web/.next/standalone deploy-out

      - name: Zip artifact for deployment
        run: cd deploy-out && zip -qr "$GITHUB_WORKSPACE/release.zip" .

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: web-app
          path: release.zip

  deploy:
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: web-app

      - name: 'Deploy to Azure Web App'
        uses: azure/webapps-deploy@v3
        with:
          app-name: 'fe-next'
          package: release.zip
          publish-profile: ${{ secrets.FE_PUBLISH_PROFILE }}
```

- 포털에서 앱서비스 시작 명령 설정: `node apps/web/server.js`

- GitHub Actions secrets에 `API_URL`, `BLOB_URL` 추가

### `page.tsx` 수정 (환경변수 확인용)

```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '(미설정)';
const blobUrl = process.env.NEXT_PUBLIC_BLOB_URL ?? '(미설정)';

<div className={styles.intro}>
  <h3>Next.js 앱서비스 배포</h3>
  <ol>
    <li>API_URL: {apiUrl}</li>
    <li>BLOB_URL: {blobUrl}</li>
  </ol>
</div>;
```

---

## 참조

### turbo.json

```jsonc
{
  "$schema": "https://turborepo.dev/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "env": ["NEXT_PUBLIC_*"], // 환경변수 추가
      "outputs": [".next/**", "!.next/cache/**", "!.next/dev/**", "dist/**"]
    },
    .....
  }
}
```
