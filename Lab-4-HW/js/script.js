// Event listeners
// Use # for values with an id
// the change event is triggered after the information is changed/updated
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function (event) {
    validateForm(event);
});
document.querySelector("#password").addEventListener("click", displaySuggestedPass);
// document.querySelector("#state").addEventListener("change", displayState);
displayState();


async function displayState() {
    //let state = document.querySelector("#state").value;
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        for (i of data) {
            let optionElement = document.createElement("option");
            optionElement.value = i.usps;
            optionElement.textContent = i.state;
            document.querySelector("#state").append(optionElement);
        }
    } catch (parseError) {
        console.log("Json parsing " + parseError);
    }
    //alert(zipCode);
}

async function displayCity() {
    //alert("Getting city name");
    let zipCode = document.querySelector("#zip").value;
    //console.log(zipCode);
    // replace the zipcode from the url & put new zipCode variable we made as ${zipCode}
    // use async funtion when using await or hovering over fetch and says promise
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    // document.querySelector below displays data to website
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;


    let zipError = document.querySelector("#zipError");

    if (zip = false) {
        zipError.innerHTML = "ZIP code not found.";
        zipError.style.color = "red";
        return;
    }
    console.log(data);
}

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data[0].county);

    let countyList = document.querySelector("#county");
    // Resets content of county dropdown menu by using only =

    countyList.innerHTML = "<option> Select One </option>";
    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county}</option>`;
    }
}

// Checking whether the username is available
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if (data.available) {
        usernameError.innerHTML = "Username available!";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = "Username taken";
        usernameError.style.color = "red";
    }
}

//Validating form data
function validateForm(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let retypePassword = document.querySelector("#retypePassword").value;

    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required";
        isValid = false;
    }

    else if (password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password too short";
        isValid = false;
    }

    else if (password.value != retypePassword.value) {
        document.querySelector("#passwordError").innerHTML = "Passwords don't match";
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
}

async function displaySuggestedPass() {
    //let state = document.querySelector("#state").value;
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        let suggestedPassword = document.querySelector("#suggestedPwd");

        document.querySelector("#suggestedPwd").textContent = " " + data.password;

        //for(i of data){
        //  let optionElement = document.createElement("option");
        // optionElement.value = i.state;
        //optionElement.textContent = i.usps;
        //document.querySelector("#state").append(optionElement);
    } catch (parseError) {
        console.log("Json parsing " + parseError);
    }
    //alert(zipCode);
}
