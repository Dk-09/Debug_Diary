import { createNoise3D } from 'simplex-noise';


export default function initSwirl({isDark}) {
  // Create canvas container and append to body
  const container = document.createElement("div");
  container.className = "content--canvas";
  document.body.appendChild(container);

  const canvas = {
    a: document.createElement("canvas"),
    b: document.createElement("canvas"),
  };

  canvas.b.style.position = "fixed";
  canvas.b.style.top = "0";
  canvas.b.style.left = "0";
  canvas.b.style.width = "100%";
  canvas.b.style.height = "100%";
  canvas.b.style.zIndex = "-1";
  canvas.b.style.pointerEvents = "none";

  container.appendChild(canvas.b);

  const ctx = {
    a: canvas.a.getContext("2d"),
    b: canvas.b.getContext("2d"),
  };

  const particleCount = 700;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = 0.1;
  const rangeSpeed = 2;
  const baseRadius = 1;
  const rangeRadius = 4;
  const noiseSteps = 8;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const backgroundColor = isDark? "#000000":"#ffffff";
  const baseHue = isDark ? 220 : 300;       // blueish vs purple-pink
  const rangeHue = isDark ? 100 : 60;
  const baseLightness = isDark ? 60 : 40;   // darker but colorful on white



  let center = [];
  let tick = 0;
//   let simplex;
  let noise3D;
  let particleProps;

  const rand = (n) => Math.random() * n;
  const randRange = (n) => n - Math.random() * n * 2;
  const fadeInOut = (t, m) =>
    Math.abs(((t + m / 2) % m) - m / 2) / (m / 2);
  const TAU = Math.PI * 2;
  const lerp = (a, b, amt) => (1 - amt) * a + amt * b;

  function setup() {
    resize();
    initParticles();
    draw();
  }

  function resize() {
    const { innerWidth, innerHeight } = window;

    canvas.a.width = innerWidth;
    canvas.a.height = innerHeight;
    canvas.b.width = innerWidth;
    canvas.b.height = innerHeight;

    center[0] = 0.5 * innerWidth;
    center[1] = 0.5 * innerHeight;
  }

  function initParticles() {
    // simplex = new SimplexNoise();
    noise3D = createNoise3D();
    particleProps = new Float32Array(particlePropsLength);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  }

  function initParticle(i) {
    const x = rand(canvas.a.width);
    const y = center[1] + randRange(rangeY);
    const ttl = baseTTL + rand(rangeTTL);
    const speed = baseSpeed + rand(rangeSpeed);
    const radius = baseRadius + rand(rangeRadius);
    const hue = baseHue + rand(rangeHue);

    particleProps.set([x, y, 0, 0, 0, ttl, speed, radius, hue], i);
  }

  function drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
    ctx.a.save();
    ctx.a.lineCap = "round";
    ctx.a.lineWidth = radius;
    ctx.a.strokeStyle = `hsla(${hue}, 100%, ${baseLightness}%, ${fadeInOut(life, ttl)})`;
    ctx.a.beginPath();
    ctx.a.moveTo(x, y);
    ctx.a.lineTo(x2, y2);
    ctx.a.stroke();
    ctx.a.closePath();
    ctx.a.restore();
  }

  function checkBounds(x, y) {
    return (
      x > canvas.a.width || x < 0 || y > canvas.a.height || y < 0
    );
  }

  function updateParticle(i) {
    const i2 = i + 1,
      i3 = i + 2,
      i4 = i + 3,
      i5 = i + 4,
      i6 = i + 5,
      i7 = i + 6,
      i8 = i + 7,
      i9 = i + 8;

    let x = particleProps[i];
    let y = particleProps[i2];
    let n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
    let vx = lerp(particleProps[i3], Math.cos(n), 0.5);
    let vy = lerp(particleProps[i4], Math.sin(n), 0.5);
    let life = particleProps[i5];
    let ttl = particleProps[i6];
    let speed = particleProps[i7];
    let x2 = x + vx * speed;
    let y2 = y + vy * speed;
    let radius = particleProps[i8];
    let hue = particleProps[i9];

    drawParticle(x, y, x2, y2, life, ttl, radius, hue);

    life++;

    particleProps.set([x2, y2, vx, vy, life], i);

    if (checkBounds(x, y) || life > ttl) initParticle(i);
  }

  function drawParticles() {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i);
    }
  }

  function renderGlow() {
  ctx.b.save();
  ctx.b.filter = isDark
    ? "blur(8px) brightness(200%)"
    : "blur(6px) contrast(250%) saturate(150%)";
  ctx.b.globalAlpha = isDark ? 0.7 : 0.6;
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();

  ctx.b.save();
  ctx.b.filter = isDark
    ? "blur(4px) brightness(150%)"
    : "blur(3px) contrast(200%) saturate(130%)";
  ctx.b.globalAlpha = isDark ? 0.5 : 0.4;
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();
}


  function renderToScreen() {
  ctx.b.save();
  ctx.b.globalCompositeOperation = "source-over";
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();
}


  function draw() {
    tick++;

    ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
    ctx.b.fillStyle = backgroundColor;
    ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);

    drawParticles();
    renderGlow();
    renderToScreen();

    requestAnimationFrame(draw);
  }

  setup();
  window.addEventListener("resize", resize);
}
