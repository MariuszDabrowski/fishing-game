// --------------
// Animation loop
// --------------

function animationLoop() {
  indicator.updatePosition();
  indicator.detectCollision();
  progressBar.updateUi();
  fish.updateFishPosition();
  requestAnimationFrame(animationLoop);
}

// ---------
// Indicator
// ---------

class Indicator {
  constructor() {
    this.indicator = document.querySelector('.indicator');
    this.height = this.indicator.clientHeight;
    this.y = 0;
    this.velocity = 0;
    this.acceleration = 0;
    this.topBounds = (gameBody.clientHeight * -1) + 48;
    this.bottomBounds = 0;
  }

  applyForce(force) {
    this.acceleration += force;
  }

  updatePosition() {
    this.velocity += this.acceleration;
    this.y += this.velocity;
    
    //  Reset acceleration
    indicator.acceleration = 0;

    // Change direction when hitting the bottom + add friction
    if (this.y > this.bottomBounds) {
      this.y = 0;
      this.velocity *= 0.5;
      this.velocity *= -1;
    }

    // Prevent from going beyond the top
    // Don't apply button forces when beyond the top
    // console.log(indicator.y, this.topBounds);
    if (indicator.y < this.topBounds) {
      indicator.y = this.topBounds;
      indicator.velocity = 0;
    } else {
      if (mouseDown) {
        indicator.applyForce(-0.5);
      }
    }

    // Apply constant force
    indicator.applyForce(0.3);

    // Update object position
    this.indicator.style.transform = `translateY(${this.y}px)`;
  }

  detectCollision() {
    if (
      fish.y < this.y && fish.y > this.y - this.height ||
      fish.y - fish.height < this.y && fish.y - fish.height > this.y - this.height
    ) {
      progressBar.fill();
    } else {
      progressBar.drain();
    }
  }
}

// ----
// Fish
// ----

class Fish {
  constructor() {
    this.fish = document.querySelector('.fish');
    this.height = this.fish.clientHeight;
    this.y = 0;
    this.direction = null;
    this.randomPosition = null;
    this.randomCountdown = null;
    this.speed = 2;
    // this.xoff = 0;
    // this.perlinSeed = new Perlin('random seed');
  }

  updateFishPosition() {
    if (!this.randomPosition || this.randomCountdown < 0) {
      this.randomPosition = Math.ceil(Math.random() * (gameBody.clientHeight - this.height)) * -1;
      this.randomCountdown = Math.abs(this.y - this.randomPosition);
      this.speed = Math.abs(Math.random() * (3 - 1) + 1);
    };

    if (this.randomPosition < this.y) {
      this.y -= this.speed;
    } else {
      this.y += this.speed;
    }
    
    this.fish.style.transform = `translateY(${this.y}px)`;
    this.randomCountdown -= this.speed;
  }
}

// ------------
// Progress bar
// ------------

class ProgressBar {
  constructor() {
    this.wrapper = document.querySelector('.progress-bar');
    this.progressBar = this.wrapper.querySelector('.progress-gradient-wrapper');
    this.progress = 100;
  }

  drain() {
    if (this.progress > 0) this.progress -= 0.4;
    if (this.progress < 1) this.progress = 0;
  }

  fill() {
    if (this.progress < 100) this.progress += 0.3;
  }

  updateUi() {
    this.progressBar.style.height = `${this.progress}%`
  }
}

// -----------
// Application
// -----------

const gameBody = document.querySelector('.game-body');
let mouseDown = false;
const indicator = new Indicator();
const progressBar = new ProgressBar();
const fish = new Fish();

// ------------
// Mouse events
// ------------

window.addEventListener('mousedown', mouseDownFunc);
window.addEventListener('mouseup', mouseUpFunc);

function mouseDownFunc() {
  mouseDown = true;
}

function mouseUpFunc() {
  mouseDown = false;
}

// -------------
// Initiate loop
// -------------

animationLoop();