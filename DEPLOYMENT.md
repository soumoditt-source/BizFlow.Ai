# 🚀 HOW TO DEPLOY (The Easiest Way)

## Option 1: Vercel (Recommended - Free & Instant)
This is the fastest method. No coding or terminal required.

1.  **Push to GitHub**
    *   Ensure your code is uploaded to your GitHub repository.

2.  **Go to Vercel**
    *   Visit [vercel.com](https://vercel.com) and sign up with **GitHub**.

3.  **Import Project**
    *   Click **"Add New..."** -> **"Project"**.
    *   Find your repo (`bizflow-autoceo`) and click **Import**.

4.  **Configure Project (Critical Step)**
    *   **Framework Preset:** It should auto-detect "Vite". If not, select it.
    *   **Root Directory:** Leave as `./`.
    *   **Environment Variables:**
        *   Click the arrow to expand.
        *   **Name:** `API_KEY`
        *   **Value:** (Paste your Gemini Google AI Studio Key here)
        *   Click **Add**.

5.  **Deploy**
    *   Click **Deploy**.
    *   Wait ~30 seconds.
    *   🎉 **DONE.** You will get a live URL (e.g., `https://bizflow-autoceo.vercel.app`).

---

## Option 2: Netlify (Drag & Drop)
If you don't want to connect GitHub.

1.  Run `npm run build` in your local terminal.
2.  This creates a `dist` folder in your project.
3.  Go to [netlify.com/drop](https://app.netlify.com/drop).
4.  Drag and drop the `dist` folder onto the page.
5.  **Note:** You might have issues with the API Key using this method unless you configure it in Netlify Site Settings afterwards.

---

## Troubleshooting

**"API Key Missing" Error?**
*   Go to Vercel Dashboard > Settings > Environment Variables.
*   Ensure `API_KEY` is added.
*   Go to **Deployments** tab and click **Redeploy** on the latest commit to bake the key in.

**"Page Not Found" on Refresh?**
*   Vercel usually handles this automatically for Vite apps. If not, create a file named `vercel.json` in your root with:
    ```json
    {
      "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    }
    ```
