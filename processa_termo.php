<?php
require_once 'vendor/autoload.php'; // Certifique-se de instalar o PHPWord via Composer

use PhpOffice\PhpWord\IOFactory;

// Verifique se o arquivo foi enviado
if (isset($_POST['documento'])) {
    $arquivoDocx = 'termos/' . $_POST['documento'];

    // Verifique se o arquivo existe
    if (file_exists($arquivoDocx)) {
        // Abra o arquivo Word
        $phpWord = IOFactory::load($arquivoDocx);

        // Salve o arquivo como PDF
        $pdfWriter = IOFactory::createWriter($phpWord, 'PDF');
        $pdfWriter->save('documento_convertido.pdf');

        // Agora você pode exibir ou baixar o PDF
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="documento_convertido.pdf"');
        readfile('documento_convertido.pdf');
        exit;
    } else {
        echo 'Documento não encontrado!';
    }
} else {
    echo 'Nenhum documento selecionado!';
}

// Exemplo básico de envio de e-mail
$to = 'destinatario@example.com';
$subject = 'Envio de Termo de Consentimento';
$message = 'O termo de consentimento está anexado neste e-mail.';
$headers = 'From: seuemail@example.com';

// Anexar PDF ao e-mail usando PHPMailer (não mostrado aqui, mas recomendado)
if (mail($to, $subject, $message, $headers)) {
    echo 'E-mail enviado com sucesso!';
} else {
    echo 'Falha ao enviar o e-mail.';
}

?>
