# Erros e Aprendizados — Lab 07  
## Aplicação de Aluguel de Carros Cloud-Native

Este documento registra os principais erros, dificuldades técnicas e aprendizados obtidos durante a construção da aplicação Cloud-Native utilizando serviços do Microsoft Azure.

O objetivo é documentar a evolução técnica e as decisões arquiteturais tomadas ao longo do laboratório.

## ❌ 1. Erro: Configuração incorreta de variáveis de ambiente no Container App

### Problema
A API não conseguia se conectar ao banco de dados após o deploy no Azure Container Apps.

### Causa
As variáveis de ambiente não estavam configuradas corretamente no ambiente do container.

### Correção
- Revisão das configurações no Azure Portal
- Padronização das connection strings
- Validação manual via logs do container

### ✅ Aprendizado
Em ambientes containerizados, variáveis de ambiente são críticas para conexão com recursos externos.  
Sempre validar:
- Nome exato da variável
- Valor correto da string
- Ambiente correto (produção vs desenvolvimento)

## ❌ 2. Erro: Falha no processamento da Azure Function acionada pela fila

### Problema
Mensagens eram enviadas para o Service Bus, mas não eram processadas pela Azure Function.

### Causa
Configuração incorreta do binding da fila na Function.

### Correção
- Revisão do nome da fila no binding
- Ajuste do connection string do Service Bus
- Testes com mensagens manuais

### ✅ Aprendizado
Arquiteturas orientadas a eventos exigem atenção total à configuração de bindings e permissões.  
Pequenos erros de nome impedem todo o fluxo.

## 🚀 Evolução Técnica Percebida

Durante este laboratório houve evolução em:

- Modelagem arquitetural
- Uso de mensageria
- Configuração de ambientes em cloud
- Integração entre múltiplos serviços Azure
- Organização profissional de documentação
