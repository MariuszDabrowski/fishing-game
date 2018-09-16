(function() {
  let line = null;
  const canvas = document.querySelector('[data-element="reel-line-tension"]');
  canvas.width = canvas.clientWidth * 2;
  canvas.height = canvas.clientHeight * 2;
  const context = canvas.getContext('2d');

  function animationLoop() {
    clearCanvas();
    line.draw();
    line.animate();

    requestAnimationFrame(animationLoop);
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  class Line {
    constructor() {
      this.tension = 0;
      this.tensionDirection = 'right';
    }

    draw() {
      context.beginPath();
      context.strokeStyle="#18343d";
      context.lineWidth=1.3;
      context.moveTo(canvas.width, 0);
      context.bezierCurveTo(
        canvas.width,canvas.height/2 + this.tension,
        canvas.width/2,canvas.height + this.tension,
        0,canvas.height
      );
      context.stroke();
    }

    animate() {
      if (document.body.classList.contains('collision')) {
        if (this.tension > -30) this.tension -= 8;
      } else {
        if (this.tension < 0) this.tension += 4;
      }
    }
  }

  line = new Line();
  animationLoop()
})();