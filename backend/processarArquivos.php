<?php
$json = [
    'status' => true,
    'mensagem' => []
];

var_dump($_FILES);
//VERIFICA SE O METODO DE REQUISICAO FOI POST
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    die('Requisição não suportada!');
}

//VERIFICACAO DOS ARQUIVOS ENVIADOS PELO USUARIO
if (!isset($_FILES['banco']) && !isset($_FILES['excel'])) {
    die('Ambos os parametros são nulos!');
}

$banco = isset($_FILES['banco']) ? $_FILES['banco'] : NULL;
$excels = isset($_FILES['excel']) ? $_FILES['excel'] : NULL;

//VERUFUCAÇÃO DE EXTENÇÕES
$exts = ['sql', 'csv', 'xlsx'];

if (!in_array(pathinfo($banco['name'], PATHINFO_EXTENSION), $exts) && $banco != NULL) {
    die('O banco não é valido!' . $banco['name']);
}

foreach ($excels as $indice => $arquivo) {
    if (!in_array(pathinfo($excels[$indice]['name'], PATHINFO_EXTENSION), $exts) && $excels != NULL) {
        die('O arquivo não é excel!' . $excels[$indice]['name']);
    }
}
