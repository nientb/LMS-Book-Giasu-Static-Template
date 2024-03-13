//
const btn = document.getElementById('btn-register');
const inputEmailEl = document.querySelector('input[name="email"]');
const inputNameEl = document.querySelector('input[name="username"]');
const inputPhoneEl = document.querySelector('input[name="phone"]');

// VALIDATE VALUE
let isValidName = false;
let isValidPhone = false;
inputNameEl.addEventListener('input', () => {
  if(inputNameEl.value.trim() !== '') {
    isValidName = true;
  } else {
    isValidName = false;
  }
  validateForm();
})
inputPhoneEl.addEventListener('input', () => {
  if(inputPhoneEl.value.trim() !== '') {
    isValidPhone = true;
  } else {
    isValidPhone = false
  }
  validateForm();
})

function validateForm () {
  if(isValidPhone && isValidName) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'disabled');
  }
}

function submitForm() {
  const data = {
    username: inputNameEl.value,
    email: inputEmailEl.value,
    phoneNumber: inputPhoneEl.value,
  }
  console.log({data});
  window.location.assign('../enter-otp.html');
}
