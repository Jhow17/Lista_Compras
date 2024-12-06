import { criarItem } from "./criaItem.js"

const item = document.querySelector('#entrada')

const listaCompras = document.querySelector('#lista-compras')



export function adicionarItem(e){
    e.preventDefault()

    // cria o item da listas que vai ser o pai dos futuros elementos
    const itemLista = criarItem(item)
    listaCompras.appendChild(itemLista)
    item.value = ""
}