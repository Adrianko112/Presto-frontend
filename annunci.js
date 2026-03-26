fetch('./annunci.json').then((response) => response.json()).then((data) => {

    let radioWrapper = document.getElementById('radio-wrapper');
    let cardWrapper = document.getElementById('card-wrapper');

    function radioCreate() {

        let categories = data.map((annuncio) => annuncio.category);

        let uniqueCategories = Array.from(new Set(categories));
        uniqueCategories.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `<input class="form-check-input" type="radio" name="categories" id="${category}">
                              <label class="form-check-label" for="${category}">
                                ${category}
                            </label>
                        </div>`;

            radioWrapper.appendChild(div);
        });
    }

radioCreate();

function truncateString(str) {
    if (str.length > 20) {
        return str.substring(0, 20) + '...';
    }
    return str;
}

function cardCreate(array) {
cardWrapper.innerHTML = '';

    array.forEach((annuncio, i) => {
        let div = document.createElement('div');
        div.classList.add('card-custom');
        div.innerHTML = `<img src="https://picsum.photos/${300+i}" class="card-img-top img-fluid img-card" alt="${annuncio.name}">
                         <p class="h2" title="${annuncio.name}">${truncateString(annuncio.name)}</p>
                         <p class="h4">${annuncio.category}</p>
                         <p class="lead">${annuncio.price} €</p>`; 
        cardWrapper.appendChild(div);
    }); 
}

cardCreate(data);

function filterCards(category) {
    if (category!='all') {
        let filteredData = data.filter((annuncio) => annuncio.category === category);
        cardCreate(filteredData);
    } else {
        cardCreate(data);
    }

}

let radioButtons = document.querySelectorAll('.form-check-input');

radioButtons.forEach((Button) => {
    Button.addEventListener('click', () => {
      filterCards(Button.id);
    }); 
}); 
});

