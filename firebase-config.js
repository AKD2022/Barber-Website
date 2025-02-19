const firebaseConfig = {
    apiKey: "AIzaSyCFSU3QO1mxaGH3BdpquigC8Snwp99kI1c",
    authDomain: "barber-time-and-date-booking.firebaseapp.com",
    databaseURL: "https://barber-time-and-date-booking-default-rtdb.firebaseio.com",
    projectId: "barber-time-and-date-booking",
    storageBucket: "barber-time-and-date-booking.firebasestorage.app",
    messagingSenderId: "721519706962",
    appId: "1:721519706962:web:4b84678e7396ba83c5308b",
    measurementId: "G-69PSR33C7E"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();