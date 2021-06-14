

const $seconds = document.querySelectorAll('.seconds');
const $minutes = document.querySelectorAll('.minutes');
const $minutesFlipper = document.querySelector('.minutes-box .flipper-container');
const $hours = document.querySelectorAll('.hours');
const $hoursFlipper = document.querySelector('.hours-box .flipper-container');

const $days = document.querySelectorAll('.days');
const $daysFlipper = document.querySelector('.days-box .flipper-container');

  let totalseconds = 14 * 24 * 60 * 60;
  let secondsLeft = totalseconds;
  let days = 14;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

function removeAnimation(evt) {
  evt.target.classList.remove('flip-down');
}

document.body.addEventListener('animationend', removeAnimation);  
//$minutesFlipper.addEventListener('animationend', removeAnimation);  

function updateTime() {
  // Time calculations for days, hours, minutes and seconds
    days = Math.floor(secondsLeft / (60 * 60 * 24));
    hours = Math.floor((secondsLeft % (60 * 60 * 24)) / (60 * 60));
    minutes = Math.floor((secondsLeft % (60 * 60)) / (60));
    seconds = Math.floor(secondsLeft % 60);  
}

function minuteLookAhead() {
  return Math.floor(((secondsLeft - 1) % (60 * 60)) / (60));
}

function hourLookAhead() {
  return Math.floor(((secondsLeft - 1) % (60 * 60 * 24)) / (60 * 60));
}

function dayLookAhead() {
  return Math.floor((secondsLeft - 1) / (60 * 60 * 24));
}

function animationCheck($el, timesegment, lookVal) {
  if (timesegment !== lookVal && secondsLeft > 0) {
    
    void $el.offsetWidth;
    $el.classList.add('flip-down');  
  }
}

function updateText($els, text, segment) {
  const [firstDigit, secondDigit] =  text;

  for (let i = 0; i < $els.length; i++) {
      const $first = $els[i].querySelector('.first-digit');
      const $second = $els[i].querySelector('.second-digit');  

      if ($first.innerHTML !== firstDigit) {
        $first.innerHTML = firstDigit;

        const x = $first.getAttribute('x');
        if (firstDigit === '1') $first.setAttribute('x', '25');
        else if (x !== '20') $first.setAttribute('x', '20');

      }
      if ($second.innerHTML !== secondDigit) {
        $second.innerHTML = secondDigit;

        const x = $second.getAttribute('x');
        
        if (secondDigit === '1') $second.setAttribute('x', '80');
        else if (x !== '75') $second.setAttribute('x', '75');        
      }

      if (text[0] === '1') {
        console.log('its a one!')
      }
    }
}

function formatTime(text) {
  return text.length === 1 ? `0${text}` : text;
}

updateTime();
animationCheck($minutesFlipper, minutes, minuteLookAhead());
animationCheck($hoursFlipper, hours, hourLookAhead());
animationCheck($daysFlipper, days, dayLookAhead());
updateText($seconds, formatTime(seconds.toString()));
updateText($minutes, formatTime(minutes.toString()));
updateText($hours, formatTime(hours.toString()));
updateText($days, formatTime(days.toString()));

const countdownInterval = setInterval(function() {
  secondsLeft -= 1;  
  updateTime();
  updateText($seconds, formatTime(seconds.toString()));
  updateText($minutes, formatTime(minutes.toString()));
  updateText($hours, formatTime(hours.toString()));
  updateText($days, formatTime(days.toString()));
  animationCheck($minutesFlipper, minutes, minuteLookAhead());
  animationCheck($hoursFlipper, hours, hourLookAhead());
  animationCheck($daysFlipper, days, dayLookAhead());  
  if (secondsLeft === 0) {
    clearInterval(countdownInterval);
    const $secondsFlipper = document.querySelector('.seconds-box .flipper-container');

    setTimeout(() => {
      $secondsFlipper.classList.remove('flip-down');    
    }, 500);

  }
}, 1000);

    