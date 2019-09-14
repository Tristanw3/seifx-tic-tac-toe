// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyAQVyYgoeVy3QQsLSvLTgVJdSQMXkvvG1A',
    authDomain: 'tictactoe-51c99.firebaseapp.com',
    databaseURL: 'https://tictactoe-51c99.firebaseio.com',
    projectId: 'tictactoe-51c99',
    storageBucket: 'tictactoe-51c99.appspot.com',
    messagingSenderId: '294888758454',
    appId: '1:294888758454:web:c7630038fd172aa3feda17'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

let db = firebase.firestore();