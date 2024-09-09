<?php
// Conexão com o banco de dados
$conn = new PDO('mysql:host=localhost;dbname=agenda', 'root', '');

// Obtenha os dados do formulário
$paciente = $_POST['paciente'];
$dentista = $_POST['dentista'];
$horario = $_POST['consulta-horario']; // Este valor vem como 'dia-horario' (por exemplo, 'Segunda-09:00')

// Função para converter o dia da semana para a data correta
function obterDataConsulta($dia, $hora) {
    // Obter a data atual
    $dataAtual = new DateTime();

    // Achar a próxima segunda-feira (ou a segunda-feira da semana atual)
    $segunda = clone $dataAtual;
    $segunda->modify('Monday this week');

    // Converter o dia da semana para um número (1 = segunda-feira, 7 = domingo)
    $diasSemana = ['Segunda' => 1, 'Terça' => 2, 'Quarta' => 3, 'Quinta' => 4, 'Sexta' => 5, 'Sábado' => 6, 'Domingo' => 7];
    
    // Se o dia informado não existe, retorne nulo
    if (!isset($diasSemana[$dia])) {
        return null;
    }

    // Adicionar o número de dias à segunda-feira para chegar no dia correto
    $diferencaDias = $diasSemana[$dia] - 1;
    $dataConsulta = clone $segunda;
    $dataConsulta->modify("+$diferencaDias days");

    // Adicionar a hora da consulta
    $dataConsulta->setTime((int)substr($hora, 0, 2), 0, 0);

    return $dataConsulta;
}

// Separar o dia da semana e a hora
list($dia, $hora) = explode('-', $horario);

// Obter a data da consulta
$dataConsulta = obterDataConsulta($dia, $hora);

if ($dataConsulta) {
    // Converter para o formato aceito pelo banco de dados
    $dataConsultaFormatada = $dataConsulta->format('Y-m-d H:i:s');

    // Insere a consulta no banco de dados
    $sql = "INSERT INTO consultas (paciente, dentista, horario) VALUES (:paciente, :dentista, :horario)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':paciente', $paciente);
    $stmt->bindParam(':dentista', $dentista);
    $stmt->bindParam(':horario', $dataConsultaFormatada);
    $stmt->execute();

    echo "Consulta marcada com sucesso!";
} else {
    echo "Erro ao marcar a consulta. Dia inválido.";
}
?>

