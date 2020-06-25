const wishlist = document.querySelector('.wishlist');
wishlist?.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-product')) {
    const addForm = document.querySelector('.add-one-product');
    addForm?.classList.toggle('invisible');
  }
  if (event.target.classList.contains('checkbox')) {
    event.target.parentElement.children[1].classList.toggle('bg-success');
  }
});

const addForm = document.querySelector('.add-one-product');
addForm?.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-row-button')) {
    // TODO: запись в БД и перезагрузка страницы

    window.location.reload();
  }
});
