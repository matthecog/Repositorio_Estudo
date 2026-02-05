# Desafio de Projeto — API de Pagamento Segura com Azure API Management

## 📌 Status
✅ Concluído

## 🎯 Descrição do Desafio
O desafio consiste na criação do **conceito de uma API de pagamentos segura**,
utilizando os serviços do Azure para garantir controle de acesso, isolamento de
rede e governança das requisições.

O foco principal não está na lógica de pagamento em si, mas na **arquitetura de
segurança**, autenticação e exposição controlada da API.

## 🧠 Cenário Proposto
Foi modelado um cenário onde clientes externos **não acessam diretamente a API
de back-end**, mas sim através de um **API Gateway**, garantindo maior segurança
e controle.

O fluxo de autenticação utiliza o **Azure Active Directory (Azure AD)**, com
emissão de tokens para acesso à API.



## 🛠️ Serviços Utilizados

- Azure API Management
- Azure Web APP
- Azure AD
- Azure APP Service
- Azure App Registration
- Visual Stuio
- Postman

## 📷 Evidências

<p align="center">
    <img src="imagens/resource-group.png" width="700">  
    <img src="imagens/acr-blog.png" width="700">
    <img src="imagens/tela-blog.png" width="700">
</p>

## 🧠 Principais aprendizados

- Utilização do API Magagement para gerenciamento.
- Segurança das APIs
- Integração ao Azure App registrations
- Uso de tokens para proteção de serviços

## 🔗 Recursos Complementares

- Pasta do Laboratório: [Laboratório](/microsoft-azure-cloud-native-2026/04-laboratorios/lab03-1-criando-um-blog-com-container-app/)
- Códigos utilizados: [Códigos](/microsoft-azure-cloud-native-2026/04-laboratorios/lab03-1-criando-um-blog-com-container-app/codigos/)
- Imagens do ambiente: [Imagens](/microsoft-azure-cloud-native-2026/04-laboratorios/lab03-1-criando-um-blog-com-container-app/imagens/)

