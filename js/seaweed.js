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
    constructor(segments, spread, xoff) {
      this.segments = segments;
      this.segmentSpread = spread;
      this.x = 0;
      this.xoff = xoff;
      this.y = 0;
      this.radius = 1;
      this.sin = Math.random() * 10;
    }

    draw() {
      context.beginPath();
      context.strokeStyle="#143e5a";
      context.fillStyle="#143e5a";
      context.lineWidth=2;
      for (let i = this.segments; i >= 0; i--) {
        context.arc(
          Math.sin(this.sin + i) * i/2.5 + this.xoff + 0.5,
          canvas.height + (-i * this.segmentSpread),
          0.2 * Math.abs(i - this.segments),
          0,
          2*Math.PI
        );
        if (i === this.segments) {
          context.moveTo(
            Math.sin(this.sin + i) * i/2.5 + this.xoff,
            canvas.height + (-i * this.segmentSpread),
          );
        } else {
          context.lineTo(
            Math.sin(this.sin + i) * i/2.5 + this.xoff,
            canvas.height + (-i * this.segmentSpread),
          );
        }
        // context.arc(Math.sin(this.sin + i) * 10 + 30, this.y + (this.segmentSpread * i), this.radius, 0, 2*Math.PI); 
      }
      context.stroke();

      this.sin += 0.05;
    }
  }

  seaweed.push(new Seaweed(6, 8, 25));
  seaweed.push(new Seaweed(8, 10, 35));
  seaweed.push(new Seaweed(4, 8, 45));

  animationLoop()
})();