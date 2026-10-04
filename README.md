# Alejandria Portfolio Website

A static personal portfolio built with HTML, CSS, and JavaScript. There is no build step or package installation required.

## Run locally

From this folder, start Python's built-in web server:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000> in a browser. Stop the server with `Ctrl+C` in the terminal.

Alternatively, open this folder in Visual Studio Code and use a local web server extension.

## Publish with GitHub Pages

1. Create a new, public repository on GitHub.
2. Upload the contents of this folder to the repository root. Keep `index.html`, `style.css`, `script.js`, the image files, and `Application Resume.pdf` together in their current relative locations.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select the `main` branch and `/ (root)`, then save.
5. GitHub will show the published website URL in the Pages section after deployment completes.

Because this site is static, it can also be hosted by other static-site providers without a build command.
