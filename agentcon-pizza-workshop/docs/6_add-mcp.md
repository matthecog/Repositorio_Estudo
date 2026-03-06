# Integrating MCP (Model Context Protocol)

In earlier chapters, your agent learned to follow instructions, ground itself in your own data using **File Search (RAG)**, and call custom **tools**.  

In this final chapter, we'll connect your agent to a live **MCP server** — giving it access to **external capabilities** like live menus, toppings, and order management through a standard, secure protocol.


## What Is MCP and Why Use It?

**MCP (Model Context Protocol)** is an open standard for connecting AI agents to external tools, data sources, and services through interoperable **MCP servers**.  
Instead of integrating with individual APIs, you connect once to an MCP server and automatically gain access to all the tools that server exposes.

### Benefits of MCP

- 🧩 **Interoperability:** a universal way to expose tools from any service to any MCP-aware agent.  
- 🔐 **Security & governance:** centrally manage access and tool permissions.  
- ⚙️ **Scalability:** add or update server tools without changing your agent code.  
- 🧠 **Simplicity:** keep integrations and business logic in the server; keep your agent focused on reasoning.


## Update Your Imports

Update your imports in `agent.py` to include `MCPTool`:

```python
import json
import os
import glob
from dotenv import load_dotenv
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import PromptAgentDefinition, FileSearchTool, FunctionTool, MCPTool, Tool
from openai.types.responses.response_input_param import FunctionCallOutput, ResponseInputParam
```


## The Contoso Pizza MCP Server

For Contoso Pizza, the MCP server exposes APIs for:
- 🧀 **Pizzas:** available menu items and prices  
- 🍅 **Toppings:** categories, availability, and details  
- 📦 **Orders:** create, view, and cancel customer orders  

You'll connect your agent to this server and grant it access to use the tools for these operations.


## Add the MCP Tool

Add this code after your Function Calling Tool section and before creating the toolset:

```python
## -- MCP -- ##
mcpTool = MCPTool(
    server_label="contoso-pizza-mcp",
    server_url="<!--@include: ./variables/mcp-url.md-->",
    require_approval="never"
)
## -- MCP -- ##
```

### Parameters Explained

| Parameter | Description |
| -- | -- |
| **server_label** | A human-readable name for logs and debugging. |
| **server_url** | The MCP server endpoint. |
| **require_approval** | Defines whether calls require manual approval (`"never"` disables prompts). |

::: tip
💡 In production, use more restrictive approval modes for sensitive operations.
::: 


## Update the Toolset

Add the MCP tool to your toolset:

```python
## Define the toolset for the agent
toolset: list[Tool] = []
toolset.append(FileSearchTool(vector_store_ids=[vector_store.id]))
toolset.append(func_tool)
toolset.append(mcpTool)
```


## Add a User ID

To place orders, the agent must identify the customer.

1. **Get your User ID**  
   Visit this URL to register a customer:  
   [<!--@include: ./variables/customer-registration.md-->](<!--@include: ./variables/customer-registration.md-->)  

2. **Update your `instructions.txt`** with your user details or pass the GUID in chat.

```txt
## User details:
Name: <YOUR NAME>
UserId: <YOUR USER GUID>
```

3. (Optional) View your order dashboard:  
   [<!--@include: ./variables/pizza-dashboard.md-->](<!--@include: ./variables/pizza-dashboard.md-->)



## Trying It Out

Now it's time to test your connected agent!  
Run the agent and try out these prompts:

```
Show me the available pizzas.
```

```
What is the price for a pizza hawai?
```

```
Place an order for 2 large pepperoni pizzas.
```

The agent will automatically call the appropriate MCP tools, retrieve data from the live Contoso Pizza API, and respond conversationally — following your **instructions.txt** rules (e.g., tone, local currency, and time zone conversions).



## Best Practices for MCP Integration

- 🔒 **Principle of least privilege:** only allow tools the agent truly needs.  
- 📜 **Observability:** log all tool calls for traceability and debugging.  
- 🔁 **Resilience:** handle connection errors gracefully and retry failed tool calls.  
- 🧩 **Versioning:** pin MCP server versions to prevent breaking changes.  
- 👩‍💼 **Human-in-the-loop:** use approval modes for sensitive actions (like order placement).



## Recap

In this chapter, you:  
- Learned what **MCP** is and why it matters for scalable agent design.  
- Added the **MCPTool** to connect to the Contoso Pizza MCP Server.  
- Tested real-time integration with menu, toppings, and order tools.  



🎉 **Congratulations — you've completed the workshop!**  
Your agent can now:  
✅ Follow system instructions  
✅ Access and reason over private data (RAG)  
✅ Call custom tools  
✅ Interact with live services via MCP  

Your **Contoso PizzaBot** is now a fully operational, intelligent, and extensible AI assistant.



## Final code sample

```python 
<!--@include: ./codesamples/agent_6_mcp.py-->
```
