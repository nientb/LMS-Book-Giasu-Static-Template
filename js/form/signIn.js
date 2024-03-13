// 
const btn = document.getElementById('btn');
const errMessage = document.getElementById('error-message');
const showPasswordEl = document.getElementById('show-password');

const inputNameEl = document.querySelector('input[name="username"]');
const inputPasswordEl = document.querySelector('input[name="password"]');

// TOGGLE SHOW PASSWORD
showPasswordEl.addEventListener('click', () => {
  if(inputPasswordEl.type === 'text') {
    inputPasswordEl.type = 'password';
    showPasswordEl.classList.remove('show-active')
  } else {
    inputPasswordEl.type = 'text';
    showPasswordEl.classList.add('show-active')
  }
})

// VALIDATE FORM VALUE
let isValidName = false;
let isValidPw = false;
let message = '';
inputNameEl.addEventListener('input', () => {
  errMessage.innerHTML = '';
  if(inputNameEl.value.trim() !== '') {
    isValidName = true;
  } else {
    isValidName = false;
    errMessage.innerHTML = 'Tên đăng nhập hoặc số điện thoại không đúng!';
  }
  toggleDisabled()
});
inputPasswordEl.addEventListener('input', () => {
  errMessage.innerHTML = '';
  console.log(inputPasswordEl.value.trim().length);
  if(inputPasswordEl.value.trim().length > 6) {
    isValidPw = true;
  } else {
    isValidPw = false;
    errMessage.innerHTML = 'Mật khẩu quá ngắn';
  }
  toggleDisabled()
})

function toggleDisabled () {
  if(isValidName && isValidPw) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

// SUBMIT FORM
function submitForm (e) {
  e.preventDefault();
  const data = {
    info: inputNameEl.value,
    password: inputPasswordEl.value
  }
  console.log(data);
}

function validateValue (value) {
  errMessage.innerHTML = value;
}

