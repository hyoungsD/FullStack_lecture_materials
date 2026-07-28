# Next.js 단독 배포

```bash
npx create-next-app@latest fe-next
```

## 배포 절차

- `git init`
- GitHub 저장소 생성
- Azure 앱서비스 생성 - SCM_DO_BUILD_DURING_DEPLOYMENT=false

## `next.config.ts` 수정

```ts
const nextConfig: NextConfig = {
  // Azure App Service 배포용: 실행에 필요한 최소 파일만 .next/standalone 에 생성
  output: 'standalone',
};
```

## GitHub Actions Workflow

> Docs for the Azure Web Apps Deploy action: https://github.com/Azure/webapps-deploy
> More GitHub Actions for Azure: https://github.com/Azure/actions

```yaml
name: Build and deploy Next.js app to Azure Web App - fe-next

on:
  push: # main 으로의 직접 push 와 PR 머지(=main 으로의 push) 모두 배포된다.
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read # This is required for actions/checkout

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v4
        with:
          node-version: '24.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build (standalone)
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
          NEXT_PUBLIC_BLOB_URL: ${{ secrets.BLOB_URL }}

      - name: Assemble standalone deployment package
        run: |
          # .next/standalone 에는 server.js 와 최소 node_modules 만 들어있으므로
          # 정적 파일(.next/static)과 public 을 옆에 복사해줘야 한다.
          cp -r .next/static .next/standalone/.next/static
          if [ -d public ]; then cp -r public .next/standalone/public; fi

      - name: Zip artifact for deployment
        run: cd .next/standalone && zip -qr ../../release.zip .

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: node-app
          path: release.zip

  deploy:
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: node-app

      - name: 'Deploy to Azure Web App'
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v3
        with:
          app-name: fe-next
          slot-name: 'Production'
          package: release.zip
          # 시작 명령은 Azure Portal > App Service > 구성 > 일반 설정 >
          # 시작 명령에 `node server.js` 로 설정해 둘 것.
          # (startup-command 입력은 publish-profile 인증에서는 동작하지 않음)
          publish-profile: ${{ secrets.FE_PUBLISH_PROFILE }}
```

- workflow 수정
- GitHub Actions secrets에 `FE_PUBLISH_PROFILE` 추가 — 앱서비스 게시 프로파일 다운로드 후 내용 추가
- 앱서비스 시작 명령 설정 `node server.js`
- 푸쉬해서 배포 확인

## `page.tsx` 수정 (환경변수 확인용)

```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '(미설정)';
const blobUrl = process.env.NEXT_PUBLIC_BLOB_URL ?? '(미설정)';

<div className={styles.intro}>
  <h3>Next.js 앱서비스 배포1</h3>
  <ol>
    <li>API_URL: {apiUrl}</li>
    <li>BLOB_URL: {blobUrl}</li>
  </ol>
</div>;
```

- GitHub Actions secrets에 `API_URL`, `BLOB_URL` 추가
- 푸쉬해서 환경변수 사용 확인
