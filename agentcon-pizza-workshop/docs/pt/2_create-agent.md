# Crie Seu Primeiro Agente  

Neste capítulo, vamos percorrer o processo de criar seu primeiro agente de IA usando o **Foundry Agent Service**.  
No final, você terá um agente simples rodando localmente com o qual pode interagir em tempo real.  

Primeiro, volte para o ambiente GitHub Codespace que você criou anteriormente. Certifique-se de que o painel do terminal ainda está aberto na pasta **workshop**.


## Login no Azure  

Antes de usar o Foundry Agent Service, você precisa fazer login na sua assinatura Azure.  

Execute o seguinte comando e siga as instruções na tela. Use credenciais que têm acesso ao seu recurso Microsoft Foundry:  

```shell
az login --use-device-code
```



## Instalar Pacotes Necessários  

Em seguida, instale os pacotes Python necessários para trabalhar com o Microsoft Foundry e gerenciar variáveis de ambiente:  

```shell
pip install openai azure-identity azure-ai-projects==2.0.0b1 jsonref python-dotenv
```


### Criar um Arquivo `.env`  

Vamos armazenar segredos (como o endpoint do seu projeto) em um arquivo de ambiente para segurança e flexibilidade.  

1. **Crie um arquivo chamado `.env` na raiz do diretório do seu projeto.**

2. **Adicione as seguintes linhas ao arquivo:**

    ```env
    PROJECT_ENDPOINT="https://<seu-recurso-foundry>.services.ai.azure.com/api/projects/<nome-do-seu-projeto>"
    MODEL_DEPLOYMENT_NAME="gpt-4o"
    ```

Substitua `https://<seu-recurso-foundry>.services.ai.azure.com/api/projects/<nome-do-seu-projeto>` pelos valores reais do seu projeto Microsoft Foundry. 

![](/public/foundry/foundry-project-string.png)  


3. **Onde encontrar seu endpoint:**

   - Vá para o **portal Microsoft Foundry**
   - Navegue até seu projeto
   - Clique em **Overview**
   - O endpoint será exibido na página inicial do seu projeto



### 📝 Notas

- Certifique-se de que **não há espaços** ao redor do sinal `=` no arquivo `.env`.



## Criar um Agente Básico  

Agora vamos criar um script Python básico que define e executa um agente.  

- Comece criando um novo arquivo chamado: **`agent.py`** na pasta **workshop**



### Adicionar Imports ao `agent.py`  

Esses imports trazem o SDK do Azure, manipulação de ambiente e classes auxiliares:  

```python
import os
from dotenv import load_dotenv
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import PromptAgentDefinition
```

### Carregar o Arquivo `.env`  

Carregue as variáveis de ambiente no seu script adicionando esta linha ao `agent.py`:  

```python
load_dotenv()
```



### Criar o Cliente do Projeto  

Este cliente conecta seu script ao serviço Microsoft Foundry usando o endpoint e suas credenciais Azure.  

```python
project_client = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)
openai_client = project_client.get_openai_client()
```



### Criar o Agente  

Agora, vamos criar o agente em si. Usaremos `create_version` para criar um Foundry Agent com um `PromptAgentDefinition`.  

```python
agent = project_client.agents.create_version(
    agent_name="hello-world-agent",
    definition=PromptAgentDefinition(
        model=os.environ["MODEL_DEPLOYMENT_NAME"],
    ),
)
print(f"Agente criado (id: {agent.id}, nome: {agent.name}, versão: {agent.version})")
```



### Criar uma Conversa  

Agentes interagem dentro de conversas. Uma conversa é como um container que armazena todas as mensagens trocadas entre o usuário e o agente.  

```python
conversation = openai_client.conversations.create()
print(f"Conversa criada (id: {conversation.id})")
```



### Conversar com o Agente  

Este loop permite que você envie mensagens para o agente. Digite no terminal, e a mensagem será enviada para o agente.  

```python
while True:
    # Obter a entrada do usuário
    user_input = input("Você: ")

    if user_input.lower() in ["exit", "quit", "sair"]:
        print("Saindo do chat.")
        break

    # Obter a resposta do agente
    response = openai_client.responses.create(
        conversation=conversation.id,
        input=user_input,
        extra_body={"agent": {"name": agent.name, "type": "agent_reference"}},
    )

    # Imprimir a resposta do agente
    print(f"Assistente: {response.output_text}")
```



## Execute Seu Agente  

No terminal, execute:  

```bash
python agent.py
```

Você deve ver uma mensagem de confirmação de que o agente foi criado.  
Tente enviar uma mensagem como: `Olá!`  

O agente responderá de volta.  

Digite `exit` ou `quit` ou `sair` para parar a conversa.  



## Resumo  

Neste capítulo, você:  
- Fez login no Azure via CLI  
- Instalou os pacotes Python necessários  
- Criou um arquivo `.env` seguro para guardar seu endpoint  
- Construiu e executou seu primeiro **Foundry Agent**  
- Interagiu com o agente através de um loop de chat  


## Amostra de código final

```python 
<!--@include: ../codesamples/pt/agent_2.py-->
```

*Traduzido usando GitHub Copilot.*
