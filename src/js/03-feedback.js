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
    formData = {};
  } else {
    alert('Заполните все поля, пожалуйста!');
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






















// import throttle from "lodash.throttle";

// const STORAGE_KEY = 'feedback';
// const formData ={};

// const refs = {
//     form: document.querySelector('.js-feedback'),
//     textarea: document.querySelector('.js-feedback textarea'),
// };

// refs.form.addEventListener('submit', onFormsubmit);
// refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

// refs.form.addEventListener('input', e => {
//     // console.log(e.target.name);
//     // console.log(e.target.value);

//     formData[e.target.name] = e.target.value;
//     localStorage.setItem(FORM_STATE, JSON.stringify(formData));
//     console.log(formData);
// });

// populateTextarea();

// function onFormsubmit(evt) {
//     evt.prevenDefault();
//     console.log('Отправляем форму');
//     evt.curentTarget.reset();
//     localStorage.removeItem(STORAGE_KEY);
// };

// function onTextareaInput(evt) {
//     const message = evt.target.value;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(message));
// };

// function populateTextarea() {
//     const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
//     if (savedMessage) {
//         console.log(savedMessage);
//         refs.textarea.value = savedMessage;
//     }
// };
