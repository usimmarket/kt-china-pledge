KT 중국 유학생 확인서 모바일 서명 페이지

구성
- public/index.html : 고객이 QR로 접속하는 모바일 페이지
- public/pledge.pdf : 고객에게 보여줄 확인서 원본 PDF
- functions/submit.js : 제출된 서명 PDF를 메일로 발송하는 Cloudflare Pages Function

기능
1. 고객이 PDF 내용을 확인
2. 이름 입력
3. 손가락 서명
4. 제출 시 오늘 날짜, 이름, 서명을 PDF 하단에 자동 반영
5. 서명 완료 PDF를 메일로 발송

기본 수신 메일
- MAIL_TO 환경변수를 설정하지 않으면 kukidream@gmail.com 으로 발송됩니다.

메일 주소 변경 방법
Cloudflare Pages > 해당 프로젝트 > Settings > Environment variables 에서 아래 값을 수정하세요.
- MAIL_TO = 원하는 수신 이메일

필수 환경변수
- RESEND_API_KEY = Resend API Key

권장 환경변수
- MAIL_TO = kukidream@gmail.com
- MAIL_FROM = 인증된 발신자 예: USIMMARKET <noreply@usimmarket.com>

주의
- Resend에서 발신 도메인이 인증되지 않았으면 MAIL_FROM은 제한될 수 있습니다.
- PDF 하단 좌표는 public/index.html 안의 drawImage 좌표에서 조정할 수 있습니다.
