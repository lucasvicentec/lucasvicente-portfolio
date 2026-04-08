import type { Track } from "../types";

export const tracks: Track[] = [
  // ============================================================
  // TRACK 1: JavaScript Core
  // ============================================================
  {
    id: "javascript",
    title: "JavaScript Core",
    desc: "Fundamentos del lenguaje: tipos, funciones, closures, async/await y metodos de array.",
    icon: "JS",
    color: "#eab308",
    week: 1,
    exercises: [
      {
        id: "js_theory",
        title: "Teoria: JavaScript Esencial",
        type: "theory",
        content: `
<h2>JavaScript Esencial para Entrevistas</h2>

<div class="theory-section">
<h3>1. Variables y Tipos</h3>
<p>JavaScript tiene 7 tipos primitivos: <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, <code>symbol</code>, <code>bigint</code>. Todo lo demas es un objeto.</p>

<div class="theory-highlight">
<strong>var vs let vs const:</strong> <code>var</code> tiene scope de funcion y se eleva (hoisting). <code>let</code> y <code>const</code> tienen scope de bloque. <code>const</code> no permite reasignacion (pero los objetos que contiene si son mutables).
</div>

<pre><code>var x = 1;    // scope de funcion, hoisted
let y = 2;    // scope de bloque
const z = 3;  // scope de bloque, no reasignable

const arr = [1, 2, 3];
arr.push(4);  // OK, el array es mutable
// arr = [];  // ERROR, no se puede reasignar</code></pre>
</div>

<div class="theory-section">
<h3>2. Funciones y Scope</h3>
<p>Las funciones en JS son ciudadanos de primera clase: se pueden asignar a variables, pasar como argumentos y retornar desde otras funciones.</p>

<pre><code>// Declaracion - se eleva completa
function suma(a, b) { return a + b; }

// Expresion - solo se eleva la variable
const resta = function(a, b) { return a - b; };

// Arrow function - no tiene su propio this
const multiplica = (a, b) => a * b;</code></pre>

<div class="theory-highlight">
<strong>Scope chain:</strong> Cuando se busca una variable, JS mira primero en el scope local, luego en el scope padre, y asi sucesivamente hasta el scope global.
</div>
</div>

<div class="theory-section">
<h3>3. Closures</h3>
<p>Un closure es una funcion que recuerda el entorno en el que fue creada, incluso despues de que ese entorno haya terminado de ejecutarse.</p>

<pre><code>function crearContador() {
  let count = 0;
  return {
    incrementar: () => ++count,
    obtener: () => count
  };
}
const contador = crearContador();
contador.incrementar(); // 1
contador.incrementar(); // 2
contador.obtener();     // 2</code></pre>

<p><strong>Uso comun:</strong> Encapsulacion de datos, fabricas de funciones, callbacks con estado.</p>
</div>

<div class="theory-section">
<h3>4. Metodos de Array</h3>
<p>Los metodos funcionales son clave en entrevistas:</p>

<pre><code>const nums = [1, 2, 3, 4, 5];

// map - transforma cada elemento
nums.map(n => n * 2);        // [2, 4, 6, 8, 10]

// filter - filtra elementos
nums.filter(n => n > 3);     // [4, 5]

// reduce - acumula en un valor
nums.reduce((acc, n) => acc + n, 0); // 15

// find - primer elemento que cumple
nums.find(n => n > 3);       // 4

// some/every - comprobaciones
nums.some(n => n > 4);       // true
nums.every(n => n > 0);      // true

// flat/flatMap
[[1,2],[3,4]].flat();        // [1,2,3,4]

// sort (muta el original!)
[3,1,2].sort((a,b) => a - b); // [1,2,3]</code></pre>
</div>

<div class="theory-section">
<h3>5. Destructuring y Spread</h3>

<pre><code>// Destructuring de objetos
const { name, age = 25 } = { name: "Lucas", age: 28 };

// Destructuring de arrays
const [first, ...rest] = [1, 2, 3, 4];
// first = 1, rest = [2, 3, 4]

// Spread operator
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Rest en funciones
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}</code></pre>
</div>

<div class="theory-section">
<h3>6. Async/Await y Promesas</h3>
<p>JavaScript es single-threaded pero usa un event loop para manejar operaciones asincronas.</p>

<pre><code>// Promesa basica
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve("datos"), 1000);
});

// Async/await (azucar sintactico)
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// Promise.all - ejecutar en paralelo
const [users, posts] = await Promise.all([
  fetch('/users').then(r => r.json()),
  fetch('/posts').then(r => r.json())
]);</code></pre>

<div class="theory-highlight">
<strong>Event Loop:</strong> Call Stack > Microtasks (Promises) > Macrotasks (setTimeout, setInterval). Las promesas siempre se resuelven antes que setTimeout, incluso con delay 0.
</div>
</div>

<div class="theory-tip">
<strong>Tip de entrevista:</strong> Practica explicando closures con un ejemplo simple. Es la pregunta mas frecuente de JS en entrevistas. Tambien asegurate de conocer la diferencia entre == y === (coercion vs estricta).
</div>
`
      },
      {
        id: "js_quiz",
        title: "Quiz: JavaScript",
        type: "quiz",
        questions: [
          {
            q: "Cual es la diferencia entre == y ===?",
            opts: [
              "No hay diferencia",
              "== compara valor con coercion de tipo, === compara valor y tipo sin coercion",
              "=== es mas lento que ==",
              "== solo funciona con strings"
            ],
            c: 1,
            exp: "== realiza coercion de tipos antes de comparar (ej: '1' == 1 es true), mientras que === compara sin coercion (ej: '1' === 1 es false). Siempre usa === en entrevistas."
          },
          {
            q: "Que diferencia hay entre let y const?",
            opts: [
              "let es global, const es local",
              "const es mas rapido",
              "let permite reasignacion, const no (pero ambos tienen scope de bloque)",
              "No hay diferencia practica"
            ],
            c: 2,
            exp: "Ambos tienen scope de bloque. La diferencia es que const no permite reasignar la variable (const x = 1; x = 2; // Error). Sin embargo, los objetos y arrays asignados con const SI son mutables."
          },
          {
            q: "Que es hoisting?",
            opts: [
              "Un patron de diseno",
              "Un metodo de optimizacion del navegador",
              "El mecanismo por el cual las declaraciones se mueven al inicio de su scope antes de la ejecucion",
              "Una tecnica de CSS"
            ],
            c: 2,
            exp: "Hoisting mueve las declaraciones (no las asignaciones) al tope del scope. Las funciones declaradas se elevan completas, var se eleva como undefined, y let/const se elevan pero no se inicializan (temporal dead zone)."
          },
          {
            q: "Que devuelve [1,2,3].map(x => x * 2)?",
            opts: [
              "[2,4,6]",
              "[1,2,3,1,2,3]",
              "6",
              "undefined"
            ],
            c: 0,
            exp: "map() crea un nuevo array aplicando la funcion a cada elemento. Cada elemento se multiplica por 2, resultando en [2, 4, 6]. No muta el array original."
          },
          {
            q: "Que es un closure?",
            opts: [
              "Una funcion que se ejecuta inmediatamente",
              "Una funcion que recuerda el entorno lexico donde fue creada",
              "Un metodo para cerrar conexiones",
              "Un tipo de loop"
            ],
            c: 1,
            exp: "Un closure es una funcion que mantiene acceso a las variables de su scope externo incluso despues de que la funcion externa haya terminado. Es fundamental para encapsulacion y callbacks."
          },
          {
            q: "Que hace async/await?",
            opts: [
              "Crea hilos paralelos",
              "Es azucar sintactico sobre promesas que permite escribir codigo asincrono de forma sincrona",
              "Bloquea el event loop",
              "Solo funciona en Node.js"
            ],
            c: 1,
            exp: "async/await es azucar sintactico sobre Promesas. async declara que una funcion retorna una promesa, y await pausa la ejecucion de esa funcion hasta que la promesa se resuelva, sin bloquear el hilo principal."
          },
          {
            q: "Que hace el operador spread (...)?",
            opts: [
              "Solo funciona con arrays",
              "Expande un iterable en elementos individuales y tambien sirve como rest en parametros",
              "Es lo mismo que concat()",
              "Crea una copia profunda"
            ],
            c: 1,
            exp: "El spread (...) expande iterables: [...arr], {...obj}. Como rest en parametros, agrupa argumentos: function f(...args). CUIDADO: solo hace copia superficial (shallow copy), no profunda."
          },
          {
            q: "Cual es la diferencia entre null y undefined?",
            opts: [
              "Son exactamente lo mismo",
              "null es asignado intencionalmente para indicar 'sin valor', undefined indica que la variable no ha sido asignada",
              "undefined es un error",
              "null solo existe en TypeScript"
            ],
            c: 1,
            exp: "undefined significa que una variable fue declarada pero no se le asigno valor. null es un valor asignado intencionalmente que representa 'sin valor'. typeof null === 'object' (bug historico de JS)."
          }
        ]
      },
      {
        id: "js1",
        title: "Array Methods",
        type: "code",
        difficulty: "easy",
        desc: "Implementa un componente que muestre una lista de usuarios filtrada y transformada usando metodos de array.",
        starter: `function App() {
  const users = [
    { name: "Ana", age: 28, active: true },
    { name: "Luis", age: 17, active: true },
    { name: "Maria", age: 35, active: false },
    { name: "Carlos", age: 22, active: true },
    { name: "Elena", age: 15, active: true }
  ];

  // TODO: Filtra solo usuarios activos Y mayores de 18
  // Luego mapea a elementos <li> mostrando "Nombre (edad)"
  const filtered = [];

  return (
    <div>
      <h3>Usuarios Activos (+18)</h3>
      <ul>{filtered}</ul>
      <p>Total: {filtered.length}</p>
    </div>
  );
}`,
        solution: `function App() {
  const users = [
    { name: "Ana", age: 28, active: true },
    { name: "Luis", age: 17, active: true },
    { name: "Maria", age: 35, active: false },
    { name: "Carlos", age: 22, active: true },
    { name: "Elena", age: 15, active: true }
  ];

  const filtered = users
    .filter(u => u.active && u.age >= 18)
    .map(u => <li key={u.name}>{u.name} ({u.age})</li>);

  return (
    <div>
      <h3>Usuarios Activos (+18)</h3>
      <ul>{filtered}</ul>
      <p>Total: {filtered.length}</p>
    </div>
  );
}`,
        check: `(function(el) {
  const lis = el.querySelectorAll('li');
  if (lis.length !== 2) return 'Deberia haber 2 usuarios (Ana y Carlos)';
  const text = el.textContent;
  if (!text.includes('Ana') || !text.includes('Carlos')) return 'Faltan Ana o Carlos';
  if (text.includes('Luis') || text.includes('Elena')) return 'Luis y Elena son menores de 18';
  if (text.includes('Maria')) return 'Maria no esta activa';
  return true;
})`,
        hints: ["Usa .filter() para quedarte con activos mayores de 18", "Encadena .map() despues de .filter()", "Recuerda usar key en los <li>"]
      },
      {
        id: "js2",
        title: "Destructuring y Spread",
        type: "code",
        difficulty: "easy",
        desc: "Usa destructuring y spread para crear un componente de perfil de usuario con valores por defecto.",
        starter: `function App() {
  const rawUser = {
    name: "Lucas",
    age: 28,
    skills: ["React", "TypeScript"],
    address: { city: "Madrid", country: "Spain" }
  };

  // TODO: Usa destructuring para extraer name, age, skills, city
  // Usa spread para crear newUser con un skill adicional "Node.js"
  // y edad incrementada en 1

  return (
    <div>
      <h3>Perfil</h3>
      <p className="user-name">Nombre: </p>
      <p className="user-age">Edad: </p>
      <p className="user-city">Ciudad: </p>
      <p className="user-skills">Skills: </p>
      <p className="new-age">Nueva edad: </p>
    </div>
  );
}`,
        solution: `function App() {
  const rawUser = {
    name: "Lucas",
    age: 28,
    skills: ["React", "TypeScript"],
    address: { city: "Madrid", country: "Spain" }
  };

  const { name, age, skills, address: { city } } = rawUser;
  const newUser = { ...rawUser, age: age + 1, skills: [...skills, "Node.js"] };

  return (
    <div>
      <h3>Perfil</h3>
      <p className="user-name">Nombre: {name}</p>
      <p className="user-age">Edad: {age}</p>
      <p className="user-city">Ciudad: {city}</p>
      <p className="user-skills">Skills: {skills.join(", ")}</p>
      <p className="new-age">Nueva edad: {newUser.age}</p>
    </div>
  );
}`,
        check: `(function(el) {
  const text = el.textContent;
  if (!text.includes('Lucas')) return 'Falta el nombre Lucas';
  if (!text.includes('28')) return 'Falta la edad 28';
  if (!text.includes('Madrid')) return 'Falta la ciudad Madrid';
  if (!text.includes('React')) return 'Faltan las skills';
  if (!text.includes('29')) return 'La nueva edad deberia ser 29';
  return true;
})`,
        hints: ["Usa const { name, age, skills, address: { city } } = rawUser", "Para newUser usa spread: { ...rawUser, age: age + 1 }", "Para skills nuevas: [...skills, 'Node.js']"]
      },
      {
        id: "js3",
        title: "Promesas y async/await",
        type: "code",
        difficulty: "medium",
        desc: "Crea un componente que simule una carga asincrona de datos usando promesas.",
        starter: `function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simula un fetch que tarda 500ms
  const fakeFetch = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Aprender React" },
        { id: 2, title: "Practicar TypeScript" },
        { id: 3, title: "Estudiar System Design" }
      ]);
    }, 500);
  });

  // TODO: Implementa loadData usando async/await
  // 1. Pon loading en true
  // 2. Espera el fakeFetch
  // 3. Guarda los datos
  // 4. Pon loading en false
  const loadData = async () => {

  };

  return (
    <div>
      <h3>Async Data Loader</h3>
      <button onClick={loadData}>Cargar Datos</button>
      {loading && <p className="loading">Cargando...</p>}
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
        solution: `function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fakeFetch = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Aprender React" },
        { id: 2, title: "Practicar TypeScript" },
        { id: 3, title: "Estudiar System Design" }
      ]);
    }, 500);
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fakeFetch();
      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Async Data Loader</h3>
      <button onClick={loadData}>Cargar Datos</button>
      {loading && <p className="loading">Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
        check: `(function(el) {
  const btn = el.querySelector('button');
  if (!btn) return 'Falta el boton Cargar Datos';
  if (el.querySelectorAll('li').length >= 3) return true;
  if (el.querySelector('.loading')) return true;
  return 'Haz click en Cargar Datos. Deben aparecer 3 items o el texto Cargando...';
})`,
        hints: ["Usa try/catch/finally dentro de loadData", "setLoading(true) al inicio, false en finally", "const result = await fakeFetch(); setData(result);"]
      },
      {
        id: "js4",
        title: "Closures en practica",
        type: "open",
        difficulty: "medium",
        desc: "Explica closures con tus propias palabras y da 3 ejemplos practicos de uso.",
        hints: ["Piensa en funciones que retornan funciones", "Encapsulacion de datos privados", "Funciones factory que generan funciones configuradas"],
        keywords: ["scope", "entorno", "lexico", "funcion", "variable", "acceso", "externo", "recuerda", "encapsulacion", "factory", "callback", "contador", "privado"],
        modelAnswer: "Un closure es una funcion que mantiene acceso a las variables del scope donde fue creada, incluso despues de que esa funcion externa haya terminado de ejecutarse. Esto es posible porque JavaScript usa scope lexico (las funciones recuerdan donde fueron definidas, no donde se ejecutan).\n\nEjemplo 1 - Contador privado: function crearContador() { let n = 0; return { inc: () => ++n, get: () => n }; } La variable n es privada y solo accesible a traves de los metodos.\n\nEjemplo 2 - Factory de funciones: function multiplicarPor(factor) { return (num) => num * factor; } const doble = multiplicarPor(2); doble(5) // 10. El factor queda 'atrapado' en el closure.\n\nEjemplo 3 - Event handlers con estado: function setupButton(nombre) { let clicks = 0; button.addEventListener('click', () => { clicks++; console.log(nombre + ': ' + clicks); }); } El callback del event listener recuerda tanto 'nombre' como 'clicks'."
      },
      {
        id: "js5",
        title: "Debugging: encuentra el bug",
        type: "code",
        difficulty: "medium",
        desc: "Este codigo tiene varios bugs comunes de JS. Encuentra y corrige todos para que funcione correctamente.",
        starter: `function App() {
  // BUG 1: Este estado no se actualiza correctamente
  const [items, setItems] = useState(["Manzana", "Banana", "Cereza"]);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);

  // BUG 2: Este efecto causa un loop infinito
  useEffect(() => {
    setCount(items.length);
  });

  // BUG 3: Mutacion directa del estado
  const addItem = () => {
    if (input.trim()) {
      items.push(input);
      setItems(items);
      setInput("");
    }
  };

  // BUG 4: No funciona el filtrado
  const removeItem = (index) => {
    const newItems = items;
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>
      <h3>Lista de Compras ({count} items)</h3>
      <div style={{display:'flex',gap:'8px',marginBottom:'12px'}}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nuevo item..."
          style={{flex:1,padding:'8px',borderRadius:'6px',border:'1px solid #444',background:'#1a1a2e',color:'white'}}
        />
        <button onClick={addItem}>Agregar</button>
      </div>
      <ul>
        {items.map((item, i) => (
          <li key={i} style={{display:'flex',justifyContent:'space-between',padding:'4px 0'}}>
            {item}
            <button onClick={() => removeItem(i)} style={{color:'#f55',background:'none',border:'none',cursor:'pointer'}}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
        solution: `function App() {
  const [items, setItems] = useState(["Manzana", "Banana", "Cereza"]);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);

  // FIX: Agregar dependencia [items.length]
  useEffect(() => {
    setCount(items.length);
  }, [items.length]);

  // FIX: Crear nuevo array, no mutar
  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input]);
      setInput("");
    }
  };

  // FIX: Usar filter en vez de splice
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Lista de Compras ({count} items)</h3>
      <div style={{display:'flex',gap:'8px',marginBottom:'12px'}}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nuevo item..."
          style={{flex:1,padding:'8px',borderRadius:'6px',border:'1px solid #444',background:'#1a1a2e',color:'white'}}
        />
        <button onClick={addItem}>Agregar</button>
      </div>
      <ul>
        {items.map((item, i) => (
          <li key={i} style={{display:'flex',justifyContent:'space-between',padding:'4px 0'}}>
            {item}
            <button onClick={() => removeItem(i)} style={{color:'#f55',background:'none',border:'none',cursor:'pointer'}}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
        check: `(function(el) {
  const lis = el.querySelectorAll('li');
  if (lis.length < 3) return 'Deberia haber al menos 3 items iniciales';
  const text = el.textContent;
  if (!text.includes('3 items')) return 'El contador deberia mostrar 3 items';
  return true;
})`,
        hints: [
          "Bug 1: useEffect sin dependencias se ejecuta en cada render - agrega [items.length]",
          "Bug 2: items.push muta el estado directamente - usa setItems([...items, input])",
          "Bug 3: splice tambien muta - usa filter para crear un nuevo array"
        ]
      }
    ]
  },

  // ============================================================
  // TRACK 2: React Practico
  // ============================================================
  {
    id: "react",
    title: "React Practico",
    desc: "Componentes, hooks, estado, efectos y patrones comunes de React.",
    icon: "Re",
    color: "#22d3ee",
    week: 1,
    exercises: [
      {
        id: "react_theory",
        title: "Teoria: React Esencial",
        type: "theory",
        content: `
<h2>React Esencial para Entrevistas</h2>

<div class="theory-section">
<h3>1. Componentes y JSX</h3>
<p>React se basa en componentes: piezas reutilizables de UI. JSX es azucar sintactico que se compila a <code>React.createElement()</code>.</p>

<pre><code>// Componente funcional
function Saludo({ nombre }) {
  return <h1>Hola, {nombre}!</h1>;
}

// JSX se compila a:
React.createElement('h1', null, 'Hola, ', nombre, '!')</code></pre>

<div class="theory-highlight">
<strong>Reglas de JSX:</strong> Debe retornar UN solo elemento raiz (usa Fragment &lt;&gt; si no quieres un div extra). className en vez de class. Los atributos son camelCase. Las expresiones JS van entre {llaves}.
</div>
</div>

<div class="theory-section">
<h3>2. Props</h3>
<p>Props son datos que un componente padre pasa a un hijo. Son <strong>de solo lectura</strong> (el hijo nunca debe modificar sus props).</p>

<pre><code>function UserCard({ name, age, onEdit }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Edad: {age}</p>
      <button onClick={onEdit}>Editar</button>
    </div>
  );
}

// Uso:
<UserCard name="Lucas" age={28} onEdit={() => edit(id)} /></code></pre>
</div>

<div class="theory-section">
<h3>3. Estado con useState</h3>
<p>useState retorna un par [valor, setter]. Cada llamada a setter causa un re-render.</p>

<pre><code>function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      {/* Para updates basados en estado previo: */}
      <button onClick={() => setCount(prev => prev + 1)}>+1 (safe)</button>
    </div>
  );
}</code></pre>

<div class="theory-highlight">
<strong>Importante:</strong> setState es asincrono y se batchea. Si necesitas el valor previo, usa la forma funcional: setCount(prev => prev + 1). NUNCA mutes el estado directamente (ej: state.push() esta MAL).
</div>
</div>

<div class="theory-section">
<h3>4. Efectos con useEffect</h3>
<p>useEffect maneja side effects: fetch de datos, suscripciones, timers, etc.</p>

<pre><code>useEffect(() => {
  // Se ejecuta despues del render
  document.title = "Count: " + count;
}, [count]); // Solo cuando count cambie

useEffect(() => {
  const interval = setInterval(() => tick(), 1000);
  return () => clearInterval(interval); // Cleanup
}, []); // Solo al montar</code></pre>

<p><strong>Dependencias:</strong> [] = solo al montar, [a, b] = cuando a o b cambien, sin array = cada render (cuidado!).</p>
</div>

<div class="theory-section">
<h3>5. Manejo de Eventos</h3>
<pre><code>function Form() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar reload
    // procesar form...
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Enviar</button>
    </form>
  );
}</code></pre>
</div>

<div class="theory-section">
<h3>6. Listas y Keys</h3>
<pre><code>function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}</code></pre>

<div class="theory-highlight">
<strong>Keys:</strong> React usa keys para identificar que elementos cambiaron. NUNCA uses el indice como key si la lista puede reordenarse o modificarse. Usa IDs unicos.
</div>
</div>

<div class="theory-section">
<h3>7. Formularios Controlados</h3>
<p>En un componente controlado, React maneja el valor del input a traves del estado.</p>

<pre><code>function ControlledInput() {
  const [value, setValue] = useState("");
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}</code></pre>
</div>

<div class="theory-section">
<h3>8. Fetch de Datos</h3>
<pre><code>function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []); // Array vacio = solo al montar

  if (loading) return <p>Cargando...</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}</code></pre>
</div>

<div class="theory-section">
<h3>9. Inmutabilidad</h3>
<p>En React, SIEMPRE crea nuevos objetos/arrays en vez de mutar los existentes.</p>

<pre><code>// MAL - mutacion directa
state.items.push(newItem);
setState(state);

// BIEN - nuevo array
setState({ ...state, items: [...state.items, newItem] });

// Actualizar un item
setItems(items.map(item =>
  item.id === id ? { ...item, done: true } : item
));

// Eliminar un item
setItems(items.filter(item => item.id !== id));</code></pre>
</div>

<div class="theory-tip">
<strong>Tip de entrevista:</strong> Te pediran que construyas un componente en vivo. Empieza simple, muestra que sabes manejar estado correctamente (sin mutaciones), y luego refina. Los entrevistadores valoran el proceso, no solo el resultado.
</div>
`
      },
      {
        id: "react_quiz",
        title: "Quiz: React",
        type: "quiz",
        questions: [
          {
            q: "Que es el Virtual DOM?",
            opts: [
              "Una copia del DOM que existe en el servidor",
              "Una representacion ligera en memoria del DOM real que React usa para calcular cambios eficientemente",
              "Un framework CSS",
              "El DOM que se ejecuta en Web Workers"
            ],
            c: 1,
            exp: "El Virtual DOM es un arbol de objetos JS ligeros que representa la UI. React compara el VDOM nuevo con el anterior (diffing/reconciliation) y solo actualiza los nodos del DOM real que cambiaron. Esto es mas eficiente que manipular el DOM directamente."
          },
          {
            q: "Que pasa si useEffect no tiene array de dependencias?",
            opts: [
              "Solo se ejecuta una vez al montar",
              "Se ejecuta despues de CADA render (potencial loop infinito si actualiza estado)",
              "No se ejecuta nunca",
              "Da un error de sintaxis"
            ],
            c: 1,
            exp: "Sin array de dependencias, useEffect se ejecuta despues de cada render. Si dentro del efecto actualizas estado, eso causa otro render, creando un loop infinito. Siempre especifica dependencias."
          },
          {
            q: "Por que son importantes las keys en listas?",
            opts: [
              "Solo es un requisito de TypeScript",
              "Hacen la lista mas bonita",
              "Permiten a React identificar que elementos cambiaron, se agregaron o se eliminaron eficientemente",
              "Sin keys la lista no se renderiza"
            ],
            c: 2,
            exp: "Las keys ayudan al algoritmo de reconciliacion de React a emparejar elementos entre renders. Sin keys unicas, React re-renderiza toda la lista. Usa IDs estables, no indices, especialmente si la lista se reordena."
          },
          {
            q: "Cual es la diferencia entre props y state?",
            opts: [
              "No hay diferencia",
              "Props son datos que llegan del padre (solo lectura), state son datos internos del componente (mutables con setter)",
              "State viene del padre, props son locales",
              "Props solo funcionan con clases"
            ],
            c: 1,
            exp: "Props fluyen de padre a hijo y son inmutables para el hijo. State es interno al componente y se actualiza con su setter, causando un re-render. Juntos forman el 'flujo de datos unidireccional' de React."
          },
          {
            q: "Cual es la forma correcta de actualizar estado basado en el valor previo?",
            opts: [
              "setCount(count + 1)",
              "count++; setCount(count)",
              "setCount(prev => prev + 1)",
              "this.setState({ count: count + 1 })"
            ],
            c: 2,
            exp: "La forma funcional setCount(prev => prev + 1) es la mas segura porque garantiza que usas el valor mas reciente del estado. Esto es importante porque setState es asincrono y se batchea."
          },
          {
            q: "Como haces un fetch de datos cuando el componente se monta?",
            opts: [
              "En el cuerpo de la funcion del componente",
              "useEffect(() => { fetch(...) }, []) con array de dependencias vacio",
              "En el constructor",
              "Con componentDidMount"
            ],
            c: 1,
            exp: "useEffect con array vacio [] se ejecuta solo una vez despues del primer render, equivalente a componentDidMount. Es el lugar correcto para fetch de datos, suscripciones y otros side effects."
          },
          {
            q: "Que es un componente controlado?",
            opts: [
              "Un componente que no tiene estado",
              "Un componente donde el valor del input lo maneja React a traves del estado",
              "Un componente que solo recibe props",
              "Un componente envuelto en un HOC"
            ],
            c: 1,
            exp: "En un componente controlado, el valor del input viene del estado de React (value={state}) y se actualiza con onChange. React es la 'fuente de verdad'. En un no controlado, el DOM maneja el valor internamente."
          },
          {
            q: "Por que NO debes mutar el estado directamente en React?",
            opts: [
              "Da un error en runtime",
              "No funciona en TypeScript",
              "React no detecta el cambio y no re-renderiza, causando bugs de UI",
              "Es mas lento"
            ],
            c: 2,
            exp: "React compara referencias para detectar cambios. Si mutas un objeto/array, la referencia no cambia, asi que React no sabe que debe re-renderizar. Siempre crea nuevos objetos: {...obj, key: newVal} o [...arr, newItem]."
          }
        ]
      },
      {
        id: "r1",
        title: "Contador con useState",
        type: "code",
        difficulty: "easy",
        desc: "Crea un contador con botones de incrementar, decrementar y reset.",
        starter: `function App() {
  // TODO: Usa useState para crear un contador
  // Botones: +1, -1, Reset (vuelve a 0)
  // Muestra el valor en un <h2> con className="count"

  return (
    <div style={{textAlign:'center'}}>
      <h3>Contador</h3>
      <h2 className="count">0</h2>
      <div style={{display:'flex',gap:'8px',justifyContent:'center'}}>
        <button>-1</button>
        <button>Reset</button>
        <button>+1</button>
      </div>
    </div>
  );
}`,
        solution: `function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{textAlign:'center'}}>
      <h3>Contador</h3>
      <h2 className="count">{count}</h2>
      <div style={{display:'flex',gap:'8px',justifyContent:'center'}}>
        <button onClick={() => setCount(c => c - 1)}>-1</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(c => c + 1)}>+1</button>
      </div>
    </div>
  );
}`,
        check: `(function(el) {
  const count = el.querySelector('.count');
  if (!count) return 'Falta el elemento con className="count"';
  const buttons = el.querySelectorAll('button');
  if (buttons.length < 3) return 'Necesitas 3 botones: -1, Reset, +1';
  return true;
})`,
        hints: ["const [count, setCount] = useState(0)", "onClick={() => setCount(c => c + 1)}", "Reset: onClick={() => setCount(0)}"]
      },
      {
        id: "r2",
        title: "Toggle de tema",
        type: "code",
        difficulty: "easy",
        desc: "Crea un componente que alterne entre tema claro y oscuro.",
        starter: `function App() {
  // TODO: Estado para tema ('light' o 'dark')
  // Un boton que alterne entre temas
  // El div debe cambiar su estilo segun el tema

  const lightStyle = { background: '#ffffff', color: '#000000', padding: '24px', borderRadius: '12px', minHeight: '120px' };
  const darkStyle = { background: '#1a1a2e', color: '#ffffff', padding: '24px', borderRadius: '12px', minHeight: '120px' };

  return (
    <div>
      <h3>Toggle de Tema</h3>
      <button>Cambiar tema</button>
      <div style={lightStyle} className="theme-box">
        <p>Tema actual: light</p>
        <p>Este panel cambia de estilo</p>
      </div>
    </div>
  );
}`,
        solution: `function App() {
  const [theme, setTheme] = useState('dark');

  const lightStyle = { background: '#ffffff', color: '#000000', padding: '24px', borderRadius: '12px', minHeight: '120px' };
  const darkStyle = { background: '#1a1a2e', color: '#ffffff', padding: '24px', borderRadius: '12px', minHeight: '120px' };

  return (
    <div>
      <h3>Toggle de Tema</h3>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Cambiar a {theme === 'light' ? 'dark' : 'light'}
      </button>
      <div style={theme === 'light' ? lightStyle : darkStyle} className="theme-box">
        <p>Tema actual: {theme}</p>
        <p>Este panel cambia de estilo</p>
      </div>
    </div>
  );
}`,
        check: `(function(el) {
  const box = el.querySelector('.theme-box');
  if (!box) return 'Falta el div con className="theme-box"';
  const btn = el.querySelector('button');
  if (!btn) return 'Falta el boton de cambiar tema';
  const text = el.textContent;
  if (text.includes('Tema actual: light') || text.includes('Tema actual: dark')) return true;
  return 'Muestra el tema actual en el texto';
})`,
        hints: ["const [theme, setTheme] = useState('dark')", "Toggle: setTheme(t => t === 'light' ? 'dark' : 'light')", "Estilo condicional: style={theme === 'light' ? lightStyle : darkStyle}"]
      },
      {
        id: "r3",
        title: "Fetch + Lista + Buscador",
        type: "code",
        difficulty: "medium",
        desc: "Crea un componente que cargue datos, los muestre en lista y permita filtrar con un buscador.",
        starter: `function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Simula un fetch
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Ana Garcia", email: "ana@test.com" },
        { id: 2, name: "Carlos Lopez", email: "carlos@test.com" },
        { id: 3, name: "Maria Rodriguez", email: "maria@test.com" },
        { id: 4, name: "Luis Martinez", email: "luis@test.com" },
        { id: 5, name: "Elena Sanchez", email: "elena@test.com" }
      ]);
      setLoading(false);
    }, 300);
  }, []);

  // TODO: Filtra los usuarios cuyo nombre incluya el texto de busqueda (case insensitive)
  const filtered = users;

  return (
    <div>
      <h3>Directorio de Usuarios</h3>
      <input
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{width:'100%',padding:'8px',marginBottom:'12px',borderRadius:'6px',border:'1px solid #444',background:'#1a1a2e',color:'white'}}
      />
      {loading ? (
        <p className="loading">Cargando...</p>
      ) : (
        <>
          <p className="result-count">{filtered.length} resultados</p>
          <ul>
            {filtered.map(u => (
              <li key={u.id} style={{padding:'8px',borderBottom:'1px solid #333'}}>
                <strong>{u.name}</strong> - {u.email}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}`,
        solution: `function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Ana Garcia", email: "ana@test.com" },
        { id: 2, name: "Carlos Lopez", email: "carlos@test.com" },
        { id: 3, name: "Maria Rodriguez", email: "maria@test.com" },
        { id: 4, name: "Luis Martinez", email: "luis@test.com" },
        { id: 5, name: "Elena Sanchez", email: "elena@test.com" }
      ]);
      setLoading(false);
    }, 300);
  }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3>Directorio de Usuarios</h3>
      <input
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{width:'100%',padding:'8px',marginBottom:'12px',borderRadius:'6px',border:'1px solid #444',background:'#1a1a2e',color:'white'}}
      />
      {loading ? (
        <p className="loading">Cargando...</p>
      ) : (
        <>
          <p className="result-count">{filtered.length} resultados</p>
          <ul>
            {filtered.map(u => (
              <li key={u.id} style={{padding:'8px',borderBottom:'1px solid #333'}}>
                <strong>{u.name}</strong> - {u.email}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}`,
        check: `(function(el) {
  const lis = el.querySelectorAll('li');
  if (lis.length === 0 && el.querySelector('.loading')) return true;
  if (lis.length >= 1) {
    const rc = el.querySelector('.result-count');
    if (rc) return true;
  }
  return 'Deberian aparecer usuarios o el texto Cargando...';
})`,
        hints: ["Usa .filter() con .toLowerCase().includes()", "const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))", "El filtrado se recalcula en cada render automaticamente"]
      },
      {
        id: "r4",
        title: "Formulario con validacion",
        type: "code",
        difficulty: "medium",
        desc: "Crea un formulario de registro con validacion en tiempo real.",
        starter: `function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // TODO: Implementa la validacion
  // - name: minimo 2 caracteres
  // - email: debe contener @
  // - password: minimo 6 caracteres
  const validate = () => {
    const e = {};
    // validar aqui
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  if (submitted) {
    return (
      <div className="success">
        <h3>Registro exitoso!</h3>
        <p>Bienvenido, {form.name}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registro</h3>
      <div style={{marginBottom:'12px'}}>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          style={{width:'100%',padding:'8px',borderRadius:'6px',border:'1px solid '+(errors.name?'#f55':'#444'),background:'#1a1a2e',color:'white'}}
        />
        {errors.name && <small style={{color:'#f55'}}>{errors.name}</small>}
      </div>
      <div style={{marginBottom:'12px'}}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          style={{width:'100%',padding:'8px',borderRadius:'6px',border:'1px solid '+(errors.email?'#f55':'#444'),background:'#1a1a2e',color:'white'}}
        />
        {errors.email && <small style={{color:'#f55'}}>{errors.email}</small>}
      </div>
      <div style={{marginBottom:'12px'}}>
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          style={{width:'100%',padding:'8px',borderRadius:'6px',border:'1px solid '+(errors.password?'#f55':'#444'),background:'#1a1a2e',color:'white'}}
        />
        {errors.password && <small style={{color:'#f55'}}>{errors.password}</small>}
      </div>
      <button type="submit" style={{width:'100%'}}>Registrar</button>
    </form>
  );
}`,
        solution: `function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Minimo 2 caracteres';
    if (!form.email.includes('@')) e.email = 'Email invalido';
    if (form.password.length < 6) e.password = 'Minimo 6 caracteres';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  if (submitted) {
    return (
      <div className="success">
        <h3>Registro exitoso!</h3>
        <p>Bienvenido, {form.name}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registro</h3>
      <div style={{marginBottom:'12px'}}>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          style={{width:'100%',padding:'8px',borderRadius:'6px',border:'1px solid '+(errors.name?'#f55':'#444'),background:'#1a1a2e',color:'white'}}
        />
        {errors.name && <small style={{color:'#f55'}}>{errors.name}</small>}
      </div>
      <div style={{marginBottom:'12px'}}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          style={{width:'100%',padding:'8px',borderRadius:'6px',border:'1px solid '+(errors.email?'#f55':'#444'),background:'#1a1a2e',color:'white'}}
        />
        {errors.email && <small style={{color:'#f55'}}>{errors.email}</small>}
      </div>
      <div style={{marginBottom:'12px'}}>
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          style={{width:'100%',padding:'8px',borderRadius:'6px',border:'1px solid '+(errors.password?'#f55':'#444'),background:'#1a1a2e',color:'white'}}
        />
        {errors.password && <small style={{color:'#f55'}}>{errors.password}</small>}
      </div>
      <button type="submit" style={{width:'100%'}}>Registrar</button>
    </form>
  );
}`,
        check: `(function(el) {
  const inputs = el.querySelectorAll('input');
  if (inputs.length < 3) return 'Necesitas 3 inputs: nombre, email, password';
  const btn = el.querySelector('button');
  if (!btn) return 'Falta el boton de submit';
  if (el.querySelector('.success')) return true;
  return true;
})`,
        hints: [
          "Valida cada campo: if (form.name.trim().length < 2) e.name = 'Minimo 2 caracteres'",
          "Para email: if (!form.email.includes('@')) e.email = 'Email invalido'",
          "Solo muestra exito si Object.keys(errors).length === 0"
        ]
      },
      {
        id: "r5",
        title: "Todo CRUD completo",
        type: "code",
        difficulty: "hard",
        desc: "Crea una app de tareas completa con crear, leer, editar, eliminar y filtrado.",
        starter: `function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Aprender React", done: false },
    { id: 2, text: "Practicar hooks", done: true }
  ]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  // TODO: Implementar las funciones CRUD
  const addTodo = () => {};
  const toggleTodo = (id) => {};
  const deleteTodo = (id) => {};
  const startEdit = (id) => {};
  const saveEdit = (id, newText) => {};

  // TODO: Filtrar todos segun el filtro activo
  const filtered = todos;

  const remaining = todos.filter(t => !t.done).length;

  return (
    <div>
      <h3>Todo App</h3>
      <div style={{display:'flex',gap:'8px',marginBottom:'12px'}}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nueva tarea..."
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          style={{flex:1,padding:'8px',borderRadius:'6px',border:'1px solid #444',background:'#1a1a2e',color:'white'}}
        />
        <button onClick={addTodo}>Agregar</button>
      </div>
      <div style={{display:'flex',gap:'8px',marginBottom:'12px'}} className="filters">
        {["all","active","done"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{background: filter === f ? '#6c63ff' : '#2a2a3e', border:'none',color:'white',padding:'6px 12px',borderRadius:'6px',cursor:'pointer'}}>
            {f === 'all' ? 'Todas' : f === 'active' ? 'Activas' : 'Hechas'}
          </button>
        ))}
      </div>
      <ul style={{listStyle:'none',padding:0}}>
        {filtered.map(todo => (
          <li key={todo.id} style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px',borderBottom:'1px solid #333'}}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
            {editId === todo.id ? (
              <input
                defaultValue={todo.text}
                onBlur={e => saveEdit(todo.id, e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveEdit(todo.id, e.target.value)}
                autoFocus
                style={{flex:1,padding:'4px',borderRadius:'4px',border:'1px solid #6c63ff',background:'#1a1a2e',color:'white'}}
              />
            ) : (
              <span onDoubleClick={() => startEdit(todo.id)}
                style={{flex:1,textDecoration: todo.done ? 'line-through' : 'none', opacity: todo.done ? 0.6 : 1, cursor:'pointer'}}>
                {todo.text}
              </span>
            )}
            <button onClick={() => deleteTodo(todo.id)} style={{color:'#f55',background:'none',border:'none',cursor:'pointer'}}>x</button>
          </li>
        ))}
      </ul>
      <p className="remaining" style={{marginTop:'8px',opacity:0.7}}>{remaining} tareas pendientes</p>
    </div>
  );
}`,
        solution: `function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Aprender React", done: false },
    { id: 2, text: "Practicar hooks", done: true }
  ]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const startEdit = (id) => {
    setEditId(id);
  };

  const saveEdit = (id, newText) => {
    if (newText.trim()) {
      setTodos(todos.map(t => t.id === id ? { ...t, text: newText.trim() } : t));
    }
    setEditId(null);
  };

  const filtered = todos.filter(t => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const remaining = todos.filter(t => !t.done).length;

  return (
    <div>
      <h3>Todo App</h3>
      <div style={{display:'flex',gap:'8px',marginBottom:'12px'}}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nueva tarea..."
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          style={{flex:1,padding:'8px',borderRadius:'6px',border:'1px solid #444',background:'#1a1a2e',color:'white'}}
        />
        <button onClick={addTodo}>Agregar</button>
      </div>
      <div style={{display:'flex',gap:'8px',marginBottom:'12px'}} className="filters">
        {["all","active","done"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{background: filter === f ? '#6c63ff' : '#2a2a3e', border:'none',color:'white',padding:'6px 12px',borderRadius:'6px',cursor:'pointer'}}>
            {f === 'all' ? 'Todas' : f === 'active' ? 'Activas' : 'Hechas'}
          </button>
        ))}
      </div>
      <ul style={{listStyle:'none',padding:0}}>
        {filtered.map(todo => (
          <li key={todo.id} style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px',borderBottom:'1px solid #333'}}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
            {editId === todo.id ? (
              <input
                defaultValue={todo.text}
                onBlur={e => saveEdit(todo.id, e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveEdit(todo.id, e.target.value)}
                autoFocus
                style={{flex:1,padding:'4px',borderRadius:'4px',border:'1px solid #6c63ff',background:'#1a1a2e',color:'white'}}
              />
            ) : (
              <span onDoubleClick={() => startEdit(todo.id)}
                style={{flex:1,textDecoration: todo.done ? 'line-through' : 'none', opacity: todo.done ? 0.6 : 1, cursor:'pointer'}}>
                {todo.text}
              </span>
            )}
            <button onClick={() => deleteTodo(todo.id)} style={{color:'#f55',background:'none',border:'none',cursor:'pointer'}}>x</button>
          </li>
        ))}
      </ul>
      <p className="remaining" style={{marginTop:'8px',opacity:0.7}}>{remaining} tareas pendientes</p>
    </div>
  );
}`,
        check: `(function(el) {
  const lis = el.querySelectorAll('li');
  if (lis.length < 2) return 'Deberia haber al menos 2 todos iniciales';
  const filters = el.querySelector('.filters');
  if (!filters) return 'Faltan los botones de filtro';
  const remaining = el.querySelector('.remaining');
  if (!remaining) return 'Falta el contador de pendientes';
  return true;
})`,
        hints: [
          "addTodo: setTodos([...todos, { id: Date.now(), text: input.trim(), done: false }])",
          "toggleTodo: setTodos(todos.map(t => t.id === id ? {...t, done: !t.done} : t))",
          "Filtrado: todos.filter(t => filter === 'active' ? !t.done : filter === 'done' ? t.done : true)"
        ]
      },
      {
        id: "r6",
        title: "Custom Hook: useFetch",
        type: "code",
        difficulty: "hard",
        desc: "Crea un custom hook useFetch(url) que retorne {data, loading, error}. Usalo en App para cargar una lista de usuarios.",
        starter: `function useFetch(url) {
  // TODO: Implementa el custom hook
  // Debe retornar { data, loading, error }
  // Usa useState y useEffect
  // Simula el fetch con setTimeout

  return { data: null, loading: false, error: null };
}

function App() {
  // TODO: Usa useFetch para cargar usuarios
  // Muestra loading, error, o la lista

  return (
    <div>
      <h3>Custom Hook: useFetch</h3>
      <p>Implementa useFetch y usalo aqui</p>
    </div>
  );
}`,
        solution: `function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simulacion de fetch
    const timer = setTimeout(() => {
      if (url === "/api/users") {
        setData([
          { id: 1, name: "Ana Garcia" },
          { id: 2, name: "Carlos Lopez" },
          { id: 3, name: "Maria Rodriguez" }
        ]);
      } else {
        setError("URL no encontrada");
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [url]);

  return { data, loading, error };
}

function App() {
  const { data, loading, error } = useFetch("/api/users");

  return (
    <div>
      <h3>Custom Hook: useFetch</h3>
      {loading && <p className="loading">Cargando...</p>}
      {error && <p className="error" style={{color:'#f55'}}>{error}</p>}
      {data && (
        <ul>
          {data.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
        check: `(function(el) {
  if (el.querySelector('.loading')) return true;
  const lis = el.querySelectorAll('li');
  if (lis.length >= 1) return true;
  return 'Debe mostrar estado de carga o una lista de usuarios';
})`,
        hints: [
          "useFetch debe usar useState para data, loading y error",
          "useEffect con [url] como dependencia para re-fetch cuando cambie la URL",
          "Simula el fetch con setTimeout y retorna { data, loading, error }"
        ]
      },
      {
        id: "r7",
        title: "Componente con memo y useCallback",
        type: "code",
        difficulty: "hard",
        desc: "Crea un componente Parent con un contador y un Child que muestre una lista. Usa React.memo y useCallback para evitar re-renders innecesarios del Child.",
        starter: `function Child({ items, onRemove }) {
  console.log("Child renderizado");
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i} style={{display:'flex',justifyContent:'space-between',padding:'4px 0'}}>
          {item}
          <button onClick={() => onRemove(i)} style={{color:'#f55',background:'none',border:'none',cursor:'pointer'}}>x</button>
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(["React", "TypeScript", "Node.js"]);

  // TODO: Envuelve Child con React.memo
  // TODO: Envuelve onRemove con useCallback
  // El Child NO deberia re-renderizarse cuando count cambia

  const onRemove = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Memo + useCallback</h3>
      <div style={{marginBottom:'16px'}}>
        <button onClick={() => setCount(c => c + 1)}>Contador: {count}</button>
        <p className="count">Count: {count}</p>
      </div>
      <Child items={items} onRemove={onRemove} />
    </div>
  );
}`,
        solution: `const Child = React.memo(function Child({ items, onRemove }) {
  console.log("Child renderizado");
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i} style={{display:'flex',justifyContent:'space-between',padding:'4px 0'}}>
          {item}
          <button onClick={() => onRemove(i)} style={{color:'#f55',background:'none',border:'none',cursor:'pointer'}}>x</button>
        </li>
      ))}
    </ul>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(["React", "TypeScript", "Node.js"]);

  const onRemove = useCallback((index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div>
      <h3>Memo + useCallback</h3>
      <div style={{marginBottom:'16px'}}>
        <button onClick={() => setCount(c => c + 1)}>Contador: {count}</button>
        <p className="count">Count: {count}</p>
      </div>
      <Child items={items} onRemove={onRemove} />
    </div>
  );
}`,
        check: `(function(el) {
  const countEl = el.querySelector('.count');
  if (!countEl) return 'Falta el elemento con className="count"';
  const lis = el.querySelectorAll('li');
  if (lis.length < 1) return 'Debe mostrar la lista de items';
  return true;
})`,
        hints: [
          "Envuelve Child con React.memo: const Child = React.memo(function Child({...}) {...})",
          "Envuelve onRemove con useCallback y array vacio: useCallback((index) => {...}, [])",
          "Usa la forma funcional de setItems para no depender de items en useCallback"
        ]
      },
      {
        id: "r8",
        title: "Fetch con Loading, Error y Retry",
        type: "code",
        difficulty: "medium",
        desc: "Crea un componente que haga fetch a una API con estados de loading, error y boton de reintentar. Este patron te lo piden en el 90% de entrevistas.",
        starter: `function App() {
  // Fetch a: https://jsonplaceholder.typicode.com/users
  // 1. Muestra "Cargando..." mientras carga
  // 2. Si hay error, muestra el mensaje + boton "Reintentar"
  // 3. Si OK, muestra lista de usuarios (nombre + email)
  // 4. Boton "Recargar" que vuelve a hacer fetch

  return <div><h1>Usuarios</h1></div>
}`,
        solution: `function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function fetchUsers() {
    setLoading(true);
    setError("");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        if (!res.ok) throw new Error("Error " + res.status);
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }

  useEffect(() => { fetchUsers(); }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return (
    <div>
      <p style={{color: "red"}}>Error: {error}</p>
      <button onClick={fetchUsers}>Reintentar</button>
    </div>
  );

  return (
    <div>
      <h1>Usuarios ({users.length})</h1>
      <button onClick={fetchUsers}>Recargar</button>
      <ul>
        {users.map(u => (
          <li key={u.id}><strong>{u.name}</strong> — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}`,
        check: `(function(el) {
  const items = el.querySelectorAll('li');
  const buttons = el.querySelectorAll('button');
  if (items.length < 5) return 'Debe mostrar al menos 5 usuarios';
  if (buttons.length < 1) return 'Falta boton de recargar/reintentar';
  return true;
})`,
        hints: [
          "Necesitas 3 estados: users (array), loading (boolean), error (string)",
          "Crea una funcion fetchUsers() que puedas llamar desde useEffect Y desde los botones",
          "En fetchUsers: setLoading(true), setError('') al inicio. .then() para exito, .catch() para error",
          "if (loading) return <p>Cargando...</p> ANTES del return principal"
        ]
      }
    ]
  },

  // ============================================================
  // TRACK 2.5: Next.js
  // ============================================================
  {
    id: "nextjs",
    title: "Next.js",
    desc: "App Router, Server Components, API Routes, SSR vs SSG. Lo que usas en Informo y Finesse.",
    icon: "NX",
    color: "#000000",
    week: 1,
    exercises: [
      {
        id: "nextjs_theory",
        title: "Teoria: Next.js Esencial",
        type: "theory",
        content: `
<h2>Next.js Esencial para Entrevistas</h2>

<div class="theory-section">
<h3>1. App Router: Routing basado en archivos</h3>
<p>En Next.js 13+, el <strong>App Router</strong> usa la carpeta <code>app/</code> con convenciones de archivos:</p>

<pre><code>app/
  page.tsx          // Ruta: /
  layout.tsx        // Layout compartido para / y subrutas
  about/
    page.tsx        // Ruta: /about
  blog/
    page.tsx        // Ruta: /blog
    [slug]/
      page.tsx      // Ruta dinamica: /blog/mi-post
  (auth)/
    login/
      page.tsx      // Grupo de rutas (no afecta la URL): /login</code></pre>

<div class="theory-highlight">
<strong>Archivos especiales:</strong> <code>page.tsx</code> define la UI de la ruta. <code>layout.tsx</code> envuelve las paginas hijas y persiste entre navegaciones. <code>loading.tsx</code> muestra un fallback mientras carga. <code>error.tsx</code> maneja errores con un boundary.
</div>
</div>

<div class="theory-section">
<h3>2. Server Components vs Client Components</h3>
<p>Por defecto, todos los componentes en el App Router son <strong>Server Components</strong>. Se ejecutan en el servidor y NO envian JavaScript al cliente.</p>

<pre><code>// Server Component (por defecto) - NO necesita directiva
async function UserList() {
  const users = await db.query("SELECT * FROM users");
  return (
    &lt;ul&gt;
      {users.map(u =&gt; &lt;li key={u.id}&gt;{u.name}&lt;/li&gt;)}
    &lt;/ul&gt;
  );
}

// Client Component - necesita la directiva 'use client'
'use client'
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;{count}&lt;/button&gt;;
}</code></pre>

<div class="theory-highlight">
<strong>Regla clave:</strong> Usa Server Components para: acceso a BD, fetch de datos, logica que no necesita interactividad. Usa Client Components para: hooks (useState, useEffect), event handlers (onClick), APIs del navegador (localStorage, window).
</div>
</div>

<div class="theory-section">
<h3>3. API Routes (Route Handlers)</h3>
<p>En el App Router, las API Routes se definen con <code>route.ts</code> y exportan funciones HTTP:</p>

<pre><code>// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.query("SELECT * FROM users");
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.insert("users", body);
  return NextResponse.json(user, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  await db.update("users", body.id, body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await db.delete("users", id);
  return NextResponse.json({ ok: true });
}</code></pre>
</div>

<div class="theory-section">
<h3>4. SSR vs SSG vs ISR</h3>

<div class="theory-highlight">
<strong>SSR (Server-Side Rendering):</strong> La pagina se genera en cada request. Util para datos que cambian frecuentemente o son personalizados por usuario.
</div>

<pre><code>// SSR: fetch sin cache (por defecto en App Router)
async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store'  // SSR: siempre fresco
  });
  return &lt;div&gt;{data}&lt;/div&gt;;
}</code></pre>

<div class="theory-highlight">
<strong>SSG (Static Site Generation):</strong> La pagina se genera en build time. Ideal para contenido que no cambia (blog posts, docs).
</div>

<pre><code>// SSG: fetch con cache (se genera en build)
async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache'  // SSG: cacheado en build
  });
  return &lt;div&gt;{data}&lt;/div&gt;;
}

