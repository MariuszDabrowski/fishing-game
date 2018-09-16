(function() {
  let bubbles = {};
  let bubblesCreated = 0;
  const canvas = document.querySelector('[data-element="bubbles"]');
  canvas.width = canvas.clientWidth * 2;
  canvas.height = canvas.clientHeight * 2;
  const context = canvas.getContext('2d');

  function animationLoop() {
    clearCanvas();
    Object.keys(bubbles).forEach(bubble => bubbles[bubble].draw());

    requestAnimationFrame(animationLoop);
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  class Bubble {
    constructor() {
      this.index = Object.keys(bubbles).length;
      this.radius = Math.random() * (6 - 2) + 2;
      this.y = canvas.height + this.radius;
      this.x = canvas.width * Math.random() - this.radius;
      this.sin = (this.style > 0.5) ? 0 : 5;
      this.style = Math.random();
      this.childAdded = false;
      this.speed = 1;
      this.sway = Math.random() * (0.03 - 0.01) + 0.01;
      this.swayDistance = Math.random() * (canvas.width - canvas.width/2) + canvas.width/2;
    }

    draw() {
      context.beginPath();
      context.strokeStyle="#abe2f9";
      context.lineWidth=2;
      context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2*Math.PI);
      context.stroke();
      this.x = (Math.sin(this.sin) * this.swayDistance) + this.swayDistance - this.radius;
      this.sin += this.sway;
      this.y -= this.speed;

      if (this.y + this.radius < 0) {
        delete bubbles[this.index];
      }

      if (this.y < canvas.height * 0.6) {
        if (!this.childAdded) {
          bubbles[bubblesCreated] = new Bubble();
          bubblesCreated++;
          this.childAdded = true;
        }
      }
    }
  }

  bubbles[bubblesCreated] = new Bubble();
  bubblesCreated++;

  animationLoop()
})();