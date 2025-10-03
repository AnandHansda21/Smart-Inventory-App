import { useEffect } from 'react';

export function ViewportMeta() {
  useEffect(() => {
    // Dynamic viewport meta tag for better scaling on high-DPI devices
    const setViewportMeta = () => {
      let viewport = document.querySelector('meta[name="viewport"]');
      
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      
      // Detect device characteristics
      const devicePixelRatio = window.devicePixelRatio || 1;
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      
      // Calculate optimal initial scale based on device characteristics
      let initialScale = 1.0;
      
      // High-DPI devices with large logical resolution need larger initial scale
      if (devicePixelRatio >= 3 && screenWidth >= 1080) {
        initialScale = 1.2;
      } else if (devicePixelRatio >= 2.5 && screenWidth >= 800) {
        initialScale = 1.1;
      } else if (devicePixelRatio >= 2 && screenWidth <= 414) {
        initialScale = 1.0;
      }
      
      // Set viewport content with calculated scale
      viewport.setAttribute(
        'content',
        `width=device-width, initial-scale=${initialScale}, maximum-scale=3.0, user-scalable=yes`
      );
    };
    
    setViewportMeta();
    
    // Re-run on orientation change
    window.addEventListener('orientationchange', setViewportMeta);
    window.addEventListener('resize', setViewportMeta);
    
    return () => {
      window.removeEventListener('orientationchange', setViewportMeta);
      window.removeEventListener('resize', setViewportMeta);
    };
  }, []);
  
  return null;
}