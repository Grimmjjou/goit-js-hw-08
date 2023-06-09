import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    message: document.querySelector('.feedback-form textarea'),
}

refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput() {
    const formData = JSON.stringify({email: refs.email.value, message: refs.message.value});
    localStorage.setItem(LOCALSTORAGE_KEY, formData);
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  
    event.preventDefault();
  
    if (!event.target.email.value  || !event.target.message.value) {
        alert('Заповніть усі поля');
        return;        
    }
    console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    event.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
}
outputFromLocalStorage();

function outputFromLocalStorage() {
    const outputData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (outputData) {
        refs.email.value = outputData.email;
        refs.message.value = outputData.message;
    }
}