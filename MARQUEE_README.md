# Lucky Folks Marquee Wave Animation - GSAP Implementation

## 📋 Overview

This implementation recreates the exact marquee wave animation from the Lucky Folks website (https://luckyfolks.fr).

## 📦 What's Included

### 1. **Main Integration** (Already integrated in your project)
- `index.html` - Updated marquee section
- `styles.css` - Updated marquee styles
- `script.js` - GSAP animation function `initGSAPMarquee()`

### 2. **Standalone Examples**
- `marquee-animation.html` - Basic version with word-based wave
- `marquee-animation-advanced.html` - Advanced per-letter wave with SplitType

## 🎯 Key Features

- ✅ Infinite horizontal scroll (right to left)
- ✅ Smooth wave effect with rotation, skew, and vertical movement
- ✅ Seamless looping with no jumps
- ✅ Huge yellow text angled diagonally
- ✅ Full-bleed background image
- ✅ GSAP-powered smooth animations
- ✅ Responsive and performant

## 🎨 How It Works

### Horizontal Scroll
```javascript
gsap.to(marqueeTrack, {
    x: -totalWidth,
    duration: 25,
    ease: "none",
    repeat: -1,
    modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
    }
});
```

### Wave Effect
```javascript
timeline.to(text, {
    y: -25,
    rotation: 3,
    skewX: 2,
    skewY: 1,
    duration: 1.2,
    ease: "sine.inOut"
})
```

## 🔧 Customization

### Adjust Speed
```javascript
duration: 25  // Lower = faster, Higher = slower
```

### Adjust Wave Intensity
```javascript
y: -25,        // Vertical movement (increase for more bounce)
rotation: 3,   // Rotation angle (increase for more tilt)
skewX: 2,      // Horizontal skew
```

### Adjust Wave Timing
```javascript
delay: index * 0.4  // Delay between each word's wave
```

### Change Text
In `index.html`:
```html
<span class="marquee-text">YOUR TEXT HERE</span>
```

### Change Colors
In `styles.css`:
```css
color: var(--color-gold);  /* Change to any color */
```

## 🚀 Files Explained

### `marquee-animation.html` (Basic Version)
- Complete standalone example
- Word-based wave animation
- 2 rows of text scrolling
- Perfect for simple implementations

### `marquee-animation-advanced.html` (Advanced Version)
- Uses SplitType library for per-letter animation
- Each character animates individually
- Includes mouse parallax effect
- More dynamic and fluid wave

## 📝 Integration Notes

The animation is already integrated into your main project:

1. **GSAP CDN** is loaded in `index.html`
2. **initGSAPMarquee()** is called on page load
3. The marquee section uses ID `gsap-marquee`

## 🎬 Animation Timeline

Each text element follows this pattern:
1. **Phase 1** (1.2s): Move up + rotate right + skew right
2. **Phase 2** (1.2s): Move down + rotate left + skew left
3. **Phase 3** (1.2s): Return to center + reset rotation/skew
4. **Loop**: Repeat infinitely

## 💡 Tips

- Use at least 4 repetitions of text for seamless looping
- Adjust `transform: rotate(-5deg)` on `.marquee-wrapper` for diagonal angle
- Use `will-change: transform` for better performance
- Test on mobile - reduce font size if needed

## 🐛 Troubleshooting

**Animation not working?**
- Check browser console for GSAP errors
- Ensure GSAP CDN is loaded before script.js
- Verify element ID is `gsap-marquee`

**Text jumping?**
- Increase number of text repetitions
- Check that totalWidth calculation is correct

**Performance issues?**
- Reduce number of text elements
- Lower animation complexity (fewer transforms)
- Add `will-change` property

## 📚 Resources

- GSAP Docs: https://greensock.com/docs/
- SplitType: https://github.com/lukePeavey/SplitType
- Lucky Folks: https://luckyfolks.fr

---

**Built with ❤️ using GSAP**
