// --------- CONTADOR ---------
const targetDate = new Date("Nov 1, 2025 00:00:00").getTime();
const countdown = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    countdown.innerHTML = "¡Ya estamos en línea!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);


// --------- FONDO INTERACTIVO ---------
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const icons = ["❤️","🍪","🌸","⭐","🐾","🍫","🌈"];
let particles = [];

class Particle {
  constructor(x, y, size, text) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.text = text;
    this.angle = 0;
    this.rotationSpeed = 0;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.font = `${this.size}px Poppins`;
    ctx.fillText(this.text, 0, 0);
    ctx.restore();
  }

  update(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 120) {
      this.rotationSpeed = 0.05;
    } else {
      this.rotationSpeed = 0.005;
    }

    this.angle += this.rotationSpeed;
  }
}

// Inicializar partículas
function init() {
  particles = [];
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 20 + Math.random() * 20;
    const text = icons[Math.floor(Math.random() * icons.length)];
    particles.push(new Particle(x, y, size, text));
  }
}
init();

// Animación
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update(mouseX, mouseY);
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
