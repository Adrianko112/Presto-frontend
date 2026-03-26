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




function cardCreate() {

    data.forEach((annuncio) => {
        let div = document.createElement('div');
        div.classList.add('card-custom');
        div.innerHTML = `<p class="h2">${truncateString(annuncio.name)}</p>
                         <p class="h4">${annuncio.category}</p>
                         <p class="lead">${annuncio.price} €</p>`; 
        cardWrapper.appendChild(div);
    }); 
}

cardCreate();



});

