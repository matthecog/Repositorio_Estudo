# CEP Address API - Guia Completo

Uma API simples em Node.js que busca informações de endereço através do CEP usando a API Via CEP.

## 📋 Pré-requisitos

1. **Node.js instalado** (versão 12 ou superior)
   - Baixe em: https://nodejs.org/
   - Verificar instalação: Abra o PowerShell e execute:
     ```bash
     node --version
     npm --version
     ```

## 🚀 Como Começar

### 1️⃣ Navegar até a pasta do projeto

```bash
cd "C:\Users\mathe\OneDrive\Documentos\Cursos\Microsoft Azure Cloud Native 2026\LAB006\API\cep-address-api"
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

Isso vai instalar:
- **express**: Framework para criar a API
- **axios**: Para fazer requisições HTTP
- **nodemon** (dev): Para reiniciar o servidor automaticamente

### 3️⃣ Iniciar o servidor

**Modo produção (simples):**
```bash
npm start
```

**Modo desenvolvimento (com auto-reload):**
```bash
npm run dev
```

Você verá:
```
Server is running on http://localhost:3000
```

## 🔗 Como Usar a API

A API está pronta em: `http://localhost:3000/api/cep/:cep`

### Exemplos de Requisições

**Teste 1 - CEP válido:**
```
http://localhost:3000/api/cep/01310100
```

**Teste 2 - Usando cURL (PowerShell):**
```bash
curl http://localhost:3000/api/cep/01310100
```

**Teste 3 - Usando Fetch (JavaScript/Node):**
```javascript
fetch('http://localhost:3000/api/cep/01310100')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

### Resposta Esperada (JSON)

```json
{
  "cep": "01310-100",
  "logradouro": "Avenida Paulista",
  "complemento": "",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "",
  "ddd": "11",
  "siafi": "7107"
}
```

## 📁 Estrutura do Projeto

```
src/
├── app.js                 # Arquivo principal que inicia o servidor
├── routes/
│   └── cep.js            # Define as rotas da API
├── controllers/
│   └── cepController.js  # Lógica que processa as requisições
└── services/
    └── viaCepService.js  # Chamadas para a API Via CEP
```

## 💡 Como Funciona

1. **Requisição chega**: `GET /api/cep/01310100`
2. **Route (cep.js)**: Recebe e passa para o Controller
3. **Controller**: Valida e chama o Service
4. **Service**: Faz requisição para `https://viacep.com.br/ws/01310100/json/`
5. **Resposta**: Retorna o JSON com o endereço

## 🛑 Como Parar o Servidor

No PowerShell onde está rodando, pressione: `Ctrl + C`

## 🧪 Testando com Insomnia/Postman (Opcional)

1. Abra Insomnia ou Postman
2. Crie uma requisição GET: `http://localhost:3000/api/cep/01310100`
3. Clique em Send

## 📝 Alguns CEPs para Testar

- `01310100` - Avenida Paulista, São Paulo
- `20040020` - Centro, Rio de Janeiro
- `30140071` - Savassi, Belo Horizonte

## ⚠️ Erros Comuns

| Erro | Solução |
|------|---------|
| `npm: comando não encontrado` | Node.js não está instalado |
| `Cannot find module 'express'` | Execute `npm install` |
| `EADDRINUSE: address already in use` | Porta 3000 está em uso (mude em app.js) |
| `CEP not found` | CEP inválido ou não existe |

## 🔧 Customizações

**Mudar porta (app.js):**
```javascript
const PORT = process.env.PORT || 3001;  // Mude 3001 para o número desejado
```

## 📚 Próximos Passos

- Adicionar validação de CEP
- Adicionar banco de dados
- Fazer deploy na Azure
- Adicionar autenticação

This project is a simple Node.js API that fetches address information based on a Brazilian postal code (CEP) using the Via CEP service. The API is built with Express and provides a straightforward endpoint for developers to retrieve address data in JSON format.

## Features

- Fetch address information using a CEP.
- Returns data in a structured JSON format.
- Easy to integrate with other applications.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd cep-address-api
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run the following command:
```
npm start
```

The API will be available at `http://localhost:3000`.

### Endpoint

- **GET /cep/:cep**

  Fetches address information for the provided CEP.

  **Parameters:**
  - `cep`: The Brazilian postal code (CEP) to look up.

  **Response:**
  - Returns a JSON object containing the address information.

## Example

To fetch address information for the CEP `01001-000`, you can use the following curl command:

```
curl http://localhost:3000/cep/01001-000
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.