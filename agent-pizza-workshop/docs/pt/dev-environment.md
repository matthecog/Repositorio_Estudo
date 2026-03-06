# Configuração do Ambiente de Desenvolvimento  

Para construir e executar o agente PizzaBot durante este workshop, você usará um ambiente de desenvolvimento **GitHub Codespaces** pré-configurado.  

Esta configuração garante:  
- Python **3.13** está pronto para usar  
- Todas as dependências necessárias estão pré-instaladas  
- GitHub Copilot está habilitado  
- Você pode começar a programar imediatamente em um ambiente consistente  

## Passos  

### 1. Fazer Fork do Repositório  
1. Vá para o repositório oficial do workshop:  
   👉 [https://github.com/GlobalAICommunity/agentcon-pizza-workshop](https://github.com/GlobalAICommunity/agentcon-pizza-workshop)  
2. Clique em **Fork** no canto superior direito.  
3. Selecione sua conta GitHub como destino.  

Isso cria sua própria cópia do repositório do workshop.  

### 2. Iniciar um Codespace  
1. No seu repositório forkado, clique no botão verde **Code**.  
2. Selecione a aba **Codespaces**.  
3. Clique em **Create codespace on main**.  

O GitHub agora iniciará um novo Codespace usando a **configuração de devcontainer** fornecida.  
Isso irá:  
- Construir um container com Python 3.13  
- Instalar todas as dependências do `requirements.txt`  

Este passo pode levar alguns minutos na primeira vez.  

### 3. Abrir o Diretório do Workshop  
Quando seu Codespace iniciar, certifique-se de estar trabalhando dentro do diretório `workshop/`:  

```bash
cd workshop
```

Todos os seus arquivos Python (`agent.py`, `tools.py`, etc.) devem ser criados e executados daqui.  


### 4. Verificar Seu Ambiente  
Execute o seguinte para verificar se tudo está configurado corretamente:  

```bash
python --version
```
Saída esperada: **Python 3.10.x**  


### 5. Comece a Programar! 🚀  

A partir daqui, comece com [o workshop](./1_microsoft-foundry).


## Resumo  

Nesta seção de configuração, você:  
- Fez fork do repositório do workshop para sua conta GitHub  
- Iniciou um GitHub Codespace com o devcontainer fornecido  
- Garantiu que Python 3.10 e dependências estão instalados  
- Abriu o diretório `workshop/` como sua pasta de trabalho  

Agora você está pronto para construir o **agente PizzaBot** passo a passo. 🍕🤖  

*Traduzido usando GitHub Copilot.*
