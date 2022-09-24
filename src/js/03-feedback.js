import throttle from 'lodash.throttle';

const formData = {};
const feedbackForm = document.querySelector('.feedback-form');

// console.log(feedbackForm.elements.name('email').value);
function onLoadDataForm() {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));
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

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const submitForm = function (evt) {
  evt.preventDefault();

  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  feedbackForm.reset();

  formData.email = '';
  formData.message = '';
};

feedbackForm.addEventListener('input', throttle(changeFormInput, 500));
feedbackForm.addEventListener('submit', submitForm);
