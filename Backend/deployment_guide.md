# 🚀 Render Deployment Guide - Backend

Follow these steps to deploy your Node.js backend to Render.

## 1. Create a New Web Service on Render
1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Select the repository and the branch you want to deploy.

## 2. Configure Service Settings
- **Name**: `resumeiq-backend` (or your choice)
- **Environment**: `Node`
- **Region**: Select the one closest to your users.
- **Root Directory**: `Backend` (Important: since your code is in a subfolder)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

## 3. Set Environment Variables
In the **Environment** tab of your Render service, add the following variables:

| Key | Value | Note |
| :--- | :--- | :--- |
| `PORT` | `8080` (or any) | Render usually handles this automatically, but good to have. |
| `MONGO_URL` | `mongodb+srv://...` | Your MongoDB Atlas connection string. |
| `JWT_SECRET` | `your_secret_here` | Use a strong random string. |
| `GOOGLE_API_KEY` | `your_api_key` | Your Gemini API Key. |
| `GOOGLE_USER` | `email@gmail.com` | For nodemailer. |
| `GOOGLE_CLIENT_ID` | `...` | For nodemailer OAuth2. |
| `GOOGLE_CLIENT_SECRET` | `...` | For nodemailer OAuth2. |
| `GOOGLE_REFRESH_TOKEN` | `...` | For nodemailer OAuth2. |
| `FRONTEND_URL` | `https://your-frontend.onrender.com` | **Crucial**: Set this to your deployed frontend URL. |
| `NODE_VERSION` | `20` | (Optional) To match your local environment. |

## 4. MongoDB Atlas Whitelisting
Render uses dynamic IP addresses. To allow Render to connect to your MongoDB database:
1. Go to **Network Access** in MongoDB Atlas.
2. Click **Add IP Address**.
3. Select **Allow Access From Anywhere** (0.0.0.0/0).
   > [!WARNING]
   > This is the easiest way but less secure. Alternatively, you can use a VPC or static IPs if you upgrade your Render plan.

## 5. Verify Deployment
Once the deployment finishes, Render will provide a URL like `https://resumeiq-backend.onrender.com`.
- Test it by visiting `https://resumeiq-backend.onrender.com/api/auth/test` (if you have a test route) or just checking the logs in Render.

---

### Need Help?
If you encounter any errors during deployment, check the **Logs** tab in Render and share the error message here!
