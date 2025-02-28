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
    //loadAvailableDates();
    const bookButton = document.getElementById("bookButton");
    if (bookButton) {
        bookButton.addEventListener("click", bookAppointment);
    }
});


/*
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
*/

let dateSelected = "";

document.getElementById("datePicker").addEventListener("change", function() {
    dateSelected = this.value;
    console.log("Selected Date:", dateSelected);
});


const haircut = "";

function bookAppointment() {
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("mail")?.value;
    const phone = document.getElementById("number")?.value;
    //const selectedDate = document.getElementById("dateSelect")?.value;
    const selectedDate = dateSelected;
    //const selectedTime = document.getElementById("timeSelect")?.value;

    if (!name || !email || !phone || !selectedDate /*|| !selectedTime*/) {
        alert("Please fill in all fields.");
        return;
    }

    const bookingRef = database.ref("bookings").push();
    bookingRef.set({
        name,
        email,
        phone,
        date: selectedDate,
        //time: selectedTime
    }).then(() => {
        //removeTimeFromAvailable(selectedDate, selectedTime);
        alert("Booking confirmed! You will recieve a text to confirm your time!");
    }).catch(error => {
        alert("Error saving booking, please try again later");
    });
}

/*
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
*/

var desc1 = document.getElementById('description1');
var desc2 = document.getElementById('description2');
var desc3 = document.getElementById('description3');
var form = document.getElementById('body');

function showHaircut(haircut) {
    if (haircut == "haircut") {
        desc1.style.display = 'block'
        desc1.style.transition = 'opacity 0.5s'
        desc1.style.opacity = 0;
        desc1.offsetHeight;
        desc1.style.opacity = 1;
        haircut = "haircut"

        // close others
        desc2.style.display = 'none'
        desc2.style.transition = 'opacity 0.5s'
        desc2.style.opacity = 1;
        desc2.offsetHeight;
        desc2.style.opacity = 0;

        desc3.style.display = 'none'
        desc3.style.transition = 'opacity 0.5s'
        desc3.style.opacity = 1;
        desc3.offsetHeight;
        desc3.style.opacity = 0;

        form.style.display = 'nonw'
        form.style.transition = 'opacity 0.5s'
        form.style.opacity = 1;
        form.offsetHeight;
        form.style.opacity = 0;
    } else if (haircut == "h+w") {
        desc2.style.display = 'block'
        desc2.style.transition = 'opacity 0.5s'
        desc2.style.opacity = 0;
        desc2.offsetHeight;
        desc2.style.opacity = 1;
        haircut = "Haircut + Wash"

        // close others
        desc1.style.display = 'none'
        desc1.style.transition = 'opacity 0.5s'
        desc1.style.opacity = 1;
        desc1.offsetHeight;
        desc1.style.opacity = 0;

        desc3.style.display = 'none'
        desc3.style.transition = 'opacity 0.5s'
        desc3.style.opacity = 1;
        desc3.offsetHeight;
        desc3.style.opacity = 0;

        form.style.display = 'nonw'
        form.style.transition = 'opacity 0.5s'
        form.style.opacity = 1;
        form.offsetHeight;
        form.style.opacity = 0;
    } else if (haircut == "trim") {
        desc3.style.display = 'block'
        desc3.style.transition = 'opacity 0.5s'
        desc3.style.opacity = 0;
        desc3.offsetHeight;
        desc3.style.opacity = 1;
        haircut = "Trim/Lineup"

        // close others
        desc2.style.display = 'none'
        desc2.style.transition = 'opacity 0.5s'
        desc2.style.opacity = 1;
        desc2.offsetHeight;
        desc2.style.opacity = 0;

        desc1.style.display = 'none'
        desc1.style.transition = 'opacity 0.5s'
        desc1.style.opacity = 1;
        desc1.offsetHeight;
        desc1.style.opacity = 0;

        form.style.display = 'nonw'
        form.style.transition = 'opacity 0.5s'
        form.style.opacity = 1;
        form.offsetHeight;
        form.style.opacity = 0;
    }
}  


function showBook() {
    form.style.display = 'block'
    form.style.transition = 'opacity 0.5s'
    form.style.opacity = 0;
    form.offsetHeight;
    form.style.opacity = 1;
}
