let pomodoroTime = 1500;
let pomodoroInterval;

function startPomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroInterval = setInterval(() => {
        if (pomodoroTime > 0) {
            pomodoroTime--;
            document.getElementById("timer").textContent = formatTime(pomodoroTime);
        } else {
            clearInterval(pomodoroInterval);
        }
    }, 1000);
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroTime = 1500;
    document.getElementById("timer").textContent = "25:00";
}

function formatTime(seconds) {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
