//Retorna um obj de manipulação do Local Storage do browser.
//Stringify converte um Objeto Literal em uma String JSON / JSON.stringify()
//Pode se fazer o contrário também, converter um JSON em um Objeto Literal
//Através do JSON.parse()

class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i == null]) {
                return false
            }
        }

        return true
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Bd { //Banco de Dados
    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
        
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) { //Parameter D = despesa
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        //Array de Despesas
        let array_despesas = Array()

        let id = localStorage.getItem('id')

        //recuperar todas as despesas cadastradas em localStorage
        for (let i = 1; i <= id; i++ ) {

            //Recuperar a Despesa
            let despesa = JSON.parse(localStorage.getItem(i))
            //variavel i é utilizada para recuperar os elemtnos de 1 a 1 no for in / Local Storage
            
            console.log(i, despesa)

            //Antes de dar o push() verificar se existe a possibilidade de haver indices que foram pulados/removidos
            //Neste caso, nos pulamos esses indices.

            if(despesa === null) {
                continue
            }

            despesa.id = i
            array_despesas.push(despesa)
        }

        return array_despesas
    }

    pesquisar(despesa) {
        let despesasFiltradas = Array()
        
        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesa)

        console.log(despesasFiltradas)

        //ano
        if(despesa.ano != '') {
            console.log('Filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        //mes
        if(despesa.mes != '') {
            console.log('Filtro de mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //dia
        if(despesa.dia != '') {
            console.log('Filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo
        if(despesa.tipo != '') {
            console.log('Filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //descricao
        if(despesa.descricao != '') {
            console.log('Filtro de descrição')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //valor
        if(despesa.valor != '') {
            console.log('Filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }

    removerConsulta(id) {
        localStorage.removeItem(id)
    }
}

//Objeto Instanciado da class Bd
let bd = new Bd()  //bancodedados

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //Objeto Instanciado da class Despesa
    let despesa = new Despesa(
        ano.value, 
        mes.value,
        dia.value,
        tipo.value, 
        descricao.value, 
        valor.value
    )

    if(despesa.validarDados()) {
        bd.gravar(despesa)

        //dialog de sucesso
        document.getElementById("mudaTitulo").innerHTML = 'Registro Inserido com Sucesso.'
        document.getElementById("modal_titulo_div").className = 'modal-title modal-header text-success'
        document.getElementById("texto_descricao").innerHTML = 'Despesa foi cadastrada com sucesso.'
        document.getElementById("voltarButton").innerHTML = 'Voltar.'
        document.getElementById("voltarButton").className = 'btn btn-primary'
        $("#modalRegistraDespesa").modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''


    } else {
        //dialog de erro
        //jquery
        document.getElementById("mudaTitulo").innerHTML = 'Erro na gravação.'
        document.getElementById("modal_titulo_div").className = 'modal-title modal-header text-danger'
        document.getElementById("texto_descricao").innerHTML = 'Existem campos obrigatórios que não foram preenchidos ou foram de forma errada.'
        document.getElementById("voltarButton").innerHTML = 'Voltar e Corrigir.'
        document.getElementById("voltarButton").className = 'btn btn-danger'
        $("#modalRegistraDespesa").modal('show')
    }

}

///////////////////////////////////////////////////////////////////////
//Parte de Consultas

function carregaListaDespesa(array_despesas = Array(), filtro = false) {

    if(array_despesas == 0 && filtro == false) {
        array_despesas = bd.recuperarTodosRegistros()
    }

    //selecionar o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    //percorrer o array_despesas, listando cada despesa de forma dinâmica // d representa as despesas
    array_despesas.forEach(function(d) {
        console.log(d)

        //criando a linha <tr>
        let linha = listaDespesas.insertRow()

        //criando as colunas <td>
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` //d.dia + '/' + d.mes + '/' + d.ano

        //ajustar o TIpo
        //Trocando de Valor para String Descrita
        switch(d.tipo) {
            case '1' : d.tipo = "Alimentação"
                break
            case '2' : d.tipo = "Educação"
                break
            case '3' : d.tipo = "Lazer"
                break
            case '4' : d.tipo = "Saúde"
                break
            case '5' : d.tipo = "Transporte"
                break
        }

        linha.insertCell(1).innerHTML = d.tipo

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //Botão de Exclusão
        let btn_delete = document.createElement('button')
        btn_delete.className = 'btn btn-danger'
        btn_delete.innerHTML = '<i class ="fa fa-trash"></i>'
        btn_delete.id = `id_despesa_${d.id}`
        btn_delete.onclick = function() {
            let id = this.id.replace('id_despesa_', '')

            //alert(id)

            bd.removerConsulta(id)
            window.location.reload()
        }

        linha.insertCell(4).append(btn_delete)

        console.log(d)

    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let array_despesas = bd.pesquisar(despesa)

    carregaListaDespesa(array_despesas, true)
}