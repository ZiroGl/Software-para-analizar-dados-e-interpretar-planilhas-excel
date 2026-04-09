<?php
$json = [
    'status' => true,
    'mensagem' => []
];
$exts = ['sql', 'csv', 'xlsx'];

$config_pdo = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
$pdo = new PDO("mysql:host=localhost;", "root", "", $config_pdo);

try {
    //VERIFICA SE O METODO DE REQUISICAO FOI POST
    $_SERVER['REQUEST_METHOD'] == 'POST' or throw new Exception("A requisição não foi suportada!");



    //VERIFICACAO DOS ARQUIVOS ENVIADOS PELO USUARIO
    $banco = $_FILES['banco'] ?? NULL;
    $excels = $_FILES['excel'] ?? NULL;
    var_dump($excels['name'][0]);

    //VERiFiCAÇÃO DE EXTENÇÕES
    if ($banco !== NULL) {
        if (
            !in_array(pathinfo($banco['name'], PATHINFO_EXTENSION), $exts)

        ) {
            throw new Exception('O banco não é valido!' . $banco['name']);
        }
    }
    if ($excels !== NULL) {
        foreach ($excels['name'] as $indice => $arquivo) {
            if (
                !in_array(pathinfo($excels['name'][$indice], PATHINFO_EXTENSION), $exts)

            ) {
                throw new Exception('O arquivo não é excel!' . $excels['name'][$indice]);
            }
        }
    }
} catch (Exception $e) {
    echo $e->getMessage();
}

function resturarSQL($banco)
{
    try {
        pathinfo($GLOBALS["banco"]["name"], PATHINFO_EXTENSION) === 'sql' or throw new Exception("O arquivo não é um SQL!");

        $arquivo = file_get_contents($GLOBALS["banco"]['tmp_name']) or throw new Exception("Não foi possivel abrir o arquivo SQL");

        $expl_estrutura = explode(';', $arquivo);

        foreach ($expl_estrutura as $comandos) {
            if (strpos($comandos, '--') === 0) {
                continue;
            }
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
