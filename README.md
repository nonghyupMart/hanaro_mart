# 명령어 메뉴얼

- https://docs.expo.io/workflow/expo-cli/#commands

# 배포전 수정 파일

- app.json -> version , buildNumber , versionCode

# Expo 배포

테스트용 전부 배포후 재시작

```bash
expo publish --release-channel develop && expo publish --release-channel stage && expo start
```

Expo 운영서버 확인용

```bash
expo publish --release-channel stage && expo start
```

개발서버

```bash
expo publish --release-channel develop && expo start
```

운영서버

```bash
expo publish --release-channel prod && expo start
```

# Expo 빌드

둘다 빌드 

```bash
expo build:android --release-channel prod --no-wait -t app-bundle && expo build:ios --release-channel prod --no-wait -t archive
```

안드로이드

```bash
expo build:android --release-channel prod --no-wait -t app-bundle
```

iOS

```bash
expo build:ios --release-channel prod --no-wait -t archive
```

# Expo 앱스토어 업로드

안드로이드

```bash
expo upload:android --latest --key /Users/dominickim/Documents/HanaroPlus/pc-api-8118189818183052496-280-3c18658bab02.json
```

iOS

```bash
transporter 사용
```

# 계정정보

### 구글 계정

- nonghyupmart@gmail.com
- PW : nonghyup1~

### 애플 계정

- nonghyupmart@gmail.com
- PW : Nonghyup1~

### 카카오관리자계정

- nhhanaromart@gmail.com
- PW : hanaro2020

### Expo 계정

- https://expo.io/
- nonghyupmart@gmail.com
- PW : Nonghyup1~

### sentry 계정

- nonghyupmart@gmail.com
- PW : nonghyup1~
- https://docs.expo.dev/guides/using-sentry/
- https://sentry.io/

### github 계정

- nonghyupmart@gmail.com
- PW : nonghyup1234

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

# android device wifi ADB connection 
```
adb connect 192.168.35.164:5555
```