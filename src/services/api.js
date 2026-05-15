const API_URL = "https://jsonplaceholder.typicode.com/users";

export const obtenerusuarios = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }

  return response.json();
};

export const actualizarUsuario = async (id, datosActualizados) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosActualizados),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar usuario");
  }

  return response.json();
};

export const eliminarusuario = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar usuario");
  }

  return response.json();
};

export const crearUsuario = async (nuevoUsuario) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoUsuario),
  });

  if (!response.ok) {
    throw new Error("Error al crear usuario");
  }

  return response.json();
};
