//cambio navbar allo scroll

let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll(".nav-link");
let dna = document.querySelector("#dna");
let check = false;
let collapse = document.querySelector("#collapse");

window.addEventListener('scroll', function() {
    let scrolled = window.scrollY;
    if (scrolled > 0) {
        navbar.classList.remove("bg-green");
        navbar.classList.add("bg-dark");
        collapse.classList.remove("bg-green");
        collapse.classList.add("bg-dark");
        navbar.style.height = "70px";
    }   else {  
        navbar.classList.remove("bg-dark");
        navbar.classList.add("bg-green");
        collapse.classList.remove("bg-dark");
        collapse.classList.add("bg-green");
        navbar.style.height = "140px";
    }
});

dna.addEventListener('click', function() {
    if (check == false) {
        dna.style.transform = "rotate(90deg)";
        check = true;
    } else {
        dna.style.transform = "rotate(0deg)";
        check = false;
    } 
}); 


//chiamate asincrone per i numeri incrementali

let firstNumber = document.getElementById("first-number");
let secondNumber = document.getElementById("second-number");
let thirdNumber = document.getElementById("third-number");

let confirmed = true;

function intervallo(n,element,time) {
    let counter=0;
    let interval = setInterval(() =>{
    if (counter < n) {
        counter ++;
        element.innerHTML = counter;
    } else {
        clearInterval(interval);
    }
}, time);

setTimeout(() => {
    confirmed = true; 
    
}, 10000);
};



let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && confirmed) {
            intervallo(299, firstNumber, 20);
            intervallo(499, secondNumber, 20);
            intervallo(699, thirdNumber, 7);
            confirmed = false;
            
        }
    });

});

observer.observe(firstNumber);



let reviews = [
    {
        user : 'Adriano',
        description : 'Il più bel sito del mondo .',
        rank: 5
    },
     {
        user : 'gioele',
        description : 'Totalmente inutile, non serve a niente.',
        rank: 1
    },
     {
        user : 'Sonia',
        description : 'Ottimo sito, lo consiglio a tutti.',
        rank: 4
    },
     {
        user : 'Joyce',
        description : 'Provette perfette, non ho avuto nessun problema.',
        rank: 5
    },
];

let swiperWrapper = document.querySelector(".swiper-wrapper");

reviews.forEach((recensione) => {
    let div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
         <div class="card-review bg-green ">
        <p class="lead text-center ">${recensione.description}</p>
        <p class="h4 text-center "> ${recensione.user} </p>
        <div class="d-flex justify-content-center gap-2 star">
        
        </div>
      </div>
    `;
    swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll(".star");

stars.forEach((star, index) => {
    for (let i = 0; i < reviews[index].rank; i++) {
        let starIcon = document.createElement("i");
        starIcon.classList.add("fa-solid", "fa-star");
        star.appendChild(starIcon);
    }

    let difference = 5 - reviews[index].rank;
    for (let i = 0; i < difference; i++) {
        let starIcon = document.createElement("i");
        starIcon.classList.add("fa-regular", "fa-star");
        star.appendChild(starIcon);
    }
});


//js swiper
    const swiper = new Swiper('.swiper', {
  // Optional parameters
    effect: "cards",
      grabCursor: true,
    
     
 
  

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});