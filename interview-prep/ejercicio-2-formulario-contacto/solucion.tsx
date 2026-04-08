// =============================================
// NO ABRAS ESTE ARCHIVO HASTA HABERLO INTENTADO
// AL MENOS 3 VECES POR TU CUENTA
// =============================================

import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = { name: "", email: "", message: "" };

    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!form.email.includes("@") || !form.email.includes(".")) {
      newErrors.email = "El email no tiene formato valido";
    }

    if (!form.message.trim()) {
      newErrors.message = "El mensaje es obligatorio";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    return newErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    // Si algun campo tiene error, no enviar
    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    if (hasErrors) return;

    // Exito
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
    setErrors({ name: "", email: "", message: "" });
  }

  const isDisabled = !form.name && !form.email && !form.message;

  return (
    <div>
      <h1>Contacto</h1>

      {success && <p style={{ color: "green" }}>Mensaje enviado con exito</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Mensaje</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
          />
          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        </div>

        <button type="submit" disabled={isDisabled}>
          Enviar
        </button>
      </form>
    </div>
  );
}