// Generar rutas estaticas para paginas dinamicas
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(p =&gt; ({ slug: p.slug }));
}</code></pre>

<div class="theory-highlight">
<strong>ISR (Incremental Static Regeneration):</strong> Como SSG pero se revalida periodicamente. Lo mejor de ambos mundos.
</div>

<pre><code>// ISR: revalidar cada 60 segundos
async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }  // ISR: revalida cada 60s
  });
  return &lt;div&gt;{data}&lt;/div&gt;;
}</code></pre>
</div>

<div class="theory-section">
<h3>5. Middleware</h3>
<p>El middleware se ejecuta ANTES de que la request llegue a la pagina. Ideal para autenticacion, redirects y headers.</p>

<pre><code>// middleware.ts (en la raiz del proyecto)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  // Proteger rutas privadas
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/private/:path*']
};</code></pre>
</div>

<div class="theory-section">
<h3>6. Metadata y SEO</h3>
<p>Next.js permite definir metadata de forma estatica o dinamica:</p>

<pre><code>// Metadata estatica
export const metadata = {
  title: 'Mi App',
  description: 'Descripcion para SEO',
  openGraph: { title: 'Mi App', images: ['/og.png'] }
};

// Metadata dinamica
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt
  };
}</code></pre>
</div>
`
      },
      {
        id: "nextjs_quiz",
        title: "Quiz: Next.js",
        type: "quiz",
        questions: [
          {
            q: "Como funciona el routing en el App Router de Next.js?",
            opts: [
              "Se configura en un archivo routes.config.js",
              "Es file-based: cada carpeta con page.tsx define una ruta",
              "Se usa React Router como en cualquier app React",
              "Se definen las rutas en next.config.js"
            ],
            c: 1,
            exp: "El App Router usa routing basado en archivos. Cada carpeta dentro de app/ con un archivo page.tsx define automaticamente una ruta. Las carpetas anidadas crean rutas anidadas, y [slug] crea rutas dinamicas."
          },
          {
            q: "Que es un Server Component en Next.js?",
            opts: [
              "Un componente que solo funciona con Express.js",
              "Un componente que se renderiza en el servidor y no envia JS al cliente",
              "Un componente que usa servidor de WebSockets",
              "Un componente que requiere 'use server' al inicio"
            ],
            c: 1,
            exp: "Los Server Components se ejecutan en el servidor, pueden acceder directamente a BD y APIs, y NO envian JavaScript al navegador del cliente. Son el tipo por defecto en el App Router."
          },
          {
            q: "Cuando necesitas usar la directiva 'use client'?",
            opts: [
              "Siempre que quieras usar JSX",
              "Solo en el layout principal",
              "Cuando usas hooks (useState, useEffect), event handlers o APIs del navegador",
              "Cuando el componente hace fetch de datos"
            ],
            c: 2,
            exp: "La directiva 'use client' es necesaria cuando un componente necesita interactividad: hooks de React (useState, useEffect), event handlers (onClick), o APIs del navegador (localStorage, window)."
          },
          {
            q: "Que es un API Route (Route Handler) en Next.js?",
            opts: [
              "Una pagina que muestra datos de una API externa",
              "Un endpoint backend definido dentro del proyecto Next.js con route.ts",
              "Un middleware que intercepta todas las peticiones",
              "Un archivo que configura las APIs externas permitidas"
            ],
            c: 1,
            exp: "Los Route Handlers (route.ts) permiten crear endpoints de backend dentro de tu proyecto Next.js. Exportas funciones GET, POST, PUT, DELETE que manejan las peticiones HTTP."
          },
          {
            q: "Cual es la diferencia entre SSR y SSG?",
            opts: [
              "SSR es mas rapido que SSG siempre",
              "SSR genera la pagina en cada request; SSG la genera una vez en build time",
              "SSG requiere una base de datos; SSR no",
              "No hay diferencia, son sinonimos"
            ],
            c: 1,
            exp: "SSR (Server-Side Rendering) genera la pagina en cada peticion, ideal para datos dinamicos. SSG (Static Site Generation) genera la pagina en build time, ideal para contenido estatico. ISR combina ambos con revalidacion periodica."
          },
          {
            q: "Que es el middleware en Next.js?",
            opts: [
              "Un plugin de Webpack para optimizar el bundle",
              "Una funcion que se ejecuta despues de renderizar la pagina",
              "Codigo que se ejecuta antes de cada request, usado para auth y redirects",
              "Un componente que envuelve toda la aplicacion"
            ],
            c: 2,
            exp: "El middleware se ejecuta ANTES de que la request llegue a la pagina o API Route. Se usa comunmente para proteccion de rutas (auth), redirects, reescritura de URLs y modificacion de headers."
          }
        ]
      }
    ]
  },

  // ============================================================
  // TRACK 3: TypeScript
  // ============================================================
  {
    id: "typescript",
    title: "TypeScript",
    desc: "Tipado estatico, interfaces, generics y TypeScript con React.",
    icon: "TS",
    color: "#2563eb",
    week: 2,
    exercises: [
      {
        id: "ts_theory",
        title: "Teoria: TypeScript Esencial",
        type: "theory",
        content: `
