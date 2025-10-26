

const content = document.querySelector('.content');
const btn = document.querySelector('.btn');
const nameInput = document.querySelector('#name');
const ageInput = document.querySelector('#age');
const imgInput = document.querySelector('#img');

fetch("https://68fc61c596f6ff19b9f4f2dc.mockapi.io/ap1/users")
  .then((response) => response.json())
  .then((data) => {
    content.innerHTML = '';
    data.forEach((item) => addUserToDOM(item.name, item.age, item.avatar || item.img, item.id));
  })
  .catch((error) => console.log(error));

function addUserToDOM(name, age, img, id) {
  const div = document.createElement('div');
  div.className = 'person';
  div.dataset.id = id;

  const imageSrc = img || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  div.innerHTML = `
    <img src="${imageSrc}" alt="${name}" class="avatar">
    <div class="info">
      <h2>${name}</h2>
      <p>Yosh: ${age}</p>
    </div>
    <div class="actions">
      <button class="edit"><i class="fa-solid fa-user-pen"></i></button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>
  `;

  div.querySelector('.delete').addEventListener('click', () => {
    const confirmDelete = confirm(`${name} ni o‘chirishni xohlaysizmi?`);
    if (!confirmDelete) return;

    fetch(`https://68fc61c596f6ff19b9f4f2dc.mockapi.io/ap1/users/${id}`, {
      method: "DELETE"
    })
      .then(() => div.remove())
      .catch(err => console.log(err));
  });

  div.querySelector('.edit').addEventListener('click', () => {
    const newName = prompt("Yangi ism kiriting:", name);
    const newAge = prompt("Yangi yosh kiriting:", age);
    const newImg = prompt("Yangi rasm URL kiriting:", imageSrc);

    if (newName && newAge && newImg) {
      fetch(`https://68fc61c596f6ff19b9f4f2dc.mockapi.io/ap1/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, age: newAge, avatar: newImg })
      })
        .then(() => {
          div.querySelector('h2').textContent = newName;
          div.querySelector('p').textContent = `Yosh: ${newAge}`;
          div.querySelector('img').src = newImg;
        })
        .catch(err => console.log(err));
    }
  });

  content.prepend(div);
}

btn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const img = imgInput.value.trim();

  if (name === '' || age === '') {
    alert('Iltimos, ism va yosh kiriting!');
    return;
  }

  fetch("https://68fc61c596f6ff19b9f4f2dc.mockapi.io/ap1/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, avatar: img })
  })
    .then(res => res.json())
    .then(newUser => addUserToDOM(newUser.name, newUser.age, newUser.avatar, newUser.id));

  nameInput.value = '';
  ageInput.value = '';
  imgInput.value = '';
});
