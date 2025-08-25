

//display or redirect
auth.onAuthStateChanged(user => {
    const today = new Date().toISOString().slice(0,10).replace(/-/g,"");

    if (user) {
        db.collection("events").where("date", ">=", today).orderBy("date")
        .get()
        .then(snapshot => {
            setupEvents(snapshot.docs);
        });
        db.collection("spotify").orderBy("index", "desc").get()
        .then(snapshot => {
            setupSpotify(snapshot.docs);
        });
        db.collection("youtube").orderBy("index", "desc").get()
        .then(snapshot => {
            setupYoutube(snapshot.docs);
        });
        document.querySelector("body").style.display = "block";
        document.querySelector("#username").innerHTML = `${user.email}`;
    }
    else {window.location.replace("../login")}
});

//logout
const logoutButton = document.querySelector("#logoutButton");

logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut();
});




