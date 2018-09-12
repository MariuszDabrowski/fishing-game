function animationLoop() {
  indicator.updatePosition();
  requestAnimationFrame(animationLoop);
}

class Indicator {
  constructor() {
    this.fishBar = document.querySelector('.game-body');
    this.indicator = document.querySelector('.indicator');
    this.y = 0;
    this.velocity = 0;
    this.acceleration = 0;
    this.topBounds = (this.fishBar.clientHeight * -1) + 48;
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
      if (keyPressed) {
        indicator.applyForce(-0.5);
      }
    }

    // Apply constant force
    indicator.applyForce(0.3);

    // Update object position
    this.indicator.style.transform = `translateY(${this.y}px)`;
  }
}

let keyPressed = false;
const indicator = new Indicator();

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

function keyDown() {
  keyPressed = true;
}

function keyUp() {
  keyPressed = false;
}

animationLoop();