# SPEECH MATE  - 백앤드 파트
pitch detection 알고리즘을 적용한 음성 녹음 웹 앱

👄[Speech Mate Demo](https://www.speechmate.online)<br/>
📚 [프론트앤드 Repository](https://github.com/speech-mate/speech-mate-frontend)

## 스피치 메이트 소개

플래시 카드에 키워드를 적어 한장 한장 넘기며 연습을 하는 제 오랜 습관에서 출발한 프로젝트입니다. 녹음과 플래시카드가 결합된 기능을 구현해 보고 싶었고, 입력되는 오디오 신호를 좀 더 적극적으로 활용할 수 있는 방법이 있을까 고민하다가 Web Audio API를 사용한 voice pitch 분석 기능을 추가하여 프로젝트를 기획하게 되었습니다. 

## 개요

### ⏰작업기간

2022년 02월 21일 ~ 2022년 03월 13일
<details>
<summary>세부 작업 내용</summary>
  
  #### week 1 - 기획 및 설계
  - 아이디어 검토 및 기술 검증
  - [목업](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FLqGEAuC84lL8E4FdYhVgcc%2FUntitled%3Fnode-id%3D0%253A1) 작성 및 [DB 스키마](https://lucid.app/lucidchart/7c4d1144-989c-4b54-9b60-01db0f0ec299/edit?invitationId=inv_6a140949-ab65-4e07-9455-42f002d59ca0) 모델링
  - [테스크 카드](https://nebula-cemetery-b32.notion.site/bc2a53e91cde4294856888e5b38fc6dc?v=cc148201de2a4782920edae951a023a4) 작성
  #### week 2,3 - 기능 개발
  - 프론트앤드
    - 카카오 소셜 로그인 구현
    - 메인 페이지 구현
    - pitch detecting 로직 구현 (autocorrelation 알고리즘)
    - 스피치 연습 페이지 구현
    - 스피치 리뷰 페이지 구현
    - 저장된 스피치 페이지 구현
  - 벡앤드
    - auth API 작성
    - users API 작성
    - multer-s3를 사용한 audio file 서버 업데이트 미들웨어 작성
  - 배포 및 피드백 반영
    - 낮은 음역대 note 추가 (남성 목소리 대응)
    - 스피치 설정 단계에서 입력한 소주제 삭제 기능 추가
    - 실시간 voice pitch 반영 throttle 활용
  - 테스트 코드 작성
</details>


### ⚙ 기술스택

### Language : <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-appveyor&logo=JavaScript&logoColor=white"/>

### Deploy : <img alt="AmazonAWS" src ="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-appveyor&logo=amazon-aws&logoColor=white"/>, <img alt="Amazon S3" src="https://img.shields.io/badge/Amazon S3-CB333B?style=for-the-appveyor&amp;logo=Amazon S3&amp;logoColor=white"/>

### Backend : <img alt="Node.js" src ="https://img.shields.io/badge/Node.js-43853D?style=for-the-appveyor&logo=node.js&logoColor=white"/> , <img alt="Express.js" src ="https://img.shields.io/badge/Express.js-404D59?style=for-the-appveyor"/> , <img alt="mongoDB" src ="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-appveyor&logo=mongodb&logoColor=white"/>

### [📕 API Docs](https://nebula-cemetery-b32.notion.site/API-Docs-32c540c241ff4934954336e010099aae)

## 💻 Getting Started
### 원격 저장소 내려받기
```
$ git clone https://github.com/speech-mate/speech-mate-backend.git
$ npm install
```
### 환경 변수 설정
```
DATABASE_URL="..."
ACCESS_SECRET="..."
REFRESH_SECRET="..."
ACCESS_MAX_AGE="..."
REFRESH_MAX_AGE="..."
CLIENT_URL=http://localhost:3000
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="..."
AWS_BUCKET_NAME="..."
```
### 실행
```
$ npm start
```
### 테스트
```
$ npm test
```
## 🚀 Challenges

### 라이브러리 의존성 없는 Pitch Detection 알고리즘 구현하기 (FE)

Pitch Detection 기능이 프로젝트의 메인 기능 중 하나이기 때문에 라이브러리를 쓰지 않는 기능 구현을 추구하였습니다. 라이브러리를 사용하지 않는 경우 라이브러리 업데이트와 같은 외부적 요인에서 벗어나 주체적인 코드의 유지보수 작업을 할 수 있다고 생각하였습니다. Pitch Detection 알고리즘에는 Web Audio API의 AnalyserNode로 추출한 시간 영역 데이터를 활용하였으며, Pitch Detection에 쓰이는 3가지 알고리즘을 비교 분석하여 최종적으로 Auto Correlation을 채택하게 되었습니다. Auto Correlation 구현으로 목소리와 같은 복잡한 파형의 주파수 계산을 할 수 있게 되었습니다.

#### [0️⃣ 소리에 대한 기본적인 이해](https://nebula-cemetery-b32.notion.site/22ee3790bcc440139249d894f7b6a54a)

#### [1️⃣ 브라우저가 소리를 인식하게 해보자](https://nebula-cemetery-b32.notion.site/3e3ee3ba678146018e86462cedd56e65)

#### [2️⃣ Web Audio API의 활용 방안](https://nebula-cemetery-b32.notion.site/Web-Audio-API-b2d4d5ca34ac498b859daec5fb73646d)

#### [3️⃣ Pitch Detection 알고리즘 구현 (1) - Zero Crossing](https://nebula-cemetery-b32.notion.site/Pitch-Detection-1-Zero-Crossing-f0a6356ecbbc4f14a3a6680af2721056)

#### [4️⃣ Pitch Detection 알고리즘 구현 (2) - Fast Fourier Transform](https://nebula-cemetery-b32.notion.site/Pitch-Detection-2-Fast-Fourier-Transform-0c48dd6ad3bb40e7afecfc961b130f9d)

#### [5️⃣ Pitch Detection 알고리즘 구현 (3) - Auto Correlation Function](https://nebula-cemetery-b32.notion.site/Pitch-Detection-3-Auto-Correlation-Function-862a6748ca44428e89bb3a0e2c08a9ac)

### 목소리 피치 시각화 로직에 쓰로틀링 추가하기 (FE)

프로젝트 초기에는 NewPractice 페이지의 2단계(사용자 베이스 목소리 주파수 추출), 4단계 (녹음 연습)에서 실시간으로 계산한 주파수를 매 번 State에 업데이트하여 사용자에게도 실시간 주파수 정보를 보여주는 로직으로 작성이 되어 있었습니다. 그러나 실제로 서비스를 배포하고 피드백을 수집하던 중, 목소리 피치 시각화 (2단계: Hz 정보, 4단계: 건반 색 표시) 변경이 잦은 느낌이 있다는 의견을 듣게 되었고, 이에 쓰로틀링을 적용하여 2단계 Hz 정보 렌더링의 경우 초당 270회에서 3.8회로 최적화 할 수 있었습니다. 
  
#### [예시 코드](https://nebula-cemetery-b32.notion.site/React-Throttle-0de98da0a72b4a5fa61d60ae82844025)

### 녹음 파일을 서버에 전달, AWS S3에 업데이트 하기 (FE & BE)

녹음 파일을 서버에 전송할 때, 파일 객체 뿐만 아니라 제목(String), 소주제(Array) 등 여러 데이터 타입의 정보를 함께 전송할 필요가 있었습니다. 이에 FormData 객체의 인코딩 타입을 multipart/form-data로 설정하고 문자열이 아닌 데이터들은 문자열로 변환하여 각기 다른 타입의 데이터가 서버로 전송될 수 있도록 구현하였습니다. 서버에서는 multer-s3를 사용하여 파일 데이터를 AWS S3에 업데이트하고 나머지 정보는 S3 버킷에 업데이트된 파일의 url과 함께 mongoDB에 저장될 수 있도록 구현하였습니다. DB에 url 정보가 있기 때문에 사용자가 디바이스를 변경하여도 동일한 아이디로 접속한다면 언제든지 해당 파일에 접근 가능하도록 구현하였습니다.
