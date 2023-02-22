import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const dataInfo = {position, delay};
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(dataInfo)
      } else {
        reject(dataInfo)
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;
  let delay = Number(formElements.delay.value);
  const amount = Number(formElements.amount.value);
  const step = Number(formElements.step.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )} )
      .catch(({position, delay}) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        )});
    delay += step;
  }
  form.reset();
}

form.addEventListener('submit', handleSubmit);
