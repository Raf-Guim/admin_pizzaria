
document.addEventListener('deviceready', onDeviceReady, false);
var listaPizzasCadastradas = [];
var pizza = null;

function atualizarLista() {
    cordova.plugin.http.get('https://pedidos-pizzaria.glitch.me/admin/pizzas/pizzaria_142317',
    {},
    {},
    function (response) {
        listaPizzasCadastradas = JSON.parse(response.data);
        listaPizzas.innerHTML = '';
        listaPizzasCadastradas.forEach((item, idx) => {
            const novo = document.createElement('li');
                        novo.innerHTML = `<h2>${item.pizza}</h2><h3>R$ ${item.preco}</h3><figure><img src="${item.imagem}" alt=""></figure>`;
            novo.id = idx;
            novo.onclick = function () {
                carregarDadosPizza (novo.id);
            };
            listaPizzas.appendChild(novo);
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
    let pizzaNome = document.getElementById('pizza').value;
    let preco = document.getElementById('preco').value;
    let imagem = 'https://i.imgur.com/fCQHvUP.gif';
    let pizzaObj = {};
    if (pizza) {
        pizzaObj = {
            pizzaid: pizza._id,
            pizzaria: pizza.pizzaria,
            pizza: pizzaNome,
            preco: preco,
            imagem: imagem
        };
        cordova.plugin.http.put('https://pedidos-pizzaria.glitch.me/admin/pizza/',
        pizzaObj,
        {},
        function (response) {
            alert('Pizza atualizada com sucesso!')
            atualizarLista();
            btnCancelarFunc();
        },
        function (response) {
            console.error(response.error);
        });
    } else {
        pizzaObj = {
            pizzaria: 'pizzaria_142317',
            pizza: pizzaNome,
            preco: preco,
            imagem: imagem
        };
    
        cordova.plugin.http.post('https://pedidos-pizzaria.glitch.me/admin/pizza/',
        pizzaObj,
        {},
        function (response) {
            alert('Pizza cadastrada com sucesso!')
            atualizarLista();
            btnCancelarFunc();
        },
        function (response) {
            console.error(response.error);
        });
    }

    
}

function btnCancelarFunc() {
    applist.style.display = 'flex'; // exibe lista
    appcadastro.style.display = 'none'; // oculta cadastro
    pizza = null;
}

function btnExcluirFunc() {
    cordova.plugin.http.delete(`https://pedidos-pizzaria.glitch.me/admin/pizza/pizzaria_142317/${pizza.pizza}`,
        {},
        {},
        function(response){
            console.log(response.data)
        },
        function(response){
            console.log(response.error)
    });
    alert('Pizza excluída com sucesso!')
    atualizarLista();
    btnCancelarFunc();
}

function btnFotoFunc() {
    alert('Foto adicionada com sucesso!');
    document.getElementById('imagem').src = 'https://i.imgur.com/fCQHvUP.gif';
}

function carregarDadosPizza (id) {
    pizza = listaPizzasCadastradas[id];
    applist.style.display = 'none'; // oculta lista
    appcadastro.style.display = 'flex'; // exibe cadastro
    document.getElementById('pizza').value = `${pizza.pizza}`;
    document.getElementById('preco').value = `${pizza.preco}`;
    document.getElementById('imagem').src = `${pizza.imagem}`;
    btnExcluir.style.display = 'block';
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
    btnFoto.addEventListener('click', btnFotoFunc);

    document.getElementById('deviceready').classList.add('ready');
}
