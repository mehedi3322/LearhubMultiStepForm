const steps = document.querySelectorAll(".step");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const submitBtn = document.getElementById("submitBtn");

const progressBar = document.getElementById("progressBar");

const form = document.getElementById("multiStepForm");


let currentStep = 0;


// Show Step
function showStep(step) {

    steps.forEach((item, index) => {

        item.classList.toggle(
            "hidden",
            index !== step
        );

    });


    // Back Button

    if (step === 0) {

        prevBtn.classList.add("hidden");

    } else {

        prevBtn.classList.remove("hidden");

    }


    // Next / Submit Button

    if (step === steps.length - 1) {

        nextBtn.classList.add("hidden");

        submitBtn.classList.remove("hidden");

    } else {

        nextBtn.classList.remove("hidden");

        submitBtn.classList.add("hidden");

    }


    // Progress Bar

    const progress =
        ((step + 1) / steps.length) * 100;

    progressBar.style.width = progress + "%";

}


// Validate Current Step

function validateStep() {

    const inputs =
        steps[currentStep].querySelectorAll(
            "input, select, textarea"
        );


    for (let input of inputs) {

        if (!input.checkValidity()) {

            input.reportValidity();

            return false;

        }

    }

    return true;

}


// Next Button

nextBtn.addEventListener("click", function () {

    if (!validateStep()) {
        return;
    }


    if (currentStep < steps.length - 1) {

        currentStep++;

        showStep(currentStep);

    }

});


// Back Button

prevBtn.addEventListener("click", function () {

    if (currentStep > 0) {

        currentStep--;

        showStep(currentStep);

    }

});


// Submit Form

form.addEventListener("submit", function (event) {

    event.preventDefault();


    const password =
        document.querySelector(
            '[name="password"]'
        ).value;


    const confirmPassword =
        document.querySelector(
            '[name="confirmPassword"]'
        ).value;


    const passwordError = document.getElementById("passwordError");

    if (password !== confirmPassword) {

        passwordError.classList.remove("hidden");

        return;

    } else {

        passwordError.classList.add("hidden");

    }


    // NEW: Redirect to Success Page
    window.location.href = "success.html";

});


// Start

showStep(currentStep);