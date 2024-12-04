let timerElement = document.getElementById("timer");
let timer10minElement = document.getElementById("timer-10min");
let countdown;
let countdown10min;
let timeLeft = 24; // Tiempo inicial
let timeLeft10min = 600; // 10 minutos en segundos
let isPaused = false;
let isPaused10min = false; // Estado del temporizador de 10 minutos
let isTimeUp = false;
let isTimeUp10min = false; // Estado del temporizador de 10 minutos
let bodyElement = document.getElementById("body");
let leftPoints = 0;
let rightPoints = 0;

const endSound = document.getElementById("endSound");

function startTimer(seconds) {
  resetScreen();
  clearInterval(countdown);
  resetPauseResumeButton();
  timeLeft = seconds;
  timerElement.textContent = timeLeft;
  isPaused = false;
  countdown = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = timeLeft;
    } else {
      clearInterval(countdown);
      triggerTimeUp();
    }
  }, 1000);
}

function pauseOrResumeTimer() {
  const button = document.getElementById("pause-resume-btn");
  if (isPaused) {
    isPaused = false;
    button.classList.remove("paused");
    button.textContent = "Pausa";
    countdown = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = timeLeft;
      } else {
        clearInterval(countdown);
        triggerTimeUp();
      }
    }, 1000);
  } else {
    isPaused = true;
    clearInterval(countdown);
    button.classList.add("paused");
    button.textContent = "Reanudar";
  }
}

function startTimer10min() {
  // Obtener el tiempo en minutos del input
  const inputTime = document.getElementById("input-time").value;
  
  // Si el input no está vacío y es un número válido
  if (inputTime && !isNaN(inputTime) && inputTime > 0) {
    // Convertir minutos a segundos
    timeLeft10min = inputTime * 60;
    resetScreen();
    clearInterval(countdown10min);
    resetPauseResumeButton10min();
    updateTimer10minDisplay();
    isPaused10min = false;
    countdown10min = setInterval(() => {
      if (timeLeft10min > 0) {
        timeLeft10min--;
        updateTimer10minDisplay();
      } else {
        clearInterval(countdown10min);
        triggerTimeUp10min();
      }
    }, 1000);
  } else {
    alert("Por favor ingrese un valor válido en minutos.");
  }
}

function pauseOrResumeTimer10min() {
  const button = document.getElementById("pause-resume-btn-10min");
  if (isPaused10min) {
    isPaused10min = false;
    button.classList.remove("paused", "resumed");
    button.textContent = "Pausa";
    countdown10min = setInterval(() => {
      if (timeLeft10min > 0) {
        timeLeft10min--;
        updateTimer10minDisplay();
      } else {
        clearInterval(countdown10min);
        triggerTimeUp10min();
      }
    }, 1000);
  } else {
    isPaused10min = true;
    clearInterval(countdown10min);
    button.classList.add("paused", "resumed");
    button.textContent = "Reanudar";
  }
}

function updateTimer10minDisplay() {
  const minutes = Math.floor(timeLeft10min / 60);
  const seconds = timeLeft10min % 60;
  timer10minElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function resetPauseResumeButton() {
  const button = document.getElementById("pause-resume-btn");
  button.textContent = "Pausa";
  button.classList.remove("paused");
}

function resetPauseResumeButton10min() {
  const button = document.getElementById("pause-resume-btn-10min");
  button.textContent = "Pausa";
  button.classList.remove("paused", "resumed");
}

function triggerTimeUp() {
  bodyElement.style.backgroundColor = "red";
  isTimeUp = true;
  endSound.loop = true;
  endSound.play();
}

function triggerTimeUp10min() {
  bodyElement.style.backgroundColor = "red";
  isTimeUp10min = true;
  endSound.loop = true;
  endSound.play();
}

function resetScreen() {
  if (isTimeUp) {
    bodyElement.style.backgroundColor = "#282c34";
    isTimeUp = false;
    endSound.loop = false;
    endSound.pause();
    endSound.currentTime = 0;
  }
  if (isTimeUp10min) {
    bodyElement.style.backgroundColor = "#282c34";
    isTimeUp10min = false;
    endSound.loop = false;
    endSound.pause();
    endSound.currentTime = 0;
  }
}

function changePoints(side, amount) {
  if (side === 'left') {
    leftPoints += amount;
    document.getElementById("points-value-left").textContent = leftPoints;
  } else if (side === 'right') {
    rightPoints += amount;
    document.getElementById("points-value-right").textContent = rightPoints;
  }
}

const inputright = document.getElementById('input-team-name-right');
const nameright = document.getElementById('name-right');

        // Evento que se activa al escribir en el input
inputright.addEventListener('input', function() {
            // Reflejar el valor del input en el p
  nameright.textContent = inputright.value;
});

const inputleft = document.getElementById('input-team-name-left');
const nameleft = document.getElementById('name-left');

        // Evento que se activa al escribir en el input
inputleft.addEventListener('input', function() {
            // Reflejar el valor del input en el p
  nameleft.textContent = inputleft.value;
});

async function playChicharra() {
  endSound.play();
}

function resetPage() {
  const userConfirmed = confirm("¿Estás seguro de que deseas reiniciar el tablero? Se perderán todos los cambios.");
  if (userConfirmed) {
    location.reload(); // Recarga la página si el usuario confirma
  }
}