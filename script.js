
// Função para trocar entre abas
const links = document.querySelectorAll('.menu-superior ul li a');
    links.forEach(link => {
    link.addEventListener('click', function (e) {
e.preventDefault();
const aba = this.dataset.aba;

// Esconde todas as divs de conteúdo
document.querySelectorAll('.conteudo > div').forEach(div => {
    div.style.display = 'none';
});

// Exibe a aba correta
document.getElementById(aba).style.display = 'block';
    });
});




// Função para gerar a tabela de horários
function gerarTabelaAgenda() {
const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const horarios = [];

// Gera horários de 8h até 18h com intervalos de 1 hora
for (let i = 8; i <= 18; i++) {
    horarios.push(i + ':00');
}

const tabela = document.createElement('table');
tabela.setAttribute('border', '1');
tabela.innerHTML = '<tr><th>Horário</th><th>Segunda</th><th>Terça</th><th>Quarta</th><th>Quinta</th><th>Sexta</th></tr>';

horarios.forEach(horario => {
    const linha = document.createElement('tr');
    const celulaHorario = document.createElement('td');
    celulaHorario.innerText = horario;
    linha.appendChild(celulaHorario);

    diasDaSemana.forEach(dia => {
        const celula = document.createElement('td');
        celula.innerHTML = `<input type="radio" name="consulta-horario" value="${dia}-${horario}">`;
        linha.appendChild(celula);
    });

    tabela.appendChild(linha);
});

// Insere a tabela no div da agenda
document.getElementById('tabela-agenda').innerHTML = '';
document.getElementById('tabela-agenda').appendChild(tabela);
}

// Evento para exibir a agenda ao clicar no botão verde
document.querySelector('.botao[style="background-color: green;"]').addEventListener('click', function() {
// Esconde outras seções e mostra a agenda
document.querySelectorAll('.conteudo > div').forEach(div => {
    div.style.display = 'none';
});
document.getElementById('agenda-consultas').style.display = 'block';

// Gera a tabela de horários quando a agenda for exibida
gerarTabelaAgenda();
});

let semanaAtual = new Date(); // A semana começa no dia atual

// Função para mudar a semana (com valor -1 para voltar e 1 para avançar)
function mudarSemana(valor) {
semanaAtual.setDate(semanaAtual.getDate() + valor * 7);
atualizarSemana();
}

// Função para formatar a data e atualizar o cabeçalho da semana
function atualizarSemana() {
const inicioSemana = new Date(semanaAtual);
const fimSemana = new Date(semanaAtual);
inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay() + 1); // Segunda-feira
fimSemana.setDate(inicioSemana.getDate() + 6); // Domingo

const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric' };
document.getElementById('semana-atual').innerText = `Semana de ${inicioSemana.toLocaleDateString('pt-BR', opcoes)} até ${fimSemana.toLocaleDateString('pt-BR', opcoes)}`;

// Aqui você pode carregar as consultas da semana em questão
carregarConsultas(inicioSemana, fimSemana);
}

// Chamada para atualizar a semana assim que a página carregar
window.onload = atualizarSemana;

// Função para carregar consultas de uma semana específica
function carregarConsultas(inicioSemana, fimSemana) {
// Aqui você faria uma requisição ao servidor (usando fetch ou AJAX) para buscar as consultas no intervalo de datas
// Exemplo fictício:
const consultas = [
    { paciente: 'Paciente Exemplo 1', dentista: 'Dr. Otávio', horario: 'Segunda-09:00' },
    { paciente: 'Paciente Exemplo 2', dentista: 'Dra. Samantha', horario: 'Terça-10:00' }
];

// Limpa os horários
document.querySelectorAll('#tabela-agenda input[type="radio"]').forEach(radio => {
    radio.disabled = false;
    radio.checked = false;
});

// Marca os horários já ocupados
consultas.forEach(consulta => {
    const [dia, hora] = consulta.horario.split('-');
    document.querySelector(`input[value="${dia}-${hora}"]`).disabled = true;
});
}

// Função para carregar consultas via API
async function carregarConsultas(inicioSemana, fimSemana) {
const resposta = await fetch(`consultas.php?inicio=${inicioSemana.toISOString()}&fim=${fimSemana.toISOString()}`);
const consultas = await resposta.json();

// Limpa os horários
document.querySelectorAll('#tabela-agenda input[type="radio"]').forEach(radio => {
radio.disabled = false;
radio.checked = false;
});

// Marca os horários já ocupados
consultas.forEach(consulta => {
const [dia, hora] = consulta.horario.split('-');
const input = document.querySelector(`input[value="${dia}-${hora}"]`);
if (input) input.disabled = true;
});
}

        //TERMO CONSENTIMENTO

// Função para exibir o documento selecionado TERMO CONSENTIMENTO
function mostrarDocumento(documento) {
if (documento) {
const caminhoDocumento = 'termos/' + documento;
document.getElementById('visualizacaoDocumento').innerHTML =
    '<a href="' + caminhoDocumento + '" download>Clique para baixar o ' + documento + '</a>';
}
}

