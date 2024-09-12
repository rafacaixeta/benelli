<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=agenda', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query('SELECT paciente, dentista, data, horario FROM consultas');
    $consultas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($consultas);
} catch (PDOException $e) {
    echo json_encode([]);
}
?>
