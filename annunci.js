
fetch('./annunciBR.json').then((response) => response.json()).then((data) => {

    data.sort((a, b) => a.price - b.price);

    let radioWrapper = document.getElementById('radio-wrapper');
    let cardWrapper = document.getElementById('card-wrapper');

    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category);
        let uniqueCategories = Array.from(new Set(categories));
        
        
        let allDiv = document.createElement('div');
        allDiv.classList.add('form-check');
        allDiv.innerHTML = `<input class="form-check-input" type="radio" name="categories" id="all" checked>
                            <label class="form-check-label" for="all">Tutte le categorie</label>`;
        radioWrapper.appendChild(allDiv);

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
        array.forEach((annuncio) => {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `<img src="${annuncio.img}" class="card-img-top img-fluid img-card" alt="${annuncio.name}">
                             <p class="h2" title="${annuncio.name}">${truncateString(annuncio.name)}</p>
                             <p class="h4" title="${annuncio.category}">${truncateString(annuncio.category)}</p>
                             <p class="lead">${annuncio.price} €</p>`; 
            cardWrapper.appendChild(div);
        }); 
    }

    cardCreate(data);

    // FUNZIONI DI FILTRO 

    function filterCards(array) {
        
        let currentRadioButtons = document.querySelectorAll('.form-check-input');
        let checkedButton = Array.from(currentRadioButtons).find((button) => button.checked);
        let categoria = checkedButton ? checkedButton.id : 'all';

        if (categoria !== 'all') {
            return array.filter((annuncio) => annuncio.category === categoria);
        } else {
            return array;
        }
    }

    function filterByPrice(array) {
        
        let price = Number(priceInput.value); 
        return array.filter((annuncio) => +annuncio.price <= price);
    }

    function filterByKeyword(array) {
        let term = keywordInput.value.toLowerCase();
        return array.filter((annuncio) => annuncio.name.toLowerCase().includes(term));
    }

    // GLOBAL FILTER

    function globalFilter() {
        let filteredByCategory = filterCards(data); 
        let filteredByPrice = filterByPrice(filteredByCategory); 
        let filteredByKeyword = filterByKeyword(filteredByPrice); 
        cardCreate(filteredByKeyword); 
    }

    // EVENT LISTENERS 

    
    let radioButtons = document.querySelectorAll('.form-check-input');
    radioButtons.forEach((button) => {
        button.addEventListener('click', () => {
          globalFilter();
        }); 
    }); 

    let priceInput = document.querySelector('#priceRange');
    let priceValue = document.querySelector('#priceValue');

    function setPriceInput() {
        let prices = data.map((annuncio) => +annuncio.price);
        let maxPrice = Math.ceil(Math.max(...prices));
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = `Prezzo: ${maxPrice} €`;
    }

    setPriceInput();

    priceInput.addEventListener('input', () => {
        priceValue.innerHTML = `Prezzo: ${priceInput.value} €`;
        globalFilter();
    });

    let keywordInput = document.querySelector('#keywordInput');
    keywordInput.addEventListener('input', () => {
        globalFilter();
    });

});