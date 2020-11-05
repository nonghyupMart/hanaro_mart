
# Expo 배포
개발서버 
```bash
expo publish --release-channel develop 
```
운영서버 
```bash
expo publish --release-channel prod
```

# Expo 빌드 
안드로이드
```bash
expo build:android --release-channel prod --no-publish --no-wait -t app-bundle   
```    
iOS
```bash
expo build:ios --release-channel prod --no-publish --no-wait -t archive 
```

# Expo 앱스토어 업로드 
안드로이드
```bash
expo upload:android --latest --key /Users/dominickim/Documents/HanaroPlus/pc-api-8118189818183052496-280-3c18658bab02.json   
```     
iOS
```bash
expo upload:ios --latestre
```

# 계정정보

구글 계정 
nonghyupmart@gmail.com
PW : nonghyup1~

애플 계정 
nonghyupmart@gmail.com
PW : Nonghyup1~

카카오관리자계정
nhhanaromart@gmail.com
PW : hanaro2020

Expo 계정 
https://expo.io/
nonghyupmart@gmail.com
PW : Nonghyup1~

# Expo CLI 설치
Cmd 에서 명령어 입력 
```bash
npm install --global expo-cli 
```

# 패키지 설치
프로젝트 경로에서 Cmd 에서 명령어 입력 
```bash
npm install
``` 

# Expo 로컬 실행 
```bash
expo start
```
