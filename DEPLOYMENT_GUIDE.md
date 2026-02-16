# Portfolio Full-Stack Deployment Guide

Your portfolio is now a full-stack application with a React frontend and an Express backend.

## 1. Project Structure

- `frontend/` (Root) -> Deployed to Vercel/Netlify
- `server/` -> Deployed to Render

## 2. Local Development

1. **Start Backend**:
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   npm install
   npm run dev
   ```

## 3. Backend Deployment (Render.com)

1. Create a **New Web Service** on Render.
2. Connect your GitHub repository.
3. **Build Command**: `cd server && npm install`
4. **Start Command**: `cd server && node src/index.js`
5. **Environment Variables**:
   Add the following in Render Dashboard -> Environment:

   - `GITHUB_USERNAME`: Prathmesh1703
   - `HASHNODE_HOST`: prathmeshbharsakle.hashnode.dev
   - `GITHUB_TOKEN`: (Optional) Your GitHub Personal Access Token
   - `NODE_VERSION`: 18

6. **Deploy**. Render will give you a URL (e.g., `https://portfolio-backend.onrender.com`).

## 4. Frontend Deployment

1. On Vercel or Netlify, add an Environment Variable:
   - `VITE_API_URL`: `https://your-render-backend-url.onrender.com`

2. Deploy the frontend. It will now automatically fetch projects and blogs from your live backend!

## 5. Automatic Updates

- **GitHub Projects**: Just push a new repo to GitHub. It will appear on your portfolio in ~10 minutes (cache time).
- **Blogs**: Publish on Hashnode. It will appear on your portfolio in ~10 minutes.
