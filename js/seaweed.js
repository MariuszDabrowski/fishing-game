(function() {
  let seaweed = [];
  const canvas = document.querySelector('[data-element="seaweed"]');
  canvas.width = canvas.clientWidth * 2;
  canvas.height = canvas.clientHeight * 2;
  const context = canvas.getContext('2d');

  function animationLoop() {
    clearCanvas();
    seaweed.forEach(seaweed => seaweed.draw());

    requestAnimationFrame(animationLoop);
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  class Seaweed {
    constructor() {
      this.segments = 4;
      this.segmentSpread = 20;
      this.x = canvas.width/2;
      this.y = canvas.height/2 - 50;
      this.radius = 1;
      this.sin = 0;
    }

    draw() {
      for (let i = 1; i <= this.segments; i++) {
        context.beginPath();
        context.strokeStyle="red";
        context.lineWidth=2;
        context.arc(Math.sin(this.sin + i) * 10 + 30, this.y + (this.segmentSpread * i), this.radius, 0, 2*Math.PI);
        context.stroke();
      }

      this.sin += 0.1;
    }
  }

  seaweed.push(new Seaweed());

  animationLoop()
})();