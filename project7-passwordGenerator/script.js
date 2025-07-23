// DOM Elements - all the elements we need from HTML
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercasLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input",()=>{
    lengthDisplay.textContent=lengthSlider.value;
});

generateButton.addEventListener("click",makePassword);

function makePassword(){
    const length=Number(lengthSlider.value);
    const uppercase=uppercaseCheckbox.checked;
    const lowercase=lowercaseCheckbox.checked;
    const numbers=numbersCheckbox.checked;
    const symbols=symbolsCheckbox.checked;

    if(!uppercase&&!lowercase&&!numbers&&!symbols){
        alert("Please select atleast one character type");
        return;
    }
   
    const newPassword=createRandomPassword(length,uppercase,lowercase,numbers,symbols);

    passwordInput.value=newPassword;

    updateSrengthMeter(newPassword);
}

function createRandomPassword(length,uppercase,lowercase,numbers,symbols){
    let allCharacter="";
    if(uppercase) allCharacter+=uppercaseLetters;
    if(lowercase) allCharacter+=lowercasLetters;
    if(numbers) allCharacter+=numberCharacters;
    if(symbols) allCharacter+=symbolCharacters;

    let password="";

    for(let i=0;i<length;i++){
        const randomIndex=Math.floor(Math.random()*allCharacter.length);
        password+=allCharacter[randomIndex];
    }
    return password;
}

function updateSrengthMeter(password){
    const length=password.length;
    const hasUppercase=/[A-Z]/.test(password);
    const hasLowercase=/[a-z]/.test(password);
    const hasNumbers=/[0-9]/.test(password); 
    const hasSymbols = /[!@#$%^&*()\-_=+\[\]{}|;:,.<>?/]/.test(password);
    let strengthScore=0;

    strengthScore+=Math.min(length*2,40);

    if(hasUppercase) strengthScore+=15;
    if(hasLowercase) strengthScore+=15;
    if(hasNumbers) strengthScore+=15;
    if(hasSymbols) strengthScore+=15;

    if(length<8){
        strengthScore=Math.min(strengthScore,40);
    }

    const safeScore=Math.max(5,Math.min(100,strengthScore));

    strengthBar.style.width=safeScore+"%";

    let strengthLabelText = "";
    let barColor = "";

    if (strengthScore < 40) {
    // weak password
    barColor = "#fc8181";
    strengthLabelText = "Weak";
    } else if (strengthScore < 70) {
    // Medium password
    barColor = "#fbd38d"; // Yellow
    strengthLabelText = "Medium";
    } else {
    // Strong password
    barColor = "#68d391"; // Green
    strengthLabelText = "Strong";
    }

  strengthBar.style.backgroundColor = barColor;
  strengthLabel.textContent = strengthLabelText;

}

window.addEventListener("DOMContentLoaded",makePassword);

copyButton.addEventListener("click",()=>{
    if(!passwordInput.value) return;

    navigator.clipboard.writeText(passwordInput.value).then(()=>showCopySuccess()).catch((error)=>alert("couldnt copy"));
});


function showCopySuccess(){
    copyButton.classList.remove("far","fa-copy");
    copyButton.classList.add("fas","fa-check");

    copyButton.style.color="#48bb78";

    setTimeout(()=>{
    copyButton.classList.remove("fas","fa-check");

    copyButton.classList.add("far","fa-copy");

    copyButton.style.color="";        

    },1500)



 
}