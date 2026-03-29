let opener = document.querySelector(".opener");
let circle = document.getElementById("circle");

let people = [
    {
        name: "Adriano",
        description: "CEO & Founder",
        url: "https://media-assets.wired.it/photos/615d7704d8b66b13086ceb46/16:9/w_1280,c_limit/wired_placeholder_dummy.png"
    },
    {
        name: "Walter",
        description: "Capo prodotto",
        url: "https://i.pinimg.com/474x/42/ea/4c/42ea4c145e561d7a80673eacfb5d9a9f.jpg"
    },
    {
        name: "Jesse",
        description: "Agente operativo",
        url: "https://i.pinimg.com/736x/29/73/43/297343755c727ec8fe5859af846e6d51.jpg"
    },
    {
        name: "Saul",
        description: "Difensore legale",
        url: "https://media-assets.wired.it/photos/615eb391f82cb72dc4b8c35e/1:1/w_1280%2Cc_limit/5a39dc9a-3b29-4f23-a718-7b3a6e299523.jpg"
    },
];

people.forEach((person) => {
    let div = document.createElement("div");
    div.classList.add("moved");
    div.style.backgroundImage = `url(${person.url})`;
    circle.appendChild(div);
});



let movedDivs = document.querySelectorAll(".moved");

let check = false;
let flipCard = document.querySelector(".flipCard");


opener.addEventListener("click", () => {
    if (check==false) {
         opener.style.transform = "rotate(45deg)";
    movedDivs.forEach((moved, i) => {
        let angle = (360 * i) / movedDivs.length;
        moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
    });
    check = true;
    } else {
        check = false;
        opener.style.transform = "rotate(0deg)";
        movedDivs.forEach((moved) => {
            moved.style.transform = "rotate(0deg) translate(0)";
        });
        flipCard.classList.add("d-none");
    }
});

let innerFace = document.querySelector(".innerFace");
let cardName = document.querySelector("#cardName");
let cardDescription = document.querySelector("#cardDescription");


movedDivs.forEach((moved, i) => {
    moved.addEventListener("click", () => {
        let persona = people[i];
        innerFace.style.backgroundImage = `url(${persona.url})`;
        cardName.textContent = persona.name;
        cardDescription.textContent = persona.description;
        flipCard.classList.remove("d-none");
    });
    }); 