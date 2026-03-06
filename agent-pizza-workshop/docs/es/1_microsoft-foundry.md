# Configurar Microsoft Foundry  

En esta sección, configurarás el recurso de Microsoft Foundry e implementarás tu primer modelo para que esté listo para el taller. Antes de comenzar con el taller, asegúrate de haber leído [cómo obtener Azure](./get-azure) y [configurar tu entorno de desarrollo](./dev-environment). 

## Pasos  

1. **Iniciar sesión en Azure**  
   - Inicia sesión en el [Portal de Azure](https://portal.azure.com).  

---

2. **Crear un Recurso de Microsoft Foundry**  
   - Navega al servicio [Microsoft Foundry](https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/overview).  
   - Haz clic en **Crear un recurso**.  
   ![](/public/foundry/001.png)  

---

3. **Introducir los detalles del recurso**  
   Completa el formulario con los siguientes valores, luego haz clic en **Siguiente**:  

   | Campo | Valor |  
   | -- | -- |  
   | **Suscripción:** | Selecciona la suscripción proporcionada para este taller |  
   | **Grupo de recursos:** | Haz clic en `Crear nuevo` y dale a tu grupo de recursos un nombre descriptivo, por ejemplo `pizza_workshop-RG` |  
   | **Nombre:** | Introduce un nombre único, por ejemplo `pizza-foundry-resource-7yud` |  
   | **Región:** | Selecciona **West US** (⚠️ No selecciones otra región) |  
   | **Nombre del Proyecto:** | `Pizza-Workshop` |  

   ![](/public/foundry/002.png)  

---

4. **Implementar el recurso**  
   - Haz clic en **Siguiente** en los pasos restantes hasta llegar a **Revisar + Crear**.  
   - Haz clic en **Crear** para implementar el recurso.  
   - Espera 1–5 minutos para que el recurso termine de implementarse.  

---

5. **Abrir Microsoft Foundry**  
   - Navega a [AI.Azure.com](https://ai.azure.com).  
   - Ahora deberías ver los proyectos de Microsoft Foundry vinculados a tu suscripción.  
   ![](/public/foundry/003.png)  
   - Haz clic en tu proyecto, por ejemplo **Pizza-Workshop**.  

---

6. **Implementar un modelo base**  
   - En el proyecto, ve a **Modelos + puntos finales**.  
   ![](/public/foundry/004.png)  
   - Haz clic en **Implementar modelo** → **Implementar modelo base**.  
   ![](/public/foundry/005.png)  
   - Selecciona el modelo **gpt-4o** y haz clic en **Confirmar**.  
   ![](/public/foundry/006.png)  
   - Deja todas las demás configuraciones en sus valores predeterminados y haz clic en **Implementar**.  
   ![](/public/foundry/007.png)  

   Esto hará que el modelo esté disponible en tu proyecto para ser utilizado por tus agentes.  

---

7. **Probar el modelo**  
   - Una vez completada la implementación, haz clic en **Abrir en Playground**.  
   ![](/public/foundry/008.png)  
   - En la ventana de chat, escribe:  

     ```
     Hello world
     ```  

   - Deberías ver una respuesta del modelo **gpt-4o**. 🎉  

## Resumen  

En esta sección de configuración, has:  
- Iniciado sesión en el Portal de Azure  
- Creado un **recurso de Microsoft Foundry**  
- Implementado un **modelo base GPT-4o** en tu proyecto  
- Probado el modelo en el **Playground**  

Tu entorno de Azure ahora está listo para construir el **agente PizzaBot** en los próximos capítulos.  

*Traducido usando GitHub Copilot.*
