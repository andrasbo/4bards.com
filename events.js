
//get events from firestore
const today = new Date().toISOString().slice(0,10).replace(/-/g,"");

firebase.firestore().collection("events").where("date", ">=", today)
.get()
.then(snapshot => {
    setupEvents(snapshot.docs);
});

const eventsList = document.querySelector("#eventsList");

const setupEvents = (docs) => {
    let eventsListItems = "";

    docs.forEach(doc => {
        const event = doc.data();

        const yyyy = event.date.substring(0,4);
        const mm = event.date.substring(4,6);
        const dd = event.date.substring(6,8);

        const tickets = (event.tickets == "ingyenes" || event.tickets == "") ?
            `<a class="concertTicket" target="none" >${event.tickets}</a>` :
            `<a class="concertTicket" href="${event.tickets}" target="_blank" >
            <span>&#x21AA;</span>jegyek</a>`

        const li = `
            <li class="concert fadeIn">
                <a class="concertEvent" href="${event.facebook}" target="_blank">${yyyy}.${mm}.${dd}.  |  ${event.city} (${event.venue})</a> 
                ${tickets}
            </li>
        `;
        eventsListItems += li;
    });
    eventsList.innerHTML = eventsListItems;
}
