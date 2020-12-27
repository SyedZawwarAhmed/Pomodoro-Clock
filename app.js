const time = document.getElementById("time-left");
const playPause = document.getElementById("start_stop");
const timerLabel = document.getElementById("timer-label");
const breakCount = document.getElementById("break-length");
const sessionCount = document.getElementById("session-length");
const audio = document.getElementById("beep");

let initialTime = 1500;
let minutes = Math.floor(initialTime / 60);
let seconds = initialTime % 60;
let isPlaying = false;
let breakLength = 300;
let sessionLength = 1500;
minutes = minutes < 10 ? '0' + minutes : minutes;
seconds = seconds < 10 ? '0' + seconds : seconds;

time.innerText = minutes.toString() + ':' + seconds.toString();
timerLabel.innerText = 'Session';
breakCount.innerText = 5;
sessionCount.innerText = 25;
playPause.innerHTML = '<i class="fas fa-play fa-2x"></i>';

const reset = () => {
    clearInterval(session);
    audio.pause();
    audio.currentTime = 0;

    playPause.innerHTML = '<i class="fas fa-play fa-2x"></i>';
    initialTime = 1500;
    minutes = Math.floor(initialTime / 60);
    seconds = initialTime % 60;
    isPlaying = false;
    breakLength = 300;
    sessionLength = 1500;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    time.innerText = minutes.toString() + ':' + seconds.toString();
    timerLabel.innerText = 'Session';
    breakCount.innerText = '5';
    sessionCount.innerText = '25';
    time.style.color = 'white';
    timerLabel.style.color = 'white';
}

const timeSetter = (breakOrSession, incrementOrDecrement) => {
    if (isPlaying === false) {
        if (breakOrSession === 'break' && incrementOrDecrement === '+' && breakLength < 3600) {
            breakLength += 60;
            breakCount.textContent = breakLength / 60;
            if (timerLabel.innerText === 'Break') {
                initialTime = breakLength;

                time.textContent = ((breakLength / 60) < 10 ? ('0' + (breakLength / 60)) : (breakLength / 60)).toString() + ':' + '00';
            }
        }
        else if (breakOrSession === 'break' && incrementOrDecrement === '-' && breakLength > 60) {
            breakLength -= 60;
            breakCount.textContent = breakLength / 60;
            if (timerLabel.innerText === 'Break') {
                initialTime = breakLength;

                time.textContent = ((breakLength / 60) < 10 ? ('0' + (breakLength / 60)) : (breakLength / 60)).toString() + ':' + '00';
            }
        }
        else if (breakOrSession === 'session' && incrementOrDecrement === '+' && sessionLength < 3600) {
            sessionLength += 60;
            sessionCount.textContent = sessionLength / 60;
            if (timerLabel.innerText === 'Session') {
                initialTime = sessionLength;

                time.textContent = ((sessionLength / 60) < 10 ? ('0' + (sessionLength / 60)) : (sessionLength / 60)).toString() + ':' + '00';
            }
        }
        else if (breakOrSession === 'session' && incrementOrDecrement === '-' && sessionLength > 60) {
            sessionLength -= 60;
            sessionCount.textContent = sessionLength / 60;
            if (timerLabel.innerText === 'Session') {
                initialTime = sessionLength;

                time.textContent = ((sessionLength / 60) < 10 ? ('0' + (sessionLength / 60)) : (sessionLength / 60)).toString() + ':' + '00';
            }
        }
    }
}

let session ;

const handlePlayPause = () => {
    if (isPlaying === false) {
        isPlaying = true;
        
        session = setInterval(() => {
            initialTime--;
            if (initialTime === -1 && timerLabel.innerText === 'Session') {
                initialTime = breakLength;
                timerLabel.innerText = 'Break';
                audio.play();
            }
            else if (initialTime === -1 && timerLabel.innerText === 'Break') {
                initialTime = sessionLength;
                timerLabel.innerText = 'Session';
                audio.play();
            }
            minutes = Math.floor(initialTime / 60);
            seconds = initialTime % 60;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            if (initialTime < 60) {
                time.style.color = 'red';
                timerLabel.style.color = 'red';
            }
            else if (initialTime >= 60) {
                time.style.color = 'white';
                timerLabel.style.color = 'white';
            }

            time.innerText = minutes.toString() + ':' + seconds.toString();
            
        }, 1000);
        
        playPause.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
    }
    else {
        isPlaying = false;
        clearInterval(session);
        playPause.innerHTML = '<i class="fas fa-play fa-2x"></i>';
    }
}