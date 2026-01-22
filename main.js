import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initParallax();
    createStars();
    initParallax();
    startCountdown();
    initModal();
});

function initModal() {
    const modal = document.getElementById('gift-modal');
    const btn = document.querySelector('.cta-button');
    const span = document.querySelector('.close-modal');

    btn.onclick = function () {
        modal.classList.remove('hidden');
    }

    span.onclick = function () {
        modal.classList.add('hidden');
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.add('hidden');
        }
    }
}

function startCountdown() {
    // Astronomical calculation for Ramadan 1447 AH: Feb 18, 2026
    const ramadanDate = new Date('February 18, 2026 00:00:00').getTime();

    function update() {
        const now = new Date().getTime();
        const distance = ramadanDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "<h2>رمضان كريم!</h2>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    update(); // Run immediately to avoid 00 flash
    setInterval(update, 1000);
}

function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 80; // Only top 80%

        // Random size
        const size = Math.random() * 2 + 1;

        // Random duration
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        starsContainer.appendChild(star);
    }
}

function initParallax() {
    const hero = document.querySelector('.hero');
    const bg = document.querySelector('.background-container');
    const content = document.querySelector('.content');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Move content slightly opposite to mouse
        const offsetX = (mouseX - 0.5) * 20;
        const offsetY = (mouseY - 0.5) * 20;

        content.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

        // Move background slightly same direction (depth)
        // Note: bg has zoom animation, so we add transform via margin or background-position if possible, 
        // but transforming the container is easier.
        // However, bg already has a transform animation. Let's apply to a specific layer or just keep it simple.
    });
}
