const wishlist = document.querySelector('.wishlist');
wishlist?.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-product')) {
    const addForm = document.querySelector('.add-one-product');
    addForm.classList.toggle('invisible');
  }
  if (event.target.classList.contains('checkbox')) {
    console.log('boom');
    event.target.parerntElement.classList.toggle('bg-success');
  }
});

const addForm = document.querySelector('.add-one-product');
addForm?.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-row-button')) {
    console.log('Клик на кнопку добавить');
    // TODO: fetch на загрузку позиции в БД и перезагрузка формы
  }
});
