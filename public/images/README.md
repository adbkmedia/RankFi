# Images Folder Structure

Put your images here:

## Folder Structure

```
public/images/
├── exchanges/          # Exchange logos (binance.png, coinbase.png, etc.)
├── logos/             # Site logos, favicons
└── README.md          # This file
```

## How to Use Images

### In your components:

```tsx
// For exchange logos
<img src="/images/exchanges/binance.png" alt="Binance" />

// For site logos
<img src="/images/logos/logo.png" alt="RankFi" />

// Using Next.js Image component (recommended for optimization)
import Image from 'next/image';

<Image 
  src="/images/exchanges/binance.png" 
  alt="Binance" 
  width={100} 
  height={100} 
/>
```

## Favicon

Put your favicon files in:
- `app/favicon.ico` (main favicon)
- `app/icon.png` (optional, for modern browsers)

## Image Formats

- Use `.png` for logos with transparency
- Use `.jpg` or `.webp` for photos
- Keep file sizes small (< 200KB per image)