// Função para imprimir o documento
function imprimirDocumento() {
const documento = document.getElementById('documento').value;
if (documento) {
const iframe = document.querySelector('#visualizacaoDocumento iframe');
iframe.contentWindow.print();
} else {
alert('Selecione um documento primeiro.');
}
}

// Função para enviar o documento por e-mail (vai usar AJAX para enviar a solicitação ao servidor)
function enviarEmail() {
const documento = document.getElementById('documento').value;
if (documento) {
// Lógica de envio do documento por e-mail
alert('O documento ' + documento + ' foi enviado por e-mail.');
} else {
alert('Selecione um documento primeiro.');
}
}

// Função para assinatura do paciente
function assinarDocumento() {
const documento = document.getElementById('documento').value;
if (documento) {
// Lógica de assinatura eletrônica (pode ser realizada com assinatura digital ou caixa de diálogo)
alert('O documento ' + documento + ' foi assinado com sucesso.');
} else {
alert('Selecione um documento primeiro.');
}
}


//JAVA DE AUTOCOMPLEMENTAR BUSCA NO RECEITUÁRIO
document.addEventListener('DOMContentLoaded', function () {
// Simulação de pacientes e medicamentos (substituir com dados do banco de dados no futuro)
const pacientes = [
{ nome: "João Silva", endereco: "Rua A, 123" },
{ nome: "Maria Oliveira", endereco: "Avenida B, 456" },
{ nome: "Carlos Santos", endereco: "Praça C, 789" }
];

const medicamentos = ["Paracetamol", "Ibuprofeno", "Amoxicilina", "Diclofenaco", "Azitromicina"];

// Autocomplete de pacientes
const pacienteInput = document.getElementById('paciente');
const sugestoesPaciente = document.getElementById('sugestoesPaciente');
const enderecoInput = document.getElementById('endereco');

pacienteInput.addEventListener('input', function () {
const valor = this.value.toLowerCase();
sugestoesPaciente.innerHTML = '';
if (valor) {
    const resultados = pacientes.filter(paciente => paciente.nome.toLowerCase().includes(valor));
    resultados.forEach(paciente => {
        const div = document.createElement('div');
        div.innerHTML = paciente.nome;
        div.addEventListener('click', function () {
            pacienteInput.value = paciente.nome;
            enderecoInput.value = paciente.endereco;
            sugestoesPaciente.innerHTML = '';
        });
        sugestoesPaciente.appendChild(div);
    });
}
});

// Autocomplete de medicamentos
const medicamentoInput = document.getElementById('medicamento');
const sugestoesMedicamento = document.getElementById('sugestoesMedicamento');

medicamentoInput.addEventListener('input', function () {
const valor = this.value.toLowerCase();
sugestoesMedicamento.innerHTML = '';
if (valor) {
    const resultados = medicamentos.filter(medicamento => medicamento.toLowerCase().includes(valor));
    resultados.forEach(medicamento => {
        const div = document.createElement('div');
        div.innerHTML = medicamento;
        div.addEventListener('click', function () {
            medicamentoInput.value = medicamento;
            sugestoesMedicamento.innerHTML = '';
        });
        sugestoesMedicamento.appendChild(div);
    });
}
});

// Adicionar medicamentos à lista de receita
const adicionarMedicamentoBtn = document.getElementById('adicionarMedicamento');
const listaMedicamentos = document.getElementById('listaMedicamentos');

adicionarMedicamentoBtn.addEventListener('click', function () {
const medicamento = medicamentoInput.value;
const dosagem = document.getElementById('dosagem').value;

if (medicamento && dosagem) {
    const div = document.createElement('div');
    div.innerHTML = `<strong>Medicamento:</strong> ${medicamento} - <strong>Dosagem:</strong> ${dosagem}`;
    listaMedicamentos.appendChild(div);

    // Limpar os campos após adicionar
    medicamentoInput.value = '';
    document.getElementById('dosagem').value = '';
} else {
    alert('Por favor, preencha o medicamento e a dosagem.');
}
});
});

//Script para Carregar as Consultas Agendadas no botao azul
document.querySelector('.botao[style="background-color: blue;"]').addEventListener('click', function () {
const tabelaConsultas = document.querySelector('#tabelaConsultas tbody');
tabelaConsultas.innerHTML = ''; // Limpa a tabela antes de inserir novos dados

// Esconde todas as outras abas
document.querySelectorAll('.conteudo > div').forEach(div => {
div.style.display = 'none';
});

// Faz a requisição para buscar as consultas agendadas
fetch('consultar_agenda.php')
.then(response => response.json())
.then(data => {
    if (data.length > 0) {
        data.forEach(consulta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${consulta.paciente}</td>
                <td>${consulta.dentista}</td>
                <td>${consulta.data}</td>
                <td>${consulta.horario}</td>
            `;
            tabelaConsultas.appendChild(row);
        });
    } else {
        tabelaConsultas.innerHTML = '<tr><td colspan="4">Nenhuma consulta agendada.</td></tr>';
    }
})
.catch(error => console.error('Erro ao carregar as consultas:', error));

// Exibe a aba "Consultar Agenda"
document.getElementById('consultarAgenda').style.display = 'block';
});

