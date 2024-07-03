const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

// Supondo que suas funções estejam em um arquivo chamado `index.js`
const { formatarCPF, formatarCNPJ } = require('../static/script.js');

describe('Testando funções de formulário', () => {
    let dom;
    let document;

    beforeEach(() => {
        // Cria um DOM simulado
        dom = new JSDOM(`
            <body>
                <input id="entity" />
                <div id="individuo-fields" class="entity-fields"></div>
                <div id="empresa-fields" class="entity-fields"></div>
                <input id="tipo_doador" />
                <div id="cpf_field"></div>
                <div id="cnpj_field"></div>
                <input id="doador_tipo" />
                <div id="doacaoPF-fields"></div>
                <div id="doacaoPJ-fields"></div>
                <input id="id" />
            </body>
        `);
        document = dom.window.document;

        global.document = document;
    });

    // test('showFields deve exibir os campos corretos com base na entidade selecionada', () => {
    //     document.getElementById('entity').value = 'individuo';
    //     showFields();
    //     expect(document.getElementById('individuo-fields').style.display).toBe('block');
    //     expect(document.getElementById('empresa-fields').style.display).toBe('none');
    // });

    // test('toggleDoadorFields deve exibir o campo correto baseado no tipo de doador', () => {
    //     document.getElementById('tipo_doador').value = 'Físico';
    //     toggleDoadorFields();
    //     expect(document.getElementById('cpf_field').style.display).toBe('block');
    //     expect(document.getElementById('cnpj_field').style.display).toBe('none');

    //     document.getElementById('tipo_doador').value = 'Outro';
    //     toggleDoadorFields();
    //     expect(document.getElementById('cpf_field').style.display).toBe('none');
    //     expect(document.getElementById('cnpj_field').style.display).toBe('none');
    // });

    // test('toggleForm deve exibir o formulário correto baseado no tipo de doador', () => {
    //     document.getElementById('doador_tipo').value = 'Físico';
    //     toggleForm();
    //     expect(document.getElementById('doacaoPF-fields').style.display).toBe('block');
    //     expect(document.getElementById('doacaoPJ-fields').style.display).toBe('none');

    //     document.getElementById('doador_tipo').value = 'Jurídico';
    //     toggleForm();
    //     expect(document.getElementById('doacaoPF-fields').style.display).toBe('none');
    //     expect(document.getElementById('doacaoPJ-fields').style.display).toBe('block');
    // });

    test('formatarCPF deve formatar corretamente um CPF', () => {
        const input = { value: '12345678909' };
        formatarCPF(input);
        expect(input.value).toBe('123.456.789-09');
    });

    test('formatarCNPJ deve formatar corretamente um CNPJ', () => {
        const input = { value: '12345678000195' };
        formatarCNPJ(input);
        expect(input.value).toBe('12.345.678/0001-95');
    });

    // test('Evento de mudança no elemento #entity deve configurar o placeholder e o oninput corretamente', () => {
    //     const entityInput = document.getElementById('entity');
    //     const entityIdInput = document.getElementById('id');

    //     entityInput.value = 'individuo';
    //     const event = new dom.window.Event('change');
    //     entityInput.dispatchEvent(event);

    //     expect(entityIdInput.placeholder).toBe('');
    //     entityIdInput.value = '12345678909';
    //     entityIdInput.oninput();
    //     expect(entityIdInput.value).toBe('123.456.789-09');

    //     entityInput.value = 'empresa';w
    //     entityInput.dispatchEvent(event);

    //     expect(entityIdInput.placeholder).toBe('');
    //     entityIdInput.value = '12345678000195';
    //     entityIdInput.oninput();
    //     expect(entityIdInput.value).toBe('12.345.678/0001-95');
    // });
});
