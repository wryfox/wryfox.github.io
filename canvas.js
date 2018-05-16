var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 50;
var minRadius = 2;

var colorArray = [
  //blues
  // '#EAF9F4',
  // '#D8F0ED',
  // '#C6E7E6',
  // '#B4DEDF',
  // '#A2D5D8',
  // '#90CCD1',
  '#7EC3CA',
  '#6CBAC3',
  '#5AB1BC',
  '#3A8691',
  // '#03899C',
  '#2793A2',
  '#026A79',
  '#48A8B5',
  //reds
  '#FF6E63',
  '#FFAAA3',
  '#FF7D73',
  '#FF4739',

];

window.addEventListener('DOMContentLoaded', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

 
window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
 
})


window.addEventListener('touchmove',
  function(event) {
    for (var i=0; i < ev.targetTouches.length; i++) {
      process_target(ev.targetTouches[i].target);
    }
  }, false);


function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
    }
    this.y += this.dy;
    this.x += this.dx;

    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50
    ) {
        if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }


    this.draw();
  }
}

var circleArray = [];

function init(){

  circleArray = [];

  for (var i = 0; i < 800; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dy = (Math.random() - 0.5);
    var dx = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
};


animate();