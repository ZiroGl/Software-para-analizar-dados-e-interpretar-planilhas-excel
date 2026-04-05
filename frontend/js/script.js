//DECLARAÇÃO DE VARIAVEIS DOS INPUTS
var inputs = document.querySelectorAll("input");
const bancoDeDados = inputs[0];
const excel = inputs[1];

//EVENTO DE CLICAR NOS INPUTS
bancoDeDados.click();
excel.click();

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
        .then(Response => Response.json())
        .then(resposta => {
            if (resposta.status) {
                alert(resposta.mensagem);
            } else {
                alert(resposta.mensagem);
            }
        })
        .catch(error => {
            alert(error.message);
        })

});
