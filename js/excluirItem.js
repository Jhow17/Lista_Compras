const excluirItem = (elemento) =>{
    let confirmacao = confirm('Tem certeza que deseja esxcluir esse item?')
    if (confirmacao){
        elemento.remove()

    }
}
export {excluirItem}