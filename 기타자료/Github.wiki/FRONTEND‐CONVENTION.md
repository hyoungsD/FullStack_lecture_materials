프론트엔드 개발 컨벤션 문서

#### 📚 목차

* [📁 프로젝트 구조](#-프로젝트-구조)
* [📂 디렉토리 규칙](#-디렉토리-규칙)
* [📄 파일명 규칙](#-파일명-규칙)
* [🏷️ 네이밍 규칙](#%EF%B8%8F-네이밍-규칙)
* [🧩 컴포넌트 규칙](#-컴포넌트-규칙)
* [🪝 React Hook 규칙](#-react-hook-규칙)
* [🌐 API 통신 규칙](#-api-통신-규칙)
* [🎨 CSS 규칙](#-css-규칙)
* [⛔ 금지 사항](#-금지-사항)

<br><br><br>

---

# 📁 프로젝트 구조

```txt
src/
├─ app/
├─ components/
├─ hooks/
├─ services/
├─ utils/
├─ constants/
├─ types/
├─ providers/
├─ stores/
└─ styles/
```

<br><br><br>

---


# 📂 디렉토리 규칙

### app

페이지 및 라우트 관리

```txt
app/
├─ login/
├─ register/
├─ post/
└─ my/
```

### components

재사용 가능한 UI 컴포넌트

```txt
components/
├─ common/
├─ layout/
└─ features/
```

### hooks

커스텀 Hook 관리

```txt
hooks/
├─ useAuth.ts
├─ useActions.ts
└─ useInfiniteScroll.ts
```

### services

API 요청 관리

```txt
services/
├─ auth.service.ts
├─ user.service.ts
└─ post.service.ts
```

### utils

공통 함수 관리

```txt
utils/
├─ formatDate.ts
├─ formatPhone.ts
└─ debounce.ts
```

### constants

상수 파일 관리
```txt
constants/
├─ route.constant.ts
└─ api.constant.ts
```

### types

공통 타입 관리

```txt
types/
├─ auth.type.ts
└─ api.type.ts
```

### providers

전역 Context, Provider 관리
```txt
providers/
├─ AuthProvider.tsx
├─ QueryProvider.tsx
└─ ThemeProvider.tsx
```

<br><br><br>

---

# 📄 파일명 규칙

### Component

PascalCase 사용

```txt
BookCard.tsx
BookDetail.tsx
LoginForm.tsx
```

### Hook

use 접두사 사용

```txt
useAuth.ts
useActions.ts
useInfiniteScroll.ts
```

### Service

```txt
auth.service.ts
user.service.ts
post.service.ts
```

### Type

```txt
auth.type.ts
api.type.ts
```

### Constant

```txt
route.constant.ts
api.constant.ts
```

<br><br><br>

---

# 🏷️ 네이밍 규칙

### 변수

camelCase 사용

```ts
const bookList = [];
const currentUser = {};
```

### 함수

동사로 시작

```ts
getPost();
createPost();
updatePost();
deletePost();
```

### 이벤트 함수

handle 접두사 사용

```ts
handleSubmit();
handleClick();
handleDelete();
```

### Boolean

is / has / can 사용

```ts
isLoading
isLoggedIn
hasPermission
canEdit
```

### 상수

SCREAMING_SNAKE_CASE 사용

```ts
const MAX_FILE_SIZE = 5000000;
const API_TIMEOUT = 5000;
```

<br><br><br>

---

# 🧩 컴포넌트 규칙

### 함수 선언식 사용

```tsx
export default function BookCard() {
    return <div />;
}
```

### Props 타입 정의

```tsx
type Props = {
    bookId: string;
};

export default function BookCard({ bookId }: Props ) {
    return <div />;
}
```

<br><br><br>

---

# 🪝 React Hook 규칙

### Hook 선언 위치

```tsx
const [post, setPost] = useState();

const router = useRouter();

const { data } = usePosts();

useEffect(() => {}, []);
```

### 순서 (권장)

1. State/Ref/Context
2. Router
3. Custom Hook
4. Effect

<br><br><br>

---

# 🌐 API 통신 규칙

### API 요청은 services 폴더에서만 수행

```ts
auth.service.ts
animal.service.ts
```

### 컴포넌트 내부 fetch 금지

❌

```tsx
const res = await fetch(...);
```

⭕

```tsx
const res = await authService.login(data);
```

### API URL 하드코딩 금지

❌

```ts
fetch("http://localhost:3000/auth/login");
```

⭕

```ts
process.env.NEXT_PUBLIC_API_URL
```

<br><br><br>

---

# 🎨 CSS 규칙

### CSS Module 사용

```txt
BookCard.module.css
LoginForm.module.css
```

### 클래스명

snake_case 방식을 사용

```css
.container
.card
.btn_login
.input_email
.img_profile
```

### 클래스명 접두사 규칙

HTML 요소의 역할이 명확한 경우 아래 [접두사]_[역할] 순서를 준수

|요소|접두사|예시|
|---|---|---|
| button    | btn       | btn_login        |
| input     | input     | input_email      |
| image     | img       | img_profile      |
| modal     | modal     | modal_login      |
| box       | box       | box_profile      |

### 클래스명 금지 예시

* .box1 ❌ (의미없는 숫자 사용 금지)
* .loginButton ❌ (camelCase 사용 금지)
* .profileImage ❌ (camelCase 사용 금지)
* .email_input ❌ ([접두사]_[역할] 순서 준수)
* .btn ❌ (역할 없이 접두사만 사용 금지)

## 색상

메인 컬러

```css
#000000 (미정)
```

서브 컬러

```css
#000000 (미정)
```

배경 컬러

```css
#000000 (미정)
```

<br><br><br>

---

# ⛔ 금지 사항

* any 사용 ❌
* console.log 커밋 ❌
* React.FC 사용 ❌
* 주석 처리된 코드 커밋 ❌
* 컴포넌트 내부 fetch ❌
* API URL 하드코딩 ❌
* CSS 인라인 스타일 남용 ❌
* 사용하지 않는 import 방치 ❌

<br><br><br>

---
