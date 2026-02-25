// --- Configuration ---
const COLORS = {
    particle: '#E6C768'
};

const AFFIRMATIONS = [
    "Abundance flows to me effortlessly.",
    "I am a magnet for success and prosperity.",
    "Today is full of golden opportunities.",
    "I am grateful for the wealth in my life.",
    "My potential is limitless.",
    "I attract good things with my calm energy.",
    "Wealth is a mindset I choose every day.",
    "I am worthy of my wildest dreams.",
    "Every step I take leads me to greatness.",
    "The universe provides for me in unexpected ways."
];

// --- State ---
const state = {
    wins: []
};

// --- DOM Elements ---
const dom = {
    canvas: document.getElementById('particles'),
    affirmation: document.getElementById('affirmation'),
    searchInput: document.getElementById('searchInput'),
    winList: document.getElementById('winList'),
    winInput: document.getElementById('winInput'),
    addWinBtn: document.getElementById('addWinBtn'),
    dateDisplay: document.getElementById('dateDisplay')
};

// --- Canvas & Particles (Only Particles, Waves are CSS now) ---
const ctx = dom.canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dom.canvas.width = width;
    dom.canvas.height = height;
    initParticles();
}

class Particle {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
        this.vy = -0.2 - Math.random() * 0.3; // Slow float up
        this.size = Math.random() * 2 + 0.5;
        this.alpha = 0;
        this.targetAlpha = Math.random() * 0.6 + 0.2;
        this.life = 0;
        this.maxLife = 500 + Math.random() * 400;
        this.fadeSpeed = 0.005;
    }

    update() {
        this.y += this.vy;
        this.x += Math.sin(this.life * 0.01) * 0.2;
        this.life++;

        if (this.life < 100) {
            if (this.alpha < this.targetAlpha) this.alpha += this.fadeSpeed;
        } else if (this.life > this.maxLife - 100) {
            this.alpha -= this.fadeSpeed;
        }

        if (this.life > this.maxLife || this.alpha < 0) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = COLORS.particle;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = (width * height) / 30000; // Reduced density for performance
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function loop() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(loop);
}

// --- Features ---

// --- Features ---

async function setDailyAffirmation() {
    let text = "";
    let source = "";

    // fallback list (Wealth & Success focused)
    // fallback list (Wealth, Health & Abundance 2024/2025)
    const FALLBACK_AFFIRMATIONS = [
        // Wealth & Abundance
        "I am worthy of having everything I desire.",
        "I welcome impeccable financial wellness.",
        "My life is rich in opportunities.",
        "I am living in my most financially successful season yet.",
        "I receive abundantly and so I give abundantly.",
        "I am a thriving and highly wealthy person.",
        "I always attract success and money in all areas of my working life.",
        "I am in the habit of effortlessly attracting money every day.",
        "I am grateful to be surrounded by abundance.",
        "All of my dreams manifest in perfect timing.",
        "I am financially successful and independent.",
        "Money loves me and flows to me easily.",
        "I am a vibrational match for wealth.",
        "There is so much abundance in my life.",
        "I attract opportunities for wealth creation.",
        "Money flows to me easily and effortlessly.",
        "My income is constantly increasing.",
        "I am financially free.",
        "I have an infinite supply of everything I need.",
        "Abundance is my natural state of being.",
        "I release all fears and embrace abundance.",
        "The universe is always working in my favor.",
        "I attract unlimited wealth and prosperity every day.",
        "I make wise financial choices that create lasting riches.",
        "My life is filled with peace, joy, and abundance.",
        "I embrace a life of boundless resources and wealth.",
        "Wealth and abundance flow to me.",
        "Money comes to me in expected and unexpected ways.",
        "I am the master of my wealth.",
        "I am building a strong financial future.",
        "Every decision I make brings me closer to abundance.",
        "I am a financial genius, and I am constantly finding new ways to prosper.",

        // Health & Vitality
        "I am strong, healthy, and full of energy.",
        "My body is a reflection of my commitment to health.",
        "I nourish my body with healthy food and positive thoughts.",
        "Every day, I become stronger and more resilient.",
        "I am in control of my health and my vitality.",
        "I am grateful for my body and all it does for me.",
        "I prioritize self-care and make time for my well-being.",
        "Every cell in my body is healthy and thriving.",
        "I trust my body to heal and grow stronger every day.",
        "My immune system is powerful and effective.",
        "My mind and body are in perfect harmony.",
        "I am in perfect health, and my body radiates vitality and energy.",
        "My body is my temple, and I treat it with love and care.",
        "I am worthy of love and respect just as I am.",
        "I honor my body with nourishing, wholesome foods.",
        "My mind is calm, clear, and focused.",
        "I radiate vitality and wellness."
    ];

    // try {
    //     // Try fetching from Quotable API (Success/Business tags)
    //     // const response = await fetch('https://api.quotable.io/random?tags=success,business');
    //     // if (response.ok) {
    //     //     const data = await response.json();
    //     //     text = data.content;
    //     //     source = data.author;
    //     // } else {
    //     //     // Try secondary source (DummyJSON)
    //     //     const response2 = await fetch('https://dummyjson.com/quotes/random');
    //     //     if (response2.ok) {
    //     //         const data2 = await response2.json();
    //     //         text = data2.quote;
    //     //         source = data2.author;
    //     //     } else {
    //     //         throw new Error("APIs failed");
    //     //     }
    //     // }
    // } catch (e) {
    //     // Fallback to local list
    // }

    // Always use local list for now to ensure fresh specific content
    const index = Math.floor(Math.random() * FALLBACK_AFFIRMATIONS.length);
    text = FALLBACK_AFFIRMATIONS[index];

    // Set text
    dom.affirmation.innerHTML = `"${text}"`;
    if (source) {
        // Optional: Add author if you want, or keep it minimal
        // dom.affirmation.innerHTML += `<div style="font-size: 0.6em; margin-top: 10px; color: var(--gold-2); opacity: 0.8;">- ${source}</div>`;
    }

    // Trigger fade in
    setTimeout(() => {
        dom.affirmation.classList.add('show');
    }, 100);
}

