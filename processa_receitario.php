<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $paciente = $_POST['paciente'];
    $medicamentos = $_POST['medicamentos'];
    $dosagem = $_POST['dosagem'];

    // Gerar o conteúdo do receituário
    $receituario = "Receituário\n";
    $receituario .= "Paciente: " . $paciente . "\n";
    $receituario .= "Medicamentos Prescritos:\n";

    foreach ($medicamentos as $medicamento) {
        $receituario .= "- " . $medicamento . "\n";
    }

    $receituario .= "\nDosagem e Instruções:\n" . $dosagem . "\n\n";
    $receituario .= "Assinatura do Médico:\n___________________________";

    // Exibir o receituário em uma página para impressão
    echo "
        <html lang='pt-BR'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Receituário</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                pre { font-size: 16px; }
                button { margin-top: 20px; padding: 10px 20px; font-size: 16px; }
            </style>
        </head>
        <body>
            <h1>Receituário</h1>
            <pre>" . htmlspecialchars($receituario) . "</pre>

            <button onclick='window.print()'>Imprimir Receituário</button>
        </body>
        </html>
    ";
}
?>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $paciente = $_POST['paciente'];
    $endereco = $_POST['endereco'];
    $medicamentos = $_POST['medicamentos'];
    $dosagem = $_POST['dosagem'];

    // Gerar a receita
    $receita = "Receituário\n";
    $receita .= "Paciente: " . $paciente . "\n";
    $receita .= "Endereço: " . $endereco . "\n\n";
    $receita .= "Medicamentos Prescritos:\n";

    foreach ($medicamentos as $medicamento) {
        $receita .= "- " . $medicamento . "\n";
    }

    $receita .= "\nDosagem e Instruções:\n" . $dosagem . "\n\n";
    $receita .= "Assinatura do Médico:\n___________________________";

    // Exibir a receita para impressão
    echo "
        <html lang='pt-BR'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Receituário</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                pre { font-size: 16px; }
                button { margin-top: 20px; padding: 10px 20px; font-size: 16px; }
            </style>
        </head>
        <body>
            <h1>Receituário</h1>
            <pre>" . htmlspecialchars($receita) . "</pre>

            <button onclick='window.print()'>Imprimir Receituário</button>
        </body>
        </html>
    ";
}
?>

