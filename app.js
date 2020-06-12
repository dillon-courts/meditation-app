const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    //Get the length of the outline
    const outlineLength = outline.getTotalLength();

    //Duration
    let songDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            handleSongClick(song);
        })
    });

    //Play sound
    play.addEventListener('click', () => {
        handleSongClick(song);
    });

    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            songDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${getTimeMinutes(songDuration)}:${getTimeSeconds(songDuration)}`;
        })
    });

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = songDuration - currentTime;
        updateTimer(currentTime, elapsed);

        if (currentTime >= songDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
        }
    }

    const updateTimer = (currentTime, elapsedTime) => {
        let seconds = getTimeSeconds(elapsedTime);
        let minutes = getTimeMinutes(elapsedTime);
        
        let progress = outlineLength - (currentTime / songDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
    
        timeDisplay.textContent = `${minutes}:${seconds}`;
    }

    const handleSongClick = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }
        else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    }

}



const getTimeSeconds = time => {
    return Math.floor(time % 60);
}

const getTimeMinutes = time => {
    return Math.floor(time / 60);
}



app();