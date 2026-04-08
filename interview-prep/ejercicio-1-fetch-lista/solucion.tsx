// =============================================
// NO ABRAS ESTE ARCHIVO HASTA HABERLO INTENTADO
// AL MENOS 3 VECES POR TU CUENTA
// =============================================

import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar usuarios: {error}</p>;

  return (
    <div>
      <h1>Usuarios</h1>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>{filtered.length} usuarios encontrados</p>

      <ul>
        {filtered.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
