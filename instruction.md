# Migration Instructions: Dev&Dash to FutureSprint (Next.js)

This document outlines the repository structure and the steps required to complete the transformation from the legacy Vanilla JS project to the modern Next.js serverless application.

## 1. File Structure & Mapping

The transformation will migrate code from `Vanilla-project/` into the Next.js `app/` directory.

| Source (Legacy) | Target (Next.js) | Purpose |
| :--- | :--- | :--- |
| `Vanilla-project/index.html` | `app/page.tsx` | Main landing page (converted to JSX). |
| `Vanilla-project/style.css` | `app/globals.css` | Global styles and Tailwind imports. |
| `Vanilla-project/script.js` | `app/page.tsx` & Components | Interactive logic (Modals, Animations). |
| `Vanilla-project/module-backend/` | `app/api/` | Backend logic (replaced by MongoDB API routes). |
| `assets/` | `public/assets/` | Static images and icons. |

## 2. Pre-Transformation Checklist

Before the automated transformation begins, please ensure the following tasks are completed:

### A. Environment Configuration
Create a `.env.local` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
ADMIN_PASSWORD=your_secure_admin_password
```
*Note: You will need to create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).*

### B. Dependency Installation
The project requires `mongodb` and `bcryptjs` for the new backend. Run the following command in the root:
```bash
pnpm install mongodb bcryptjs
```

### C. Asset Verification
Ensure all required images (e.g., `1.png`, `2.png`, `Dev&DashRoom.jpg`) are present in the `assets/` folder. These will be moved to `public/assets/` during the migration.

### D. API Decision
The legacy code uses `FidaAPI` which points to a Koyeb-hosted backend. The new plan (`PLAN.md`) uses a self-contained MongoDB backend.
*   **Default Action**: I will implement the MongoDB backend as per `PLAN.md`.
*   **Alternative**: If you wish to continue using the Koyeb API, please notify me.

## 3. Transformation Steps (To be performed by Gemini)

Once the checklist is complete, I will proceed with:
1.  **Scaffolding**: Setting up `lib/mongodb.ts` and API routes.
2.  **Styles**: Merging `style.css` and Tailwind configurations.
3.  **Components**: Extracting the Registration Modal and Admin Dashboard into React components.
4.  **Landing Page**: Converting the massive `index.html` into a performant Next.js page.
5.  **Clean up**: Moving legacy files to a `trash/` or archive folder once verified.

---
**Ready?** Once you have completed the checklist in Section 2, tell me to "Start the Transformation".