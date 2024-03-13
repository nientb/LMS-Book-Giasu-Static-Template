//
const btnSubmit = document.getElementById('btn-submit');
const inputOtpEl = document.querySelector('input[name="otp-code"]');

inputOtpEl.addEventListener('input', function() {
  if (inputOtpEl.value.trim() !== '') {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true
  }
});

function submitOtp() {
  // e.preventDefault();

  const data = {
    codeOtp: inputOtpEl.value,
  }
  console.log({data});
  window.location.assign('../enter-password.html');
}
