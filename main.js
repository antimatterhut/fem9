

//right now we are just going back to the main page
const goBack = document.querySelector(".dismiss"); //dismiss button
const success = document.querySelector(".success"); //sucess page
const mainPage = document.querySelector(".main-content"); //main page
const errorMainPage = document.querySelector(".error"); //main page with the error
const noError = document.querySelector(".no-error"); //main page no error

//variables for submitting data

const submit = document.querySelector(".subscribe-button"); //big subscribe button
const form = document.querySelector("form"); //get the form

//success page 
const boldEmail = document.querySelector(".bold-email");
const card = document.querySelector(".card");

//error
const errorMessage = document.querySelector(".error-message");
const userInput = document.querySelector("#input");

//media querties

const x = window.matchMedia("(min-width: 70rem)");
const y = window.matchMedia("(max-width: 70rem)");

let successFlag = false;

const update_screen = (event) => {
    if (x.matches && successFlag == false) {
        mainPage.style.display = "grid";
        success.style.display = "none";
        noError.style.display = "unset";
        card.style.width = "55rem";
        card.style.height = "37rem";
    }
    else if (y.matches && successFlag == false) {
        mainPage.style.display = "unset";
        success.style.display = "none";
        card.style.width = "375px";
        card.style.height = "51rem";

    }
    else if (x.matches && successFlag == true) {
        card.style.width = "25rem";
        card.style.height = "25rem";
        mainPage.style.display = "none";
        success.style.display = "unset";
    }
    else if (y.matches && successFlag == true) {
        mainPage.style.display = "none";
        success.style.display = "unset";
        card.style.width = "375px";
        card.style.height = "51rem";
    }
}

x.addEventListener("change", update_screen);
y.addEventListener("change", update_screen);

const toMain = (event) => {
    successFlag = false;
    if (x.matches) {
        card.style.width = "55rem";
        card.style.height = "37rem";
        mainPage.style.display = "grid";
    }
    else {
        mainPage.style.display = "unset"
    }

    if (userInput.classList.contains("red-text")) {
        userInput.classList.toggle("user-input");
        userInput.classList.toggle("red-text");
    }
    errorMessage.style.display = "none";



    form.reset();
    update_screen();
};




goBack.addEventListener("click", toMain);

//lets make a success popup function **not tested

const toSuccess = (email) => {
    successFlag = true;

    console.log('Updating bold-email with:', email);
    console.log('bold-email element:', boldEmail);

    if (boldEmail) {
        boldEmail.innerHTML = email; // Correctly set the email
    } else {
        console.error('Element with class "bold-email" not found.');
    }

    update_screen();

};


//error message function 
const toError = () => {
    errorMessage.style.display = "unset";
    userInput.classList.toggle("user-input");
    userInput.classList.toggle("red-text");
}


//okay, now lets work on submitting the data ****NOT WORKING


const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");

    console.log(email);

    if (!validateEmail(email)) {
        console.log("error");
        toError();
    }
    else {
        toSuccess(email);
    }

};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^\S+@\S+\.\S+$/
        );
};



form.addEventListener("submit", handleSubmit);

userInput.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
})