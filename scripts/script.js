// type writter

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  var currentClass = 'color-' + i;
  this.el.innerHTML = '<span class="wrap ' + currentClass + '">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff }" +
                  ".color-0 { color: #7cf32c; }" +  // Chartreuse
                  ".color-1 { color: #01fe01; }" +  // Mindaro
                  ".color-2 { color: #7cf32c; }" +  // Tiber
                  ".color-3 { color: #01fe01; }" +
                  ".color-4 { color: #7cf32c; }";
  document.body.appendChild(css);
};


// type writter


//for animation
const observer=new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
  console.log(entry)
  if(entry.isIntersecting){
    entry.target.classList.add('show');
  }
  else{
    entry.target.classList.remove('show');
  }
})
});

const hiddenElements= document.querySelectorAll('.skills-section');

hiddenElements.forEach((el) => observer.observe(el))