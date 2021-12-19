const API_KEY = "https://www.googleapis.com/books/v1/volumes?q=batman";
const parent = document.querySelector('#parent');
const searchItem = document.querySelector('#search');
const form = document.querySelector('form');

async function getResult(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayResult(data.items);
}


getResult(API_KEY);

function displayResult(data){
    data.forEach(item => {
        let div = document.createElement('div');
        div.classList.add('col-md-4');
        div.classList.add('my-3');
        div.classList.add('item');
        console.log(item);
        div.innerHTML = `
        <div class="card p-4 shadow">
        <div class="figure">
            <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="book-img class="img-fluid">
            <div class="figure-caption">${item.volumeInfo.title}</div>
        </div>
        <div class="text">
            <span class="publisher h4">${item.volumeInfo.authors}</span>
            <h6 class="published-date h5">${item.volumeInfo.publishedDate}</h6>
            <p>
              ${item.volumeInfo.description.slice(0,200)}.
            </p>
            <a href="${item.volumeInfo.previewLink}" target="blank" class="btn btn-outline-primary d-block w-100">More info</a>
        </div>
        </div>
        `;
        parent.appendChild(div);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(searchItem.value !== ""){
        parent.innerHTML = "";
        const seachTerm = searchItem.value;
        getResult(API_KEY + seachTerm);
        setTimeout(() => {
            searchItem.value = '';
        }, 200);
    }
    else{
        alert("Write something");
    }
})

