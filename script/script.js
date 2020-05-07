//Como puxar as informações do banco de dados
//https://www.youtube.com/watch?v=il0Dog9Y4xs 
//
//Banco de dados 1
//https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72

console.log('JS connected');
let summon = document.querySelector('#summon');
let deck = document.querySelector('#deck');

summon.addEventListener('click', function() {
    fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            response.forEach(function(location) {
                let newCard = document.createElement('div');
                newCard.classList.add('card');
                newCard.innerHTML = `
                <img src="${location.photo}" class="card__img">
                <div class="card__content">
                    <h3 class="card__title">${location.name}</h3>
                    <p class="card__type card__typeCasa">${location.property_type}</p>
                    <p class="card__adr">Endereço</p>
                    <p class="card__price">R$${location.price},00</p>
                </div>`;
                document.getElementById('deck').appendChild(newCard);
                //console.log(newCard);
            })
        })
});