function setDate() {
    const now = new Date();
    const options = { month: 'short', day: 'numeric' };
    dom.dateDisplay.textContent = now.toLocaleDateString('en-US', options);
}

function handleSearch(e) {
    if (e.key === 'Enter') {
        const query = dom.searchInput.value.trim();
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
}

// Wins Logic
function loadWins() {
    const saved = localStorage.getItem('todayWins');
    if (saved) {
        state.wins = JSON.parse(saved);
        renderWins();
    }
}

function saveWins() {
    localStorage.setItem('todayWins', JSON.stringify(state.wins));
}

function renderWins() {
    dom.winList.innerHTML = '';
    state.wins.forEach((win, index) => {
        const li = document.createElement('li');
        li.className = 'win';
        li.innerHTML = `
            <span class="winText">✨ ${win}</span>
            <button class="del" data-index="${index}">×</button>
        `;
        dom.winList.appendChild(li);
    });

    document.querySelectorAll('.del').forEach(el => {
        el.addEventListener('click', (e) => {
            const idx = parseInt(e.target.dataset.index);
            state.wins.splice(idx, 1);
            saveWins();
            renderWins();
        });
    });
}

function addWin() {
    const text = dom.winInput.value.trim();
    if (text) {
        state.wins.push(text);
        saveWins();
        renderWins();
        dom.winInput.value = '';
        dom.winInput.focus();
    }
}

function handleWinKey(e) {
    if (e.key === 'Enter') {
        addWin();
    }
}

// --- Initialization ---
window.addEventListener('resize', resize);
window.addEventListener('load', () => {
    resize();
    loop();

    setDailyAffirmation();
    setDate();
    loadWins();

    dom.searchInput.addEventListener('keydown', handleSearch);
    dom.winInput.addEventListener('keydown', handleWinKey);
    dom.addWinBtn.addEventListener('click', addWin);
});

// --- Sound Logic ---
function playLaunchSoundOnce() {
    // Note: User uploaded file appears to be 'ocean.mp3.mp3'
    const ocean = new Audio("sounds/ocean.mp3.mp3");
    const gate = new Audio("sounds/gate.mp3");

    ocean.volume = 0.25;
    gate.volume = 0.22;

    // Play ocean first, then gate shortly after
    ocean.play().catch(() => { });
    setTimeout(() => {
        gate.play().catch(() => { });
    }, 350);
}

function setupSound() {
    // Only once per new tab open
    let played = false;

    const trigger = () => {
        if (played) return;
        played = true;
        playLaunchSoundOnce();
        window.removeEventListener("pointerdown", trigger);
        window.removeEventListener("keydown", trigger);
    };

    // user gesture triggers sound (works reliably)
    window.addEventListener("pointerdown", trigger, {
        once: true
    });
    window.addEventListener("keydown", trigger, {
        once: true
    });
}

// --- SVG Liquid Animation (DISABLED FOR PERFORMANCE) ---
// function animateLiquid() {
//     const turbulence = document.querySelector('#liquid-warp feTurbulence');
//     if (!turbulence) return;

//     let frames = 0;

//     function render() {
//         frames++;
//         // Increased speed and amplitude for more visible "flow"
//         const freqX = 0.005 + Math.sin(frames * 0.003) * 0.003;
//         const freqY = 0.01 + Math.cos(frames * 0.004) * 0.003;

//         turbulence.setAttribute('baseFrequency', `${freqX} ${freqY}`);

//         requestAnimationFrame(render);
//     }

//     render();
// }

// call it on load
document.addEventListener("DOMContentLoaded", () => {
    setupSound();
    // animateLiquid(); // Disabled to prevent freezing on weak laptops
});
