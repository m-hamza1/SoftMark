# SoftMark - AI Automation Website

🚀 **Live Site**: [https://m-hamza1.github.io/SoftMark/](https://m-hamza1.github.io/SoftMark/)

## Deployment Instructions

### First Time Setup

1. **Create GitHub Repository**
   - Go to [https://github.com/new](https://github.com/new)
   - Repository name: `SoftMark`
   - Make it **Public**
   - Do **NOT** initialize with README
   - Click **Create repository**

2. **Deploy the Site**
   ```powershell
   .\deploy-to-m-hamza1.ps1
   ```

3. **Enable GitHub Pages**
   - Go to [https://github.com/m-hamza1/SoftMark/settings/pages](https://github.com/m-hamza1/SoftMark/settings/pages)
   - Under **Source**:
     - Branch: `gh-pages`
     - Folder: `/ (root)`
   - Click **Save**

4. **Wait 2-3 minutes** for deployment

5. **Visit Your Live Site**
   - [https://m-hamza1.github.io/SoftMark/](https://m-hamza1.github.io/SoftMark/)

---

## Auto-Sync Your Changes

Whenever you make changes locally and want them to appear on the live site:

```powershell
.\auto-sync-m-hamza1.ps1
```

This will:
- ✅ Commit all your changes
- ✅ Push to GitHub
- ✅ Update the live site automatically
- ✅ Your changes will be live in 1-2 minutes!

---

## Manual Deployment

If you prefer manual control:

```powershell
# Stage changes
git add -A

# Commit changes
git commit -m "Your commit message"

# Push to master
git push m-hamza1 master

# Update gh-pages
git checkout gh-pages
git merge master
git push m-hamza1 gh-pages
git checkout master
```

---

## Site Structure

- **Homepage**: `index.html`
- **Products**: `product.html`
- **Pricing**: `pricing.html`
- **Blog**: `blog.html`
- **Changelog**: `changelog.html`

### Assets
- `assets/shared-styles.css` - Main styles
- `assets/main.js` - Main JavaScript
- `assets/form-handler.js` - Form handling
- `assets/chatbot.js` - Chatbot functionality

---

## Features

✨ **Mobile Responsive** - Optimized for all screen sizes  
🎨 **Modern Design** - Clean, professional interface  
⚡ **Fast Loading** - Optimized assets and code  
🤖 **AI Chatbot** - Interactive customer support  
📱 **Mobile-First** - Perfect spacing and layout on mobile  

---

## Live URLs

- **Homepage**: https://m-hamza1.github.io/SoftMark/
- **Products**: https://m-hamza1.github.io/SoftMark/product.html
- **Pricing**: https://m-hamza1.github.io/SoftMark/pricing.html
- **Blog**: https://m-hamza1.github.io/SoftMark/blog.html
- **Changelog**: https://m-hamza1.github.io/SoftMark/changelog.html

---

## Support

For issues or questions, contact: [Your Email]

---

**Made with ❤️ by Hamza**
