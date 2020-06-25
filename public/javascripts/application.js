document.body.addEventListener('click', async event => {
  if (event.target.id === 'add-main-btn') {
    event.preventDefault();
    const req = await fetch('/template/roomform.hbs');
    const res = await req.text();
    const template = Handlebars.compile(res);
    const form = template({ res });
    const div = event.target.closest('.add-button').nextElementSibling;
    div.style.margin = '20px auto';
    if (div.innerHTML === form) {
      div.innerHTML = '';
    } else {
      div.innerHTML = form;
    }
  }

  if (event.target.classList.contains('delete-room')) {
    event.preventDefault();
    const id = event.target.id;
    const res = await fetch(`/rooms/${id}`, {
      method: 'DELETE'
    })
    if (res.status === 200) {
      const div = event.target.closest('.room')
      div.remove()
    }
  }

})
