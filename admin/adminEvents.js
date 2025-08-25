//show events
const eventsList = document.querySelector("#eventsList");

const setupEvents = (docs) => {
    let eventsListItems = "";
    var i = 0;

    docs.forEach(doc => {
        const event = doc.data();
        i++;        

        const yyyy = event.date.substring(0,4);
        const mm = event.date.substring(4,6);
        const dd = event.date.substring(6,8);
        
        const facebook = (event.facebook) ?
            `<a href=${event.facebook} target="_blank"><img src="./icons/facebookBlue.svg" style="width: 24px; height: 24px; display:block;"></a>`
            : "<img src='./icons/facebookGrey.svg' style='width: 24px; height: 24px;'>"
        const tickets = () => {
            switch (event.tickets) {
                case "" : return "<img src='./icons/ticketGrey.svg' style='width: 24px; height: 24px;'>";
                case "ingyenes" : return "<img src='./icons/free.svg' style='width: 24px; height: 24px;'>";
                default : return `<a href=${event.tickets} target="_blank"><img src='./icons/ticketYellow.svg' style='width: 24px; height: 24px;'></a>`
            }            
        }
        const tr = `
            <tr class="event" data-id="${doc.id}" data-date="${event.date}" data-city="${event.city}" data-venue="${event.venue}" data-facebook="${event.facebook}" data-tickets="${event.tickets}">
                <td>${yyyy}/${mm}/${dd} - ${event.city} (${event.venue})</td>
                <td>${tickets()}</td>
                <td>${facebook}</td>
                <td>
                    <button type="button" id="editEventButton${i}" onclick="openEventEditor(${i})"/>
                        <img src="./icons/edit.svg" style="width: 16px; height: 16px;">
                    </button> 
                </td>
                <td>
                    <button type="button" id="deleteButton${i}" onclick="deleteEvent('${doc.id}')"/>
                        <img src="./icons/delete.svg" style="width: 16px; height: 16px;">
                    </button>
                </td>                
            </tr>
        `;
        eventsListItems += tr;
    });
    eventsList.innerHTML = eventsListItems;
}

//open event editor
function openEventEditor(i) {
    const eventEditor = document.querySelector("#eventEditor");
    eventEditor.style.display = "block";

    const editForm = document.querySelector("#editEventForm");
    
    //add event
    if (i == 0)
    {       
        editForm.date.setAttribute("value", "");
        editForm.city.setAttribute("value", "");
        editForm.venue.setAttribute("value", "");
        editForm.facebook.setAttribute("value", "");
        editForm.tickets.setAttribute("value", "");        

        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            db.collection("events").add({
                date : editForm["date"].value,
                city : editForm["city"].value,
                venue : editForm["venue"].value,
                facebook : editForm["facebook"].value,
                tickets : editForm["tickets"].value
            })
            .catch(() => {window.alert("Szupertitkos akció. Hozzáférés megtagadva!")})
            .then(() => {location.reload()});
        });
    }         
    //update event         
    else {
        const event = document.querySelectorAll("tr.event")[i-1];
        const eventId = event.getAttribute("data-id");

        editForm.date.setAttribute("value", `${event.getAttribute("data-date")}`);
        editForm.city.setAttribute("value", `${event.getAttribute("data-city")}`);
        editForm.venue.setAttribute("value", `${event.getAttribute("data-venue")}`);
        editForm.facebook.setAttribute("value", `${event.getAttribute("data-facebook")}`);
        editForm.tickets.setAttribute("value", `${event.getAttribute("data-tickets")}`);
    
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            db.collection("events").doc(eventId).set({
                date : editForm["date"].value,
                city : editForm["city"].value,
                venue : editForm["venue"].value,
                facebook : editForm["facebook"].value,
                tickets : editForm["tickets"].value
            })
            .catch(() => {window.alert("Szupertitkos akció. Hozzáférés megtagadva!")})
            .then(() => {location.reload()});
        });            
    }

    editForm.addEventListener("reset", () => {
        eventEditor.style.display = "none";   
    });
}

function deleteEvent(id) {
    db.collection('events').doc(id).delete()
    .catch(() => {window.alert("Szupertitkos akció. Hozzáférés megtagadva!")})
    .then(() => {location.reload()}); 
}