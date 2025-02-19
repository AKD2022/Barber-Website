// Initialize Firebase
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
const database = firebase.database();

// Load available dates after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    loadAvailableDates();
    const bookButton = document.getElementById("bookButton");
    if (bookButton) {
        bookButton.addEventListener("click", bookAppointment);
    }
});

function loadAvailableDates() {
    const dateSelect = document.getElementById("dateSelect");
    const timeSelect = document.getElementById("timeSelect");

    if (!dateSelect || !timeSelect) {
        console.error("Date or time select element not found.");
        return;
    }

    database.ref("available_dates").on("value", (snapshot) => {
        console.log("Available dates snapshot:", snapshot.val());  
        dateSelect.innerHTML = "<option value=''>Select a date</option>";
        snapshot.forEach((childSnapshot) => {
            const date = childSnapshot.key;
            dateSelect.innerHTML += `<option value="${date}">${date}</option>`;
        });
    });
    

    dateSelect.addEventListener("change", function () {
        timeSelect.innerHTML = "<option value=''>Loading times...</option>";
        timeSelect.disabled = true;
    
        const selectedDate = dateSelect.value;
        if (selectedDate) {
            database.ref(`available_dates/${selectedDate}/times`).once("value", (snapshot) => {
                console.log("Times for selected date:", snapshot.val());
                timeSelect.innerHTML = "<option value=''>Select a time</option>";
                if (snapshot.val()) {
                    snapshot.val().forEach((time) => {
                        timeSelect.innerHTML += `<option value="${time}">${time}</option>`;
                    });
                    timeSelect.disabled = false;
                } else {
                    timeSelect.innerHTML = "<option value=''>No times available</option>";
                }
            });
        }
    });
    
}

function bookAppointment() {
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("mail")?.value;
    const phone = document.getElementById("number")?.value;
    const selectedDate = document.getElementById("dateSelect")?.value;
    const selectedTime = document.getElementById("timeSelect")?.value;

    if (!name || !email || !phone || !selectedDate || !selectedTime) {
        alert("Please fill in all fields.");
        return;
    }

    const bookingRef = database.ref("bookings").push();
    bookingRef.set({
        name,
        email,
        phone,
        date: selectedDate,
        time: selectedTime
    }).then(() => {
        removeTimeFromAvailable(selectedDate, selectedTime);

        alert("Booking confirmed!");
    }).catch(error => {
        alert("Error saving booking, please try again later");
    });
}


function removeTimeFromAvailable(date, time) {
    const dateRef = database.ref(`available_dates/${date}/times`);

    dateRef.once("value", (snapshot) => {
        let times = snapshot.val();
        if (times) {
            times = times.filter(t => t !== time);

            if (times.length === 0) {
                const dateRef = database.ref(`available_dates/${date}`);
                dateRef.remove().then(() => {
                    console.log(`Date ${date} has been deleted because it has no available times left.`);
                }).catch(error => {
                    console.error("Error deleting date:", error);
                });
            } else {
                dateRef.set(times);
            }
        }
    });
}

