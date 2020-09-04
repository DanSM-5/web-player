const media = document.getElementById('video-element');
const play = document.getElementById('playbutton');
const pause = document.getElementById('puasebutton');
const position = document.getElementById('positiondisplay');
const duration = document.getElementById('durationdisplay');
const rail = document.getElementById('controlbarrail');
const fill = document.getElementById('controlbarfill');
const mc = document.getElementById('media-controls');
const SHOW_CONTROLS = 'show-controls';
const HIDE_CONTROLS = 'hide-controls';

let lastId;

const showControls = () => {
    clearInterval(lastId);
    if (mc.classList.contains(HIDE_CONTROLS)) {
        mc.classList.remove(HIDE_CONTROLS);
    }
    mc.classList.add(SHOW_CONTROLS);
}
const hideControls = () => {
    lastId = setTimeout(() => {
        if (mc.classList.contains(SHOW_CONTROLS)) {
            mc.classList.remove(SHOW_CONTROLS);
        }
        mc.classList.add(HIDE_CONTROLS);
    }, 0.5 * 1000);
}

const playMedia = () => media.play();

const pauseMedia = () =>  media.pause();

const selectTimeFormat = value => value < 10 
    ? `0${value}` 
    : value;

const timeDisplay = t => {
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t - minutes * 60);
    const minutevalue = selectTimeFormat(minutes);
    const secondvalue = selectTimeFormat(seconds);
    
    return `${minutevalue}:${secondvalue}`;
}

const seekMedia = e => {
    console.log('offsetX', e.offsetX);
    console.log('offsetWidth', rail.offsetWidth);
    console.log('duration', media.duration);
    media.currentTime = (e.offsetX / rail.offsetWidth) * media.duration;
};

const updateTime = () => {
    position.textContent = timeDisplay(media.currentTime);
    duration.textContent = timeDisplay(media.duration);
    
    const currentLength = rail.clientWidth * (media.currentTime / media.duration);
    fill.style.width = `${currentLength}px`
};

play.addEventListener('click', playMedia);
pause.addEventListener('click', pauseMedia);

rail.addEventListener('click', seekMedia);
fill.addEventListener('click', seekMedia);

media.addEventListener('loadedmetadata', updateTime);
media.addEventListener('timeupdate', updateTime);

media.addEventListener('mouseenter', showControls);
media.addEventListener('mouseleave', hideControls);
mc.addEventListener('mouseenter', showControls);
mc.addEventListener('mouseleave', hideControls);
