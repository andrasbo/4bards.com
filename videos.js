
const currIframeVideos = document.getElementById("currIframeVideos");
const buttonPrevVideos = document.getElementById("buttonPrevVideos");
const buttonNextVideos = document.getElementById("buttonNextVideos");

let currIndexVideos = 0;

const youtube = [];

//get youtube links from firestore

firebase.firestore().collection("youtube").orderBy("index", "desc")
.get()
.then(snapshot => {
    setupYoutube(snapshot.docs);
})
.then(() => {
    updateVideo()
});

const setupYoutube = (docs) => {
    docs.forEach(doc => {youtube.push(doc.data().link)});
}


//carusel

function updateVideo() {
    currIframeVideos.src = youtube[currIndexVideos];
}

buttonPrevVideos.addEventListener('click', () => {
    currIndexVideos = (currIndexVideos - 1 + youtube.length) % youtube.length;
    updateVideo();
});
  
buttonNextVideos.addEventListener('click', () => {
    currIndexVideos = (currIndexVideos + 1) % youtube.length;
    updateVideo();
});