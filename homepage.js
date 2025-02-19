document.addEventListener("DOMContentLoaded", function () {
        setTimeout(() => {
            document.getElementById("first").style.opacity = "1";
            document.getElementById("first").style.transform = "translateY(0)";
        }, 500); 

        setTimeout(() => {
            document.getElementById("second").style.opacity = "1";
            document.getElementById("second").style.transform = "translateY(0)";
        }, 1000);

        setTimeout(() => {
            document.querySelector(".btn").style.opacity = "1";
            document.querySelector(".btn").style.transform = "translateY(0)";
        }, 1500); 
});
