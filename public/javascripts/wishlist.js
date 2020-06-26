// отображение меню добавления нового вишлиста
const addWishList = document.querySelector('.add-wishlist');
addWishList?.addEventListener('click', (event) => {
  const add = document.querySelector('.add-new-wishlist');
  add?.classList.toggle('invisible');
});

// отправка на ручку Cоздание нового вишлиста (Категории)
const sendNewWishlist = document.querySelector('.add-wishlist-button');
sendNewWishlist?.addEventListener('click', async (event) => {
  event.preventDefault();
  const wName = document.querySelector('.new-wishlist-input');
  const response = await fetch('/rooms/wishlists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: wName.value }),
  });
  const result = await response.json();
  console.log(result);
});

// отображение формы добавления нового элемента списка
const wishlist = document.querySelector('.wishlist');
wishlist?.addEventListener('click', async (event) => {
  if (event.target.classList.contains('add-product')) {
    const addForm = document.querySelector('.add-one-product');
    addForm?.classList.toggle('invisible');
  }
  // подкрашиваем зеленым если продукт куплен
  if (event.target.classList.contains('checkbox')) {
    event.target.parentElement.children[1].classList.toggle('bg-success');
    // TODO: добавить fetch для записи в БД
  }
  // удаление элемента из списка
  if (event.target.classList.contains('delete-item')) {
    const url = window.location.href.toString().split(window.location.host)[1];
    const roomId = url.split('/')[2];
    const wishlistId = url.split('/')[4].replace('#', '');
    const response = await fetch(`/rooms/${roomId}/wishlist/${wishlistId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wishlistItem: ' какой то Id' }),
    });
    const result = await response.json();
    event.target.parentElement.remove();
    console.log(result);
  }
});

// добавляем новый элемент в список вишлиста
const addForm = document.querySelector('.add-one-product');
addForm?.addEventListener('click', async (event) => {
  if (event.target.classList.contains('add-row-button')) {
    event.preventDefault();
    // вытащить данные из двух инпутов
    const name = document.querySelector('.add-input-name').value;
    const price = document.querySelector('.add-input-price').value;
    const isBuy = document.querySelector('.add-input-isbuy').checked;
    // TODO: запись в БД и перезагрузка страницы
    const url = window.location.href.toString().split(window.location.host)[1];
    const roomId = url.split('/')[2];
    const wishlistId = url.split('/')[4].replace('#', '');
    console.log(roomId, wishlistId);
    const response = await fetch(`/rooms/${roomId}/wishlist/${wishlistId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemname: name,
        itemprice: price,
        itemisbuy: isBuy,
      }),
    });
    const result = await response.json();
  }
});
