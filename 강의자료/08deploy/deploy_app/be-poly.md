# Nest.js 단독 배포

## 프로젝트 생성

```bash
nest new be-nest
```

## 배포 절차

- `git init`
- GitHub 저장소 생성
- Azure 앱서비스 생성- SCM_DO_BUILD_DURING_DEPLOYMENT=false

## GitHub Actions Workflow

> Docs for the Azure Web Apps Deploy action: https://github.com/Azure/webapps-deploy
> More GitHub Actions for Azure: https://github.com/Azure/actions

```yaml
name: Build and deploy BE Nest.js app to Azure Web App - be-nest

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v4
        with:
          node-version: '24.x'

      - name: npm install, build, and test
        run: |
          npm ci
          npm run build --if-present
          npm prune --omit=dev

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: node-app
          path: .

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

- workflow 작성
- GitHub Actions secrets: `BE_PUBLISH_PROFILE` 추가
- 앱서비스 실행 명령 설정: `node dist/main.js`
- 실행 명령: `node dist/main.js`
- 실행해서 배포 확인

## `app.service.ts` 수정 (환경변수 확인용)

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

## 애저 포털 환경변수 설정

환경변수: `DATABASE_URL`, `BLOB_CONNECTION_STRING`

```
DefaultEndpointsProtocol=...
<server-name>.postgres.database.azure.com
```
