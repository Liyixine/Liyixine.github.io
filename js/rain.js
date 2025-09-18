// rain.js for Hexo Butterfly

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements & Basic Setup ---
  const rainCanvas = document.getElementById('rain-container');
  if (!rainCanvas) return; // 如果找不到画布，就什么都不做
  const rainCtx = rainCanvas.getContext('2d');
  rainCanvas.width = window.innerWidth;
  rainCanvas.height = window.innerHeight;

  // --- Weather Settings ---
  // 你可以在这里调整雨的大小和密度
  const weatherSettings = {
    'light-rain': { rainCount: 60, speedRange: [4, 6] },
    'heavy-rain': { rainCount: 250, speedRange: [8, 12] }
  };

  let raindrops = [];
  
  // --- Raindrop Class (Unchanged from your code) ---
  class Raindrop {
    constructor(settings) {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * -window.innerHeight; // 从屏幕外开始
      this.length = 15 + Math.random() * 10;
      this.speed = settings.speedRange[0] + Math.random() * (settings.speedRange[1] - settings.speedRange[0]);
      this.color = `rgba(216, 180, 182, ${0.3 + Math.random() * 0.3})`;
    }
    
    draw() {
      rainCtx.strokeStyle = this.color;
      rainCtx.lineWidth = 1;
      rainCtx.beginPath();
      rainCtx.moveTo(this.x, this.y);
      rainCtx.lineTo(this.x, this.y + this.length);
      rainCtx.stroke();
    }
    
    animate() {
      this.y += this.speed;
      if (this.y > window.innerHeight) {
        this.y = -this.length;
        this.x = Math.random() * window.innerWidth;
      }
      this.draw();
    }
  }

  // --- Core Functions ---
  function setWeather(weatherType) {
    const settings = weatherSettings[weatherType];
    raindrops = [];
    for (let i = 0; i < settings.rainCount; i++) {
      raindrops.push(new Raindrop(settings));
    }
  }

  function animateRain() {
    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    raindrops.forEach(drop => drop.animate());
    requestAnimationFrame(animateRain);
  }

  // --- Event Listeners ---
  window.addEventListener('resize', () => {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
  });

  // --- Initialization ---
  // 在这里选择默认的天气效果。可以是 'light-rain' 或 'heavy-rain'
  setWeather('light-rain'); 
  animateRain();
});