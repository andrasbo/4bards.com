//show youtube links
const youtubeList = document.querySelector("#youtubeList");

const setupYoutube = (docs) => {
    let youtubeListItems = "";
    var i = 0;

    docs.forEach(doc => {
        const youtube = doc.data();
        i++;        
        
        const link = (youtube.link) ?
            `
            <a href=${youtube.link} target="_blank">
                <img src="./icons/youtubeRed.svg" alt="youtube" style="width: 24px; height: 24px; display:block;">
            </a>
            ` 
            : "<img src='./icons/youtubeGrey.svg' alt='youtube' style='width: 24px; height: 24px;'>"
        
        const tr = `
            <tr class="youtube" data-id="${doc.id}" data-index="${youtube.index}" data-title="${youtube.title}" data-link="${youtube.link}">
                <td>${youtube.index}</td>
                <td>${youtube.title}</td>
                <td>${link}</td>
                <td>
                    <button type="button" id="editYoutubeButton${i}" onclick="openYoutubeEditor(${i})"/>
                        <img src="./icons/edit.svg" style="width: 16px; height: 16px;">
                    </button>
                </td>
                <td>
                    <button type="button" id="deleteButton${i}" onclick="deleteYoutube('${doc.id}')"/>
                        <img src="./icons/delete.svg" style="width: 16px; height: 16px;">    
                    </button>
                </td>                
            </tr>
        `;
        youtubeListItems += tr;
    });
    youtubeList.innerHTML = youtubeListItems;
}

//open youtube editor
function openYoutubeEditor(i) {
    const eventEditor = document.querySelector("#youtubeEditor");
    eventEditor.style.display = "block";

    const editForm = document.querySelector("#editYoutubeForm");
    
    //add youtube
    if (i == 0)
    {       
        editForm.index.setAttribute("value", "");
        editForm.title.setAttribute("value", "");
        editForm.link.setAttribute("value", "");

        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            db.collection("youtube").add({
                index : parseInt(editForm["index"].value),
                title : editForm["title"].value,
                link : editForm["link"].value,
            })
            .catch(() => {window.alert("Szupertitkos akció. Hozzáférés megtagadva!")})
            .then(() => {location.reload()});
        });
    }         
    //update youtube         
    else {
        const youtube = document.querySelectorAll("tr.youtube")[i-1];
        const youtubeId = youtube.getAttribute("data-id");

        editForm.index.setAttribute("value", `${youtube.getAttribute("data-index")}`);
        editForm.title.setAttribute("value", `${youtube.getAttribute("data-title")}`);
        editForm.link.setAttribute("value", `${youtube.getAttribute("data-link")}`);
    
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            db.collection("youtube").doc(youtubeId).set({
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

function deleteYoutube(id) {
    db.collection('youtube').doc(id).delete()
    .catch(() => {window.alert("Szupertitkos akció. Hozzáférés megtagadva!")})
    .then(() => {location.reload()}); 
}