document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const opened = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!opened));
  navigation.classList.toggle('is-open', !opened);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
const form = document.querySelector('#booking-form');
const status = document.querySelector('#form-status');
document.querySelectorAll('[data-class]').forEach(link => {
  link.addEventListener('click', () => {
    form.elements.class.value = link.dataset.class;
    status.textContent = '';
  });
});
form.addEventListener('invalid', () => form.classList.add('attempted'), true);
form.addEventListener('input', () => { status.textContent = ''; });
form.addEventListener('change', () => { status.textContent = ''; });
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  if (name.length < 2) {
    form.elements.name.setCustomValidity('Введи имя: минимум две буквы или символа без пробелов по краям.');
    form.elements.name.reportValidity();
    return;
  }
  const selected = form.elements.class.selectedOptions[0].textContent;
  status.textContent = `${name}, всё заполнено! Выбран формат «${selected}». Это демонстрация: заявка не отправлена, данные остались только в полях формы.`;
});
form.elements.name.addEventListener('input', () => form.elements.name.setCustomValidity(''));
form.addEventListener('reset', () => {
  status.textContent = '';
  form.classList.remove('attempted');
});
form.querySelector('button[type="submit"]').disabled = false;
