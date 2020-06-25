document.body.addEventListener('click', async event => {
  if (event.target.classList.contains('delete-room')) {
    event.preventDefault();
    const id = event.target.id;
    const res = await fetch(`/rooms/${id}`, {
      method: 'DELETE'
    })
    console.log(res);

    if (res.status === 200) {
      const div = event.target.closest('.room')
      div.remove()
    } 
    // else {
    //   const div = event.target.closest('.room')
    //   const error = document.createElement('div');
    //   error.className('delete-error')
    //   div.append(error)
    // }
  }

})
