const wishlist = document.querySelector('.wishlist');

wishlist.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-product')) {
    const addForm = document.querySelector('.add-one-product');
    if (addForm.classList.contains('invisible')) {
      addForm.classList.remove('invisible');
    } else {
      addForm.classList.add('invisible');
    }
  }
});
