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
  console.clear();
  e.preventDefault();
       if (refs.input.value === "" || refs.textarea.value === "") {
           return alert(`Заповніть порожні поля!!`);
       }
  const { email, message } = e.currentTarget.elements;
  console.log({ email: email.value, message: message.value });
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(LOCAL_KEY);
  formData = {};
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
