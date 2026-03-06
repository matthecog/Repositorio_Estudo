# Configuración del Entorno de Desarrollo  

Para construir y ejecutar el agente PizzaBot durante este taller, usarás un entorno de desarrollo **GitHub Codespaces** preconfigurado.  

Esta configuración asegura:  
- Python **3.13** está listo para usar  
- Todas las dependencias requeridas están preinstaladas  
- GitHub Copilot está habilitado  
- Puedes empezar a codificar de inmediato en un entorno consistente  

## Pasos  

### 1. Hacer un Fork del Repositorio  
1. Ve al repositorio oficial del taller:  
   👉 [https://github.com/GlobalAICommunity/agentcon-pizza-workshop](https://github.com/GlobalAICommunity/agentcon-pizza-workshop)  
2. Haz clic en **Fork** en la esquina superior derecha.  
3. Selecciona tu cuenta de GitHub como destino.  

Esto crea tu propia copia del repositorio del taller.  

### 2. Iniciar un Codespace  
1. En tu repositorio forkeado, haz clic en el botón verde **Code**.  
2. Selecciona la pestaña **Codespaces**.  
3. Haz clic en **Create codespace on main**.  

GitHub ahora iniciará un nuevo Codespace usando la **configuración de devcontainer** proporcionada.  
Esto hará:  
- Construir un contenedor con Python 3.13  
- Instalar todas las dependencias desde `requirements.txt`  

Este paso puede tomar unos minutos la primera vez.  

### 3. Abrir el Directorio del Taller  
Cuando tu Codespace inicie, asegúrate de estar trabajando dentro del directorio `workshop/`:  

```bash
cd workshop
```

Todos tus archivos de Python (`agent.py`, `tools.py`, etc.) deben ser creados y ejecutados desde aquí.  


### 4. Verificar Tu Entorno  
Ejecuta lo siguiente para verificar que todo esté configurado correctamente:  

```bash
python --version
```
Salida esperada: **Python 3.10.x**  


### 5. ¡Comienza a Codificar! 🚀  

Desde aquí, comienza con [el taller](./1_microsoft-foundry).


## Resumen  

En esta sección de configuración, has:  
- Hecho un fork del repositorio del taller en tu cuenta de GitHub  
- Iniciado un GitHub Codespace con el devcontainer proporcionado  
- Asegurado que Python 3.10 y las dependencias estén instaladas  
- Abierto el directorio `workshop/` como tu carpeta de trabajo  

Ahora estás listo para construir el **agente PizzaBot** paso a paso. 🍕🤖  

*Traducido usando GitHub Copilot.*
