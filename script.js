// --- THEME TOGGLE LOGIC ---
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon(next);
}

function updateIcon(theme) {
    themeBtn.innerText = theme === 'dark' ? '🌙' : '☀️';
}


// --- ADVANCED MATH CANVAS ANIMATION ---
const canvas = document.getElementById('math-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Math symbols & Numbers
const symbols = ['0', '1', 'π', '∑', '∫', '∞', '≠', '≈', '√', 'λ', 'x', 'y', '{ }', '</>'];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow horizontal speed
        this.vy = (Math.random() - 0.5) * 0.5; // Slow vertical speed
        this.size = Math.floor(Math.random() * 20) + 10;
        this.text = symbols[Math.floor(Math.random() * symbols.length)];
        this.opacity = Math.random() * 0.1 + 0.02; // Very subtle
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Color depends on theme via CSS variables (computed styles)
        const isDark = html.getAttribute('data-theme') === 'dark';
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(0, 0, 0, ${this.opacity})`;
        
        ctx.font = `${this.size}px monospace`;
        ctx.fillText(this.text, -this.size/2, this.size/2);
        ctx.restore();
    }
}

function initParticles() {
    particles = [];
    const count = Math.floor(window.innerWidth / 15); // Density based on screen width
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// Events
window.addEventListener('resize', () => {
    resize();
    initParticles();
});

// Start
resize();
initParticles();
animate();
