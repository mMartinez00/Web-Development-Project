const container = document.querySelector('.auth__container');
const signUpBtn = document.getElementById('auth-signup-toggle');
const signInBtn = document.getElementById('auth-signin-toggle');

signUpBtn.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInBtn.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});
