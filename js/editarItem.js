
export const editarItem = (elemento) =>{
    let novoItem = prompt("Novo nome do item")
    if  (novoItem !== null && novoItem.trim() !== ""){
        const intemTextoAtualizado =  elemento.querySelector("#item-titulo")
        intemTextoAtualizado.textContent = novoItem
        const estavaComprado = elemento.querySelector('.input-checkbox').checked
        if (estavaComprado ){
            elemento.querySelector(".input-checkbox").checked = true
            elemento.querySelector(".checkbox-customizado").classList.add("checked")
            intemTextoAtualizado.style.textDecoration = "line-through"
        }
        
    }
}