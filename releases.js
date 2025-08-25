
//get spotify links from firestore

firebase.firestore().collection("spotify").orderBy("index", "desc")
.get()
.then(snapshot => {
    setupSpotify(snapshot.docs);
});

const releases = [];

const setupSpotify = (docs) => {
    docs.forEach(doc => {releases.push(doc.data().link)});
}

//carusel

const buttonPrevReleases = document.getElementById("buttonPrevReleases");
const buttonNextReleases = document.getElementById("buttonNextReleases");

const currIframeReleases = document.getElementById("currIframeReleases");

let currIndexReleases = 0;

function updateRelease() {
    currIframeReleases.style.transition = "opacity 0s";
    currIframeReleases.style.opacity = 0;
    currIframeReleases.src = releases[currIndexReleases];
    setTimeout(() => {
        currIframeReleases.style.transition = "opacity 0.5s ease";
        currIframeReleases.style.opacity = 1;
    }, 500);
}

buttonPrevReleases.addEventListener('click', () => {
    currIndexReleases = (currIndexReleases - 1 + releases.length) % releases.length;
    updateRelease();
});
  
buttonNextReleases.addEventListener('click', () => {
    currIndexReleases = (currIndexReleases + 1) % releases.length;
    updateRelease();
});