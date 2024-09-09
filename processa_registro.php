
<?php
// Conectar ao banco de dados
$servername = "localhost";
$username = "usuario_db";
$password = "senha_db";
$dbname = "prontuario";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Capturar dados do formulário
$nome = $_POST['nome'];
$data_nascimento = $_POST['data_nascimento'];
$sexo = $_POST['sexo'];
$rg = $_POST['rg'];
$altura = $_POST['altura'];
$estado_civil = $_POST['estado_civil'];
$skin_color = $_POST['skin_color'];
$ufrom = $_POST['ufrom'];
$escolaridade = $_POST['escolaridade'];
$cep = $_POST['cep'];
$endereco = $_POST['endereço_residencial'];
$telefone = $_POST['telefone'];
$email = $_POST['email'];
$profissao = $_POST['profissao'];
$saude = $_POST['saude'];
$alergias = $_POST['alergias'];
$historico_dentario = $_POST['historico_dentario'];
$dentista = $_POST['sexo'];

// SQL para inserir os dados
$sql = "INSERT INTO pacientes (nome, data_nascimento, sexo, rg, altura, estado_civil, cor_pele, naturalidade, escolaridade, cep, endereco, telefone, email, profissao, saude, alergias, historico_dentario, dentista)
VALUES ('$nome', '$data_nascimento', '$sexo', '$rg', '$altura', '$estado_civil', '$skin_color', '$ufrom', '$escolaridade', '$cep', '$endereco', '$telefone', '$email', '$profissao', '$saude', '$alergias', '$historico_dentario', '$dentista')";

if ($conn->query($sql) === TRUE) {
    echo "Novo paciente registrado com sucesso!";
} else {
    echo "Erro: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