<h2>TypeScript Esencial para Entrevistas</h2>

<div class="theory-section">
<h3>1. Por que TypeScript?</h3>
<p>TypeScript anade tipado estatico a JavaScript, detectando errores antes de ejecutar el codigo. Mejora la documentacion, el autocompletado y la refactorizacion.</p>

<div class="theory-highlight">
<strong>En entrevistas:</strong> No siempre te pediran que escribas TS, pero si que expliques sus beneficios y conceptos basicos. Es un gran diferenciador para roles frontend.
</div>
</div>

<div class="theory-section">
<h3>2. Tipos Basicos</h3>
<pre><code>// Primitivos
let name: string = "Lucas";
let age: number = 28;
let active: boolean = true;

// Arrays
let nums: number[] = [1, 2, 3];
let names: Array&lt;string&gt; = ["Ana", "Luis"];

// Objetos
let user: { name: string; age: number } = { name: "Lucas", age: 28 };

// Union types
let id: string | number = "abc";
id = 123; // tambien valido

// Literal types
let direction: "up" | "down" | "left" | "right" = "up";

// Null safety
let maybe: string | null = null;</code></pre>
</div>

<div class="theory-section">
<h3>3. Interfaces vs Types</h3>
<pre><code>// Interface - describe la forma de un objeto
interface User {
  id: number;
  name: string;
  email?: string;    // opcional
  readonly role: string; // solo lectura
}

