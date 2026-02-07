# Curso — Computação Serverless e Automação na Azure

## 📌 Status
✅ Concluído

## 🎯 Objetivo do curso
Este curso teve como foco apresentar os conceitos de **computação serverless**
no Azure, explicando quando e como utilizar os principais serviços da
plataforma voltados à automação e execução sob demanda.

## 🧠 Conceitos Abordados

- Diferenças funcionais entre **Azure Functions**, **Azure Logic Apps** e **WebJobs**
- Opções de **planos de hospedagem** do Azure Functions
- Como o **Azure Functions escala automaticamente** para atender demandas do negócio

## ☁️ Azure Functions

O **Azure Functions** é um serviço de computação **serverless**, onde o Azure é
responsável por toda a infraestrutura necessária para execução das aplicações.

Principais características:

- Execução sob demanda
- Infraestrutura totalmente gerenciada
- Escalabilidade automática conforme a carga
- Modelo de cobrança baseado em execução
- Ideal para eventos, integrações e processamento assíncrono

## 🔄 Azure Logic Apps

O **Azure Logic Apps** é uma solução voltada para **automação de fluxos de
trabalho**, com foco em integração entre sistemas.

Características principais:

- Designer visual **low-code/no-code**
- Modelos pré-configurados para acelerar a criação
- Integração nativa com diversos serviços SaaS
- Suporte a integrações locais (on-premises)
- APIs do BizTalk para cenários mais avançados
- Definição de fluxo baseada em **JSON**

## ⚖️ Azure Functions vs Azure Logic Apps

| Cenário | Serviço Recomendado | Benefícios | Observações |
|-------|--------------------|-----------|-------------|
| Processamento de eventos em tempo real | Azure Functions | Alta escalabilidade, baixo custo, execução rápida | Monitoramento e logging podem exigir ajustes |
| Integração com APIs e serviços externos | Azure Functions | Flexibilidade de linguagem e integração | Atenção à segurança e dependências |
| Processamento assíncrono (filas/mensageria) | Azure Functions | Escala automática e tolerância a carga variável | Dependência da latência das filas |
| Orquestração de processos de negócio | Azure Logic Apps | Facilidade visual e conectores prontos | Pode ter limitações em cenários complexos |

## 🧠 Principais Aprendizados

- Conceito e benefícios da computação serverless
- Quando usar Azure Functions ou Logic Apps
- Diferenças práticas entre execução baseada em código e automação visual
- Como o Azure gerencia escalabilidade e infraestrutura automaticamente
- Importância do serverless para reduzir custos e complexidade operacional
