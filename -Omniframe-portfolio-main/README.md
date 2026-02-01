# OmniFrame Portfolio (GitHub + Firebase Version)

This portfolio is set up to work on **GitHub Pages** with a **Firebase** backend.

## ⚠️ CRITICAL SETUP STEP

To make the Login and Uploads work, you **MUST** configure Firebase.

1.  **Go to Firebase**: Open [https://firebase.google.com/](https://firebase.google.com/) and login/signup.
2.  **Create Project**: Click "Add project" and name it `OmniFrame` (or anything).
3.  **Add Web App**:
    *   Click the `</>` (Web) icon on the dashboard.
    *   Register the app.
    *   **COPY the `firebaseConfig` code block**.
4.  **Paste Config**:
    *   Open `firebase-config.js` in this folder.
    *   Replace the placeholder values with your real keys.
5.  **Enable Services** (In Firebase Console):
    *   **Authentication**: Go to Build -> Authentication -> Get Started -> Enable **Email/Password**.
    *   **Firestore Database**: Go to Build -> Firestore Database -> Create Database -> Start in **Test Mode** (or Production, but adjust rules).
    *   **Storage**: Go to Build -> Storage -> Get Started -> Start in **Test Mode**.

## How to Deploy to GitHub

Since you don't have Git installed, you can upload via the browser:

1.  Go to [github.com/new](https://github.com/new) and create a repository (e.g., `my-portfolio`).
2.  On the "Quick setup" page, click "uploading an existing file".
3.  Drag and drop **ALL** the files in this folder (`index.html`, `admin.html`, `script.js`, `firebase-config.js`, `public/`, etc.) into the GitHub upload box.
4.  Commit changes.
5.  **Enable GitHub Pages**:
    *   Go to Repository Settings -> Pages.
    *   Select Source: `Deploy from a branch` -> `main` / `root`.
    *   Save.
6.  Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Default Admin User
Since you are using Firebase, there is no default user.
1.  Go to `admin.html`.
2.  Since I didn't add a signup page (for security), you should **Create a User in the Firebase Console**:
    *   Authentication -> Users -> Add user.
    *   Enter an email and password.
3.  Use those credentials to log in on your site.
