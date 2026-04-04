//DECLARAÇÃO DE VARIAVEIS DOS INPUTS
var inputs = document.querySelectorAll("input");
const bancoDeDados = inputs[0].id;
const excel = inputs[1].id;

//EVENTO DE CLICAR NOS INPUTS
bancoDeDados.click();
excel.click();

const btnImportar = document.getElementById("importar");

btnImportar.addEventListener("click", function () {

    const doctype = new FormData();

    //TRATAMENTO DE CAMPOS NULOS
    if (inputs[0].files.length < 0 && inputs[1].files.length < 0) {
        alert('Adicione ao menos um arquivo para importa!');
        return;
    }
    //TRATAMENTO DE EXTENCAO EXCEL E SQL
    const array_extencoes = [
        'csv',
        'xlsx',
        'sql'
    ];
    const extencaoBanco = inputs[0].files.name.split('.').pop();
    const extencaoExcel = inputs[1].files.name.split('.').pop();

    if (!array_extencoes.includes(extencaoBanco)) {
        alert('A extenção do banco é invalida, adicione um arquivo SQL!');
        return;
    }
    if (!array_extencoes.includes(extencaoExcel)) {
        alert('O arquivo é invalidado, adicione um arqui .csv ou .xlsx');
        return;
    }



});
