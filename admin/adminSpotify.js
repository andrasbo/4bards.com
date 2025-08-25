//show spotify links
const spotifyList = document.querySelector("#spotifyList");

const setupSpotify = (docs) => {
    let tbody = "";
    var i = 0;

    docs.forEach(doc => {
        const spotify = doc.data();
        i++;        
        
        const link = (spotify.link) ?
            `
            <a href=${spotify.link} target="_blank">
                <img src="./icons/spotifyGreen.svg" alt="spotify" style="width: 24px; height: 24px; display:block;">
            </a>
            ` 
            : "<img src='./icons/spotifyGrey.svg' alt='spotify' style='width: 24px; height: 24px;'>"
        
        const tr = `
            <tr class="spotify" data-id="${doc.id}" data-index="${spotify.index}" data-title="${spotify.title}" data-link="${spotify.link}">
                <td>${spotify.index}</td>
                <td>${spotify.title}</td>
                <td>${link}</td>
                <td>
                    <button type="button" id="editSpotifyButton${i}" onclick="openSpotifyEditor(${i})"/>
                        <img src="./icons/edit.svg" style="width: 16px; height: 16px;">
                    </button>
                </td>
                <td>
                    <button type="button" id="deleteButton${i}" onclick="db.collection('spotify').doc('${doc.id}').delete().then(() => {location.reload()})"/>
                        <img src="./icons/delete.svg" style="width: 16px; height: 16px;">    
                    </button>
                </td>                
            </tr>
        `;
        tbody += tr;
    });
    spotifyList.innerHTML = tbody;
}

//open spotify editor
function openSpotifyEditor(i) {
    const eventEditor = document.querySelector("#spotifyEditor");
    eventEditor.style.display = "block";

    const editForm = document.querySelector("#editSpotifyForm");
    
    //add spotify
    if (i == 0)
    {       
        editForm.index.setAttribute("value", "");
        editForm.title.setAttribute("value", "");
        editForm.link.setAttribute("value", "");

        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            db.collection("spotify").add({
                index : parseInt(editForm["index"].value),
                title : editForm["title"].value,
                link : editForm["link"].value,
            })
            .catch(() => {window.alert("Szupertitkos akció. Hozzáférés megtagadva!")})
            .then(() => {location.reload()});
        });
    }         
    //update spotify         
    else {
        const spotify = document.querySelectorAll("tr.spotify")[i-1];
        const spotifyId = spotify.getAttribute("data-id");

        editForm.index.setAttribute("value", `${spotify.getAttribute("data-index")}`);
        editForm.title.setAttribute("value", `${spotify.getAttribute("data-title")}`);
        editForm.link.setAttribute("value", `${spotify.getAttribute("data-link")}`);
    
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            db.collection("spotify").doc(spotifyId).set({
                index : parseInt(editForm["index"].value),
                title : editForm["title"].value,
                link : editForm["link"].value
            })
            .catch(() => {window.alert("Szupertitkos akció. Hozzáférés megtagadva!")})
            .then(() => {location.reload()});
        });            
    }

    editForm.addEventListener("reset", () => {
        eventEditor.style.display = "none";   
    });
}