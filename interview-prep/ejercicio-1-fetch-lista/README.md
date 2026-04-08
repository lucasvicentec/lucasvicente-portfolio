# Ejercicio 1: Fetch + Lista + Buscador

## Objetivo
Crear un componente React que cargue usuarios de una API, los muestre en lista y permita filtrar por nombre.

## Requisitos
1. Al montar el componente, hacer fetch a `https://jsonplaceholder.typicode.com/users`
2. Mostrar un estado de "Cargando..." mientras se hace el fetch
3. Si hay error, mostrar "Error al cargar usuarios"
4. Mostrar los usuarios en una lista: nombre y email
5. Un input de texto que filtre la lista por nombre en tiempo real
6. Mostrar cuantos resultados hay: "X usuarios encontrados"

## Reglas
- SIN IA, SIN Copilot, SIN copiar codigo
- Googlear sintaxis SOLO si llevas 10 min bloqueado en algo especifico
- Intenta hacerlo de memoria, equivocate, y corrigete

## Pistas (NO leer hasta intentarlo 15 min)
<details>
<summary>Pista 1: Estructura</summary>
Necesitas 3 estados: usuarios, loading, error. Y un estado para el texto del buscador.
</details>

<details>
<summary>Pista 2: useEffect</summary>
useEffect con array vacio [] se ejecuta solo al montar. Dentro haces fetch().then().catch()
</details>

<details>
<summary>Pista 3: Filtrado</summary>
Usa .filter() sobre el array de usuarios comparando con .toLowerCase().includes()
</details>

## Criterio de "lo se hacer"
Puedes hacerlo en menos de 15 minutos sin mirar nada. Cuando lo consigas, pasa al ejercicio 2.
