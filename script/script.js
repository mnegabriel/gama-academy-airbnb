console.log('JS connected');

let deck = document.querySelector('.deck');

let db1Array = 0;
let db2Array = 0;
let final = 0;


window.onload = function() {

    //fetching from database 1
    fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
        .then(function(response) {
            return response.json();
        })

    .then(function(response) {
        db1Array = response;
    })

    //fetching from database 2
    .then(fetch('https://api.jsonbin.io/b/5eb5b66da47fdd6af15fdbc1/4')
        .then(function(response) {
            return response.json();
        })

        .then(function(response) {
            db2Array = response;
        })

        .then(function() {
            //Merging databases data into one
            final = db1Array.map(function(_, i) {
                return {
                    db1: db1Array[i],
                    db2: db2Array[i]
                };
            })
            console.log(final);
        })
        .then(function() {


                //for each object inside the variable 'final'
                final.forEach(function(data) {
                    let newCard = document.createElement('div');



                    //----- Icon choice
                    let icon = 'Casa';

                    switch (data.db1.property_type) {
                        case 'Casa':
                            icon = 'Casa';
                            break;
                        case 'Apartamento':
                            icon = 'Apt';
                            break;
                        case 'Loft':
                            icon = 'Loft';
                            break;
                        case 'Chácara':
                            icon = 'Chacara';
                            break;
                        case 'Estúdio':
                            icon = 'Estudio';
                            break;
                        case 'Quarto':
                            icon = 'Quarto';
                            break;
                        case 'Sítio':
                            icon = 'Sitio';
                            break;

                    }

                    //----- / Icon choice

                    //assing a class and the innerHTML to the new div
                    newCard.classList.add('card');
                    newCard.classList.add(data.db2.Bairro);
                    newCard.innerHTML = `
                <img src="${data.db1.photo}" class="card__img">
                <div class="card__content">
                    <h3 class="card__title">${data.db1.name}</h3>
                    <p class="card__type card__type${icon}">${data.db1.property_type}</p>
                    <p class="card__adr">${data.db2.Endereço} - ${data.db2.Bairro}</p>
                    <p class="card__price">R$${data.db1.price},00 / dia</p>
                </div>`;
                    document.querySelector('.deck').appendChild(newCard);
                })
            }

        ).then(function() {
            console.log(final);

        })
    )
}


setTimeout(function initMap() {
    //Map options
    var options = {
        zoom: 14,
        center: {
            lat: -3.74399,
            lng: -38.51612
        }
    }

    //New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    //Adding markers;    

    final.forEach(function(data) {

        let latMark = data.db2.Latitude;
        let lngMark = data.db2.Longitude;
        let newLatMark = latMark.replace(/,/i, '.')
        let newLngMark = lngMark.replace(/,/i, '.')
        console.log(newLatMark + "  " + newLngMark);

        addMarker({
            coords: {
                lat: Number(newLatMark),
                lng: Number(newLngMark)
            },
            content: data.db1.name
        });
    });

    function addMarker(props) {

        var marker = new google.maps.Marker({
            position: props.coords,
            map: map

        });
        var infoWindow = new google.maps.InfoWindow({
            content: `<p>${props.content}</p>`
        });
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        })

    }

}, 3500)