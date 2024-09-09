<?php
// Conexão com o banco de dados (preencha com suas credenciais)
$conn = new PDO('mysql:host=localhost;dbname=seu_banco', 'root', '');

// Obtém as datas de início e fim enviadas via GET
$inicio = $_GET['inicio'];
$fim = $_GET['fim'];

// Consulta ao banco de dados para obter as consultas entre as datas de início e fim
$sql = "SELECT paciente, dentista, DATE_FORMAT(horario, '%W-%H:00') as horario FROM consultas WHERE horario BETWEEN :inicio AND :fim";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':inicio', $inicio);
$stmt->bindParam(':fim', $fim);
$stmt->execute();

// Retorna os resultados como JSON
$consultas = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($consultas);
?>
