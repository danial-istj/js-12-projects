const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");


form.addEventListener("submit", function(e){
    e.preventDefault();

    const isRequiredValid=checkRequired([username,email,password,confirmPassword]);

    let isFormValid=isRequiredValid;

    if(isRequiredValid){
        const isUsernameValid=checkLength(username,3,15);
        const isEmailValid=checkEmail(email);
        const isPasswordValid=checkLength(password,6,25);
        const isConfirmPasswordValid=checkPasswordsMatch(password,confirmPassword);

        isFormValid=isConfirmPasswordValid&&isEmailValid&&isPasswordValid&&isUsernameValid;
    }

    if(isFormValid){
        alert("Registration Successful");
        form.reset();
        document.querySelectorAll(".form-group").forEach((group)=>{
            group.classList("form-group");
        });
    }
});

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    return false;
  }
  return true;
}

function checkEmail(email) {
  // Email regex that covers most common email formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value.trim())) {
    showSuccess(email);
    return true;
  } else {
    showError(email, "Email is not valid");
    return false;
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${formatFieldName(input)} must be at least ${min} characters.`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${formatFieldName(input)} must be less than ${max} characters.`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}


function checkRequired(arr){
    let isValid=true;

    arr.forEach((input)=>{
        if(input.value.trim()===""){
            showError(input,`${formatFieldName(input)} is required`);
            isValid=false;
        }
        else{
            showSuccess(input);
        }
    });

    return isValid;
}

function formatFieldName(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

function showError(input , msg){
    const formGroup=input.parentElement;

    formGroup.className="form-group error";
    const small=formGroup.querySelector("small");
    small.textContent=msg;
}

function showSuccess(input){
    const formGroup=input.parentElement;

    formGroup.ClassName="form-group success";
}

