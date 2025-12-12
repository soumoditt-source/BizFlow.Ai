# BIZFLOW AUTOCEO - ENTERPRISE DEPLOYMENT MANUAL (P.T.C.F PROTOCOL)

**Security Level:** CONFIDENTIAL / ADMIN EYES ONLY
**Version:** 3.1.0-RC (Production Ready)
**Author:** Supreme Architect (Soumoditya Das)

---

## 1. CLOUD DEPLOYMENT (Web)

The fastest way to go live. We use Vercel's Edge Network for global low-latency access.

### A. Vercel (Preferred)
1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```
2.  **Login**:
    ```bash
    vercel login
    ```
3.  **Deploy**:
    Run inside the project root.
    ```bash
    vercel --prod
    ```
4.  **Environment Variables**:
    In Vercel Dashboard > Settings > Environment Variables:
    *   `API_KEY`: Your Gemini 3 Pro Key.

### B. Docker (Containerized)
For Kubernetes or Google Cloud Run.
1.  **Build**:
    ```bash
    docker build -t bizflow-app .
    ```
2.  **Run**:
    ```bash
    docker run -p 8080:80 -e API_KEY="your_key" bizflow-app
    ```

---

## 2. MOBILE APPLICATION (iOS & Android)

We use **Capacitor** to wrap the React web app into a native binary.

### Prerequisites
*   Node.js 18+
*   Xcode (for iOS)
*   Android Studio (for Android)

### A. Initialization
1.  **Install Capacitor**:
    ```bash
    npm install @capacitor/core @capacitor/cli
    npx cap init
    ```
    *   *App Name:* BizFlow AutoCEO
    *   *App ID:* com.bizflow.autoceo

2.  **Install Platforms**:
    ```bash
    npm install @capacitor/android @capacitor/ios
    npx cap add android
    npx cap add ios
    ```

### B. Build Process
1.  **Build Web Assets**:
    ```bash
    npm run build
    ```
    *(Ensure `dist` or `build` folder is created)*

2.  **Sync to Native**:
    ```bash
    npx cap sync
    ```

### C. Deploy to Devices
*   **iOS**:
    ```bash
    npx cap open ios
    ```
    (Xcode opens. Select your Team. Hit "Run".)
*   **Android**:
    ```bash
    npx cap open android
    ```
    (Android Studio opens. Hit "Run".)

---

## 3. DESKTOP APPLICATION (Mac & Windows)

We use **Electron** to ship a standalone `.dmg` or `.exe`.

1.  **Install Electron**:
    ```bash
    npm install --save-dev electron electron-builder
    ```
2.  **Add `main.js`**:
    Create a simple Electron entry point file that loads `index.html`.
3.  **Build**:
    ```bash
    npx electron-builder
    ```

---

## 4. CI/CD PIPELINE (GitHub Actions)

Automate your deployment to ensure "highest grade" reliability.

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 5. SECURITY AUDIT CHECKLIST

Before going public:
1.  [ ] **HTTPS Only**: Enforce SSL on all domains.
2.  [ ] **API Key Rotation**: Rotate Gemini keys every 30 days.
3.  [ ] **Rate Limiting**: Configure Vercel/Cloudflare rate limits to prevent DDoS.
4.  [ ] **Legal**: Ensure `LegalModal.tsx` content matches your actual jurisdiction requirements.

---

**STATUS:** SYSTEMS NOMINAL. READY FOR LAUNCH.
**SIGNATURE:** *Soumoditya Das*
