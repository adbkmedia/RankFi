# Project Structure Guide

## 🗺️ How to Navigate This Project

### Your Main Files (What You Actually Edit)

```
app/
├── best-crypto-exchanges/
│   └── page.tsx                    ← Your main comparison page (URL: /best-crypto-exchanges)
├── components/
│   └── ComparisonTable.tsx         ← Your table component (the actual feature)
├── layout.tsx                       ← Site-wide layout (fonts, metadata)
└── globals.css                      ← Global styles
```

### How Next.js Routing Works

- `app/page.tsx` → Root URL (`/`) - currently redirects to `/best-crypto-exchanges`
- `app/best-crypto-exchanges/page.tsx` → `/best-crypto-exchanges` - your main page
- `app/components/` → Reusable components (not routes, just code you reuse)

**Rule**: Any folder with `page.tsx` = a URL route

### Adding Images

1. Put images in `public/images/`
2. Reference them as `/images/filename.png`
3. Example: `public/images/exchanges/binance.png` → use as `/images/exchanges/binance.png`

### File Organization Philosophy

✅ **Good (Current Structure)**:
- Components in `components/` folder
- Pages in route folders
- Images in `public/`
- One component per file

❌ **Bad (Don't Do This)**:
- Everything in one giant file
- Images scattered everywhere
- No organization

## 🎯 Quick Reference

| Want to... | Edit this file |
|------------|---------------|
| Change the comparison table | `app/components/ComparisonTable.tsx` |
| Change the page layout | `app/best-crypto-exchanges/page.tsx` |
| Add a new page/route | Create `app/new-page/page.tsx` |
| Change site title/metadata | `app/layout.tsx` |
| Add global styles | `app/globals.css` |
| Add images/logos | Put in `public/images/` |

## 📁 Complete Structure

```
frontend/
├── app/                          # All your pages and components
│   ├── best-crypto-exchanges/   # Your main page route
│   │   └── page.tsx             # The actual page
│   ├── components/              # Reusable components
│   │   └── ComparisonTable.tsx  # Your table component
│   ├── layout.tsx               # Site wrapper
│   ├── page.tsx                 # Root page (redirects)
│   └── globals.css              # Styles
├── public/                      # Static files (images, etc.)
│   └── images/                  # Your images go here
│       ├── exchanges/           # Exchange logos
│       └── logos/               # Site logos
└── [config files]               # Don't worry about these
```

## 💡 Pro Tips

1. **One component = One file**: Keep components separate and reusable
2. **Route = Folder with page.tsx**: Want `/about`? Create `app/about/page.tsx`
3. **Components = Reusable code**: Use them in multiple pages
4. **Public = Static files**: Images, fonts, etc. that don't change

This structure is what professional developers use! You're doing it right. 🚀

