import firebase from 'firebase';

// firebase projeto carteira
let config = {
    apiKey: "AIzaSyD1V9C5tnRXSV8Kt3Vzx3oxvl9N4mVl7-I",
    authDomain: "carteira-9706a.firebaseapp.com",
    databaseURL: "https://carteira-9706a.firebaseio.com",
    projectId: "carteira-9706a",
    storageBucket: "carteira-9706a.appspot.com",
    messagingSenderId: "598596925354"

  };
  firebase.initializeApp(config);

export default firebase;