// Type alias - mas flexible
type ID = string | number;
type Status = "active" | "inactive";

type UserWithPosts = User & {
  posts: Post[];     // intersection type
};

// Diferencia clave:
// - interface: se puede extender (extends), se puede declarar multiples veces (merge)
// - type: puede ser union, intersection, primitivo, tuple</code></pre>

<div class="theory-highlight">
<strong>Regla general:</strong> Usa interface para objetos y clases. Usa type para unions, intersections y aliases de tipos complejos.
</div>
</div>

<div class="theory-section">
<h3>4. Generics</h3>
<pre><code>// Funcion generica
function identity&lt;T&gt;(value: T): T {
  return value;
}

// Con restricciones
function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] {
  return obj[key];
}

// Interface generica
interface ApiResponse&lt;T&gt; {
  data: T;
  error: string | null;
  loading: boolean;
}

// Uso
const userResponse: ApiResponse&lt;User&gt; = {
  data: { id: 1, name: "Lucas", role: "dev" },
  error: null,
  loading: false
};</code></pre>
</div>

<div class="theory-section">
<h3>5. Utility Types</h3>
<pre><code>// Partial - todos los campos opcionales
type PartialUser = Partial&lt;User&gt;;

// Required - todos obligatorios
type RequiredUser = Required&lt;User&gt;;

// Pick - seleccionar campos
type UserPreview = Pick&lt;User, "id" | "name"&gt;;

// Omit - excluir campos
type UserWithoutEmail = Omit&lt;User, "email"&gt;;

// Record - mapa de claves a valores
type UserMap = Record&lt;string, User&gt;;

// ReturnType - tipo de retorno de una funcion
type FnReturn = ReturnType&lt;typeof myFunction&gt;;</code></pre>
</div>

<div class="theory-section">
<h3>6. TypeScript con React</h3>
<pre><code>// Props con interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  children?: React.ReactNode;
}

function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return &lt;button onClick={onClick}&gt;{label}&lt;/button&gt;;
}

// useState tipado
const [user, setUser] = useState&lt;User | null&gt;(null);
const [items, setItems] = useState&lt;string[]&gt;([]);

// Eventos tipados
const handleChange = (e: React.ChangeEvent&lt;HTMLInputElement&gt;) => {
  setValue(e.target.value);
};</code></pre>
</div>

<div class="theory-tip">
<strong>Tip de entrevista:</strong> Si te piden un ejercicio en JS y sabes TS, menciona que lo harias con tipos. Demuestra que entiendes interface vs type, generics basicos y como tipar props de React. Eso impresiona mucho.
</div>
`
      },
      {
        id: "ts_quiz",
        title: "Quiz: TypeScript",
        type: "quiz",
        questions: [
          {
            q: "Cual es la diferencia principal entre interface y type en TypeScript?",
            opts: [
              "No hay ninguna diferencia",
              "interface se puede extender y hacer declaration merging; type es mas flexible para unions y intersections",
              "type es mas rapido en compilacion",
              "interface solo funciona con clases"
            ],
            c: 1,
            exp: "Las interfaces soportan extends y declaration merging (declarar la misma interfaz varias veces la fusiona). Los types son mas flexibles: pueden ser unions (A | B), intersections (A & B), primitivos, tuples, etc."
          },
          {
            q: "Que hace Partial<T> en TypeScript?",
            opts: [
              "Elimina todas las propiedades",
              "Hace todas las propiedades de T opcionales",
              "Convierte T en un array",
              "Hace todas las propiedades readonly"
            ],
            c: 1,
            exp: "Partial<T> crea un nuevo tipo con todas las propiedades de T como opcionales (?). Es muy util para funciones de actualizacion parcial: function update(user: Partial<User>) permite pasar solo los campos que quieres cambiar."
          },
          {
            q: "Como se tipa el useState para un valor que puede ser null?",
            opts: [
              "useState(null)",
              "useState<User | null>(null)",
              "useState<nullable<User>>(null)",
              "useState<?User>(null)"
            ],
            c: 1,
            exp: "Se usa un union type con null: useState<User | null>(null). Esto le dice a TS que el valor puede ser de tipo User o null. Luego deberas hacer null checks antes de acceder a propiedades del usuario."
          },
          {
            q: "Que son los generics en TypeScript?",
            opts: [
              "Tipos que solo funcionan con clases",
              "Parametros de tipo que permiten crear componentes/funciones reutilizables que trabajan con varios tipos",
              "Lo mismo que any pero mas seguro",
              "Tipos especiales de JavaScript"
            ],
            c: 1,
            exp: "Los generics son parametros de tipo (como <T>) que permiten escribir codigo reutilizable que funciona con multiples tipos manteniendo type safety. Ejemplo: function identity<T>(val: T): T retorna el mismo tipo que recibe."
          },
          {
            q: "Que hace keyof en TypeScript?",
            opts: [
              "Crea una nueva propiedad en un objeto",
              "Obtiene un union type de todas las keys (propiedades) de un tipo",
              "Es equivalente a Object.keys()",
              "Solo funciona con arrays"
            ],
            c: 1,
            exp: "keyof T produce un union type de los nombres de las propiedades de T. Si interface User { name: string; age: number }, entonces keyof User es 'name' | 'age'. Muy util con generics para acceso seguro a propiedades."
          }
        ]
      },
      {
        id: "ts1",
        title: "Tipar una API Response",
        type: "open",
        difficulty: "easy",
        desc: "Define los tipos de TypeScript para una API REST de un blog. Incluye tipos para User, Post, Comment y una respuesta API generica.",
        hints: [
          "Define una interface para cada entidad con sus campos",
          "Usa generics para la respuesta API: ApiResponse<T>",
          "Los Posts tienen un author de tipo User y comments de tipo Comment[]"
        ],
        keywords: ["interface", "type", "generic", "ApiResponse", "User", "Post", "Comment", "optional", "readonly", "array", "extends", "number", "string", "boolean"],
        modelAnswer: "interface User { id: number; name: string; email: string; avatar?: string; readonly createdAt: string; }\n\ninterface Post { id: number; title: string; body: string; author: User; tags: string[]; comments: Comment[]; published: boolean; createdAt: string; }\n\ninterface Comment { id: number; text: string; author: Pick<User, 'id' | 'name'>; postId: number; createdAt: string; }\n\ninterface ApiResponse<T> { data: T; error: string | null; status: number; pagination?: { page: number; totalPages: number; total: number; }; }\n\n// Uso: ApiResponse<Post[]> para lista de posts, ApiResponse<User> para un usuario"
      },
      {
        id: "ts2",
        title: "Generics en practica",
        type: "open",
        difficulty: "medium",
        desc: "Explica que son los generics, por que son utiles, y escribe 3 ejemplos practicos de funciones/tipos genericos.",
        hints: [
          "Piensa en funciones que necesitan ser flexibles con los tipos",
          "Un ejemplo clasico es una funcion que filtra arrays de cualquier tipo",
          "Otro ejemplo es un hook personalizado que maneja fetch de cualquier tipo de dato"
        ],
        keywords: ["generic", "tipo", "parametro", "reutilizable", "type safety", "flexible", "T", "constraint", "extends", "array", "funcion", "hook", "ApiResponse", "identity"],
        modelAnswer: "Los generics son parametros de tipo que permiten crear funciones, interfaces y clases reutilizables que funcionan con multiples tipos manteniendo la seguridad de tipos. En vez de usar 'any' (que pierde informacion de tipos), los generics preservan el tipo concreto.\n\nEjemplo 1: function firstElement<T>(arr: T[]): T | undefined { return arr[0]; } -- firstElement([1,2,3]) retorna number, firstElement(['a','b']) retorna string.\n\nEjemplo 2: function useFetch<T>(url: string): { data: T | null; loading: boolean; error: Error | null } -- Un hook que puede hacer fetch de cualquier tipo de dato.\n\nEjemplo 3: function merge<T extends object, U extends object>(a: T, b: U): T & U { return {...a, ...b}; } -- Usa constraint 'extends object' para asegurar que solo se pasan objetos."
      },
      {
        id: "ts3",
        title: "TypeScript con React",
        type: "open",
        difficulty: "medium",
        desc: "Describe como usarias TypeScript en un componente de React: props, estado, eventos y hooks personalizados. Da un ejemplo completo.",
        hints: [
          "Define una interface para las props del componente",
          "Muestra como tipar useState, eventos y callbacks",
          "Incluye un hook personalizado tipado"
        ],
        keywords: ["interface", "props", "useState", "React.FC", "ChangeEvent", "FormEvent", "children", "ReactNode", "optional", "callback", "hook", "generico", "null"],
        modelAnswer: "En React con TypeScript, tipamos props con interfaces, estado con generics en useState, y eventos con los tipos de React.\n\ninterface TodoProps { items: Todo[]; onToggle: (id: number) => void; onDelete: (id: number) => void; filter?: 'all' | 'active' | 'done'; children?: React.ReactNode; }\n\nfunction TodoList({ items, onToggle, onDelete, filter = 'all' }: TodoProps) { const [search, setSearch] = useState<string>(''); const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value); const filtered = items.filter(item => item.text.includes(search)); return (<div><input value={search} onChange={handleChange} />{filtered.map(item => (...))}</div>); }\n\nHook personalizado: function useLocalStorage<T>(key: string, initial: T): [T, (val: T) => void] { const [value, setValue] = useState<T>(() => { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : initial; }); useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]); return [value, setValue]; }"
      }
    ]
  },

  // ============================================================
  // TRACK 4: SQL y BD
  // ============================================================
  {
    id: "sql",
    title: "SQL y Bases de Datos",
    desc: "Consultas SQL, JOINs, indices, transacciones y diseno de BD.",
    icon: "DB",
    color: "#a78bfa",
    week: 2,
    exercises: [
      {
        id: "sql_theory",
        title: "Teoria: SQL Esencial",
        type: "theory",
        content: `
<h2>SQL Esencial para Entrevistas</h2>

<div class="theory-section">
<h3>1. SELECT Basico</h3>
<pre><code>-- Seleccionar columnas especificas
SELECT name, email FROM users WHERE active = true;

-- Ordenar y limitar
SELECT * FROM products ORDER BY price DESC LIMIT 10;

-- Alias y funciones
SELECT
  CONCAT(first_name, ' ', last_name) AS full_name,
  UPPER(email) AS email_upper
FROM users;</code></pre>
</div>

<div class="theory-section">
<h3>2. JOINs</h3>
<p>Los JOINs combinan filas de dos o mas tablas basandose en una condicion.</p>

<pre><code>-- INNER JOIN: solo filas con coincidencia en ambas tablas
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: todas las filas de la izquierda + coincidencias de la derecha
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.name;

-- RIGHT JOIN: todas las filas de la derecha
-- FULL OUTER JOIN: todas las filas de ambas tablas</code></pre>

<div class="theory-highlight">
<strong>Pregunta frecuente:</strong> Diferencia entre INNER JOIN y LEFT JOIN. INNER solo devuelve filas con match en ambas tablas. LEFT devuelve TODAS las filas de la tabla izquierda, con NULL si no hay match.
</div>
</div>

<div class="theory-section">
<h3>3. GROUP BY y Agregaciones</h3>
<pre><code>-- Funciones de agregacion: COUNT, SUM, AVG, MIN, MAX
SELECT
  department,
  COUNT(*) AS num_employees,
  AVG(salary) AS avg_salary,
  MAX(salary) AS max_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY avg_salary DESC;</code></pre>

<p><strong>WHERE vs HAVING:</strong> WHERE filtra filas antes de agrupar. HAVING filtra grupos despues de agrupar.</p>
</div>

<div class="theory-section">
<h3>4. Foreign Keys y Relaciones</h3>
<pre><code>-- Uno a muchos
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Muchos a muchos (tabla intermedia)
CREATE TABLE user_roles (
  user_id INTEGER REFERENCES users(id),
  role_id INTEGER REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);</code></pre>
</div>

<div class="theory-section">
<h3>5. Indices</h3>
<p>Los indices aceleran las consultas pero ralentizan las escrituras y ocupan espacio.</p>

<pre><code>-- Crear indice
CREATE INDEX idx_users_email ON users(email);

-- Indice compuesto
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Indice unico
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);</code></pre>

<div class="theory-highlight">
<strong>Cuando usar indices:</strong> Columnas en WHERE, JOIN, ORDER BY frecuentes. NO en tablas pequenas, columnas con poca cardinalidad, o tablas con muchas escrituras.
</div>
</div>

<div class="theory-section">
<h3>6. Transacciones</h3>
<pre><code>BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Si todo OK:
COMMIT;

-- Si algo falla:
ROLLBACK;</code></pre>

<p><strong>ACID:</strong> Atomicidad (todo o nada), Consistencia (estado valido), Aislamiento (no se interfieren), Durabilidad (persiste).</p>
</div>

