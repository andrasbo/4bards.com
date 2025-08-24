// mute - unmute for merch video

const video = document.getElementById('merchVideo');
const mute = document.getElementById('mute');
const unmuteSymbol = document.getElementById('unmuteSymbol');
const muteSymbol = document.getElementById('muteSymbol');
let muteState = 1;

mute.addEventListener('click', () => {
    if (muteState) {
        video.muted = 0;
        unmuteSymbol.style.opacity = 0;
        muteSymbol.style.opacity = 1;
        muteState = 0;
    }
    else {
        video.muted = 1;
        unmuteSymbol.style.opacity = 1;
        muteSymbol.style.opacity = 0;
        muteState = 1;
    }
})