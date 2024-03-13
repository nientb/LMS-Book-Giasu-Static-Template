const showPasswordEl = document.querySelectorAll('.show-password');
const btn = document.getElementById('btn');
const errMessage = document.getElementById('error-message');
const inputPasswordEl = document.querySelector('input[name="password"]');
const inputConfirmEl = document.querySelector('input[name="confirm"]');


// TOGGLE SHOW PASSWORD
showPasswordEl.forEach(el => {
  el.addEventListener('click', (e) => {
    const parentEl = e.target.parentElement;
    const inputEl = parentEl.querySelector('input');
    if(inputEl.type == 'text') {
      inputEl.type = 'password';
      e.target.classList.remove('text-primary');
    } else {
      inputEl.type = 'text';
      e.target.classList.add('text-primary');
    }
  })
})

// VALIDATE VALUE
let isValidPw = false;
let isValidCf = false;
inputPasswordEl.addEventListener('input', () => {
  errMessage.innerHTML = '';
  if(inputPasswordEl.value.trim() !== '') {
    isValidPw = true;
  } else {
    isValidPw = false;
  }
  validateForm();
})
inputConfirmEl.addEventListener('input', () => {
  errMessage.innerHTML = '';
  if(inputConfirmEl.value.trim() !== '') {
    isValidCf = true;
  } else {
    isValidCf = false
  }
  validateForm();
})

function validateForm () {
  if(isValidCf && isValidPw) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

// SUBMIT FORM
function submitForm (e) {
  e.preventDefault();

  if(inputPasswordEl.value === inputConfirmEl.value) {
    console.log(inputPasswordEl.value);
  } else {
    errMessage.innerHTML = 'Mật khẩu không đúng vui lòng kiểm tra lại!'
  }
}

  