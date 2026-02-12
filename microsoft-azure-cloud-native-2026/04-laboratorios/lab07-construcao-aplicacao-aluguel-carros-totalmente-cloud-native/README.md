# Construção de uma Aplicação de Aluguel de Carros totalmente Cloud-Native

Este laboratório documenta a **implementação prática** da aplicação de aluguel de carros utilizando serviços do Microsoft Azure em uma arquitetura **Cloud Native orientada a eventos**.

Aqui estão centralizados **códigos, imagens, configurações, testes e evidências** da implementação realizada na Fase 7 do bootcamp.

## 🛠️ Ferramentas Utilizadas

- Azure Container Apps  
- Azure Functions  
- Azure Service Bus (Filas)  
- Azure SQL Database  
- Azure Cosmos DB  
- Azure Storage (Blob Storage)  
- Azure Portal  

## 📷 Evidências

<p align="center">
    <img src="imagens/resource-group.png" width="700">  
    <img src="imagens/logic-app2.png" width="700">
    <img src="imagens/service-bus-namespace.png" width="700">
    <img src="imagens/sqldatabase.png" width="700">
</p>

## 🔬 Atividades Realizadas

### 🚀 Deploy da API Containerizada
- Containerização da API GET
- Publicação no Azure Container Apps
- Configuração de variáveis de ambiente

### 📬 Configuração de Mensageria
- Criação do Service Bus Namespace
- Criação e configuração de filas
- Testes de envio e recebimento de mensagens

### ⚙️ Processamento Serverless
- Implementação de Azure Functions acionadas por mensagens da fila
- Aplicação das regras de negócio
- Integração com banco de dados

### 🗄️ Persistência de Dados
- Configuração do Azure SQL Database / Cosmos DB
- Armazenamento de dados no Azure Storage
- Testes de inserção e consulta

## 📌 Observações Técnicas

- A arquitetura foi construída com foco em desacoplamento e escalabilidade
- A comunicação entre serviços ocorre de forma assíncrona via filas
- O processamento é baseado em eventos utilizando Azure Functions
- O laboratório prioriza aplicação prática dos conceitos de arquitetura Cloud Native
