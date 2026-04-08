# Ejercicio 3: Todo List CRUD completo

## Objetivo
Crear una app de tareas con crear, listar, marcar completada, editar y borrar. Este es EL ejercicio clasico de entrevistas.

## Requisitos
1. Input + boton para agregar una tarea nueva
2. No permitir agregar tareas vacias
3. Mostrar lista de tareas con: texto, checkbox de completada, boton editar, boton borrar
4. Click en checkbox marca/desmarca como completada (texto tachado si esta completada)
5. Click en editar: el texto se convierte en input editable, el boton cambia a "Guardar"
6. Click en borrar: elimina la tarea de la lista
7. Mostrar contador: "X tareas pendientes"

## Reglas
- SIN IA, SIN Copilot, SIN copiar codigo
- Googlear sintaxis SOLO si llevas 10 min bloqueado
- Empieza por crear y listar, luego anade el resto paso a paso

## Pistas (NO leer hasta intentarlo 15 min)
<details>
<summary>Pista 1: Modelo de datos</summary>
Cada tarea: { id: number, text: string, completed: boolean }
Usa Date.now() como id unico.
</details>

<details>
<summary>Pista 2: Edicion</summary>
Necesitas un estado editingId que guarde el id de la tarea en edicion (o null si ninguna).
Y un estado editText para el valor temporal del input de edicion.
</details>

<details>
<summary>Pista 3: Actualizar un item en un array</summary>
todos.map(t => t.id === id ? { ...t, campo: nuevoValor } : t)
</details>

## Criterio de "lo se hacer"
Puedes hacerlo completo en menos de 25 minutos sin mirar nada. Cuando lo consigas, estas listo para entrevistas live coding.
