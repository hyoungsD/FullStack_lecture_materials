프로젝트 개발 컨벤션 문서

#### 📚 목차

- [🌳 Git Branch 전략](#-git-branch-전략)
- [🔄 Git 작업 규칙](#-git-작업-규칙)
- [📝 Commit 규칙](#-commit-규칙)
- [🔍 Pull Request 규칙](#-pull-request-규칙)
- [✅ Merge 규칙](#-merge-규칙)
- [🚫 Git 전략 금지 사항](#-git-전략-금지-사항)
- [📦 Import 경로 규칙](#-Import-경로-규칙)
- [🌐 API 응답 타입 규칙](#-API-응답-타입-규칙)
- [🔐 환경 변수 규칙](#-환경-변수-규칙)
- [⛔ 공통 금지 사항](#-공통-금지-사항)

<br><br><br>

---

# 🌳 Git Branch 전략

### Main
배포 가능 상태
```txt
main
``` 

### Develop
통합 개발 브랜치 (직접 develop 브랜치에 Push 금지)
```txt
develop
``` 

### Feature
기능 개발 브랜치 
```txt
feature/login
feature/favorite
feature/chat
```

![git-wordflow](https://i.imgur.com/pE6qAss.png)

<br><br><br>

---

# 🔄 Git 작업 규칙

### 1. develop 최신화
```bash
git checkout develop
git pull origin develop
```

### 2. 기능 브랜치 생성
```bash
git checkout -b feature/login
```

### 3. 기능 개발

### 4. 커밋
```bash
git commit -m "feat: 로그인 기능 추가"
```

### 5. 원격 저장소 Push
```bash
git push origin feature/login
```

### 6. Pull Request 생성

```feature/login``` → ```develop```

### 7. 코드리뷰

### 8. 승인 후 Merge

### 9-1. 다시 기능 개발

### 9-2. 기능 개발 완료 후 브랜치 삭제
```bash
git checkout develop
git branch -d feature/login
git push origin --delete feature/login
```

<br><br><br>

---

# 📝 Commit 규칙

### feat

기능 추가

```feat: 로그인 기능 추가```

```feat: 게시글 목록 조회 기능 추가```

### fix

버그 수정

```fix: 로그인 오류 수정```

```fix: 게시글 삭제 오류 수정```

### refactor

리팩토링

```refactor: 스레드 조회 로직 개선```

### style

스타일 수정

```style: Modal CSS 정리```

### docs

문서 수정

```docs: README 수정```

### test

테스트 및 로깅

```test: users service 테스트 추가```

```test: logger 추가```

<br><br><br>

---

# 🔍 Pull Request 규칙

### PR 제목

```[FEAT] 로그인 기능 추가```

```[FIX] 게시글 삭제 오류 수정```

```[REFACTOR] UserService 개선```


### PR 작성 예시

> **변경 내용**
> - 로그인 API 연동
> - JWT 저장 로직 추가
> - 로그인 페이지 구현
>
> **테스트**
> - 로그인 성공 확인
> - 로그인 실패 확인
>
> **스크린샷**
> - (선택)
>
> **관련 이슈**
> - feature/register (선택)

<br><br><br>

---

# ✅ Merge 규칙

* 최소 1명 이상 코드 리뷰
* CI(병합) 실패시 Merge 금지
* Conflict 발생시 작성자가 해결
* Merge 완료 후 브랜치 삭제

<br><br><br>

---

# 🚫 Git 전략 금지 사항

* develop 브랜치에 직접 Push ❌
* main 브랜치에 직접 Push ❌
* 코드 리뷰 없이 Merge ❌
* 코드 테스트 없이 Merge ❌

<br><br><br>

---

# 📦 Import 경로 규칙

### Alias(@) 사용

상대 경로 대신 Alias(@)를 사용한다.

### 금지 예시

❌

```ts
import UserCard from '../../../components/UserCard';

import { useAuth } from '../../hooks/useAuth';

import { authService } from '../../../../services/auth.service';

import { PrismaService } from '../../prisma/prisma.service';
```

### 권장 예시

⭕

```ts
import UserCard from '@/components/UserCard';

import { useAuth } from '@/hooks/useAuth';

import { authService } from '@/services/auth.service';

import { PrismaService } from '@/prisma/prisma.service';
```

<br><br><br>

---

# 🌐 API 응답 타입 규칙

### 공통 API 응답 타입 사용

모든 API 응답은 공통 응답 타입을 사용한다.

```ts
export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};
```

### 응답 예시

성공

```json
{
    "success": true,
    "message": "게시글 조회 성공",
    "data": {
        "id": 1,
        "title": "제목"
    }
}
```

실패

```json
{
    "success": false,
    "message": "게시글을 찾을 수 없습니다.",
    "data": null
}
```

### 사용 예시

```ts
const response: ApiResponse<Post> =
    await postService.findOne(id);
```

<br><br><br>

---

# 🔐 환경 변수 규칙

### Frontend

```env
NEXT_PUBLIC_API_URL=value
```

### Backend

```env
DATABASE_URL=value
JWT_SECRET=value
JWT_EXPIRES_IN=value
```

<br><br><br>

---

# ⛔ 공통 금지 사항

* any 사용 ❌
* console.log 커밋 ❌
* 주석 처리된 코드 커밋 ❌
* 하드 코딩 ❌
* 중복 코드 방치 ❌

<br><br><br>

---
