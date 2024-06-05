var altura = 0
var largura = 0
var vidas = 3
var tempo = 25 //segundos

var criaMosquitoTempo = 1500


var nivel = window.location.search //Retorna tudo que está direita do ponto de interrogação? , inclusive o ponto de interrogação;
nivel = (nivel.replace('?', '')) //Replace troca o substitui o primeiro parâmetro pelo segundo dentro da var ní vel;

    if(nivel === 'normal'){
        //1500 milissegundos
        criaMosquitoTempo = 1500
    } else if(nivel === 'dificil'){
        //1000 milissegundos
        criaMosquitoTempo = 1000
    } else if(nivel === 'expert'){
        //750 milissegundos
        criaMosquitoTempo = 750
    }

function ajustaTamanhoPalcoJogo(){
    largura = window.innerWidth //Ao tirar a palavra var das variáveis(largura, altura) a função conseguiu retornar posições randômicas dentro da largura e altura da tela.  
    altura = window.innerHeight

    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function(){

    if(tempo < 0) {
        clearInterval(cronometro) // Para o fluxo de repetição
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html' //Se tempo < 0 e restar vidas chama a página vitoria.html
    } else {
        document.getElementById("cronometro_span").innerHTML = tempo //innerHTML = inner = dentro = mostra os valores contidos entre as tags ex: <div>Batata</div> vai mostrar batata
    }

    tempo -= 1

}, 1000)

function posicaoRandomica(){

    //remover mosquito anterior (caso exista)
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        //console.log('Elemento Selecionado foi: vida' + vidas)
        if(vidas <= 0) {
            window.location.href = 'fim_de_jogo.html'
        } else {
        document.getElementById('vida' + vidas).src="imagens/coracao_vazio.png"
        vidas--
        }
    }    

    var posicaoX = Math.floor(Math.random() * largura) - 90 //Sensitive Case = diferença entre caracteres maiúsculos e minúsculos.
    var posicaoY = Math.floor(Math.random() * altura) - 90 //floor só deixa os valores inteiros. //A imagem será criada menos 90px dentro do limite da tela para não ultrapassar e cortar a img.

    posicaoX = posicaoX < 0 ? 0 : posicaoX //Leitura do código = posicaoX menor que 0, se for = ? recebe 0, senão = : posicaoX.
    posicaoY = posicaoY < 0 ? 0 : posicaoY //Nao deixa o elemento sair da tela ficando menor que 0 ou negativo.

    console.log(posicaoX, posicaoY)

    //criar elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px' //Aqui concatena a posição randômica para o elemento em pixels.
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute' //Para as coordenadas serem aplicadas o elemento mosquito precisa ser absoluto.
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove() //this ajusta o contexto de determinado atributo ou método. Aqui ele faz referência ao próprio elemento HTML - Mosquito
    }

    document.body.appendChild(mosquito)
}

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0 :
            return 'mosquito1'
        case 1 :
            return 'mosquito2'
        case 2 :
            return 'mosquito3'
    } 
}

function ladoAleatorio(){
    var classe1 = Math.floor(Math.random() * 2)

    switch(classe1) {
        case 0 :
            return 'ladoA'
        case 1 :
            return 'ladoB'
    }
}



