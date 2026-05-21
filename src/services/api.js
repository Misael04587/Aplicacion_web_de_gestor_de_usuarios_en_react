const API_URL = "https://jsonplaceholder.typicode.com/users";
const REQUEST_TIMEOUT_MS = 8000;

const FALLBACK_USERS = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "leanne@example.com",
    phone: "809-555-0101",
    address: { city: "Santo Domingo" },
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "ervin@example.com",
    phone: "809-555-0102",
    address: { city: "Santiago" },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    email: "clementine@example.com",
    phone: "809-555-0103",
    address: { city: "La Vega" },
  },
];

const cloneUsers = (users) =>
  users.map((user) => ({
    ...user,
    address: { ...user.address },
  }));

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

export const obtenerusuarios = async () => {
  try {
    const response = await fetchWithTimeout(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }

    return response.json();
  } catch {
    return cloneUsers(FALLBACK_USERS);
  }
};

export const actualizarUsuario = async (id, datosActualizados) => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/${id}`, {
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
  } catch {
    return {
      id,
      ...datosActualizados,
    };
  }
};

export const eliminarusuario = async (id) => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar usuario");
    }

    return response.json();
  } catch {
    return { id, deleted: true };
  }
};

export const crearUsuario = async (nuevoUsuario) => {
  try {
    const response = await fetchWithTimeout(API_URL, {
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
  } catch {
    return {
      id: Date.now(),
      ...nuevoUsuario,
    };
  }
};
