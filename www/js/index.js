
document.addEventListener('deviceready', onDeviceReady, false);
var listaPizzasCadastradas = [];

function atualizarLista() {
    cordova.plugin.http.get('https://pedidos-pizzaria.glitch.me/admin/pizzas/pizzaria_142317',
    {},
    {},
    function (response) {
        listaPizzasCadastradas = JSON.parse(response.data);
        listaPizzas.innerHTML = '';
        listaPizzasCadastradas.forEach(pizza => {
            listaPizzas.innerHTML += `
            <li id="${pizza._id}">
                <h2>${pizza.pizza}</h2>
                <h3>R$ ${pizza.preco}</h3>
                <img style="display:none" src="${pizza.imagem}" alt="${pizza.pizza}"></img>
            </li>
            `;
        });
        document.getElementsByClassName('li').forEach(li => {
            alert(li);
        });
    },
    function (response) {
        console.error(response.error);
    });
}

function btnNovoFunc() {
    applist.style.display = 'none'; // oculta lista
    appcadastro.style.display = 'flex'; // exibe cadastro
    document.getElementById('pizza').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('imagem').src = '';
    btnExcluir.style.display = 'none';
}

function btnSalvarFunc() {
    let pizza = document.getElementById('pizza').value;
    let preco = document.getElementById('preco').value;
    let imagem = 'https://i.imgur.com/fCQHvUP.gif';

    let pizzaObj = {
        pizzaria: 'pizzaria_142317',
        pizza: pizza,
        preco: preco,
        imagem: imagem
    };

    cordova.plugin.http.post('https://pedidos-pizzaria.glitch.me/admin/pizza/',
    pizzaObj,
    {},
    function (response) {
        atualizarLista();
        btnCancelarFunc();
    },
    function (response) {
        console.error(response.error);
    });
}

function btnCancelarFunc() {
    applist.style.display = 'flex'; // exibe lista
    appcadastro.style.display = 'none'; // oculta cadastro
}

function btnExcluirFunc() {
// cordova.plugin.http.delete(`https://pedidos-pizzaria.glitch.me/admin/pizza/pizzaria_142317/arrroz`,
    // {},
    // {},
    // function(response){
    //     console.log(response.data)
    // },
    // function(response){
    //     console.log(response.error)
// });
}


function onDeviceReady() {
    cordova.plugin.http.setDataSerializer('json');

    applist = document.getElementById('applista');
    appcadastro = document.getElementById('appcadastro');
    listaPizzas = document.getElementById('listaPizzas');
    btnNovo = document.getElementById('btnNovo');
    btnFoto = document.getElementById('btnFoto');
    btnSalvar = document.getElementById('btnSalvar');
    btnCancelar = document.getElementById('btnCancelar');
    btnExcluir = document.getElementById('btnExcluir');

    atualizarLista();


    btnNovo.addEventListener('click', btnNovoFunc);
    btnSalvar.addEventListener('click', btnSalvarFunc);
    btnCancelar.addEventListener('click', btnCancelarFunc);
    btnExcluir.addEventListener('click', btnExcluirFunc);

    document.getElementById('deviceready').classList.add('ready');
}
