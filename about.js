// ABOUT

const imgsAbout = [
    "rolunk_kozos.jpg",
    "rolunk_zsombor2.jpg",
    "rolunk_toma.jpg",
    "rolunk_andris.png",
    "rolunk_zsoci.jpg",
    "rolunk_zsombor.jpg"
];

const buttonPrevAbout = document.getElementById("buttonPrevAbout");
const buttonNextAbout = document.getElementById("buttonNextAbout");

const currImgAbout = document.getElementById("currImgAbout");

let currIndexAbout = 0;

function updateImgAbout() {
    currImgAbout.src = "./media/about/" + imgsAbout[currIndexAbout];
}

buttonPrevAbout.addEventListener('click', () => {
    currIndexAbout = (currIndexAbout - 1 + imgsAbout.length) % imgsAbout.length;
    updateImgAbout();
});
  
buttonNextAbout.addEventListener('click', () => {
    currIndexAbout = (currIndexAbout + 1) % imgsAbout.length;
    updateImgAbout();
});