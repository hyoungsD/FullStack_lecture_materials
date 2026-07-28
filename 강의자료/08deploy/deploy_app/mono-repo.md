# Mono repo 배포

## 배포 절차

- 폴더 조정: 기존 로컬 저장소 삭제, `.gitignore` 이동, yml 파일들 이동, 루트에 로컬 저장소 생성
- 원격 저장소 생성
- GitHub secrets 추가: `FE_PUBLISH_PROFILE`, `BE_PUBLISH_PROFILE`, `API_URL`, `BLOB_URL`
- workflow 수정

## fe.yml

> Docs for the Azure Web Apps Deploy action: https://github.com/Azure/webapps-deploy
> More GitHub Actions for Azure: https://github.com/Azure/actions

```yaml
name: Build and deploy FE Next.js app to Azure Web App - fe-next

on:
  push:
    branches:
      - main
    paths:
      - 'fe-next/**'
      - '.github/workflows/fe.yml'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read # This is required for actions/checkout
    defaults:
      run:
        working-directory: fe-next

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v4
        with:
          node-version: '24.x'
          cache: 'npm'
          cache-dependency-path: fe-next/package-lock.json

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
          path: fe-next/release.zip

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
          app-name: 'fe-next'
          slot-name: 'Production'
          package: release.zip
          # 시작 명령은 Azure Portal > App Service > 구성 > 일반 설정 >
          # 시작 명령에 `node server.js` 로 설정해 둘 것.
          # (startup-command 입력은 publish-profile 인증에서는 동작하지 않음)
          publish-profile: ${{ secrets.FE_PUBLISH_PROFILE }}
```

## be.yml

> Docs for the Azure Web Apps Deploy action: https://github.com/Azure/webapps-deploy
> More GitHub Actions for Azure: https://github.com/Azure/actions

```yaml
name: Build and deploy BE Nest.js app to Azure Web App - be-nest

on:
  push:
    branches:
      - main
    paths:
      - 'be-nest/**'
      - '.github/workflows/be.yml'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read

    defaults:
      run:
        working-directory: be-nest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v4
        with:
          node-version: '24.x'
          cache-dependency-path: be-nest/package-lock.json

      - name: npm install, build, and test
        run: |
          npm ci
          npm run build --if-present
          npm prune --omit=dev

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: node-app
          path: be-nest

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
          app-name: 'be-nest'
          slot-name: 'Production'
          package: .
          publish-profile: ${{ secrets.BE_PUBLISH_PROFILE }}
```

## 참고

- `paths` 필터로 변경된 앱만 배포됨
- FE 시작 명령: `node server.js` / BE 시작 명령: `node dist/main.js`
