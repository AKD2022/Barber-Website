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

document.getElementById("datePicker").addEventListener("change", function () {
    dateSelected = this.value;
    console.log("Selected Date:", dateSelected);
});


let haircutSelected = "";

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

/* Computer */
var desc1 = document.getElementById('description1Computer');
var desc2 = document.getElementById('description2Computer');
var desc3 = document.getElementById('description3Computer');
var form = document.getElementById('bodyComputer');

function showHaircutComputer(haircut) {
    if (haircut == "haircut") {
        desc1.style.display = 'block'
        desc1.style.transition = 'opacity 0.5s'
        desc1.style.opacity = 0;
        desc1.offsetHeight;
        desc1.style.opacity = 1;
        haircutSelected = "haircut"

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

        form.style.display = 'none'
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
        haircutSelected = "Haircut + Wash"

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

        form.style.display = 'none'
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
        haircutSelected = "Trim/Lineup"

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

        form.style.display = 'none'
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

/* Tablet */
var desc1Tablet = document.getElementById('description1Tablet');
var desc2Tablet = document.getElementById('description2Tablet');
var desc3Tablet = document.getElementById('description3Tablet');
var bodyTablet1 = document.getElementById('bodyTablet1');
var bodyTablet2 = document.getElementById('bodyTablet2');
var bodyTablet3 = document.getElementById('bodyTablet3');

function showHaircutTablet(haircutTablet) {
    if (haircutTablet == 'haircut') {
        openDescription1Tablet();
    
    } else if (haircutTablet == 'h+w') {
        openDescription2Tablet();
    } else {
        openDescription3Tablet();
    }
}

function showBookTablet(number) {
    if (number == 1) {
        openBodyTablet1();
    } else if (number == 2) {
        openBodyTablet2();
    } else if (number == 3) {
        openBodyTablet3();
    }
}

// Open Description 
function openDescription1Tablet() {
    desc1Tablet.style.display = 'block';
    desc1Tablet.style.transition = 'opacity 0.5s'
    desc1Tablet.style.opacity = 0;
    desc1Tablet.offsetHeight;
    desc1Tablet.style.opacity = 1;
    haircutSelected = "Haircut"

    closeDescription2Tablet();
    closeDescription3Tablet();
}

function openDescription2Tablet() {
    desc2Tablet.style.display = 'block';
    desc2Tablet.style.transition = 'opacity 0.5s';
    desc2Tablet.style.opacity = 0;
    desc2Tablet.offsetHeight;
    desc2Tablet.style.opacity = 1;
    haircutSelected = "Haircut + Wash";

    closeDescription1Tablet();
    closeDescription3Tablet();
}

function openDescription3Tablet() {
    desc3Tablet.style.display = 'block';
    desc3Tablet.style.transition = 'opacity 0.5s';
    desc3Tablet.style.opacity = 0;
    desc3Tablet.offsetHeight;
    desc3Tablet.style.opacity = 1;
    haircutSelected = "Trim/Lineup";

    closeDescription1Tablet();
    closeDescription2Tablet();
}

// Close Description
function closeDescription1Tablet() {
    desc1Tablet.style.display = 'none';
    desc1Tablet.style.transition = 'opacity 0.5s';
    desc1Tablet.style.opacity = 1;
    desc1Tablet.offsetHeight;
    desc1Tablet.style.opacity = 0;

    closeBodyTablet1();
}

function closeDescription2Tablet() {
    desc2Tablet.style.display = 'none';
    desc2Tablet.style.transition = 'opacity 0.5s';
    desc2Tablet.style.opacity = 1;
    desc2Tablet.offsetHeight;
    desc2Tablet.style.opacity = 0;

    closeBodyTablet2();
} 

function closeDescription3Tablet() {
    desc3Tablet.style.display = 'none';
    desc3Tablet.style.transition = 'opacity 0.5s';
    desc3Tablet.style.opacity = 1;
    desc3Tablet.offsetHeight;
    desc3Tablet.style.opacity = 0;

    closeBodyTablet3();
}


// Open Form
function openBodyTablet1() {
    bodyTablet1.style.display = 'block'
    bodyTablet1.style.transition = 'opacity 0.5s'
    bodyTablet1.style.opacity = 0;
    bodyTablet1.offsetHeight;
    bodyTablet1.style.opacity = 1;
}

function openBodyTablet2() {
    bodyTablet2.style.display = 'block'
    bodyTablet2.style.transition = 'opacity 0.5s'
    bodyTablet2.style.opacity = 0;
    bodyTablet2.offsetHeight;
    bodyTablet2.style.opacity = 1;
}

function openBodyTablet3() {
    bodyTablet3.style.display = 'block'
    bodyTablet3.style.transition = 'opacity 0.5s'
    bodyTablet3.style.opacity = 0;
    bodyTablet3.offsetHeight;
    bodyTablet3.style.opacity = 1;
}

// Close Form
function closeBodyTablet1() {
    bodyTablet1.style.display = 'none'
    bodyTablet1.style.transition = 'opacity 0.5s'
    bodyTablet1.style.opacity = 1;
    bodyTablet1.offsetHeight;
    bodyTablet1.style.opacity = 0;
}

function closeBodyTablet2() {
    bodyTablet2.style.display = 'none'
    bodyTablet2.style.transition = 'opacity 0.5s'
    bodyTablet2.style.opacity = 1;
    bodyTablet2.offsetHeight;
    bodyTablet2.style.opacity = 0;
}

function closeBodyTablet3() {
    bodyTablet3.style.display = 'none'
    bodyTablet3.style.transition = 'opacity 0.5s'
    bodyTablet3.style.opacity = 1;
    bodyTablet3.offsetHeight;
    bodyTablet3.style.opacity = 0;
}

/* Mobile */
var desc1Mobile = document.getElementById('description1Mobile');
var desc2Mobile = document.getElementById('description2Mobile');
var desc3Mobile = document.getElementById('description3Mobile');
var bodyMobile1 = document.getElementById('bodyMobile1');
var bodyMobile2 = document.getElementById('bodyMobile2');
var bodyMobile3 = document.getElementById('bodyMobile3');

function showHaircutMobile(haircutMobile) {
    if (haircutMobile == 'haircut') {
        openDescription1Mobile();

    } else if (haircutMobile == 'h+w') {
        openDescription2Mobile();
    } else {
        openDescription3Mobile();
    }
}

function showBookMobile(number) {
    if (number == 1) {
        openBodyMobile1();
    } else if (number == 2) {
        openBodyMobile2();
    } else if (number == 3) {
        openBodyMobile3();
    }
}

// Open Description 
function openDescription1Mobile() {
    desc1Mobile.style.display = 'block';
    desc1Mobile.style.transition = 'opacity 0.5s'
    desc1Mobile.style.opacity = 0;
    desc1Mobile.offsetHeight;
    desc1Mobile.style.opacity = 1;
    haircutSelected = "Haircut"

    closeDescription2Mobile();
    closeDescription3Mobile();
}

function openDescription2Mobile() {
    desc2Mobile.style.display = 'block';
    desc2Mobile.style.transition = 'opacity 0.5s';
    desc2Mobile.style.opacity = 0;
    desc2Mobile.offsetHeight;
    desc2Mobile.style.opacity = 1;
    haircutSelected = "Haircut + Wash";

    closeDescription1Mobile();
    closeDescription3Mobile();
}

function openDescription3Mobile() {
    desc3Mobile.style.display = 'block';
    desc3Mobile.style.transition = 'opacity 0.5s';
    desc3Mobile.style.opacity = 0;
    desc3Mobile.offsetHeight;
    desc3Mobile.style.opacity = 1;
    haircutSelected = "Trim/Lineup";

    closeDescription1Mobile();
    closeDescription2Mobile();
}

// Close Description
function closeDescription1Mobile() {
    desc1Mobile.style.display = 'none';
    desc1Mobile.style.transition = 'opacity 0.5s';
    desc1Mobile.style.opacity = 1;
    desc1Mobile.offsetHeight;
    desc1Mobile.style.opacity = 0;

    closeBodyMobile1();
}

function closeDescription2Mobile() {
    desc2Mobile.style.display = 'none';
    desc2Mobile.style.transition = 'opacity 0.5s';
    desc2Mobile.style.opacity = 1;
    desc2Mobile.offsetHeight;
    desc2Mobile.style.opacity = 0;

    closeBodyMobile2();
} 

function closeDescription3Mobile() {
    desc3Mobile.style.display = 'none';
    desc3Mobile.style.transition = 'opacity 0.5s';
    desc3Mobile.style.opacity = 1;
    desc3Mobile.offsetHeight;
    desc3Mobile.style.opacity = 0;

    closeBodyMobile3();
}


// Open Form
function openBodyMobile1() {
    bodyMobile1.style.display = 'block'
    bodyMobile1.style.transition = 'opacity 0.5s'
    bodyMobile1.style.opacity = 0;
    bodyMobile1.offsetHeight;
    bodyMobile1.style.opacity = 1;
}

function openBodyMobile2() {
    bodyMobile2.style.display = 'block'
    bodyMobile2.style.transition = 'opacity 0.5s'
    bodyMobile2.style.opacity = 0;
    bodyMobile2.offsetHeight;
    bodyMobile2.style.opacity = 1;
}

function openBodyMobile3() {
    bodyMobile3.style.display = 'block'
    bodyMobile3.style.transition = 'opacity 0.5s'
    bodyMobile3.style.opacity = 0;
    bodyMobile3.offsetHeight;
    bodyMobile3.style.opacity = 1;
}

// Close Form
function closeBodyMobile1() {
    bodyMobile1.style.display = 'none'
    bodyMobile1.style.transition = 'opacity 0.5s'
    bodyMobile1.style.opacity = 1;
    bodyMobile1.offsetHeight;
    bodyMobile1.style.opacity = 0;
}

function closeBodyMobile2() {
    bodyMobile2.style.display = 'none'
    bodyMobile2.style.transition = 'opacity 0.5s'
    bodyMobile2.style.opacity = 1;
    bodyMobile2.offsetHeight;
    bodyMobile2.style.opacity = 0;
}

function closeBodyMobile3() {
    bodyMobile3.style.display = 'none'
    bodyMobile3.style.transition = 'opacity 0.5s'
    bodyMobile3.style.opacity = 1;
    bodyMobile3.offsetHeight;
    bodyMobile3.style.opacity = 0;
}


/* Media Queries */
/*
var screenWidth = screen.width;
const arrows = document.getElementsByClassName('arrow'); 

if (screenWidth <= 800) {
    for (let i = 0; i < arrows.length; i++) {
        let icon = arrows[i].querySelector("i"); 
        if (icon) {
            icon.classList.remove("fa-chevron-right");
            icon.classList.add("fa-angle-down");
        }
    }
}
*/