<div class="theory-tip">
<strong>Tip de entrevista:</strong> Practica escribir queries complejas con JOINs y GROUP BY. Las preguntas de SQL suelen ser: "Dame los usuarios con mas de X pedidos" o "Cual es el producto mas vendido por categoria". Piensa paso a paso: FROM > JOIN > WHERE > GROUP BY > HAVING > SELECT > ORDER BY.
</div>
`
      },
      {
        id: "sql_quiz",
        title: "Quiz: SQL",
        type: "quiz",
        questions: [
          {
            q: "Cual es la diferencia entre WHERE y HAVING?",
            opts: [
              "No hay diferencia",
              "WHERE filtra filas antes de GROUP BY, HAVING filtra grupos despues de GROUP BY",
              "HAVING es mas rapido",
              "WHERE solo funciona con numeros"
            ],
            c: 1,
            exp: "WHERE se aplica a filas individuales antes de la agrupacion. HAVING se aplica a grupos despues de GROUP BY. Ejemplo: WHERE salary > 50000 filtra empleados, HAVING AVG(salary) > 50000 filtra departamentos."
          },
          {
            q: "Que devuelve un LEFT JOIN cuando no hay coincidencia?",
            opts: [
              "Elimina la fila",
              "Devuelve la fila de la tabla izquierda con NULL en las columnas de la derecha",
              "Da un error",
              "Devuelve 0 en vez de NULL"
            ],
            c: 1,
            exp: "LEFT JOIN devuelve TODAS las filas de la tabla izquierda. Si no hay match en la tabla derecha, las columnas de esa tabla se llenan con NULL. Es util para encontrar 'usuarios sin pedidos', etc."
          },
          {
            q: "Que es un indice en SQL?",
            opts: [
              "Un tipo de tabla especial",
              "Una estructura de datos que mejora la velocidad de lectura a cambio de espacio y escrituras mas lentas",
              "Un backup automatico",
              "Un tipo de constraint"
            ],
            c: 1,
            exp: "Un indice es una estructura de datos (generalmente B-tree) que permite encontrar filas rapidamente sin escanear toda la tabla. El trade-off: ocupan espacio y cada INSERT/UPDATE debe actualizar los indices."
          },
          {
            q: "Que significa ACID en transacciones?",
            opts: [
              "Add, Create, Insert, Delete",
              "Atomicidad, Consistencia, Aislamiento, Durabilidad",
              "Automatic, Cached, Indexed, Distributed",
              "Es un tipo de base de datos"
            ],
            c: 1,
            exp: "ACID garantiza: Atomicidad (la transaccion es todo o nada), Consistencia (el BD queda en estado valido), Aislamiento (transacciones concurrentes no se interfieren), Durabilidad (los cambios persisten incluso si el sistema falla)."
          },
          {
            q: "Cual es la diferencia entre INNER JOIN y CROSS JOIN?",
            opts: [
              "Son lo mismo",
              "INNER JOIN combina filas con coincidencia en la condicion ON; CROSS JOIN genera el producto cartesiano (todas las combinaciones)",
              "CROSS JOIN es mas rapido",
              "INNER JOIN no necesita condicion"
            ],
            c: 1,
            exp: "INNER JOIN combina filas que cumplen la condicion ON. CROSS JOIN produce el producto cartesiano: si tabla A tiene 3 filas y tabla B tiene 4, CROSS JOIN produce 12 filas (todas las combinaciones posibles)."
          }
        ]
      },
      {
        id: "sq1",
        title: "Disenar un esquema de e-commerce",
        type: "open",
        difficulty: "medium",
        desc: "Disena el esquema de base de datos para un e-commerce: usuarios, productos, pedidos, categorias. Incluye relaciones, indices y constraints.",
        hints: [
          "Piensa en las entidades principales: users, products, orders, order_items, categories",
          "products tiene muchos pedidos a traves de order_items (muchos a muchos)",
          "Agrega indices en columnas frecuentes de busqueda"
        ],
        keywords: ["users", "products", "orders", "order_items", "categories", "PRIMARY KEY", "FOREIGN KEY", "INDEX", "NOT NULL", "REFERENCES", "precio", "cantidad", "relacion", "muchos a muchos"],
        modelAnswer: "CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW());\n\nCREATE TABLE categories (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, parent_id INTEGER REFERENCES categories(id));\n\nCREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL, description TEXT, price DECIMAL(10,2) NOT NULL, stock INTEGER DEFAULT 0, category_id INTEGER REFERENCES categories(id), created_at TIMESTAMP DEFAULT NOW());\n\nCREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id), status VARCHAR(20) DEFAULT 'pending', total DECIMAL(10,2), created_at TIMESTAMP DEFAULT NOW());\n\nCREATE TABLE order_items (id SERIAL PRIMARY KEY, order_id INTEGER REFERENCES orders(id), product_id INTEGER REFERENCES products(id), quantity INTEGER NOT NULL, unit_price DECIMAL(10,2) NOT NULL);\n\nCREATE INDEX idx_products_category ON products(category_id);\nCREATE INDEX idx_orders_user ON orders(user_id);\nCREATE INDEX idx_orders_status ON orders(status);\nCREATE INDEX idx_order_items_order ON order_items(order_id);"
      },
      {
        id: "sq2",
        title: "Query compleja: reportes",
        type: "open",
        difficulty: "medium",
        desc: "Escribe una query SQL que obtenga: los 5 productos mas vendidos de cada categoria, incluyendo nombre del producto, categoria, total vendido y numero de pedidos.",
        hints: [
          "Necesitas JOIN entre products, order_items y categories",
          "Usa GROUP BY y funciones de agregacion",
          "Para 'top N por grupo' puedes usar window functions: ROW_NUMBER() OVER (PARTITION BY...)"
        ],
        keywords: ["SELECT", "JOIN", "GROUP BY", "ORDER BY", "SUM", "COUNT", "PARTITION BY", "ROW_NUMBER", "window function", "INNER JOIN", "categories", "products", "order_items", "LIMIT"],
        modelAnswer: "WITH product_sales AS (\n  SELECT\n    p.id,\n    p.name AS product_name,\n    c.name AS category_name,\n    SUM(oi.quantity) AS total_sold,\n    COUNT(DISTINCT oi.order_id) AS num_orders,\n    SUM(oi.quantity * oi.unit_price) AS revenue,\n    ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY SUM(oi.quantity) DESC) AS rank\n  FROM products p\n  INNER JOIN categories c ON p.category_id = c.id\n  INNER JOIN order_items oi ON p.id = oi.product_id\n  GROUP BY p.id, p.name, c.id, c.name\n)\nSELECT product_name, category_name, total_sold, num_orders, revenue\nFROM product_sales\nWHERE rank <= 5\nORDER BY category_name, rank;\n\nExplicacion: El CTE calcula ventas por producto con ROW_NUMBER particionado por categoria. Luego filtramos solo los top 5 de cada categoria."
      },
      {
        id: "sq3",
        title: "Optimizacion de queries",
        type: "open",
        difficulty: "hard",
        desc: "Tienes una query que tarda 30 segundos en una tabla de 10 millones de filas. Describe paso a paso como la diagnosticarias y optimizarias.",
        hints: [
          "Empieza con EXPLAIN ANALYZE para ver el plan de ejecucion",
          "Busca table scans que deberian ser index scans",
          "Considera la estructura de la query: subconsultas vs JOINs, indices compuestos"
        ],
        keywords: ["EXPLAIN", "ANALYZE", "indice", "index", "scan", "seq scan", "index scan", "compuesto", "covering", "LIMIT", "subconsulta", "JOIN", "particion", "cache", "desnormalizacion", "N+1"],
        modelAnswer: "Paso 1: EXPLAIN ANALYZE - Ejecutar EXPLAIN ANALYZE en la query para ver el plan de ejecucion. Buscar sequential scans en tablas grandes, que indican falta de indices.\n\nPaso 2: Identificar cuellos de botella - Buscar: seq scans en tablas grandes, nested loops con muchas iteraciones, sorts en memoria excesivos, joins ineficientes.\n\nPaso 3: Indices - Crear indices en columnas de WHERE, JOIN ON, y ORDER BY. Considerar indices compuestos si la query filtra por multiples columnas. Un indice compuesto (a, b) sirve para WHERE a = X AND b = Y.\n\nPaso 4: Reescribir la query - Cambiar subconsultas correlacionadas por JOINs. Usar EXISTS en vez de IN para subconsultas grandes. Evitar funciones en WHERE (no indexable). Limitar columnas en SELECT.\n\nPaso 5: Opciones avanzadas - Particionamiento de tabla por fecha/rango. Vistas materializadas para reports frecuentes. Caching a nivel de aplicacion. Desnormalizacion selectiva si es necesario.\n\nPaso 6: Verificar - EXPLAIN ANALYZE de nuevo para confirmar mejora. Monitorear impacto en escrituras si se agregaron indices."
      }
    ]
  },

  // ============================================================
  // TRACK 5: DevOps & Git
  // ============================================================
  {
    id: "devops",
    title: "DevOps & Git",
    desc: "Docker, Git avanzado, CI/CD pipelines y fundamentos de Linux.",
    icon: "\uD83D\uDC33",
    color: "#f97316",
    week: 2,
    exercises: [
      {
        id: "devops_theory",
        title: "Teoria: DevOps & Git",
        type: "theory",
        content: `
<h2>DevOps & Git para Entrevistas</h2>

<div class="theory-section">
<h3>1. Docker</h3>
<p>Docker permite empaquetar aplicaciones con todas sus dependencias en contenedores reproducibles.</p>

<div class="theory-highlight">
<strong>Imagen vs Contenedor:</strong> Una imagen es un template inmutable (como una clase). Un contenedor es una instancia en ejecucion de esa imagen (como un objeto). Puedes crear multiples contenedores de la misma imagen.
</div>

<pre><code># Dockerfile basico
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]</code></pre>

<p><strong>Docker Compose:</strong> Herramienta para definir y ejecutar aplicaciones multi-contenedor. Un archivo docker-compose.yml describe todos los servicios (app, base de datos, cache, etc.) y sus relaciones.</p>

<pre><code># docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: secret
volumes:
  pgdata:</code></pre>

<p><strong>Volumenes:</strong> Permiten persistir datos fuera del contenedor. Sin volumenes, los datos se pierden al eliminar el contenedor.</p>
<p><strong>Networking:</strong> Docker crea redes internas. Los contenedores en la misma red se comunican por nombre de servicio (ej: <code>db:5432</code> en vez de <code>localhost:5432</code>).</p>
</div>

<div class="theory-section">
<h3>2. Git Avanzado</h3>
<p><strong>Branches:</strong> Ramas de desarrollo independientes. La rama principal suele ser main/master.</p>

<pre><code># Crear y cambiar a nueva rama
git checkout -b feature/login
# Equivalente moderno
git switch -c feature/login

# Ver ramas
git branch -a</code></pre>

<div class="theory-highlight">
<strong>Merge vs Rebase:</strong> Merge crea un commit de merge que une dos ramas (preserva historial completo). Rebase reescribe el historial moviendo commits sobre otra rama (historial mas limpio pero reescribe commits). Regla: nunca hagas rebase de ramas publicas/compartidas.
</div>

<p><strong>Pull Requests:</strong> Mecanismo para proponer cambios, revisar codigo y discutir antes de mergear a la rama principal. Son fundamentales para trabajo en equipo.</p>

<p><strong>Resolucion de conflictos:</strong> Ocurren cuando dos ramas modifican las mismas lineas. Git marca los conflictos en el archivo y tu decides que version mantener.</p>

<pre><code># Conflicto tipico:
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
const color = "blue";
=======
const color = "red";
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/theme

# Resuelves manualmente, luego:
git add archivo.js
git commit</code></pre>

