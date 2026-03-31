# HTS Lab Website

Welcome to the source code for the **HTS Lab (Peptide & Protein Engineering Research Group)** website. This repository contains the static web pages, styles, scripts, and assets needed to run and deploy the lab's online presence.

## 🚀 Quick Start

The website is a fully static HTML/CSS/JS project. You do not need a complex build process to run or develop it.

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   ```
2. **Serve locally:**
   You can serve the directory using any local web server. For example, using Python:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

## 📂 Project Structure

- `index.html` - The home page.
- `people.html`, `research.html`, `publications.html`, etc. - Main content pages.
- `/components` - Reusable HTML snippets (like `header.html` and `footer.html`) dynamically loaded by JavaScript.
- `/css` - Website stylesheets.
- `/js` - JavaScript logic (`main.js` handles routing, components, and interactive elements).
- `/img` - Images for profiles, backgrounds, and gallery.
- `/news` - Individual news articles.
- `/Peptide Project` - The standalone "Name-to-Peptide Studio" web application sub-project.
- Development Scripts: There are several Python and Node.js files (e.g., `inject_data.py`, `update.js`, `test_rdkit.js`) used for data extraction and testing during development.

## 🌐 Deploying to GitHub Pages

This project is built to be easily hosted on **GitHub Pages** without any extra build steps. 

1. Push your code to your GitHub repository (usually the `main` or `master` branch).
2. Go to your repository's **Settings** > **Pages** on GitHub.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and the `/(root)` directory, then click **Save**.
5. Wait a few minutes, and your website will be live at `https://<your-username>.github.io/<your-repo-name>/`.

> **Note:** The website uses relative paths (`js/main.js`, `../css/style.css`) and dynamic base path resolution (`window.SITE_BASE = '../'`) so that asset loading works no matter what sub-path GitHub Pages uses for hosting.

## 🛠️ Modifying Content

* **Header/Footer:** Edit `components/header.html` and `components/footer.html`. Changes will reflect across all pages.
* **Adding News:** Create a new HTML file inside the `/news` folder using the existing articles as a template. Make sure to link back properly.
* **Updating People/Projects:** Modify `people.html` or `research.html` directly. Photo assets should go perfectly in their respective `/img` subfolders.
