let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;

const timeDisplay = document.getElementById('time-display');
const lapsList = document.getElementById('laps-list');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');

// Function to format the time display (HH:MM:SS.mmm)
function formatTime(time) {
    let date = new Date(time);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Function to start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        let startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            timeDisplay.textContent = formatTime(elapsedTime);
        }, 10);
        isRunning = true;
        startButton.textContent = 'Resume';
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

// Function to pause the stopwatch
function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    timeDisplay.textContent = '00:00.000';
    lapsList.innerHTML = '';
    lapCount = 0;
    startButton.textContent = 'Start';
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
}

// Function to record lap times
function recordLap() {
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

// Event listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
