# ㅍㄴㅅㄹ 
<p align="center">
<img src="src/assets/image/ㅍㄴㅅㄹ.png" />
</p>

## 📌 프로젝트 소개
평양냉면을 좋아하는 사람들이 자유롭게 소통할 수 있는 커뮤니티 입니다. 

#### 프로젝트 기간
2024.06.19 ~ 2024.07.16

#### 배포 링크
- [ㅍㄴㅅㄹ](https://pyeongnaengsarang.vercel.app/)

|테스트 계정| |
| --- | --- | 
| ID | Password|
| test@test.com | test1234! | 

<br />

## 🧷 실행 방법
```
$ git clone https://github.com/wooohyerim/pyeongnaengsarang.git
$ cd pyeongnaengsarang
$ npm install
$ npm run dev
```


## ⚒️ 기술 스택
<div>
<img src="https://img.shields.io/badge/vite-646CFF?style=flat&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/react.js-61DAFB?style=flat&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
</div>
<div>
<img src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=React Query&logoColor=white"/>
<img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat&logo=React Hook Form&logoColor=white"/>
<img src="https://img.shields.io/badge/zustand-9B86BD?style=flat&logo=react&logoColor=white"/>
</div>
<div>
<img src="https://img.shields.io/badge/Firebase-DD2C00?style=flat&logo=Firebase&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=Vercel&logoColor=white"/>
</div>

<br />

## 🔥 주요 기능

#### 로그인 / 회원가입
- ```react-hook-form``` 으로 폼 유효성 적용
- 로그인 후 유저 정보 ```zustand``` 로 전역 상태 관리
- 구글 로그인 적용
  <details><summary>영상
  </summary>
   로그인 

  ![login](https://github.com/user-attachments/assets/de5ddae3-74a5-4193-a2c9-bc287f59ec8e)

  회원가입

  ![회원가입](https://github.com/user-attachments/assets/5d6f962e-cce1-4447-b4a5-77d1e6aa148a)

  </details>

#### 전체 게시글 조회
- 게시글 최신순으로 정렬
- 무한스크롤을 활용한 페이지네이션
  <details><summary>영상
  </summary>

  ![전체 게시글 조회](https://github.com/user-attachments/assets/e2104e77-719a-488d-82f6-1568f12c8633)

  </details>

#### 유저 조회
- 가입된 유저 카드 형식으로 보여줌
- 유저 카드 클릭하면 유저의 마이페이지로 이동
  <details><summary>영상
  </summary>

  ![유저 조회](https://github.com/user-attachments/assets/8b510e56-712f-41f6-9d25-67cd04374c73)

  </details>

#### 마이 페이지
- 닉네임, 프로필 이미지, 인사말 업데이트 기능
  <details><summary>영상
  </summary>
  
  ![마이페이지](https://github.com/user-attachments/assets/0e59f4bb-e199-46b5-9ed2-db3435ff70aa)
  
  </details>

#### 게시글
- 게시글 조회 / 생성 / 수정 / 삭제 기능
- 게시글 좋아요 기능 적용
  <details><summary>영상
  </summary>

  ![게시글](https://github.com/user-attachments/assets/18e7f4f0-5835-4392-88ae-70517089b10c)

  </details>
  
#### 댓글
- 댓글 조회 / 생성 / 수정 / 삭제
- 내가 쓴 게시글의 댓글 삭제 가능
- 댓글 좋아요 기능 적용
   <details><summary>영상
  </summary>
  
  ![댓글](https://github.com/user-attachments/assets/9312ced3-9f66-406b-af36-0726242618fe)

  </details>

<br />

## 트러블 슈팅

- 게시글 업데이트 시 이미지 업로드 오류 해결

<br />

## 성능 최적화 (예정)

1. SEO 개선
  - meta tag 설정 - ```React-Helmet```


## ⚙️ 아키텍쳐

<img width="821" alt="아키텍쳐" src="https://github.com/user-attachments/assets/4744c6c1-0f14-47a9-a4b6-4202bf094712">