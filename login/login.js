
//redirect if logged in
auth.onAuthStateChanged(user => {
    if (user) {window.location.replace("../admin")}
});

//login
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm["email"].value;
    const pwd = loginForm["pwd"].value;

    auth.signInWithEmailAndPassword(email, pwd)
    .catch(() => {window.alert("Helytelen email vagy jelszó!"); loginForm.reset()})
    .then(firebase.auth().setPersistence(() => {firebase.auth.Auth.Persistence.SESSION}));
});

