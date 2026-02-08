# Computação Serverless com Azure Functions

## 📌 Status
✅ Concluído

## 🎯 Descrição do Desafio

O desafio consiste em criar APIs serverless simples, escaláveis e bem definidas, separando responsabilidades.

## 🧱 Arquitetura Proposta

A solução foi desenhada de forma simples e incremental, composta por **duas Azure Functions**:

1. **API de Geração de Boleto**
   - Responsável por gerar um boleto fictício
   - Retorna:
     - Código de barras
     - Valor para pagamento

2. **API de Validação de Boleto**
   - Recebe os dados do boleto gerado
   - Realiza a validação das informações
   - Retorna o status da validação

O fluxo inicia em uma página HTML simples, que consome as APIs de forma sequencial.

## 🛠️ Tecnologias Utilizadas

- Azure Functions
- .NET (C#)
- Visual Studio
- HTTP Triggers
- HTML básico (cliente)

## 📷 Evidências

<p align="center">
    <img src="imagens/resource-group.png" width="700">  
    <img src="imagens/service-bus.png" width="700">
    <img src="imagens/tela-log.png" width="700">
    <img src="imagens/tela-web.png" width="700">
</p>

## 📁 Estrutura do Laboratório

- `codigos/`
  - Código das Azure Functions
  - Scripts auxiliares
- `imagens/`
  - Prints do portal Azure
  - Evidências de execução
  - Diagramas simples (se aplicável)

## 📌 Observações e Aprendizados

- Azure Functions facilita a criação de APIs desacopladas
- Separar funções por responsabilidade melhora manutenção e evolução
- Serverless reduz complexidade operacional e custo inicial
- O modelo é ideal para workloads event-driven e APIs simples

## 🚀 Próximos Passos

- Adicionar persistência (ex: Azure Storage ou Cosmos DB)
- Evoluir para arquitetura orientada a eventos
- Implementar mensageria para desacoplamento
- Criar fluxo mais robusto de processamento de pagamentos
