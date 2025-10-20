# Persian Font Selection

## Selected Fonts

1. **IRANSans**
   - Primary font for the application
   - Excellent readability in different sizes
   - Good support for Persian numbers and symbols
   - Available in multiple weights (Light, Regular, Medium, Bold)

2. **Vazir**
   - Alternative font as fallback
   - Open-source with good community support
   - Clear rendering on various screen sizes

3. **Tahoma**
   - System fallback for environments where custom fonts fail to load
   - Generally available on most operating systems
   - Acceptable Persian text rendering

## Implementation Approach
- Load fonts locally (not from CDN) to ensure availability in offline mode
- Use font-display: swap for better performance
- Implement proper font-face declarations
- Ensure correct number localization (Persian vs Western digits)

## Font Files Location
All font files will be stored in `/public/fonts/` directory for local access.
