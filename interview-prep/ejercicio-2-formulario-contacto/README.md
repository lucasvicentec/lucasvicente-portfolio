# Ejercicio 2: Formulario con validacion manual

## Objetivo
Crear un formulario de contacto con validacion sin librerias externas.

## Requisitos
1. Campos: nombre, email, mensaje
2. Todos los campos son obligatorios
3. El email debe tener formato valido (contener @ y .)
4. El mensaje debe tener minimo 10 caracteres
5. Mostrar errores debajo de cada campo en rojo
6. Los errores solo se muestran al hacer submit (no mientras escribe)
7. Si todo es valido, mostrar un alert o un mensaje de exito y limpiar el form
8. El boton de enviar debe estar deshabilitado mientras los campos estan vacios

## Reglas
- SIN IA, SIN Copilot, SIN copiar codigo
- Googlear sintaxis SOLO si llevas 10 min bloqueado
- Hazlo feo primero, mejoralo despues

## Pistas (NO leer hasta intentarlo 15 min)
<details>
<summary>Pista 1: Estado del form</summary>
Un useState con un objeto: { name: "", email: "", message: "" }
Y otro useState para los errores: { name: "", email: "", message: "" }
</details>

<details>
<summary>Pista 2: Validacion</summary>
Crea una funcion validate() que revise cada campo y devuelva un objeto de errores.
Si el objeto tiene algun valor no vacio, hay errores.
</details>

<details>
<summary>Pista 3: handleSubmit</summary>
e.preventDefault() para que no recargue la pagina.
Llama a validate(), si hay errores setea el estado de errores, si no muestra exito.
</details>

## Criterio de "lo se hacer"
Puedes hacerlo en menos de 20 minutos sin mirar nada. Cuando lo consigas, pasa al ejercicio 3.