<p><strong>Git Flow:</strong> Estrategia de branching: main (produccion), develop (integracion), feature/* (nuevas features), release/* (preparacion de release), hotfix/* (arreglos urgentes).</p>
</div>

<div class="theory-section">
<h3>3. CI/CD</h3>
<p>CI (Continuous Integration) y CD (Continuous Deployment/Delivery) automatizan el proceso de build, test y despliegue.</p>

<pre><code># GitHub Actions basico (.github/workflows/ci.yml)
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build</code></pre>

<p><strong>Pipeline tipico:</strong> 1) Build (compilar codigo), 2) Test (unit, integration, e2e), 3) Deploy a staging, 4) Deploy a produccion (manual o automatico).</p>
</div>

<div class="theory-section">
<h3>4. Linux Basico</h3>
<p>Comandos esenciales que debes conocer:</p>

<pre><code># Navegacion y archivos
ls -la          # listar con detalles y ocultos
cd /path/to     # cambiar directorio
pwd             # directorio actual
mkdir -p dir    # crear directorio (y padres)
cp, mv, rm      # copiar, mover, eliminar

# Busqueda
grep -r "texto" .    # buscar texto recursivamente
find . -name "*.js"  # buscar archivos por nombre

# Permisos
chmod 755 script.sh  # rwxr-xr-x
chmod +x script.sh   # hacer ejecutable
chown user:group file # cambiar propietario

# Procesos
ps aux              # ver procesos
kill -9 PID         # matar proceso
top / htop          # monitor de procesos

# Red
ssh user@host       # conexion remota
curl url            # hacer requests HTTP
netstat -tulpn      # ver puertos abiertos</code></pre>

<div class="theory-highlight">
<strong>Permisos Linux:</strong> Tres grupos (owner, group, others) x tres permisos (read=4, write=2, execute=1). 755 = rwxr-xr-x (owner todo, grupo y otros solo leer/ejecutar). 644 = rw-r--r-- (owner lee/escribe, resto solo lee).
</div>
</div>

<div class="theory-tip">
<strong>Tip de entrevista:</strong> No necesitas ser un experto en DevOps, pero debes saber lo basico de Docker, Git y CI/CD. Poder explicar como despliegas tu proyecto y como funciona tu flujo de trabajo con Git demuestra madurez profesional.
</div>
`
      },
      {
        id: "devops_quiz",
        title: "Quiz: DevOps & Git",
        type: "quiz",
        questions: [
          {
            q: "Cual es la diferencia entre una imagen Docker y un contenedor?",
            opts: [
              "Son lo mismo",
              "Una imagen es un template inmutable; un contenedor es una instancia en ejecucion de esa imagen",
              "Un contenedor es mas grande que una imagen",
              "Las imagenes solo existen en la nube"
            ],
            c: 1,
            exp: "Una imagen Docker es como una clase: un template de solo lectura con el SO, dependencias y codigo. Un contenedor es como un objeto: una instancia ejecutable de esa imagen con su propio estado. Puedes crear multiples contenedores de la misma imagen."
          },
          {
            q: "Que es un Dockerfile?",
            opts: [
              "Un archivo de configuracion de Docker Compose",
              "Un archivo con instrucciones para construir una imagen Docker paso a paso",
              "Un log de Docker",
              "Un archivo binario de Docker"
            ],
            c: 1,
            exp: "Un Dockerfile es un archivo de texto con instrucciones secuenciales (FROM, COPY, RUN, CMD, etc.) que Docker usa para construir una imagen. Cada instruccion crea una capa en la imagen. Se construye con 'docker build'."
          },
          {
            q: "Para que sirve Docker Compose?",
            opts: [
              "Para crear imagenes Docker mas rapido",
              "Para definir y ejecutar aplicaciones multi-contenedor con un solo archivo de configuracion",
              "Para comprimir contenedores Docker",
              "Para subir imagenes a Docker Hub"
            ],
            c: 1,
            exp: "Docker Compose permite definir multiples servicios (app, BD, cache, etc.), sus redes, volumenes y dependencias en un archivo docker-compose.yml. Con 'docker compose up' levantas todo el entorno de desarrollo con un solo comando."
          },
          {
            q: "Cual es la diferencia entre git merge y git rebase?",
            opts: [
              "No hay diferencia",
              "Merge crea un commit de union preservando el historial; rebase reescribe el historial moviendo commits sobre otra rama",
              "Rebase es mas seguro que merge",
              "Merge solo funciona en GitHub"
            ],
            c: 1,
            exp: "Merge une dos ramas creando un commit de merge (preserva todo el historial tal como fue). Rebase mueve tus commits al final de otra rama (historial mas lineal pero reescrito). Regla de oro: no hagas rebase de ramas que otros usan, porque reescribe commits ya compartidos."
          },
          {
            q: "Como se resuelve un conflicto en Git?",
            opts: [
              "Git lo resuelve automaticamente siempre",
              "Se borra la rama con conflictos",
              "Editas manualmente los archivos marcados con conflicto, eligiendo que cambios mantener, luego git add y git commit",
              "Solo se puede resolver desde GitHub"
            ],
            c: 2,
            exp: "Git marca los conflictos en los archivos con marcadores (<<<<<<<, =======, >>>>>>>). Tu editas el archivo manualmente eligiendo que codigo mantener (o combinando ambos). Luego haces git add del archivo resuelto y git commit para completar el merge."
          },
          {
            q: "Que es CI/CD?",
            opts: [
              "Un lenguaje de programacion",
              "Continuous Integration / Continuous Deployment: automatizar build, testing y despliegue del codigo",
              "Un tipo de base de datos",
              "Un protocolo de red"
            ],
            c: 1,
            exp: "CI (Continuous Integration): automatizar build y tests en cada push/PR. CD (Continuous Delivery/Deployment): automatizar el despliegue a staging/produccion. Herramientas: GitHub Actions, GitLab CI, Jenkins. Reduce errores humanos y acelera entregas."
          },
          {
            q: "Que significa el permiso 755 en Linux?",
            opts: [
              "El archivo pesa 755 bytes",
              "Owner: leer+escribir+ejecutar (7), grupo: leer+ejecutar (5), otros: leer+ejecutar (5)",
              "El archivo es secreto",
              "Solo root puede acceder"
            ],
            c: 1,
            exp: "En Linux, los permisos se expresan en octal: read=4, write=2, execute=1. 755 = 7(4+2+1) para owner (rwx), 5(4+1) para grupo (r-x), 5(4+1) para otros (r-x). Es el permiso tipico para scripts y directorios."
          },
          {
            q: "Que es un reverse proxy?",
            opts: [
              "Un firewall",
              "Un servidor que recibe peticiones de clientes y las redirige a servidores internos, ocultando la infraestructura",
              "Un tipo de VPN",
              "Un servidor DNS"
            ],
            c: 1,
            exp: "Un reverse proxy (como Nginx o Caddy) se situa entre los clientes e internet y tus servidores internos. Funciones: distribuir trafico (load balancing), SSL termination, cache, compresion, proteger servidores internos de acceso directo."
          }
        ]
      },
      {
        id: "devops1",
        title: "Dockerfile para Next.js",
        type: "open",
        difficulty: "medium",
        desc: "Escribe un Dockerfile multi-stage para una aplicacion Next.js. Debe tener: etapa de build (instalar deps, compilar) y etapa de produccion (solo lo necesario para ejecutar).",
        hints: [
          "Usa multi-stage builds: FROM para builder, FROM para produccion",
          "En el builder: instala dependencias y ejecuta npm run build",
          "En produccion: copia solo el output del build y node_modules de produccion"
        ],
        keywords: ["FROM", "WORKDIR", "COPY", "RUN", "multi-stage", "build", "produccion", "node", "alpine", "npm", "install", "expose", "CMD", "ENV", ".dockerignore"],
        modelAnswer: "# Etapa 1: Dependencias e instalacion\nFROM node:18-alpine AS deps\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN npm ci\n\n# Etapa 2: Build\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\nRUN npm run build\n\n# Etapa 3: Produccion\nFROM node:18-alpine AS runner\nWORKDIR /app\nENV NODE_ENV production\n\n# Crear usuario no-root\nRUN addgroup --system --gid 1001 nodejs\nRUN adduser --system --uid 1001 nextjs\n\n# Copiar solo lo necesario\nCOPY --from=builder /app/public ./public\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/.next/static ./.next/static\n\nUSER nextjs\nEXPOSE 3000\nENV PORT 3000\nCMD [\"node\", \"server.js\"]\n\nVentajas del multi-stage: la imagen final solo tiene el runtime y el build output, no las dependencias de desarrollo, node_modules de build, ni el codigo fuente. Esto reduce el tamano de la imagen significativamente (de ~1GB a ~100MB)."
      },
      {
        id: "devops2",
        title: "GitHub Actions Pipeline",
        type: "open",
        difficulty: "medium",
        desc: "Escribe un workflow de GitHub Actions que ejecute build, tests y deploy. Debe activarse en push a main y en pull requests.",
        hints: [
          "El archivo va en .github/workflows/ci.yml",
          "Usa 'on: push/pull_request' para los triggers",
          "Divide en jobs: test, build, deploy (deploy solo en push a main)"
        ],
        keywords: ["name", "on", "push", "pull_request", "jobs", "runs-on", "steps", "uses", "run", "actions/checkout", "setup-node", "npm", "test", "build", "deploy", "needs", "if", "env", "secrets"],
        modelAnswer: "name: CI/CD Pipeline\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '18'\n          cache: 'npm'\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test -- --coverage\n\n  build:\n    needs: test\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '18'\n          cache: 'npm'\n      - run: npm ci\n      - run: npm run build\n      - uses: actions/upload-artifact@v4\n        with:\n          name: build-output\n          path: ./dist\n\n  deploy:\n    needs: build\n    if: github.event_name == 'push' && github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/download-artifact@v4\n        with:\n          name: build-output\n          path: ./dist\n      - name: Deploy to production\n        run: echo 'Deploy aqui (ej: rsync, aws s3 sync, vercel deploy)'\n        env:\n          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}\n\nPuntos clave: 'needs' define dependencias entre jobs. 'if' condiciona la ejecucion (deploy solo en push a main, no en PRs). Los secrets se configuran en GitHub Settings. Los artifacts permiten pasar el build entre jobs."
      }
    ]
  },

  // ============================================================
  // TRACK 6: System Design
  // ============================================================
  {
    id: "system-design",
    title: "System Design",
    desc: "Diseno de sistemas: escalabilidad, caching, load balancing y arquitectura.",
    icon: "SD",
    color: "#ef4444",
    week: 3,
    exercises: [
      {
        id: "design_theory",
        title: "Teoria: System Design",
        type: "theory",
        content: `
<h2>System Design para Entrevistas</h2>

<div class="theory-section">
<h3>1. Enfoque Estructurado</h3>
<p>En entrevistas de system design, sigue estos pasos:</p>
<ol>
  <li><strong>Clarificar requisitos</strong> - Funcionales y no funcionales (escala, latencia, disponibilidad)</li>
  <li><strong>Estimaciones</strong> - Usuarios, QPS, almacenamiento, ancho de banda</li>
  <li><strong>API Design</strong> - Endpoints principales</li>
  <li><strong>Modelo de datos</strong> - Entidades, relaciones, base de datos</li>
  <li><strong>Arquitectura</strong> - Componentes de alto nivel</li>
  <li><strong>Profundizar</strong> - Escalar componentes criticos</li>
</ol>

<div class="theory-highlight">
<strong>No saltes al diseno!</strong> Los primeros 5 minutos son para entender que se pide. Haz preguntas: cuantos usuarios? que es mas importante, latencia o consistencia? que features son MVP?
</div>
</div>

<div class="theory-section">
<h3>2. Componentes Clave</h3>
<pre><code>Arquitectura tipica:
Cliente -> CDN -> Load Balancer -> API Servers -> Cache -> Database
                                              -> Message Queue -> Workers</code></pre>

<p><strong>Load Balancer:</strong> Distribuye trafico entre servidores. Algoritmos: round-robin, least connections, IP hash.</p>
<p><strong>API Gateway:</strong> Punto de entrada unico. Maneja auth, rate limiting, routing.</p>
<p><strong>CDN:</strong> Sirve contenido estatico desde servidores geograficamente cercanos al usuario.</p>
</div>

<div class="theory-section">
<h3>3. Escalabilidad</h3>
<p><strong>Vertical:</strong> Mas potencia al servidor (CPU, RAM). Tiene limites.</p>
<p><strong>Horizontal:</strong> Mas servidores. Requiere stateless servers y load balancing.</p>

<pre><code>Estrategias:
- Microservicios: dividir por dominio
- Sharding de BD: distribuir datos entre multiples DBs
- Read replicas: separar lecturas de escrituras
- Caching: Redis/Memcached para datos frecuentes
- Async processing: colas para tareas pesadas</code></pre>
</div>

<div class="theory-section">
<h3>4. Caching</h3>
<p>El caching es critico para rendimiento. Niveles:</p>
<ul>
  <li><strong>Cliente:</strong> Browser cache, Service Workers</li>
  <li><strong>CDN:</strong> Contenido estatico</li>
  <li><strong>Aplicacion:</strong> Redis, Memcached</li>
  <li><strong>Base de datos:</strong> Query cache</li>
</ul>

<div class="theory-highlight">
<strong>Cache invalidation</strong> es uno de los problemas mas dificiles en CS. Estrategias: TTL (time to live), write-through (actualiza cache al escribir), write-behind (actualiza async), cache-aside (la app maneja el cache).
</div>
</div>

<div class="theory-section">
<h3>5. SQL vs NoSQL</h3>
<p><strong>SQL (PostgreSQL, MySQL):</strong> Datos estructurados, relaciones complejas, transacciones ACID, consistencia fuerte.</p>
<p><strong>NoSQL:</strong></p>
<ul>
  <li>Documentos (MongoDB): datos semi-estructurados, esquema flexible</li>
  <li>Key-Value (Redis): caching, sesiones, alta velocidad</li>
  <li>Columnar (Cassandra): series temporales, datos masivos de escritura</li>
  <li>Grafos (Neo4j): relaciones complejas entre entidades</li>
</ul>
</div>

<div class="theory-section">
<h3>6. Message Queues</h3>
<p>Para procesamiento asincrono y desacoplamiento:</p>
<pre><code>Casos de uso:
- Envio de emails (no bloquear el request)
- Procesamiento de imagenes/video
- Sincronizacion entre microservicios
- Event sourcing

Herramientas: RabbitMQ, Kafka, AWS SQS</code></pre>
</div>

<div class="theory-tip">
<strong>Tip de entrevista:</strong> No existe la solucion perfecta. Toda decision tiene trade-offs. El entrevistador quiere ver que piensas en pros/contras: consistencia vs disponibilidad, latencia vs durabilidad, complejidad vs mantenibilidad. Verbaliza tus decisiones.
</div>
`
      },
      {
        id: "design_quiz",
        title: "Quiz: System Design",
        type: "quiz",
        questions: [
          {
            q: "Cuales son los componentes basicos de un sistema web?",
            opts: [
              "Solo un servidor y una base de datos",
              "Frontend (cliente), API/backend, base de datos y opcionalmente cache",
              "HTML, CSS y JavaScript",
              "Solo el navegador y el DNS"
            ],
            c: 1,
            exp: "Un sistema web tipico tiene: Frontend (React, etc.) que el usuario ve, una API/backend que procesa logica, una base de datos para persistencia, y opcionalmente cache (Redis) para rendimiento. A esto se anaden load balancers, CDN, message queues, etc."
          },
          {
            q: "Cual es la diferencia entre escalabilidad horizontal y vertical?",
            opts: [
              "Horizontal es mas barato, vertical es mas caro",
              "Vertical = mas potencia al mismo servidor (CPU/RAM). Horizontal = mas servidores",
              "Horizontal solo funciona con NoSQL",
              "No hay diferencia practica"
            ],
            c: 1,
            exp: "Vertical (scale up): mas CPU, RAM, disco al mismo servidor. Tiene limites fisicos. Horizontal (scale out): anadir mas servidores. Requiere que la app sea stateless y un load balancer. Horizontal es la forma habitual de escalar en la nube."
          },
          {
            q: "Cuando usarias Redis en vez de PostgreSQL?",
            opts: [
              "Siempre, Redis es mas rapido",
              "Nunca, PostgreSQL es suficiente",
              "Para cache, sesiones, contadores y datos que necesitan acceso ultra-rapido en memoria",
              "Solo para bases de datos grandes"
            ],
            c: 2,
            exp: "Redis es una base de datos en memoria, ideal para cache (datos frecuentes), sesiones de usuario, contadores en tiempo real, colas y pub/sub. PostgreSQL es para datos persistentes con relaciones complejas y transacciones ACID. Se usan juntos: PostgreSQL como fuente de verdad, Redis como cache."
          },
          {
            q: "Que es un CDN?",
            opts: [
              "Un tipo de base de datos distribuida",
              "Una red de servidores distribuidos geograficamente que sirven contenido estatico cerca del usuario",
              "Un protocolo de seguridad",
              "Un framework de frontend"
            ],
            c: 1,
            exp: "CDN (Content Delivery Network) es una red de servidores edge distribuidos mundialmente. Cachean contenido estatico (imagenes, JS, CSS) y lo sirven desde el servidor mas cercano al usuario, reduciendo latencia. Ejemplos: Cloudflare, AWS CloudFront, Fastly."
          },
          {
            q: "Cuando elegir SQL vs NoSQL?",
            opts: [
              "SQL siempre es mejor",
              "NoSQL siempre es mas rapido",
              "SQL para datos estructurados con relaciones complejas y transacciones ACID. NoSQL para esquemas flexibles, alta escritura o datos no relacionales",
              "Solo depende del tamano de los datos"
            ],
            c: 2,
            exp: "SQL (PostgreSQL, MySQL): datos estructurados, relaciones complejas, transacciones ACID, consistencia fuerte. NoSQL: documentos (MongoDB) para esquemas flexibles, key-value (Redis) para cache, columnar (Cassandra) para alta escritura, grafos (Neo4j) para relaciones entre entidades."
          },
          {
            q: "Que es un load balancer?",
            opts: [
              "Un servidor que almacena datos temporales",
              "Un componente que distribuye el trafico de red entre multiples servidores para evitar sobrecarga",
              "Un tipo de base de datos",
              "Un framework para testing de carga"
            ],
            c: 1,
            exp: "Un load balancer distribuye las peticiones entrantes entre multiples servidores backend. Algoritmos comunes: round-robin, least connections, IP hash. Tambien detecta servidores caidos y deja de enviarles trafico. Ejemplos: Nginx, HAProxy, AWS ALB."
          }
        ]
      },
      {
        id: "sd1",
        title: "Disena: URL Shortener",
        type: "open",
        difficulty: "medium",
        desc: "Disena un servicio tipo bit.ly. Cubre: API, modelo de datos, generacion de IDs, redireccion, analytics y escalabilidad.",
        hints: [
          "API simple: POST /shorten {url} -> {short_url}, GET /:code -> redirect",
          "Generacion de ID: hash (MD5/SHA) + tomar 7 chars, o base62 de un contador",
          "Para escalar: cache las URLs mas accedidas, particion por hash del codigo"
        ],
        keywords: ["API", "hash", "base62", "redireccion", "301", "302", "cache", "Redis", "contador", "analytics", "QPS", "particion", "sharding", "write", "read", "database", "TTL", "CDN"],
        modelAnswer: "Requisitos: Acortar URLs, redirigir, analytics. Escala: 100M URLs, 10K writes/s, 100K reads/s.\n\nAPI: POST /api/shorten {longUrl, customAlias?, expiresAt?} -> {shortUrl, code}. GET /:code -> 302 redirect a longUrl.\n\nModelo de datos: Table urls (code VARCHAR(7) PK, long_url TEXT NOT NULL, user_id INT, created_at TIMESTAMP, expires_at TIMESTAMP, click_count INT DEFAULT 0). Table clicks (id, code FK, ip, user_agent, created_at) para analytics.\n\nGeneracion de codigo: Usar un contador global (Redis INCR) y convertir a base62 (a-z, A-Z, 0-9). 7 caracteres de base62 = 62^7 = 3.5 trillon de combinaciones.\n\nRedireccion: GET /:code -> 1) Buscar en Redis cache, 2) Si no esta, buscar en DB, 3) Guardar en cache, 4) Retornar 302 redirect. Usar 302 (temporal) para poder trackear clicks, 301 (permanente) si no necesitas analytics.\n\nEscalabilidad: Cache (Redis) para URLs frecuentes. Read replicas de la DB. Sharding por hash del codigo. CDN para redireccion desde edge. Rate limiting para prevenir abuso."
      },
      {
        id: "sd2",
        title: "Disena: Chat en tiempo real",
        type: "open",
        difficulty: "hard",
        desc: "Disena un sistema de chat como Slack/WhatsApp Web. Incluye: mensajeria en tiempo real, grupos, historial y presencia.",
        hints: [
          "WebSockets para comunicacion bidireccional en tiempo real",
          "Cada usuario mantiene una conexion WebSocket con un servidor",
          "Para grupos grandes, necesitas un pub/sub system como Redis"
        ],
        keywords: ["WebSocket", "real-time", "pub/sub", "Redis", "mensaje", "grupo", "canal", "presencia", "online", "offline", "historial", "base de datos", "Cassandra", "particion", "notificacion", "push"],
        modelAnswer: "Requisitos: Mensajes 1:1 y en grupos, tiempo real, historial, presencia (online/offline), leido/entregado.\n\nConexion: WebSocket para comunicacion bidireccional. Cada cliente conecta a un WS server. Connection Manager mantiene un mapa userId -> serverId en Redis.\n\nEnvio de mensaje 1:1: 1) Cliente A envia via WS, 2) Server busca donde esta conectado B (Redis), 3) Si mismo server, envia directo; si diferente, publica a Redis Pub/Sub, 4) Server de B recibe y envia via WS, 5) Persistir en DB async via message queue.\n\nGrupos: Redis Pub/Sub con un canal por grupo. Al enviar a grupo, el server publica al canal. Todos los servers suscritos entregan a sus clientes conectados del grupo.\n\nPresencia: Heartbeat cada 30s via WS. Si no hay heartbeat, marcar offline. Publicar cambios de presencia a contactos del usuario via pub/sub.\n\nAlmacenamiento: Messages table particionada por channel_id y fecha (Cassandra es ideal). Indices en (channel_id, created_at) para paginacion del historial.\n\nEscalabilidad: Multiples WS servers detras de load balancer (sticky sessions por userId). Redis cluster para pub/sub. Cassandra para mensajes (alta escritura). CDN para archivos adjuntos."
      },
      {
        id: "sd3",
        title: "Disena: Feed de noticias",
        type: "open",
        difficulty: "hard",
        desc: "Disena el feed de noticias de una red social (tipo Twitter/Instagram). Incluye: publicacion, generacion del feed, ranking y escala.",
        hints: [
          "Dos enfoques: push (fan-out on write) vs pull (fan-out on read)",
          "Push: al publicar, escribe en el feed de cada follower. Rapido de leer, lento de escribir",
          "Pull: al leer, busca posts de todos los que sigues. Lento de leer, rapido de escribir",
          "Hibrido: push para usuarios normales, pull para celebridades"
        ],
        keywords: ["feed", "fan-out", "push", "pull", "timeline", "cache", "Redis", "ranking", "algoritmo", "publicar", "follower", "celebrity", "hibrido", "paginacion", "cursor", "real-time"],
        modelAnswer: "Requisitos: Usuarios publican posts, cada usuario ve un feed personalizado con posts de quienes sigue, ordenado por relevancia/tiempo. Escala: 500M usuarios, 10K posts/s.\n\nPublicacion: POST /posts {text, media} -> Message Queue -> 1) Guardar en Posts DB, 2) Proceso de fanout.\n\nGeneracion del feed - Enfoque hibrido: Para usuarios normales (<10K followers): Push/Fan-out on Write. Al publicar, un worker escribe el post_id en el feed cache (Redis sorted set) de cada follower. Para celebridades (>10K followers): Pull/Fan-out on Read. No se hace push. Al leer el feed, se mergean los feeds pre-computados con posts frescos de celebridades seguidas.\n\nLectura: GET /feed?cursor=X -> 1) Leer feed pre-computado de Redis (post_ids), 2) Mergear con posts de celebridades, 3) Hydrate: obtener contenido completo de los posts, 4) Aplicar ranking, 5) Retornar con cursor para paginacion.\n\nRanking: Score basado en: recencia, engagement (likes, comments), afinidad con el autor, tipo de contenido. ML model para personalizar.\n\nAlmacenamiento: Posts en PostgreSQL (sharded por user_id). Feed cache en Redis (sorted set por user_id, score = timestamp). Media en S3 + CDN. Social graph en Redis o graph DB.\n\nEscalabilidad: Fanout workers escalables horizontalmente. Redis cluster para feeds. CDN para media. Rate limiting en publicacion."
      }
    ]
  },

  // ============================================================
  // TRACK 6: Behavioral
  // ============================================================
  {
    id: "behavioral",
    title: "Behavioral",
    desc: "Preguntas de comportamiento: metodo STAR, comunicacion y liderazgo.",
    icon: "BH",
    color: "#22c55e",
    week: 3,
    exercises: [
      {
        id: "behavioral_theory",
        title: "Teoria: Behavioral Interviews",
        type: "theory",
        content: `
<h2>Behavioral Interviews</h2>

<div class="theory-section">
<h3>1. Metodo STAR</h3>
<p>El metodo STAR es la estructura clave para responder preguntas de comportamiento:</p>

<div class="theory-highlight">
<strong>S</strong>ituacion: Describe el contexto. Donde trabajabas, que proyecto, cuando.<br>
<strong>T</strong>area: Cual era tu responsabilidad o el problema que enfrentaste.<br>
<strong>A</strong>ccion: Que hiciste TU especificamente (no el equipo). Detalla tu proceso de pensamiento.<br>
<strong>R</strong>esultado: Cual fue el resultado medible. Usa numeros siempre que puedas.
</div>

<pre><code>Ejemplo:
S: "En mi startup anterior, nuestra app tenia un tiempo de carga de 8 segundos"
T: "Como frontend lead, tenia que reducirlo a menos de 2 segundos"
A: "Implemente code splitting, optimice imagenes con lazy loading,
    agregue cache con service workers y movi assets a un CDN"
R: "El tiempo de carga bajo a 1.5s, las conversiones subieron un 35%
    y el bounce rate bajo un 50%"</code></pre>
</div>

<div class="theory-section">
<h3>2. Preguntas Comunes y Como Prepararlas</h3>
<ul>
  <li><strong>"Cuentame de un desafio tecnico"</strong> - Prepara 2-3 historias de bugs complejos o features dificiles</li>
  <li><strong>"Conflicto con un companero"</strong> - Muestra empatia, comunicacion y resolucion</li>
  <li><strong>"Fallo/Error que cometiste"</strong> - Se honesto, enfocate en lo que aprendiste</li>
  <li><strong>"Algo de lo que estes orgulloso"</strong> - Impacto medible, liderazgo tecnico</li>
  <li><strong>"Como manejas el estres/deadlines"</strong> - Priorizacion, comunicacion proactiva</li>
</ul>
</div>

<div class="theory-section">
<h3>3. Errores Comunes</h3>
<ul>
  <li><strong>Ser vago:</strong> "Trabaje en equipo y lo resolvimos" - NO. Di exactamente que hiciste TU.</li>
  <li><strong>No dar numeros:</strong> "Mejoro el rendimiento" - MEJOR: "Redujo el load time de 4s a 0.8s"</li>
  <li><strong>Hablar mal del equipo:</strong> Incluso si fue culpa de otro, enfocate en como TU contribuiste a resolver.</li>
  <li><strong>Respuestas demasiado largas:</strong> 2-3 minutos max por respuesta. Se conciso.</li>
  <li><strong>No tener ejemplos preparados:</strong> Prepara 5-6 historias que cubran diferentes situaciones.</li>
</ul>
</div>

<div class="theory-section">
<h3>4. Framework de Preparacion</h3>
<p>Prepara historias que cubran estas dimensiones:</p>
<ol>
  <li>Desafio tecnico complejo que resolviste</li>
  <li>Colaboracion/trabajo en equipo</li>
  <li>Liderazgo o iniciativa</li>
  <li>Fallo y aprendizaje</li>
  <li>Entrega bajo presion/deadline</li>
  <li>Comunicacion con stakeholders no tecnicos</li>
</ol>
</div>

<div class="theory-tip">
<strong>Tip de entrevista:</strong> Las behavioral son tan importantes como las tecnicas. Muchos candidatos las subestiman. Practica en voz alta, cronometrate (2-3 min max), y asegurate de que tus historias tengan resultados medibles. La estructura STAR no es rigida - es una guia para no divagar.
</div>
`
      },
      {
        id: "behavioral_quiz",
        title: "Quiz: Behavioral",
        type: "quiz",
        questions: [
          {
            q: "Que es el formato STAR?",
            opts: [
              "Un sistema de puntuacion de entrevistas",
              "Una estructura para responder: Situacion, Tarea, Accion, Resultado",
              "Un framework de gestion de proyectos",
              "Un metodo de evaluacion de codigo"
            ],
            c: 1,
            exp: "STAR es la estructura recomendada para responder preguntas behavioral: Situacion (contexto), Tarea (tu responsabilidad), Accion (que hiciste TU especificamente), Resultado (impacto medible). Ayuda a dar respuestas estructuradas y concisas en 2-3 minutos."
          },
          {
            q: "Cual de estas respuestas NO deberias dar en una entrevista?",
            opts: [
              "Reconocer un error que cometiste y lo que aprendiste",
              "Hablar mal de un companero o jefe anterior",
              "Explicar una decision tecnica con sus trade-offs",
              "Admitir que no sabes algo pero explicar como lo investigarias"
            ],
            c: 1,
            exp: "NUNCA hables mal de companeros, jefes o empresas anteriores. Incluso si tuviste una mala experiencia, enfocate en lo positivo que aprendiste. Los entrevistadores ven hablar mal de otros como una red flag de actitud."
          },
          {
            q: "Como responder a 'Cuentame sobre ti'?",
            opts: [
              "Contar toda tu historia de vida desde la universidad",
              "Un resumen de 2 minutos: quien eres profesionalmente, que has hecho relevante, y por que te interesa este puesto",
              "Leer tu CV en voz alta",
              "Decir solo tu nombre y puesto actual"
            ],
            c: 1,
            exp: "La formula ideal: 1) Resumen breve de tu perfil (1 frase), 2) Experiencia mas relevante para el puesto (30s), 3) Proyecto o logro destacado (30s), 4) Por que te interesa este puesto (30s). Total: ~2 minutos. Conciso, relevante, con gancho."
          },
          {
            q: "Como manejar la pregunta 'Cual es tu mayor debilidad'?",
            opts: [
              "Decir que eres perfeccionista (respuesta cliche)",
              "Decir que no tienes debilidades",
              "Mencionar una debilidad real, explicar que estas haciendo para mejorarla, y dar un ejemplo concreto",
              "Inventar una debilidad que en realidad es una fortaleza"
            ],
            c: 2,
            exp: "Se honesto pero estrategico. Elige una debilidad real pero no critica para el puesto. Lo importante es mostrar autoconciencia y mejora activa. Ejemplo: 'A veces me cuesta delegar porque quiero asegurar la calidad, pero estoy trabajando en confiar mas en el equipo haciendo code reviews en vez de reescribir codigo'."
          },
          {
            q: "Por que los entrevistadores hacen preguntas behavioral?",
            opts: [
              "Para rellenar tiempo en la entrevista",
              "Porque no saben que mas preguntar",
              "Para evaluar soft skills, cultura fit, y predecir comportamiento futuro basandose en experiencias pasadas",
              "Solo las hacen empresas grandes"
            ],
            c: 2,
            exp: "Las behavioral evaluan: como trabajas en equipo, como manejas conflictos, como reaccionas ante fallos, tu capacidad de comunicacion, liderazgo e iniciativa. El principio es que el comportamiento pasado predice el futuro. Son tan importantes como las preguntas tecnicas."
          }
        ]
      },
      {
        id: "b1",
        title: "Desafio tecnico",
        type: "open",
        difficulty: "medium",
        desc: "Cuentame sobre el desafio tecnico mas dificil que hayas enfrentado. Usa el metodo STAR.",
        hints: [
          "Elige un desafio real que hayas resuelto, no tiene que ser epico",
          "Si no tienes experiencia laboral, usa un proyecto personal o academico",
          "Enfocate en TU proceso de pensamiento, no solo la solucion"
        ],
        keywords: ["situacion", "tarea", "accion", "resultado", "bug", "optimizacion", "investigacion", "solucion", "equipo", "impacto", "aprendi", "proceso", "decision"],
        modelAnswer: "Situacion: En mi proyecto SaaS (canal de denuncias), la generacion de PDFs con los informes de denuncias tardaba mas de 30 segundos cuando el informe incluia multiples archivos adjuntos, causando timeouts en produccion.\n\nTarea: Como desarrollador principal, necesitaba reducir el tiempo de generacion a menos de 5 segundos sin perder calidad ni funcionalidad.\n\nAccion: Primero profile el proceso e identifique que el cuello de botella era la descarga y procesamiento secuencial de adjuntos. Implemente: 1) Procesamiento paralelo con Promise.all para descargar adjuntos, 2) Compresion de imagenes on-the-fly, 3) Cache de templates ya compilados, 4) Para informes muy grandes, movi la generacion a un worker background con notificacion por email.\n\nResultado: El tiempo de generacion bajo a 2-3 segundos para informes normales. Los informes grandes se procesan en background sin afectar la UX. Los timeouts en produccion se eliminaron completamente."
      },
      {
        id: "b2",
        title: "Conflicto en equipo",
        type: "open",
        difficulty: "medium",
        desc: "Describe una situacion en la que tuviste un desacuerdo con un companero o con una decision tecnica. Como lo manejaste?",
        hints: [
          "No hables mal de nadie - muestrate diplomatico",
          "Enfocate en como buscaste entender la otra perspectiva",
          "Destaca la resolucion positiva"
        ],
        keywords: ["desacuerdo", "perspectiva", "comunicacion", "escuche", "propuse", "compromiso", "solucion", "equipo", "respeto", "datos", "argumento", "resultado", "aprendi"],
        modelAnswer: "Situacion: En un proyecto, un companero queria usar una libreria de componentes UI (Material UI) mientras yo preferia componentes custom con Tailwind para mas control y menor bundle size.\n\nTarea: Necesitabamos llegar a un acuerdo antes del sprint planning porque afectaba la arquitectura del frontend.\n\nAccion: En vez de insistir en mi posicion, propuse hacer una comparativa objetiva. Cree un mini-prototipo con ambos enfoques midiendo: bundle size, tiempo de desarrollo, personalización, y curva de aprendizaje. Presente los datos al equipo y escuche los argumentos de mi companero (velocidad de desarrollo, componentes de accesibilidad ya hechos).\n\nResultado: Llegamos a un hibrido: usamos la libreria para componentes complejos (tablas, date pickers) y custom para el resto. Ambos quedamos satisfechos y el proyecto se entrego a tiempo. Aprendi que las decisiones basadas en datos eliminan la subjetividad de los debates tecnicos."
      },
      {
        id: "b3",
        title: "Fallo y aprendizaje",
        type: "open",
        difficulty: "medium",
        desc: "Cuentame sobre un error significativo que cometiste y que aprendiste de el.",
        hints: [
          "Se honesto - todos cometemos errores",
          "Lo importante es mostrar que aprendiste y que cambiaste",
          "Muestra madurez profesional"
        ],
        keywords: ["error", "fallo", "aprendi", "cambie", "proceso", "mejora", "responsabilidad", "prevencion", "revision", "testing", "produccion", "impacto", "leccion"],
        modelAnswer: "Situacion: En mi primer proyecto en produccion, desplegue un cambio en la base de datos sin hacer backup primero. La migracion tenia un bug que corrompio datos de configuracion de varios clientes.\n\nTarea: Necesitaba restaurar los datos y evitar que esto volviera a pasar.\n\nAccion: Inmediatamente informe al equipo (no intente ocultarlo). Reconstrui los datos a partir de logs y la version anterior de la DB. Trabaje un fin de semana para restaurar todo. Luego propuse e implemente: 1) Backups automaticos pre-migracion, 2) Migraciones reversibles con rollback, 3) Entorno de staging que replica produccion, 4) Checklist de despliegue.\n\nResultado: Los datos se restauraron completamente. El proceso de despliegue mejorado se adopto como estandar del equipo. Desde entonces no hubo ningun incidente similar. Aprendi que la velocidad sin safety nets es una falsa economia, y que la transparencia ante errores genera mas confianza que ocultarlos."
      },
      {
        id: "b4",
        title: "Proyecto del que estas orgulloso",
        type: "open",
        difficulty: "easy",
        desc: "Cuentame sobre un proyecto o logro profesional del que estes especialmente orgulloso. Por que?",
        hints: [
          "Elige algo con impacto medible",
          "Explica por que te importa personalmente",
          "Muestra ownership y pasion"
        ],
        keywords: ["orgulloso", "proyecto", "impacto", "resultado", "usuario", "mejorar", "aprendi", "liderazgo", "iniciativa", "diseno", "implementacion", "feedback", "crecimiento"],
        modelAnswer: "Situacion: Vi que muchas empresas en Espana necesitaban cumplir con la ley de canal de denuncias pero no tenian herramientas accesibles ni asequibles.\n\nTarea: Decidi crear una plataforma SaaS completa que simplificara el proceso, desde la denuncia hasta la resolucion.\n\nAccion: Disene y desarrolle la plataforma completa: frontend en React, backend con Node.js, base de datos PostgreSQL. Implemente encriptacion end-to-end para proteger la identidad de los denunciantes, generacion de PDFs automatica, sistema de notificaciones, y un panel de administracion intuitivo. Tambien me encargue del diseno UX, del marketing y de la atencion al cliente.\n\nResultado: La plataforma esta en produccion con clientes reales pagando suscripciones mensuales. Logre crear un producto completo de principio a fin, aprendiendo de todo: desarrollo, diseno, negocio, ventas. Estoy orgulloso porque resuelve un problema real y lo construi desde cero."
      },
      {
        id: "b5",
        title: "Trabajo bajo presion",
        type: "open",
        difficulty: "medium",
        desc: "Describe una situacion en la que tuviste que entregar algo con un deadline muy ajustado. Como priorizaste y que resultado obtuviste?",
        hints: [
          "Muestra como priorizaste las tareas criticas",
          "Habla de comunicacion con stakeholders",
          "Destaca que no sacrificaste calidad por velocidad (o como lo manejaste)"
        ],
        keywords: ["deadline", "priorizar", "presion", "tiempo", "comunicar", "MVP", "alcance", "negociar", "entregar", "calidad", "planificar", "enfoque", "resultado"],
        modelAnswer: "Situacion: Un cliente necesitaba el portal de denuncias operativo en 2 semanas para una auditoria regulatoria. Normalmente el setup toma un mes.\n\nTarea: Entregar un portal funcional y seguro en la mitad del tiempo habitual.\n\nAccion: 1) Priorice features: identifique las funcionalidades criticas para la auditoria (formulario de denuncia, encriptacion, PDF de confirmacion) vs nice-to-haves (analytics, personalizacion avanzada). 2) Comunique claramente al cliente que tendrian el core en 2 semanas y las features adicionales en las 2 siguientes. 3) Trabaje con sprints diarios, haciendo deploy continuo para que el cliente pudiera ir probando. 4) Automatice lo que pude (templates, configuracion) para ganar tiempo.\n\nResultado: El portal estaba operativo 1 dia antes del deadline. El cliente paso la auditoria sin problemas. Las features restantes se entregaron la semana siguiente. El cliente quedo tan satisfecho que recomendo la plataforma a otras empresas."
      }
    ]
  },

  // ============================================================
  // TRACK 7: Tus Proyectos
  // ============================================================
  {
    id: "projects",
    title: "Tus Proyectos",
    desc: "Aprende a presentar tus proyectos de forma que impresione en entrevistas.",
    icon: "PJ",
    color: "#f97316",
    week: 4,
    exercises: [
      {
        id: "projects_theory",
        title: "Teoria: Presentar Proyectos",
        type: "theory",
        content: `
<h2>Como Presentar Tus Proyectos en Entrevistas</h2>

<div class="theory-section">
<h3>1. Framework: Problema -> Decision -> Resultado</h3>
<p>Cada proyecto debe explicarse con esta estructura:</p>

<div class="theory-highlight">
<strong>Problema:</strong> Que problema resuelve? Por que existe?<br>
<strong>Decision:</strong> Que decisiones tecnicas tomaste y POR QUE?<br>
<strong>Resultado:</strong> Que lograste? Metricas, usuarios, aprendizajes.
</div>

<p>Los entrevistadores no quieren un tour de features. Quieren entender tu proceso de toma de decisiones.</p>
</div>

<div class="theory-section">
<h3>2. Que Destacar</h3>
<ul>
  <li><strong>Decisiones tecnicas con trade-offs:</strong> "Elegi React sobre Vue porque el equipo ya lo conocia y necesitabamos movernos rapido. El trade-off fue un bundle size mayor."</li>
  <li><strong>Problemas que resolviste:</strong> "El mayor reto fue la concurrencia. Dos usuarios editando la misma denuncia. Lo resolvi con optimistic locking."</li>
  <li><strong>Arquitectura:</strong> "Separe el frontend del backend con una API REST. Esto permitio que el equipo mobile trabajara en paralelo."</li>
  <li><strong>Metricas:</strong> "Redujo el tiempo de proceso de 2 horas a 5 minutos" es 100x mejor que "Es una app web".</li>
</ul>
</div>

<div class="theory-section">
<h3>3. Lo Que NO Hacer</h3>
<ul>
  <li>No listes tecnologias sin contexto ("Uso React, Node, PostgreSQL, Redis..." - Y QUE?)</li>
  <li>No des un tour de pantallas como un demo comercial</li>
  <li>No te disculpes ("Es un proyecto pequeno..." - Si lo mencionas, es porque tiene valor)</li>
  <li>No hables solo de features, habla de DECISIONES</li>
</ul>
</div>

<div class="theory-section">
<h3>4. Ejemplo de Buena Presentacion</h3>
<pre><code>"Construi una plataforma de canal de denuncias para empresas.

El PROBLEMA: Las empresas en Espana necesitan cumplir con una nueva
regulacion, pero las soluciones existentes son caras y complejas.

DECISIONES TECNICAS:
- React + TypeScript en frontend por type-safety y productividad
- Node.js + Express en backend para compartir skills JS full-stack
- PostgreSQL por las relaciones complejas entre denuncias, usuarios y empresas
- Encriptacion end-to-end porque los datos son sensibles

RETO PRINCIPAL: La generacion de PDFs con datos encriptados.
Los adjuntos se desencriptan solo al generar el informe.
Implemente un worker en background para no bloquear la UI.

RESULTADO: Plataforma en produccion con clientes de pago.
Proceso que antes tomaba 2 horas se hace en 5 minutos."</code></pre>
</div>

<div class="theory-tip">
<strong>Tip de entrevista:</strong> Practica tu pitch de 2 minutos para cada proyecto. Graba te y escuchate. Suena como alguien que toma decisiones informadas? O como alguien que solo siguio un tutorial? La diferencia entre ambos es que el primero explica el POR QUE.
</div>
`
      },
      {
        id: "p1",
        title: "Pitch de Informo (2 min)",
        type: "open",
        difficulty: "easy",
        desc: "Escribe el pitch de Informo como si estuvieras en una entrevista. Framework: Problema -> Decisiones -> Resultado.",
        hints: [
          "Empieza con la Ley 2/2023 y la obligacion legal",
          "Menciona AES-256-GCM y por que cifrado a nivel de app vs DB",
          "Cierra con: produccion, 3 planes, trial sin tarjeta, Libro-Registro AIPI"
        ],
        keywords: ["informo", "ley", "2023", "denuncias", "aes", "256", "cifrado", "supabase", "anonimo", "produccion", "saas", "aipi", "libro-registro", "next.js", "zod", "docker", "suscripcion", "trial"],
        modelAnswer: "Informo (informo.es) es un SaaS de canal de denuncias para que empresas cumplan con la Ley 2/2023.\n\nPROBLEMA: Las empresas con +50 empleados estan obligadas por ley a tener un canal de denuncias. La mayoria no tienen infraestructura tecnica para montarlo.\n\nDECISIONES: Next.js 15 con App Router para SSR + API routes en un solo proyecto. Supabase para Auth + PostgreSQL sin montar backend propio. La decision mas importante: cifrado AES-256-GCM a nivel de aplicacion, no de base de datos. Asi ni yo como admin de Supabase puedo leer las denuncias. Zod para validacion estricta de formularios. Docker para despliegue.\n\nRESULTADO: Plataforma en produccion con denuncias cifradas e2e, panel de gestion, seguimiento anonimo por tracking code, exportacion Libro-Registro para AIPI, verificacion QR, y 3 planes de suscripcion (Starter/Business/Enterprise) con trial de 7 dias sin tarjeta."
      },
      {
        id: "p2",
        title: "Pitch de Finesse + VarynHost",
        type: "open",
        difficulty: "medium",
        desc: "Practica explicar Finesse y VarynHost. Para cada uno: problema, decision tecnica clave, resultado.",
        hints: [
          "Finesse: alternativa a Splitwise, PWA offline, OAuth, Supabase RLS",
          "VarynHost: +60 clientes, +60 servidores, automatizacion, Docker Swarm",
          "Menciona numeros concretos y decisiones reales"
        ],
        keywords: ["finesse", "splitwise", "pwa", "offline", "oauth", "supabase", "rls", "realtime", "varynhost", "hosting", "clientes", "servidores", "docker", "swarm", "automatizacion", "pterodactyl", "whmcs", "provisioning"],
        modelAnswer: "FINESSE (finesseapp.es): Alternativa a Splitwise para gestionar finanzas personales y grupales.\n\nProblema: Splitwise es limitado para proyecciones y presupuestos.\nDecision clave: Supabase (Auth + RLS + Realtime) sobre backend propio. RLS garantiza que cada usuario solo ve sus datos sin middleware de autorizacion. Acelero el MVP sin sacrificar seguridad.\nResultado: PWA instalable con OAuth Google, modo offline con Service Worker y sync automatico, importacion CSV/Splitwise, categorias personalizadas y asistente financiero IA (Fina).\nStack: Next.js 16, React 19, TypeScript, Tailwind, Supabase, Framer Motion.\n\nVARYNHOST (varynhost.com): Servicio de hosting con operacion real.\n\nProblema: Servidores de juego necesitan provisioning rapido, paneles de control y facturacion automatizada.\nDecision clave: Docker Swarm sobre Kubernetes. Con equipo de 2 personas, K8s era matar moscas a canonazos. Swarm cubre orquestacion basica con mucha menos complejidad operativa.\nResultado: +60 clientes pagando mensualmente, +60 servidores activos en EU. Automatizacion de provisioning con Pterodactyl + WHMCS + APIs custom. Continuidad 24/7 con monitoreo y alertas."
      },
      {
        id: "p3",
        title: "Trade-offs: AES vs TDE, Supabase vs custom, Swarm vs K8s",
        type: "open",
        difficulty: "hard",
        desc: "Explica 3 decisiones tecnicas reales de tus proyectos y sus trade-offs. El entrevistador quiere ver que piensas en alternativas.",
        hints: [
          "Informo: AES-256-GCM a nivel de app vs cifrado de Supabase (TDE)",
          "Finesse: Supabase vs backend propio con Express/Fastify",
          "VarynHost: Docker Swarm vs Kubernetes"
        ],
        keywords: ["aes", "cifrado", "tde", "supabase", "backend", "propio", "swarm", "kubernetes", "trade-off", "sacrificar", "ganar", "complejidad", "seguridad", "velocidad", "escala", "equipo"],
        modelAnswer: "1. AES-256-GCM vs cifrado de DB (Informo):\nElegi cifrado a nivel de app. Sacrifique: complejidad de desarrollo (funciones encrypt/decrypt en cada API route, key rotation con legacy fallback). Gane: anonimato real — ni yo como admin de Supabase puedo leer denuncias. La clave solo existe en env vars del servidor. Valio la pena porque es requisito legal no negociable de la Ley 2/2023.\n\n2. Supabase vs backend propio (Finesse):\nElegi Supabase. Sacrifique: control total sobre la capa de datos, migraciones complejas, vendor lock-in. Gane: Auth, RLS (Row Level Security), Realtime, Storage en dias en vez de semanas. Valio la pena porque el objetivo era validar el producto rapido como equipo de uno.\n\n3. Docker Swarm vs Kubernetes (VarynHost):\nElegi Swarm. Sacrifique: auto-scaling avanzado, ecosistema de herramientas mas grande, service mesh. Gane: simplicidad operativa — 1-2 personas gestionando todo. K8s para 60 servidores con equipo de 2 es overengineering. Valio la pena porque la complejidad de K8s nos habria paralizado."
      },
      {
        id: "p4",
        title: "Preguntas incomodas sobre tus proyectos",
        type: "open",
        difficulty: "hard",
        desc: "Prepara respuestas para: Si Informo es bueno, cuantos clientes tienes? Por que no hay repo publico? Por que trabajas de tecnico N1 con este portfolio?",
        hints: [
          "Se honesto y autocritico pero constructivo",
          "Muestra que has reflexionado sobre tus decisiones",
          "Menciona cosas concretas, no vagas"
        ],
        keywords: ["clientes", "repo", "privado", "tecnico", "n1", "produccion", "demo", "url", "verificar", "negocio", "busco", "salto", "capacidades", "informo", "varynhost", "finesse"],
        modelAnswer: "Cuantos clientes de pago tiene Informo?\nEs un producto recien lanzado. La plataforma esta en produccion y lista para vender (informo.es). El MVP esta validado tecnicamente, ahora toca traccion comercial. Puedo hacer demo en vivo.\n\nPor que no hay repo publico?\nEs un SaaS comercial. El codigo es propiedad intelectual del negocio. Puedo explicar la arquitectura en detalle y hacer demo en vivo del dashboard, cifrado, seguimiento anonimo.\n\nVarynHost con 60 clientes suena pequeno.\n60 clientes pagando mensualmente con facturacion recurrente, soporte 24/7, infra en EU. El tamano no define la complejidad tecnica: provisioning automatizado, paneles custom, monitoreo continuo.\n\nSi sabes hacer todo esto, por que trabajas de tecnico N1?\nEs mi trabajo actual mientras busco una posicion que refleje mis capacidades reales. Los proyectos los construyo fuera del horario laboral. Busco activamente ese salto y por eso estoy en este proceso.\n\nComo verifico que hiciste estos proyectos?\nTodos estan en produccion con URLs publicas: informo.es, finesseapp.es, varynhost.com. Puedo hacer live demo, mostrar dashboards, y responder cualquier pregunta tecnica sobre la arquitectura."
      }
    ]
  },

  // ============================================================
  // TRACK 8: Simulacro
  // ============================================================
  {
    id: "simulacro",
    title: "Simulacro Final",
    desc: "Simulacion de una entrevista tecnica completa: coding, system design y behavioral.",
    icon: "SIM",
    color: "#ec4899",
    week: 4,
    exercises: [
      {
        id: "m1",
        title: "Coding Challenge: Dashboard",
        type: "code",
        difficulty: "hard",
        desc: "SIMULACRO (45 min): Crea un dashboard de metricas con graficos de barras, filtros y datos en tiempo real.",
        starter: `function App() {
  // SIMULACRO DE ENTREVISTA - 45 minutos
  // Crea un dashboard con:
  // 1. Un array de datos de ventas por mes
  // 2. Grafico de barras visual (divs con heights proporcionales)
  // 3. Selector de periodo (Q1, Q2, Q3, Q4)
  // 4. Stats: total, promedio, mejor mes
  // 5. Auto-refresh simulado cada 5 segundos

  const initialData = [
    { month: "Ene", sales: 4200 },
    { month: "Feb", sales: 3800 },
    { month: "Mar", sales: 5100 },
    { month: "Abr", sales: 4600 },
    { month: "May", sales: 5500 },
    { month: "Jun", sales: 4900 },
    { month: "Jul", sales: 3200 },
    { month: "Ago", sales: 2800 },
    { month: "Sep", sales: 4100 },
    { month: "Oct", sales: 5800 },
    { month: "Nov", sales: 6200 },
    { month: "Dic", sales: 7100 }
  ];

  return (
    <div>
      <h3>Dashboard de Ventas</h3>
      <p>Implementa el dashboard completo</p>
    </div>
  );
}`,
        solution: `function App() {
  const initialData = [
    { month: "Ene", sales: 4200 },
    { month: "Feb", sales: 3800 },
    { month: "Mar", sales: 5100 },
    { month: "Abr", sales: 4600 },
    { month: "May", sales: 5500 },
    { month: "Jun", sales: 4900 },
    { month: "Jul", sales: 3200 },
    { month: "Ago", sales: 2800 },
    { month: "Sep", sales: 4100 },
    { month: "Oct", sales: 5800 },
    { month: "Nov", sales: 6200 },
    { month: "Dic", sales: 7100 }
  ];

  const [data, setData] = useState(initialData);
  const [quarter, setQuarter] = useState("all");

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(d => ({
        ...d,
        sales: d.sales + Math.floor(Math.random() * 200 - 100)
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const quarters = { Q1: [0,3], Q2: [3,6], Q3: [6,9], Q4: [9,12], all: [0,12] };
  const [start, end] = quarters[quarter] || [0, 12];
  const filtered = data.slice(start, end);
  const maxSales = Math.max(...filtered.map(d => d.sales));
  const total = filtered.reduce((s, d) => s + d.sales, 0);
  const avg = Math.round(total / filtered.length);
  const best = filtered.reduce((b, d) => d.sales > b.sales ? d : b);

  const statStyle = {padding:'12px',background:'#1a1a2e',borderRadius:'8px',textAlign:'center'};

  return (
    <div>
      <h3>Dashboard de Ventas</h3>
      <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
        {["all","Q1","Q2","Q3","Q4"].map(q => (
          <button key={q} onClick={() => setQuarter(q)}
            style={{background: quarter === q ? '#6c63ff':'#2a2a3e',border:'none',color:'white',padding:'6px 16px',borderRadius:'6px',cursor:'pointer'}}>
            {q === 'all' ? 'Todo' : q}
          </button>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',marginBottom:'16px'}}>
        <div style={statStyle}><div style={{fontSize:'12px',opacity:0.7}}>Total</div><div style={{fontSize:'20px',fontWeight:'bold'}}>{total.toLocaleString()}</div></div>
        <div style={statStyle}><div style={{fontSize:'12px',opacity:0.7}}>Promedio</div><div style={{fontSize:'20px',fontWeight:'bold'}}>{avg.toLocaleString()}</div></div>
        <div style={statStyle}><div style={{fontSize:'12px',opacity:0.7}}>Mejor Mes</div><div style={{fontSize:'20px',fontWeight:'bold'}}>{best.month}</div></div>
      </div>
      <div className="chart" style={{display:'flex',alignItems:'flex-end',gap:'4px',height:'160px',padding:'12px',background:'#1a1a2e',borderRadius:'8px'}}>
        {filtered.map(d => (
          <div key={d.month} style={{flex:1,textAlign:'center'}}>
            <div style={{background:'linear-gradient(180deg,#6c63ff,#4834d4)',height:Math.round((d.sales/maxSales)*120)+'px',borderRadius:'4px 4px 0 0',transition:'height 0.3s'}}></div>
            <div style={{fontSize:'10px',marginTop:'4px'}}>{d.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
        check: `(function(el) {
  const chart = el.querySelector('.chart');
  if (!chart) return 'Falta el grafico con className="chart"';
  const buttons = el.querySelectorAll('button');
  if (buttons.length < 3) return 'Faltan botones de filtro de periodo';
  return true;
})`,
        hints: [
          "Empieza con los datos y el estado. Luego los filtros por trimestre",
          "El grafico de barras son divs con height proporcional: (sales/maxSales)*120 + 'px'",
          "useEffect con setInterval para auto-refresh simulado"
        ]
      },
      {
        id: "m2",
        title: "System Design: Tu stack ideal",
        type: "open",
        difficulty: "hard",
        desc: "SIMULACRO: Si te pidieran disenar una red social de nicho (ej: para desarrolladores, musicos, fotografos), como lo harias? Cubre arquitectura completa.",
        hints: [
          "Define primero que tipo de red social y sus features unicas",
          "Sigue el framework: requisitos -> estimaciones -> API -> datos -> arquitectura",
          "Piensa en feeds, notificaciones, busqueda, media"
        ],
        keywords: ["requisitos", "API", "base de datos", "arquitectura", "feed", "notificaciones", "busqueda", "cache", "CDN", "microservicio", "WebSocket", "escalabilidad", "media", "storage"],
        modelAnswer: "Red social para desarrolladores (tipo dev.to + GitHub social).\n\nRequisitos funcionales: Perfiles con portfolio/repos, posts/articulos tecnicos, feed personalizado, comentarios, likes, seguir usuarios, tags/topics, busqueda, notificaciones.\n\nRequisitos no funcionales: 1M usuarios, 10K DAU, latencia <200ms, alta disponibilidad.\n\nAPI: REST + WebSocket. POST /posts, GET /feed, POST /follow/:userId, GET /search?q=, WS /notifications.\n\nModelo de datos: PostgreSQL para datos relacionales (users, posts, comments, follows). Redis para feed cache, sesiones, contadores. Elasticsearch para busqueda full-text de posts. S3 + CDN para imagenes y avatares.\n\nArquitectura: Cliente (React SPA) -> CDN (assets + imagenes) -> Load Balancer -> API Servers (Node.js, stateless, horizontal scaling) -> Servicios: Auth, Posts, Feed, Search, Notifications. Message Queue (Redis/Kafka) para: generacion de feed (fan-out on write para usuarios normales), indexacion en Elasticsearch, notificaciones push.\n\nFeed: Modelo hibrido. Para usuarios normales, fan-out on write (al publicar, escribir en feed de cada follower en Redis). Para usuarios con muchos followers, fan-out on read. Redis Sorted Sets con timestamp como score para paginacion eficiente.\n\nEscalabilidad futura: Database sharding por user_id. CDN multi-region. Read replicas de PostgreSQL. Rate limiting por usuario."
      },
      {
        id: "m3",
        title: "Behavioral: Por que quieres este puesto?",
        type: "open",
        difficulty: "easy",
        desc: "SIMULACRO: Responde a estas preguntas comunes de cierre: 1) Por que quieres trabajar aqui? 2) Donde te ves en 3 anos? 3) Tienes preguntas para nosotros?",
        hints: [
          "Investiga la empresa antes (productos, cultura, tech stack)",
          "Conecta tus respuestas con tu trayectoria y objetivos",
          "SIEMPRE ten preguntas para el entrevistador - muestra interes"
        ],
        keywords: ["crecer", "aprender", "equipo", "producto", "impacto", "tecnologia", "cultura", "objetivo", "contribuir", "desafio", "pregunta", "proceso"],
        modelAnswer: "1) POR QUE AQUI: He investigado vuestro producto y me impresiona [aspecto especifico]. Mi experiencia construyendo un SaaS completo me ha enseñado a pensar en producto, no solo en codigo. Quiero aplicar eso en un equipo donde pueda tener impacto real y aprender de developers mas experimentados. Ademas, vuestro stack (React + TypeScript + Node) es exactamente donde tengo mi fortaleza y donde quiero profundizar.\n\n2) EN 3 ANOS: Quiero ser un senior developer que no solo escriba buen codigo sino que influya en decisiones de arquitectura y mentorice a juniors. Me gustaria haber contribuido a features significativas del producto y haber crecido tanto tecnicamente (profundizar en system design, testing, performance) como en soft skills (liderazgo tecnico, comunicacion con producto).\n\n3) MIS PREGUNTAS: - Como es el proceso de onboarding para un developer nuevo? - Cual es el mayor desafio tecnico que tiene el equipo ahora mismo? - Como es un sprint tipico? Que balance hay entre features nuevas y deuda tecnica? - Que oportunidades hay de aprendizaje y crecimiento? - Como es la cultura de code review?"
      },
      {
        id: "m4",
        title: "Live Coding: Autocomplete",
        type: "code",
        difficulty: "hard",
        desc: "SIMULACRO FINAL: Crea un componente de autocompletado con debounce, navegacion por teclado y seleccion.",
        starter: `function App() {
  // SIMULACRO FINAL - Live Coding (30 min)
  // Crea un Autocomplete que:
  // 1. Input de busqueda
  // 2. Lista de sugerencias filtradas (case insensitive)
  // 3. Debounce de 300ms (no filtrar en cada keystroke)
  // 4. Navegacion con flechas arriba/abajo + Enter para seleccionar
  // 5. Click en sugerencia la selecciona
  // 6. Muestra el item seleccionado

  const fruits = [
    "Manzana", "Banana", "Cereza", "Durazno", "Fresa",
    "Granada", "Higo", "Kiwi", "Limon", "Mango",
    "Naranja", "Papaya", "Sandia", "Uva", "Melon"
  ];

  return (
    <div>
      <h3>Autocomplete</h3>
      <p>Implementa el componente completo</p>
    </div>
  );
}`,
        solution: `function App() {
  const fruits = [
    "Manzana", "Banana", "Cereza", "Durazno", "Fresa",
    "Granada", "Higo", "Kiwi", "Limon", "Mango",
    "Naranja", "Papaya", "Sandia", "Uva", "Melon"
  ];

  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [selected, setSelected] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedInput(input), 300);
    return () => clearTimeout(timer);
  }, [input]);

  const suggestions = debouncedInput.length > 0
    ? fruits.filter(f => f.toLowerCase().includes(debouncedInput.toLowerCase()))
    : [];

  const handleSelect = (item) => {
    setSelected(item);
    setInput(item);
    setOpen(false);
    setActiveIdx(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      handleSelect(suggestions[activeIdx]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div style={{maxWidth:'400px'}}>
      <h3>Autocomplete</h3>
      <div style={{position:'relative'}}>
        <input
          value={input}
          onChange={e => { setInput(e.target.value); setOpen(true); setSelected(null); setActiveIdx(-1); }}
          onKeyDown={handleKeyDown}
          onFocus={() => input && setOpen(true)}
          placeholder="Buscar fruta..."
          style={{width:'100%',padding:'10px',borderRadius:'8px',border:'1px solid #444',background:'#1a1a2e',color:'white',fontSize:'14px'}}
        />
        {open && suggestions.length > 0 && (
          <ul className="suggestions" style={{position:'absolute',top:'100%',left:0,right:0,background:'#1a1a2e',border:'1px solid #333',borderRadius:'0 0 8px 8px',listStyle:'none',padding:0,margin:0,maxHeight:'200px',overflow:'auto',zIndex:10}}>
            {suggestions.map((s, i) => (
              <li key={s} onClick={() => handleSelect(s)}
                style={{padding:'10px',cursor:'pointer',background: i === activeIdx ? '#2a2a4e' : 'transparent',borderBottom:'1px solid #222'}}>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selected && (
        <div className="selected" style={{marginTop:'16px',padding:'12px',background:'#1a2e1a',borderRadius:'8px',border:'1px solid #2d5a2d'}}>
          Seleccionado: <strong>{selected}</strong>
        </div>
      )}
    </div>
  );
}`,
        check: `(function(el) {
  const input = el.querySelector('input');
  if (!input) return 'Falta el input de busqueda';
  return true;
})`,
        hints: [
          "Debounce: useEffect con setTimeout de 300ms que actualiza debouncedInput",
          "Filtrado: fruits.filter(f => f.toLowerCase().includes(debouncedInput.toLowerCase()))",
          "Teclado: onKeyDown handler que maneja ArrowUp, ArrowDown, Enter, Escape"
        ]
      }
    ]
  }
];

// Daily challenges
export const dailyChallenges: Exercise[] = [
  {
    id: "daily_1",
    title: "Reto Diario: FizzBuzz React",
    type: "code",
    desc: "Renderiza FizzBuzz del 1 al 30 con colores diferentes para Fizz, Buzz y FizzBuzz.",
    starter: `function App() {
  // Genera numeros del 1 al 30
  // Si es divisible por 3: muestra "Fizz" en verde
  // Si es divisible por 5: muestra "Buzz" en azul
  // Si es divisible por ambos: muestra "FizzBuzz" en morado
  // Si no: muestra el numero

  return (
    <div>
      <h3>FizzBuzz</h3>
      <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
        {/* Tu codigo aqui */}
      </div>
    </div>
  );
}`,
    solution: `function App() {
  const items = Array.from({length: 30}, (_, i) => {
    const n = i + 1;
    const fizz = n % 3 === 0;
    const buzz = n % 5 === 0;
    if (fizz && buzz) return { text: "FizzBuzz", color: "#a855f7" };
    if (fizz) return { text: "Fizz", color: "#22c55e" };
    if (buzz) return { text: "Buzz", color: "#3b82f6" };
    return { text: String(n), color: "#888" };
  });

  return (
    <div>
      <h3>FizzBuzz</h3>
      <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
        {items.map((item, i) => (
          <div key={i} style={{
            padding:'8px 12px',borderRadius:'6px',
            background:'#1a1a2e',color:item.color,
            fontWeight: item.text.length > 2 ? 'bold' : 'normal',
            minWidth:'44px',textAlign:'center',fontSize:'13px'
          }}>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}`,
    check: `(function(el) {
  const text = el.textContent;
  if (text.includes('FizzBuzz') && text.includes('Fizz') && text.includes('Buzz')) return true;
  return 'Debe mostrar Fizz, Buzz y FizzBuzz';
})`
  }
];
