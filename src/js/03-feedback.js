import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
getFormOutput();

refs.form.addEventListener('input', throttle(onSaveInput, 500));
refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  if (formData.email && formData.message) {
    e.preventDefault();
    e.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    localStorage.removeItem(STORAGE_KEY);
  } else {
    alert('Заповніть порожні поля!');
  }
}

function onSaveInput(e) {
  const userMessage = e.target.value;
  const userEmail = e.target.name;
  formData[userEmail] = userMessage;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getFormOutput() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFormData) {
    refs.email.value = savedFormData.email || '';
    refs.message.value = savedFormData.message || '';
  }
}
