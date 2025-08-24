const firebaseConfig = {
  apiKey: "AIzaSyAuytYlQAiglejI0_GQ8ryMK3KrRWlQSnc",
  authDomain: "weboldal-4bards.firebaseapp.com",
  projectId: "weboldal-4bards",
  messagingSenderId: "746251325684",
  appId: "1:746251325684:web:818344f2571d66e31acea1",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
