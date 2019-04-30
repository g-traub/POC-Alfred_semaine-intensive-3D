const canvas = document.querySelector('#gameContainer');
const alfred = document.querySelector('.alfred__image');
const text = document.querySelector('.alfred__text');

alfred.addEventListener('click', () => {
  console.log('click');
  alfred.classList.add('hidden');
  text.classList.add('disappear');
})