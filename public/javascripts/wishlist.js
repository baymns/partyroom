// отображение меню добавления нового вишлиста
const addWishList = document.querySelector('.add-wishlist');
addWishList?.addEventListener('click', (event) => {
  const add = document.querySelector('.add-new-wishlist');
  add?.classList.toggle('invisible');
});

// отправка на ручку создание нового вишлиста
const sendNewWishlist = document.querySelector('.add-wishlist-button');
sendNewWishlist?.addEventListener('click', async (event) => {
  event.preventDefault();
  const url = window.location.href.toString().split(window.location.host)[1];
  const roomId = url.split('/')[2];
  const wName = document.querySelector('.new-wishlist-input');
  const response = await fetch(`/rooms/${roomId}/wishlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: wName.value }),
  });
  const result = await response.json();
  window.location.reload();
});

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
