let livros = []
const endPointDaAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
getBuscarLivrosDaAPI()
const elementoParaInserirLivros = document.getElementById('livros')


async function getBuscarLivrosDaAPI() {
    const res = await fetch(endPointDaAPI)
    livros = await res.json()
    let livrosComDesconto = aplicarDesconto(livros)
    exibirOsLivrosNaTela(livrosComDesconto)


}
// MetodoForEach
const elementoComValorTotalDeLivrosDisponiveis = document.getElementById('valor_total_livros_disponiveis')

function exibirOsLivrosNaTela(listaDeLivros) {
    elementoComValorTotalDeLivrosDisponiveis.innerHTML =''
    elementoParaInserirLivros.innerHTML = ''
    listaDeLivros.forEach(livro => {
        let disponibilidade = livro.quantidade > 0 ? livroDisponivel(): livroNaoDisponivel()
            elementoParaInserirLivros.innerHTML += `
        <div class="livro">
        <img class="${disponibilidade} "  src="${livro.imagem}" alt="${livro.alt}" />
        <h2 class="livro__titulo">
          ${livro.titulo}
        </h2>
        <p class="livro__descricao">${livro.autor}</p>
        <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag">${livro.categoria}</span>
        </div>
      </div>`
    })
}
function livroDisponivel() {
    return 'livro__imagens'
}

function livroNaoDisponivel() {
    return 'livros__imagens indisponivel'
}

// function verificarDisponibilidadeDoLivro(livro) {
//     if (livro.quantidade > 0) {
//         return 'livro__imagens'
//     } else {
//         return 'livros__imagens indisponivel'
//     }
// }

//MetodoMap
function aplicarDesconto(livros) {
    const desconto = 0.3
    livrosComDesconto = livros.map(livro => {
        return { ...livro, preco: livro.preco - (livro.preco * desconto) }

    })
    return livrosComDesconto



}

// metodo filter
const botoes = document.querySelectorAll('.btn')
botoes.forEach(btn => btn.addEventListener('click', filtrarLivros))

function filtrarLivros() {
    const elementoBtn = document.getElementById(this.id)
    const categoria = elementoBtn.value
    let livrosFiltrados = categoria == "disponivel" ? filtrarPorDisponibilidade() :filtrarPorCategoria(categoria)
    exibirOsLivrosNaTela(livrosFiltrados)
    if(categoria == 'disponivel'){
        const valorTotal = calcularValorDeLivrosDisponiveis(livrosFiltrados)
        
        exibirValorTotalDosLivrosDisponiveisNaTela(valorTotal)
        
        
    }
}
function filtrarPorCategoria(categoria) {
    return livros.filter(livro => livro.categoria == categoria)
}

function filtrarPorDisponibilidade() {
    return livros.filter(livro => livro.quantidade > 0)
}

function exibirValorTotalDosLivrosDisponiveisNaTela (valorTotal){
    elementoComValorTotalDeLivrosDisponiveis.innerHTML= `
    <div class="livros__disponiveis">
      <p>Todos os livros dispon??veis por R$ <span id="valor">${valorTotal}</span></p>
    </div>`

}
// metodo sort

let btnOrdenarPorPreco = document.getElementById('btnOrdenarPorPreco')
btnOrdenarPorPreco.addEventListener('click', ordenarLivrosPorPreco)
function ordenarLivrosPorPreco() {
    let livrosOrdenados = livros.sort((a, b) => a.preco - b.preco)
    exibirOsLivrosNaTela(livrosOrdenados)
}

// metodo reduce

function calcularValorDeLivrosDisponiveis(livros){
    return livros.reduce((acc, livro)=> acc + livro.preco, 0).toFixed(2)
}


