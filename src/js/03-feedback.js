import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";

const formData = {};
const feedbackForm = document.querySelector('.feedback-form');

function onLoadDataForm() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!data) {
    return null;
  }
  feedbackForm.email.value = data.email;
  feedbackForm.message.value = data.message;
}

onLoadDataForm();

const changeFormInput = function (evt) {
  formData.email = feedbackForm.email.value;
  formData.message = feedbackForm.message.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const submitForm = function (evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(localStorage.getItem(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';
};

feedbackForm.addEventListener('input', throttle(changeFormInput, 500));
feedbackForm.addEventListener('submit', submitForm);
