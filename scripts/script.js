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




// back button
// Get the button element
const backToHomeBtn = document.getElementById('backToHomeBtn');

// Function to show or hide the button based on scroll position
function handleScroll() {
    // Show the button when the user scrolls down 200px from the top
    if (window.scrollY > 200) {
        backToHomeBtn.style.display = 'block';
    } else {
        backToHomeBtn.style.display = 'none';
    }
}

// Function to scroll back to the home section
function scrollToHome() {
    const homeSection = document.getElementById('profile-page-section');
    homeSection.scrollIntoView({ behavior: 'smooth' });
}

// Attach the scroll event to the window
window.addEventListener('scroll', handleScroll);

// Attach click event to the button
backToHomeBtn.addEventListener('click', scrollToHome);
