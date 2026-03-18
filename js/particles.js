const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector(".hero").offsetHeight;
}

resizeCanvas();

let particles = [];
const count = 120;

let mouse = { x: null, y: null };

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.dx = (Math.random() - 0.5);
    this.dy = (Math.random() - 0.5);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#4fc3f7";
    ctx.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 120) {
      this.x -= dx * 0.02;
      this.y -= dy * 0.02;
    }

    this.draw();
  }
}

function init(){
  particles = [];
  for(let i=0;i<count;i++){
    particles.push(new Particle());
  }
}

function connect(){
  for(let a=0;a<particles.length;a++){
    for(let b=a;b<particles.length;b++){
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let dist = dx*dx + dy*dy;

      if(dist < 8000){
        ctx.strokeStyle="rgba(79,195,247,0.1)";
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => p.update());
  connect();
}

init();
animate();

window.addEventListener("resize", ()=>{
  resizeCanvas();
  init();
});