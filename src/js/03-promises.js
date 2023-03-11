import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
}

refs.form.addEventListener('submit', (event) => {
  event.preventDefault()
  for (let i = 0; i < refs.amount.value; i++) {
    let position = i + 1
    const delay = Number(refs.delay.value) + refs.step.value * i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  event.target.reset()
})


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay })
      } else {
        // Reject
        reject({ position, delay })
      }
    }, delay);
  })
}




