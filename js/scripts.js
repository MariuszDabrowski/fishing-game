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
      console.log('collision'); 
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
    this.direction = 'up';
  }

  updateFishPosition() {
    if (this.direction === 'down') {
      this.y += 0.1;
      if (this.y >= 0) this.direction = 'up';
    } else {
      this.y -= 0.1;
      if (this.y - this.fish.clientHeight < gameBody.clientHeight * -1) this.direction = 'down';
    }
    
    this.fish.style.transform = `translateY(${this.y}px)`;
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
    if (this.progress > 0) this.progress -= 0.5;
  }

  fill() {
    if (this.progress < 100) this.progress += 0.5;
  }

  updateUi() {
    if (mouseDown) {
      this.fill();
    } else {
      this.drain();
    }

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