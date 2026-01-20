# Erros e Aprendizados  

## Desafio 01 — Armazenando Dados de um E-commerce na Nuvem

## 📌 Contexto

Este documento reúne os principais **erros enfrentados durante o desenvolvimento do Desafio 01 — Armazenando Dados de um E-commerce na Nuvem**, bem como os **aprendizados obtidos ao longo da implementação da solução no Azure**.

O objetivo é registrar problemas reais enfrentados no projeto e transformá-los em **aprendizados práticos**, reutilizáveis em desafios e projetos futuros.

## ❌ Erros encontrados

### 1. Configuração incorreta do ambiente local

**Contexto:**  
Durante a execução do desafio, o ambiente local de desenvolvimento não estava corretamente preparado.

**Problema:**  
- Ambiente virtual Python não ativado corretamente  
- Dependências ausentes ou versões incompatíveis  

**Impacto:**  
- Erros na execução da aplicação  
- Atraso no progresso do desafio  

**Solução aplicada:**  
- Padronização do uso de ambiente virtual (`.venv`)  
- Recriação do ambiente local  
- Instalação explícita das dependências necessárias  

### 2. Variáveis de ambiente não carregadas corretamente

**Contexto:**  
Uso de variáveis de ambiente para armazenar credenciais e configurações de acesso aos serviços Azure.

**Problema:**  
- Arquivo `.env` existente, mas não carregado corretamente  
- Variáveis ausentes durante o runtime da aplicação  

**Impacto:**  
- Falhas de autenticação  
- Erros de conexão com Blob Storage e banco de dados  

**Solução aplicada:**  
- Padronização do carregamento de variáveis de ambiente  
- Validação das variáveis antes da execução da aplicação  

### 3. Dificuldade inicial na integração com serviços Azure

**Contexto:**  
Integração da aplicação com serviços Azure (Storage e banco de dados).

**Problema:**  
- Dúvidas sobre permissões e connection strings  
- Falta de clareza inicial sobre o fluxo de integração  

**Impacto:**  
- Tentativas repetidas de configuração  
- Retrabalho na implementação  

**Solução aplicada:**  
- Revisão da arquitetura proposta no desafio  
- Consulta à documentação oficial do Azure  
- Testes isolados de cada serviço antes da integração final  

## ✅ Aprendizados obtidos

- A preparação correta do ambiente é essencial antes de iniciar o desenvolvimento  
- Variáveis de ambiente devem ser tratadas como parte crítica da aplicação  
- Testar integrações de forma isolada reduz erros e retrabalho  
- Documentar erros facilita a evolução em projetos futuros  

## 🧠 Boas práticas consolidadas

- Criar e validar o ambiente local antes de codar  
- Utilizar `.env` para configuração sensível  
- Testar conexão com serviços Azure de forma incremental  
- Registrar erros e soluções durante o desenvolvimento  

## 🔗 Relação com o repositório

- Desafio de projeto: `02-desafios-de-projeto/desafio-01-armazenando-dados-ecommerce`
- Ambientes: `04-ambientes/ambiente-01-backend-ecommerce`
- Cursos relacionados: `01-cursos/01-introducao-a-experiencia-microsoft-azure-cloud-native-2026`

## 📈 Observação final

Os erros enfrentados neste desafio foram fundamentais para consolidar o entendimento prático sobre integração de aplicações com serviços Azure, preparando o terreno para desafios mais complexos no bootcamp.
