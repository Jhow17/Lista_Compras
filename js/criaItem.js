import { editarItem } from "./editarItem.js";
import { excluirItem } from "./excluirItem.js";


const listaComprados = document.querySelector('#lista-comprados')
const listaCompras = document.querySelector('#lista-compras')
let contador = 0

// Função para salvar lista no LocalStorage
function salvarListaNoLocalStorage(listaCompras, listaComprados) {
    const listaParaSalvar = {
        compras: Array.from(listaCompras.children).map(item => item.innerText),
        comprados: Array.from(listaComprados.children).map(item => item.innerText)
    };
    localStorage.setItem('listaDeCompras', JSON.stringify(listaParaSalvar));
}

// Função para carregar lista do LocalStorage
function carregarListaDoLocalStorage() {
    const listaSalva = JSON.parse(localStorage.getItem('listaDeCompras'));
    if (listaSalva) {
        listaSalva.compras.forEach(itemText => {
            const item = { value: itemText }; // Simula o objeto de input
            listaCompras.appendChild(criarItem(item));
        });
        listaSalva.comprados.forEach(itemText => {
            const item = { value: itemText }; // Simula o objeto de input
            const itemLista = criarItem(item);
            listaComprados.appendChild(itemLista);
            const checkboxCustomizado = itemLista.querySelector('.checkbox-customizado');
            checkboxCustomizado.classList.add('checked');
        });
    }
}

// Adicione isso no evento de carregar a página
window.onload = function() {
    carregarListaDoLocalStorage();
};

// Atualize a função de criarItem para salvar no LocalStorage
export function criarItem(item){
    const itemLista = document.createElement('li');
    const containerItemLista = document.createElement('div');
    containerItemLista.classList.add("item-lista-contaier");

    const containerNomeItem = document.createElement('div');
    containerNomeItem.classList.add("container-nome-compra");
    
    const containerCheckbox = document.createElement('div');
    containerCheckbox.classList.add('checkbox-container');

    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.id = 'checkbox-' + contador++;
    checkboxInput.classList.add('checkbox-input');

    const checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute("for", checkboxInput.id);
    
    const checkboxCustomizado = document.createElement('div');
    checkboxCustomizado.classList.add('checkbox-customizado');

    checkboxLabel.appendChild(checkboxInput);
    checkboxLabel.appendChild(checkboxCustomizado);

    checkboxLabel.addEventListener('click', (evento) => {
        const checkboxInput = evento.currentTarget.querySelector('.checkbox-input');
        const checkboxCustomizado = evento.currentTarget.querySelector('.checkbox-customizado');

        if (checkboxInput.checked){
            checkboxCustomizado.classList.add('checked');
            listaComprados.appendChild(itemLista);
        } else {
            checkboxCustomizado.classList.remove('checked');
            listaCompras.appendChild(itemLista);
            itemLista.style.textDecoration = "line-through";
        }

        // Salva a lista atualizada sempre que um item é marcado/desmarcado
        salvarListaNoLocalStorage(listaCompras, listaComprados);
    });

    containerCheckbox.appendChild(checkboxLabel);
    containerNomeItem.appendChild(containerCheckbox);

    const nomeItem = document.createElement("p");
    nomeItem.id = "item-titulo";
    nomeItem.innerText = item.value;

    containerNomeItem.appendChild(nomeItem);

    const containerButtons = document.createElement('div');

    const buttonRemove = document.createElement('button');
    buttonRemove.classList.add('btn-acao');
    const imageRemover = document.createElement('img');
    imageRemover.src = 'img/delete.svg';
    buttonRemove.addEventListener("click", function() {
        excluirItem(itemLista);
        salvarListaNoLocalStorage(listaCompras, listaComprados);
    });
    buttonRemove.appendChild(imageRemover);

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn-acao');
    const imageEdit = document.createElement('img');
    imageEdit.src = 'img/edit.svg';
    buttonEdit.addEventListener('click',function (){
        editarItem(itemLista);
        salvarListaNoLocalStorage(listaCompras, listaComprados);
    });
    buttonEdit.appendChild(imageEdit);

    containerButtons.appendChild(buttonRemove);
    containerButtons.appendChild(buttonEdit);

    containerItemLista.appendChild(containerNomeItem);
    containerItemLista.appendChild(containerButtons);

    const itemData = document.createElement("p");
    itemData.innerText =  `${new Date().toLocaleDateString("pt-BR",{ weekday: "short" })} (${new Date().toLocaleDateString()}) às ${new Date().toLocaleTimeString("pt-BR", {hour: "numeric", minute: "numeric"})}`;
    itemData.classList.add('item-lista-data');

    itemLista.appendChild(containerItemLista);
    itemLista.appendChild(itemData);

    // Salva a lista após adicionar o item
    salvarListaNoLocalStorage(listaCompras, listaComprados);

    return itemLista;
}

