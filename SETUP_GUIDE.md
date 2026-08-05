# 🚀 Python Portfolio Website — Complete Setup Guide

## 📁 PROJECT STRUCTURE (WHERE TO PLACE EACH FILE)

```
portfolio/                        ← ROOT FOLDER (create this anywhere)
│
├── app.py                        ← MAIN PYTHON FILE (Flask server)
├── requirements.txt              ← Python packages list
├── resume.pdf                    ← ⭐ YOUR RESUME PDF (place it here!)
│
├── templates/
│   └── index.html                ← MAIN HTML page
│
└── static/
    ├── css/
    │   └── style.css             ← All styles (dark blue theme)
    └── js/
        └── main.js               ← Animations & interactions
```

---

## 🛠️ STEP 1 — INSTALL VS CODE EXTENSIONS

Open VS Code → Press `Ctrl+Shift+X` → Search and install:

| Extension | Purpose |
|-----------|---------|
| **Python** (Microsoft) | Python language support |
| **Pylance** (Microsoft) | Intellisense for Python |
| **Flask Snippets** (cstrap) | Flask HTML/Python shortcuts |
| **Prettier** | Code formatter |
| **Live Server** | Preview HTML files |
| **HTML CSS Support** | CSS autocomplete in HTML |
| **IntelliSense for CSS** | CSS class hints |
| **GitLens** | Git integration |
| **One Dark Pro** | Dark theme (recommended!) |
| **Material Icon Theme** | Better file icons |

---

## 🐍 STEP 2 — SET UP PYTHON ENVIRONMENT

Open VS Code Terminal (`Ctrl + ~`) and run:

```bash
# 1. Create project folder
mkdir portfolio
cd portfolio

# 2. Create Python virtual environment
python -m venv venv

# 3. Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# 4. Install Flask
pip install flask

# OR install from requirements.txt:
pip install -r requirements.txt
```

---

## 📂 STEP 3 — CREATE FOLDER STRUCTURE

In your terminal (inside portfolio folder):

```bash
# Create all needed folders
mkdir templates
mkdir -p static/css
mkdir -p static/js
mkdir -p static/images
```

---

## 📄 STEP 4 — PLACE THE FILES

Copy each file to the correct location:

- `app.py`              → `portfolio/app.py`
- `requirements.txt`    → `portfolio/requirements.txt`
- `index.html`          → `portfolio/templates/index.html`
- `style.css`           → `portfolio/static/css/style.css`
- `main.js`             → `portfolio/static/js/main.js`

---

## ▶️ STEP 5 — RUN THE WEBSITE

```bash
# Make sure venv is active, then:
python app.py
```

You'll see:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

Open your browser → go to: **http://localhost:5000**

---

## ✏️ STEP 6 — PERSONALIZE YOUR PORTFOLIO

### In `templates/index.html`:

| Find this | Replace with |
|-----------|-------------|
| `Your Name` | Your actual name |
| `YourName` | Your name (no spaces) |
| `Python Developer` | Your job title |
| `Mumbai, India` | Your city |
| `your@email.com` | Your email |
| `yourusername` (GitHub) | Your GitHub username |
| `yourusername` (LinkedIn) | Your LinkedIn username |

### Update the Projects section:
- Replace the 6 example projects with your real projects
- Update the GitHub links and live demo links
- Change the tech tags to match your project

### Add your resume:
- Name your resume file: `resume.pdf`
- Place it in the root `portfolio/` folder
- That's it! The "My Resume" button will automatically open it

---

## 🎨 STEP 7 — CHANGE COLORS (Optional)

Open `static/css/style.css` and find the `:root` section at the top:

```css
:root {
  --accent-cyan:   #00d4ff;   ← Main accent color
  --accent-purple: #a855f7;   ← Secondary accent
  --accent-blue:   #4f8ef7;   ← Blue highlights
  --accent-green:  #00ff9d;   ← Success color
  --bg-dark:       #050d1a;   ← Background
}
```

Change any hex color codes to customize the theme.

---

## 🌐 STEP 8 — DEPLOY ONLINE (Optional)

### Option A: Render.com (FREE)
1. Push your code to GitHub
2. Go to render.com → New Web Service
3. Connect your GitHub repo
4. Build command: `pip install -r requirements.txt`
5. Start command: `gunicorn app:app`
6. Deploy!

### Option B: PythonAnywhere (FREE)
1. Sign up at pythonanywhere.com
2. Upload your files
3. Set up a web app with Flask
4. Done!

---

## ❓ COMMON ERRORS & FIXES

| Error | Fix |
|-------|-----|
| `ModuleNotFoundError: flask` | Run `pip install flask` |
| `Port already in use` | Change port: `app.run(port=5001)` in app.py |
| `Template not found` | Make sure index.html is inside `templates/` folder |
| `Static files not loading` | Make sure css/js are inside `static/css/` and `static/js/` |
| Resume button shows "not found" | Put `resume.pdf` in root `portfolio/` folder |

---

## 💡 QUICK TIPS

- Press `Ctrl + S` to save files in VS Code
- The server auto-reloads when you save Python files (debug=True)
- For HTML/CSS changes, just refresh the browser
- Use `Ctrl + C` in terminal to stop the server

---

**Built with Flask 🐍 | Dark Blue Radiant Theme 💙**
