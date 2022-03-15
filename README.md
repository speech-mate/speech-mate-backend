# SPEECH MATE  - 백앤드 파트
pitch detection 알고리즘을 적용한 음성 녹음 웹 앱

👄[Speech Mate Demo](https://speechmate.online)<br/>
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

### Language : <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-appveyor&logo=JavaScript&logoColor=white"/>, <img alt="html" src ="https://img.shields.io/badge/HTML5-E34F26?style=for-the-appveyor&logo=html5&logoColor=white"/>, <img alt="css" src ="https://img.shields.io/badge/CSS3-1572B6?style=for-the-appveyor&logo=css3&logoColor=white"/>

### Deploy : <img alt="AmazonAWS" src ="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-appveyor&logo=amazon-aws&logoColor=white"/>, <img alt="Amazon S3" src="https://img.shields.io/badge/Amazon S3-CB333B?style=for-the-appveyor&amp;logo=Amazon S3&amp;logoColor=white"/>

### Backend : <img alt="Node.js" src ="https://img.shields.io/badge/Node.js-43853D?style=for-the-appveyor&logo=node.js&logoColor=white"/> , <img alt="Express.js" src ="https://img.shields.io/badge/Express.js-404D59?style=for-the-appveyor"/> , <img alt="mongoDB" src ="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-appveyor&logo=mongodb&logoColor=white"/>

### 📕 API Docs
TODO 3

## 🚀 Issue Log
TODO 4

## 💬프로젝트를 마친 소감
TODO 2
