// Create a canvas element to draw the laser effect
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// Get the 2D drawing context
const ctx = canvas.getContext('2d');

// Set the background color to black
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Define the laser properties
const lasers = [];
for (let i = 0; i < 100; i++) {
  lasers.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: Math.random() * 5 + 1,
    direction: Math.random() * Math.PI * 2,
    length: Math.random() * 200 + 50,
    color: '#0f0' // Green color
  });
}

// Draw the lasers
function drawLasers() {
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    ctx.beginPath();
    ctx.moveTo(laser.x, laser.y);
    ctx.lineTo(laser.x + Math.cos(laser.direction) * laser.length, laser.y + Math.sin(laser.direction) * laser.length);
    ctx.strokeStyle = laser.color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// Update the laser positions
function updateLasers() {
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.x += Math.cos(laser.direction) * laser.speed;
    laser.y += Math.sin(laser.direction) * laser.speed;

    // Bounce off the edges
    if (laser.x < 0 || laser.x > canvas.width) {
      laser.direction = Math.PI - laser.direction;
    }
    if (laser.y < 0 || laser.y > canvas.height) {
      laser.direction = -laser.direction;
    }
  }
}

// Main loop
function loop() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawLasers();
  updateLasers();
  requestAnimationFrame(loop);
}

// Start the loop
loop();