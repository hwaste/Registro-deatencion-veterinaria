## El siguiente proyecto es parte de una evaluacion de la asignatura Front End.

 Consiste en implementar una solucion para el registro de mascotas de un centro veterinario con funciones de validacion de datos, integrar, funciones de estado "atendido, atendiendo", eliminar el registro, editar registro, funciones de visualizacion de los registros por orden alfabetico, y por orden de llegada.
Adicionalmente cuenta con un contador de pacientes registrados, pacientes atendidos y pacientes pendientes.


## Uso de Inteligencia Artificial

**1. ¿Qué herramienta utilizó?**
Para el desarrollo del proyecto se recicló un formulario de registro de tareas realizado en clases, utilizando visual studio code y apoyo de IA copilot integrada a través del chat.

**2. ¿Qué consulta realizó?**
En primer lugar fue necesario solucionar el problema que no me permitía guardar los registros que iba haciendo, sin necesidad de ir actualizando la web. 

Esto se consiguió con la ayuda de chatgpt mostrando una imagen del error que mostraba al desplegar la aplicacion web con (npm run dev) desde CMD en windows. Chatgpt mencionó que el error estaba en una de las lineas de comando de la funcion encargada de guardar los datos e ir actualizando en tiempo real, que estaba en el archivo TaskForm.jsx.

**3. ¿Qué sugerencia entregó la IA?**
Varias, modifiqué completamente el formulario y aspectos con IA, entre otras la función para mantener guardado el formulario, y que no se borre al actualizar la web.

**4. ¿La utilizó completamente o realizó modificaciones?**
La IA cumplió un rol fundamental para desarrollar la adaptación del formulario realizado en clases que trataba acerca de un gestor de tareas.
Realicé las diferentes modificaciones paso a paso, siguiendo las instrucciones de la guía, pidiendo a IA copilot que integrara las diferentes funciones principales del formulario, por ejemplo los atributos del formulario, la estructura del arreglo, que implementara validaciones de datos para dar un poco de "seguridad" a la aplicacion.
Todas las funciones fueron realizadas con IA.

Una vez integradas las funciones principales del requerimiento del Registro de atención veterinaria, integré algunos "adornos" a la aplicación como el color de los botones de estado, el banner dinámico 
"# Registro de pacientes veterinarios".

**5. ¿Por qué considera importante revisar las respuestas generadas por la IA antes de utilizarlas?**
Considero que es importante revisar las propuestas de la ia, ya que por ejemplo cuando creó las funciones, las creó en inglés, y como parte del desarrollo y modificacion o mejoras futuras, considero que es importante mantener ese control de idioma mientras se pueda.
Además me parece acertado lo que comentó el docente en clases *"a veces la ia propone funciones obsoletas"*