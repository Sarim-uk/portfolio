# Modern Portfolio Landing Page

A sleek, modern, and interactive portfolio landing page for a Computer Science graduate and software engineer. This portfolio features a futuristic design with smooth animations and microinteractions to showcase your skills and experience effectively.

## Features

- Fullscreen hero section with a dark, futuristic theme
- Dynamic animated greeting text with typing effect
- Particle background for a modern tech aesthetic
- Smooth scrolling and navigation effects
- Mobile responsive design
- Keyboard accessible elements
- Pure HTML, CSS, and JavaScript implementation (no frameworks or libraries except particles.js)

## Getting Started

1. Clone or download this repository
2. Customize the content as described in the Customization section
3. Deploy to your preferred hosting platform

## Customization

### Personal Information

Open `index.html` and update the following:

- Replace "Your Name" with your actual name in the greeting section
- Update or add additional professional titles in the `script.js` file
- Replace the CSS-based profile placeholder with your actual image:
  ```html
  <!-- Replace this: -->
  <div class="profile-placeholder">
      <i class="fas fa-user"></i>
      <span>Your Photo</span>
  </div>
  
  <!-- With this: -->
  <img src="images/your-actual-photo.jpg" alt="Your Name">
  ```

### Colors and Theme

To modify the color scheme, edit the CSS variables in the `:root` selector in `styles.css`:

```css
:root {
    --primary-bg: #0a0a1a;         /* Main background color */
    --secondary-bg: #12122a;       /* Secondary background color */
    --primary-color: #ffffff;      /* Primary text color */
    --accent-color: #00e6e6;       /* Main accent color (teal) */
    --secondary-accent: #8a2be2;   /* Secondary accent color (purple) */
    --text-color: #e6e6e6;         /* Regular text color */
}
```

### Particles Background

The particles background can be customized by modifying the configuration object in the `script.js` file. Visit [particles.js documentation](https://github.com/VincentGarreau/particles.js/) for more customization options.

## Adding More Sections

The portfolio is designed to be easily extendable. Additional sections (About, Experience, Projects, etc.) can be added by following the same structure as the existing sections. Simply add new `<section>` elements to the HTML file and style them accordingly in the CSS file.

## Browser Compatibility

This portfolio is compatible with all modern browsers, including:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is licensed under the MIT License - feel free to use it for your personal portfolio.

---

## Preview

To see a live preview of the portfolio, simply open the `index.html` file in a web browser.

For any questions or suggestions, please feel free to reach out.

Happy coding! 