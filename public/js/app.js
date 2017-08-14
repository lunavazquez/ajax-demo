// inicializa el contador
var pageCounter = 1;
// asocia el DOM element a una variable js
var animalContainer = document.getElementById('animal-info');
var btn = document.getElementById('btn');
// agrega un escucha al evento click
btn.addEventListener('click', function() {
    // crea nueva instancia del metodo XMLHttpRequest
    var ourRequest = new XMLHttpRequest();
    // abre conexion con metodo GET para la url siguiente
    ourRequest.open('GET','https://learnwebcode.github.io/json-example/animals-'+ pageCounter +'.json');
    // define que pasara cuando la respuesta cargue
    ourRequest.onload = function () {
        // tranforma la respuesta a una variable js
        var ourData = JSON.parse(ourRequest.responseText);
        // ejecucion de la funcion cuando conteste ajax
        renderHTML(ourData);
    };
    // envia el llamado
    ourRequest.send();
    // se aumenta el contador en 1
    pageCounter++;
    // oculta boton cuando se llega a 3
    if (pageCounter > 3) {
        btn.style.display = 'none';
    }
});
// funcion para renderizado de la respuesta a html
var renderHTML = function(data) {
    // inicializa la variable vacia
    var htmlString = '';
    // recorre el arreglo del json y lo concatena en la variable htmlString
    for (var i = 0; i < data.length; i++) {
        htmlString += '<p>' + data[i].name + ' is a ' + data[i].species + 'that likes to eat';
        // recorres los gustos de comida para cada animal
        for (ii = 0; ii < data[i].foods.likes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.likes[ii];
            } else {
                htmlString += ' and ' + data[i].foods.likes[ii];
            }
        }
        htmlString += ' and dislikes ';
        // recorres los disgustos de comida para cada animal
        for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
            if (ii == 0) {
                htmlString += data[i].foods.dislikes[ii];
            } else {
                htmlString += ' and ' + data[i].foods.dislikes[ii];
            }
        }
    }
    // insertas el nuevo template (htmlString) en el div#animal-info
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}
