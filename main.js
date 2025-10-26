// const arr = [123, 2, 3, 4, 5, 6, 237, 8, 9, 10]

// function MinMax(arr) {
//     let min = arr[0];
//     let max = arr[0];

//     for(let i = 0; i < arr.length; i++) {
//         if(min > arr[i]) {
//             min = arr[i];
//         }
//         if(max < arr.length) {
//             max = arr[i];
//         }
//     }

//     return `Eng kichik son: ${min}, Eng kotta son: ${max}`
// }

// console.log(MinMax(arr));








// let arr = [1, 2, 33, 55, 66, 44, 88, 99, 4794, 51321, 2, 2, 0]

// function MinMaxfuntion(arr) {
//     let min = arr[0];
//     let max = arr[0];

//     for(i = 0; i < arr.length;i++){
//         if(min > arr[i]) {
//             min = arr[i]
//         }
//         if(max < arr[i]) {
//             max = arr[i]
//         }
//     }

//     return `kotta: ${min}, kichik: ${max}`

// }

// console.log(MinMaxfuntion(arr));

// let num = 'molas';

// let res = num.split('').reverse().join('');

// console.log(res);



// let sal = 'salom';
// let res = ''

// for(let i = sal.length - 1; i >= 0; i--){
//     res += sal[i]
// }
// console.log(res);





// let group ='salom';

// let res = group.split('').reverse().join('');

// console.log(
// res
// );





// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// function MinMax(arr) {
//     let min = arr[0];
//     let max = arr[0];

//     for(i = 0;i < arr.length; i++) {
//         if(min > arr[i]) {
//             min = arr[i]
//         }
//         else if(max < arr[i]) {
//             max = arr[i]
//         }
//     }
//     return `Min: ${min}, Max: ${max}`
// }

// console.log(MinMax(arr));




// let ism = 'Jahongir';

// let res = '';

// for(let i = ism.length - 1; i >= 0; i--) {
//     res += ism[i]
// }

// console.log(res);

// let btn = document.getElementById('btnn')
// let img = document.getElementById('container')
// let fuck = document.getElementById('fuck')

// btn.addEventListener('click', (event) => {
//     btn.remove();
//     img.style.display = 'flex';
//     fuck.remove();
// })

//     let count = 0;

//     function increment() {
//       count++;
//       document.getElementById("counter").innerText = count;
//     }

//     function decrement() {
//       count--;
//       document.getElementById("counter").innerText = count;
//     }

// console.log(increment(55));


// let num = 1;
// let str = '11';

// console.log(num + str);

// let a = '10';
// let b = '10.3';

// console.log(Number(b));
// console.log(Number.parseInt(b));
// console.log(Number.apply(b));

// console.log(true == true);


// const content = document.querySelector('.content');
// const send = document.querySelector('.active');
// const btn = document.querySelector('.btn');

// fetch("https://68fc61c596f6ff19b9f4f2dc.mockapi.io/ap1/users")
//     .then((response) => response.json())
//     .then((data) => { data.forEach((item) => {
//        newDiv.innerHTML += `
//         <h1>user: ${item.name}</h1>
//         <p>age: ${item.age}</p>
//         <hr>
//     `}) 
//     }) 
//     .catch((error) => console.log(error))

//     content.innerHTML = '';

//     const newDiv = document.createElement('div')

//     newDiv.className = 'person';
//     content.prepend(newDiv);
// btn.addEventListener('click', (event) => {
// })


const content = document.querySelector('.content');
const btn = document.querySelector('.btn');
const nameInput = document.querySelector('#name');
const ageInput = document.querySelector('#age');
const imgInput = document.querySelector('#img');

// API-dan mavjud foydalanuvchilarni olish
fetch("https://68fc61c596f6ff19b9f4f2dc.mockapi.io/ap1/users")
  .then((response) => response.json())
  .then((data) => {
    content.innerHTML = '';
    data.forEach((item) => addUserToDOM(item.name, item.age, item.avatar || item.img, item.id));
  })
  .catch((error) => console.log(error));

// DOMga foydalanuvchini qo‘shish funksiyasi
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

  // Delete
  div.querySelector('.delete').addEventListener('click', () => {
    const confirmDelete = confirm(`${name} ni o‘chirishni xohlaysizmi?`);
    if (!confirmDelete) return;

    fetch(`https://68fc61c596f6ff19b9f4f2dc.mockapi.io/ap1/users/${id}`, {
      method: "DELETE"
    })
      .then(() => div.remove())
      .catch(err => console.log(err));
  });

  // Edit
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

// Yangi foydalanuvchi qo‘shish
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
