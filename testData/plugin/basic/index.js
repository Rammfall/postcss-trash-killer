export default () => {
  const link = document.querySelector('.link');

  link.addEventListener('click', () => {
    link.classList.toggle('lint__red');
  });
};
