const API_URL = 'http://localhost:7146/api/barcode-generate';
const VALIDATE_API_URL = 'http://localhost:7167/api/barcode-validate';

const form = document.getElementById('barcodeForm');
const loadingEl = document.getElementById('loading');
const resultEl = document.getElementById('result');
const errorEl = document.getElementById('error');
const barcodeImage = document.getElementById('barcodeImage');
const barcodeText = document.getElementById('barcodeText');
const dataVencimentoInput = document.getElementById('dataVencimento');
const valorInput = document.getElementById('valor');
const generateBtn = document.querySelector('.btn-generate');
const validateBtn = document.getElementById('validateBtn');
const validationMessage = document.getElementById('validationMessage');

let isValidated = false;

// Definir data mínima (hoje)
const today = new Date().toISOString().split('T')[0];
dataVencimentoInput.min = today;

// Event listener para o formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await generateBarcode();
});

async function generateBarcode() {
    // Validação
    const dataVencimento = dataVencimentoInput.value;
    const valor = parseFloat(valorInput.value);

    if (!dataVencimento || !valor || valor <= 0) {
        showError('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Limpar estados anteriores
    hideError();
    resultEl.classList.add('hidden');
    showLoading();

    // Desabilitar botão
    generateBtn.disabled = true;

    try {
        const payload = {
            dataVencimento: dataVencimento,
            valor: valor
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Erro ${response.status}: ${errorData || 'Falha ao gerar código de barras'}`);
        }

        const data = await response.json();

        // Verificar se os campos esperados existem na resposta
        if (!data.barcode || !data.imagemBase64) {
            throw new Error('Resposta da API inválida: faltam campos esperados.');
        }

        // Exibir resultado
        displayBarcode(data.barcode, data.imagemBase64);

    } catch (error) {
        console.error('Erro:', error);
        showError(`Erro ao gerar código de barras: ${error.message}`);
    } finally {
        hideLoading();
        generateBtn.disabled = false;
    }
}

function displayBarcode(barcode, imagemBase64) {
    // Exibir imagem do código de barras
    if (!imagemBase64.startsWith('data:')) {
        imagemBase64 = `data:image/png;base64,${imagemBase64}`;
    }
    barcodeImage.src = imagemBase64;
    
    // Exibir texto do código
    barcodeText.value = barcode;
    
    // Resetar estado de validação
    isValidated = false;
    clearBarcodeValidation();
    validateBtn.disabled = false;
    
    // Mostrar resultado
    resultEl.classList.remove('hidden');
    
    // Scroll para o resultado
    resultEl.scrollIntoView({ behavior: 'smooth' });
}

async function validateBarcode() {
    const barcode = barcodeText.value;

    if (!barcode) {
        showValidationMessage('Nenhum código de barras para validar.', false);
        return;
    }

    validateBtn.disabled = true;
    clearBarcodeValidation();

    try {
        const payload = {
            barcode: barcode
        };

        const response = await fetch(VALIDATE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Erro ${response.status}: ${errorData || 'Falha ao validar código de barras'}`);
        }

        const data = await response.json();
        
        // Verificar o valor de forma mais robusta (a API retorna 'valido' em português)
        let isValid = false;
        if (typeof data.valido === 'boolean') {
            isValid = data.valido;
        } else if (typeof data.valido === 'string') {
            isValid = data.valido.toLowerCase() === 'true';
        }
        
        console.log('Resposta da validação:', data);
        console.log('Resultado isValid:', isValid);

        isValidated = true;
        showValidationMessage(
            isValid ? '✓ Código de barras válido!' : '✗ Código de barras inválido!',
            isValid
        );
        updateBarcodeStyle(isValid);

    } catch (error) {
        console.error('Erro:', error);
        showValidationMessage(`Erro ao validar: ${error.message}`, false);
    } finally {
        validateBtn.disabled = false;
    }
}

function showValidationMessage(message, isValid) {
    validationMessage.textContent = message;
    validationMessage.classList.remove('hidden', 'valid', 'invalid');
    validationMessage.classList.add(isValid ? 'valid' : 'invalid');
}

function updateBarcodeStyle(isValid) {
    barcodeImage.parentElement.classList.remove('valid', 'invalid');
    barcodeImage.parentElement.classList.add(isValid ? 'valid' : 'invalid');
}

function clearBarcodeValidation() {
    validationMessage.classList.add('hidden');
    validationMessage.classList.remove('valid', 'invalid');
    barcodeImage.parentElement.classList.remove('valid', 'invalid');
}

function copyToClipboard() {
    const text = barcodeText.value;
    
    navigator.clipboard.writeText(text).then(() => {
        // Feedback visual
        const btn = document.querySelector('.btn-copy');
        const originalText = btn.textContent;
        btn.textContent = '✓ Copiado!';
        
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        showError('Erro ao copiar para a área de transferência.');
        console.error('Erro:', err);
    });
}

function showLoading() {
    loadingEl.classList.remove('hidden');
}

function hideLoading() {
    loadingEl.classList.add('hidden');
}

function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    resultEl.classList.add('hidden');
}

function hideError() {
    errorEl.classList.add('hidden');
}
