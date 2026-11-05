
// ========================================
// CONTADOR
// ========================================

//5 de noviembre de 2026 a las 4:30 PM:
const fechaInicial = new Date("2026-11-05T16:30:00-04:00");
//AAAA-MM-DDTHH:MM:SS-ZONA_HORARIA

function actualizarContador() {

    const ahora = new Date();
    const diferencia = ahora - fechaInicial;

    if (diferencia < 0) return;

    const total = Math.floor(diferencia / 1000);

    const dias = Math.floor(total / 86400);
    const horas = Math.floor((total % 86400) / 3600);
    const minutos = Math.floor((total % 3600) / 60);
    const segundos = total % 60;

    document.getElementById("days").textContent =
        String(dias).padStart(3, "0");

    document.getElementById("hours").textContent =
        String(horas).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(segundos).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);


// ========================================
// UNIVERSO INTERACTIVO
// ========================================

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let width;
let height;

let stars = [];
let particles = [];
let shootingStars = [];

const mouse = {
    x: -1000,
    y: -1000,
    active: false
};


// ========================================
// AJUSTAR CANVAS
// ========================================

function resizeCanvas() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createStars();
}


// ========================================
// CREAR ESTRELLAS
// ========================================

function createStars() {

    stars = [];

    const cantidad = Math.min(
        Math.floor((width * height) / 900),
        1500
    );

    for (let i = 0; i < cantidad; i++) {

        stars.push({

            x: Math.random() * width,
            y: Math.random() * height,

            radius: Math.random() * 2 + 0.5,

            speed: Math.random() * 0.35 + 0.05,

            opacity: Math.random() * 0.8 + 0.2,

            twinkle: Math.random() * 0.03 + 0.005,

            phase: Math.random() * Math.PI * 2,

            depth: Math.random() * 0.8 + 0.2

        });

    }
}


// ========================================
// MOVIMIENTO DEL MOUSE
// ========================================

window.addEventListener("pointermove", (event) => {

    mouse.x = event.clientX;
    mouse.y = event.clientY;

    mouse.active = true;

});

window.addEventListener("pointerleave", () => {

    mouse.active = false;

});


// ========================================
// EXPLOSIÓN DE PARTÍCULAS
// ========================================

function createExplosion(x, y) {

    const cantidad = 35;

    for (let i = 0; i < cantidad; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;

        particles.push({

            x: x,
            y: y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            life: 1,

            size: Math.random() * 2 + 1

        });

    }

}

window.addEventListener("pointerdown", (event) => {

    createExplosion(event.clientX, event.clientY);

});


// ========================================
// ESTRELLAS FUGACES
// ========================================

function createShootingStar() {

    shootingStars.push({

        x: Math.random() * width,
        y: Math.random() * height * 0.5,

        length: Math.random() * 100 + 60,

        speed: Math.random() * 8 + 6,

        opacity: 1

    });

}


// ========================================
// DIBUJAR ESTRELLAS
// ========================================

function drawStars(time) {

    stars.forEach(star => {

        // Parpadeo natural

        const twinkle =
            Math.sin(time * star.twinkle + star.phase);

        const opacity =
            star.opacity * (0.65 + twinkle * 0.35);

        let offsetX = 0;
        let offsetY = 0;

        // Interacción con el cursor

        if (mouse.active) {

            const dx = mouse.x - star.x;
            const dy = mouse.y - star.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            const radius = 130;

            if (distance < radius && distance > 0) {

                const force = (1 - distance / radius) * 15;

                offsetX = -(dx / distance) * force;
                offsetY = -(dy / distance) * force;

            }

        }

        // Movimiento vertical

        star.y -= star.speed;

        if (star.y < 0) {

            star.y = height;
            star.x = Math.random() * width;

        }

        // Dibujar estrella

        ctx.beginPath();

        ctx.arc(
            star.x + offsetX,
            star.y + offsetY,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(210, 225, 255, ${opacity})`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#8caaff";

        ctx.fill();

        ctx.shadowBlur = 0;

    });

}


// ========================================
// CONSTELACIONES INTERACTIVAS
// ========================================

function drawConstellations() {

    if (!mouse.active) return;

    const radius = 150;

    const nearbyStars = stars.filter(star => {

        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;

        return Math.sqrt(dx * dx + dy * dy) < radius;

    });

    ctx.lineWidth = 0.7;

    nearbyStars.forEach(star => {

        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const opacity = 1 - distance / radius;

        ctx.beginPath();

        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(star.x, star.y);

        ctx.strokeStyle =
            `rgba(130, 160, 255, ${opacity * 0.4})`;

        ctx.stroke();

    });

}


// ========================================
// DIBUJAR EXPLOSIONES
// ========================================

function drawParticles() {

    particles.forEach((particle, index) => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vx *= 0.98;
        particle.vy *= 0.98;

        particle.life -= 0.015;

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(170, 195, 255, ${Math.max(0, particle.life)})`;

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#8caaff";

        ctx.fill();

        ctx.shadowBlur = 0;

        if (particle.life <= 0) {

            particles.splice(index, 1);

        }

    });

}


// ========================================
// DIBUJAR ESTRELLAS FUGACES
// ========================================

function drawShootingStars() {

    shootingStars.forEach((star, index) => {

        star.x += star.speed;
        star.y += star.speed * 0.45;

        star.opacity -= 0.008;

        const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            star.x - star.length,
            star.y - star.length * 0.45
        );

        gradient.addColorStop(
            0,
            `rgba(255,255,255,${Math.max(0, star.opacity)})`
        );

        gradient.addColorStop(
            1,
            "rgba(130,160,255,0)"
        );

        ctx.beginPath();

        ctx.moveTo(star.x, star.y);

        ctx.lineTo(
            star.x - star.length,
            star.y - star.length * 0.45
        );

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;

        ctx.stroke();

        if (star.opacity <= 0) {

            shootingStars.splice(index, 1);

        }

    });

}


// ========================================
// ANIMACIÓN PRINCIPAL
// ========================================

function animate(time) {

    ctx.clearRect(0, 0, width, height);

    drawStars(time);

    drawConstellations();

    drawParticles();

    drawShootingStars();

    requestAnimationFrame(animate);

}


// ========================================
// GENERAR ESTRELLAS FUGACES
// ========================================

setInterval(() => {

    if (Math.random() > 0.35) {

        createShootingStar();

    }

}, 2500);


// ========================================
// INICIAR UNIVERSO
// ========================================

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

requestAnimationFrame(animate);
