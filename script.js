document.addEventListener('DOMContentLoaded', function () {
    const colorWheel = document.getElementById('color-wheel');
    const pointer = document.getElementById('pointer');
    const hueInput = document.getElementById('hue');
    const saturationInput = document.getElementById('saturation');
    const lightnessInput = document.getElementById('lightness');
    const hexInput = document.getElementById('hex');
  
    let isDragging = false;
  
    function updateColor() {
      const rect = colorWheel.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
  
      const deltaX = pointer.offsetLeft - centerX;
      const deltaY = pointer.offsetTop - centerY;
  
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), centerX);
  
      const hue = ((angle * (180 / Math.PI)) + 180) % 360;
      const saturation = saturationInput.value;
      const lightness = lightnessInput.value;
  
      pointer.style.left = `${centerX + distance * Math.cos(angle)}px`;
      pointer.style.top = `${centerY + distance * Math.sin(angle)}px`;
  
      colorWheel.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      hexInput.value = hslToHex(hue, saturation, lightness);
    }
  
    function hslToHex(h, s, l) {
      h /= 360;
      s /= 100;
      l /= 100;
  
      let r, g, b;
  
      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
  
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
  
      const toHex = (x) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
  
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
  
    function handleDragStart(e) {
      isDragging = true;
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
    }
  
    function handleDragMove(e) {
      if (isDragging) {
        const rect = colorWheel.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
  
        const x = e.clientX - rect.left - centerX;
        const y = e.clientY - rect.top - centerY;
  
        const angle = Math.atan2(y, x);
        const distance = Math.min(Math.sqrt(x ** 2 + y ** 2), centerX);
  
        const posX = centerX + distance * Math.cos(angle);
        const posY = centerY + distance * Math.sin(angle);
  
        pointer.style.left = `${posX}px`;
        pointer.style.top = `${posY}px`;
  
        updateColor();
      }
    }
  
    function handleDragEnd() {
      isDragging = false;
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    }
  
    // Set initial position at the center
    pointer.style.left = `${colorWheel.offsetWidth / 2}px`;
    pointer.style.top = `${colorWheel.offsetHeight / 2}px`;
  
    // Initialize color values at the center
    hueInput.value = 180;
    saturationInput.value = 50;
    lightnessInput.value = 50;
    hexInput.value = hslToHex(180, 50, 50);
    colorWheel.style.backgroundColor = hexInput.value;
  
    pointer.addEventListener('mousedown', handleDragStart);
  
    // Event listeners for range inputs
    hueInput.addEventListener('input', updateColor);
    saturationInput.addEventListener('input', updateColor);
    lightnessInput.addEventListener('input', updateColor);
    hexInput.addEventListener('input', function () {
      const hexValue = hexInput.value.replace('#', '');
      const rgb = hexToRgb(hexValue);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
      hueInput.value = hsl.h;
      saturationInput.value = hsl.s;
      lightnessInput.value = hsl.l;
  
      updateColor();
    });
  
    function hexToRgb(hex) {
      const bigint = parseInt(hex, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    }
  
    function rgbToHsl(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
  
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
  
      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
  
        h /= 6;
      }
  
      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
      };
    }
  });
  