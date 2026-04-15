//FUNCOES
const mostrarBarra = () => {
    clearTimeout(tempo);
    barraConexao.style.left = '0rem';
}

const esconderBarra = () => {
    tempo = setTimeout(() => {
        barraConexao.style.left = '-10rem';
    }, 300);
}

const inserirTextoBarra = () => {
    const arquivoBanco = document.getElementById("banco");
    const arquivoExcel = document.getElementById("arquivosExcel");
    let labelBanco = document.getElementById("textoBanco");
    let labelExcel = document.getElementById("textoExcel");

    if (arquivoBanco.files.length > 0) {

        labelBanco.value = arquivoBanco.files.name;
        labelBanco.textContent = arquivoBanco.files.name;
    }

    if (arquivoExcel.files.length > 0) {
        labelExcel.value = arquivoExcel.files.name;
        labelExcel.textContent = arquivoExcel.files.name;
    }
}
const limparTextoBarra = () => {
    let labelBanco = document.getElementById("textoBanco");
    let labelExcel = document.getElementById("textoExcel");

    labelBanco.value = "";
    labelBanco.textContent = "";

    labelExcel.value = "";
    labelExcel.textContent = "";

}

inserirTextoBarra();

//DECLARAÇÃO DE VARIAVEIS DOS INPUTS
var inputs = document.querySelectorAll("input");
const bancoDeDados = inputs[0];
const excel = inputs[1];

//EVENTO DE CLICAR NOS INPUTS
bancoDeDados.click();
excel.click();

//ANIMAÇÃO DA BARRA LATERAL
const barraConexao = document.querySelector(".conexoes");
const area_mouse = document.querySelector(".area_mouse");
let tempo;

area_mouse.addEventListener('mouseenter', mostrarBarra);
area_mouse.addEventListener('mouseleave', esconderBarra);
barraConexao.addEventListener('mouseenter', mostrarBarra);
barraConexao.addEventListener('mouseleave', esconderBarra);
//EVENTO DO BOTÃO IMPORTAR
const btnImportar = document.getElementById("importar");
btnImportar.addEventListener("click", function () {

    const doctype = new FormData();


    //TRATAMENTO DE TAMANHO DE ARQUIVO
    if (bancoDeDados.files.length <= 0 && excel.files.length <= 0) {
        alert('Adicione ao menos um arquivo para importar!');
        return;
    }




    //TRATAMENTO DE EXTENCAO EXCEL E SQL
    const array_extencoes = [
        'csv',
        'xlsx',
        'sql'
    ];


    if (bancoDeDados.files[0]) {
        const extencaoBanco = bancoDeDados.files[0].name.split('.').pop();
        if (!array_extencoes.includes(extencaoBanco)) {
            alert('A extenção do banco é invalida, adicione um arquivo SQL!');
            return;
        }
        doctype.append('banco', bancoDeDados.files[0]);
    }


    for (var i = 0; i < excel.files.length; i++) {
        if (excel.files[i]) {
            const extencaoExcel = excel.files[i].name.split('.').pop();

            if (!array_extencoes.includes(extencaoExcel)) {
                alert('O arquivo é invalidado, adicione um arqui .csv ou .xlsx');
                return;
            }
        }
    }

    const excels = Array.from(excel.files);

    excels.forEach(arquivos => {
        doctype.append('excel[]', arquivos);
    });


    //REQUISICAO PARA CHAMAR O BACKEND
    fetch('../backend/processarArquivos.php', {
        method: 'POST',
        body: doctype
    })
        .then(response => response.json())
        .then(resposta => {
            if (resposta.status) {
                limparTextoBarra();
                inserirTextoBarra();
            }
        })
        .catch(error => {
            alert(console.log(error));
        })

});
