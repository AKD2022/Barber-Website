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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();


/*
let selectedTimes = [];

function addTime() {
    const timeInput = document.getElementById("time").value;
    if (timeInput && !selectedTimes.includes(timeInput)) {
        selectedTimes.push(timeInput);
        updateTimeList();
    }
}

function updateTimeList() {
    const timeList = document.getElementById("timeList");
    timeList.innerHTML = "";
    selectedTimes.forEach(time => {
        const li = document.createElement("li");
        li.textContent = time;
        timeList.appendChild(li);
    });
}

function saveToDatabase() {
    const dateInput = document.getElementById("date").value;

    if (!dateInput || selectedTimes.length === 0) {
        alert("Please select a date and add at least one time.");
        return;
    }

    const dbRef = database.ref("available_dates/" + dateInput);

    dbRef.set({
        times: selectedTimes
    })
    .then(() => {
        console.log("Data saved to database");
        alert("Saved successfully!");
        document.getElementById("timeList").innerHTML = "";
        selectedTimes = [];
    })
    .catch((error) => {
        console.error("Data could not save to database, please try again later");
        alert("Error: " + error.message);
    });
}

window.addTime = addTime;
window.saveToDatabase = saveToDatabase;
*/

const bookingsRef = database.ref("bookings");

database.ref("bookings").on("value", (snapshot) => {
    bookingsContainer.innerHTML = ""; // Clear the container before adding new bookings
    console.log("Loaded bookings:", snapshot.val());

    if (!snapshot.exists()) {
        console.log("No bookings available.");
        return;
    }

    snapshot.forEach((childSnapshot) => {
        const booking = childSnapshot.val();
        const bookingElement = document.createElement("div");
        const complete = document.createElement("button");

        bookingElement.textContent = `${booking.name} - ${booking.date} at ${booking.phone}`;
        complete.textContent = "Complete"; 
        complete.classList.add("complete-button");

        complete.onclick = function () {
            removeBooking(childSnapshot.key, bookingElement);
        };

        bookingElement.appendChild(complete);

        bookingsContainer.appendChild(bookingElement);
    });
});

function removeBooking(bookingId, bookingElement) {
    const bookingRef = database.ref("bookings").child(bookingId);
    bookingRef.remove()
        .then(() => {
            console.log(`Booking with ID ${bookingId} has been removed.`);
            bookingElement.remove();
        })
        .catch((error) => {
            console.error("Error removing booking:", error);
            alert("Error removing booking. Please try again.");
        });
}

var authentication = document.getElementById("authentication");
var booked = document.getElementById("body");
var again = document.getElementById("again");
var adminInput = document.getElementById('adminpw');

document.getElementById("adminpw").addEventListener("keydown", async function(event) {
    if (event.key === "Enter") {
        const inputPassword = this.value;

        const response = await fetch("/api/checkpw", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: inputPassword }),
        });

        const data = await response.json();

        if (data.success) {
            console.log("Access Granted");
            document.getElementById("body").style.display = "block";
            document.getElementById("authentication").style.display = "none";
            document.getElementById("again").style.display = "none";
        } else {
            console.log("Access Denied");
            document.getElementById("authentication").style.display = "block";
            document.getElementById("again").style.display = "block";
        }
    }
});

