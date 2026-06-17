import { useEffect, useState } from "react";
import { obtenerusuarios } from "../services/api";

function useUsuarios() {

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const usuariosData = await obtenerusuarios();

        setUsuarios(usuariosData);

      } catch (error) {

        setError(error.message);

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, []);

  return {
    usuarios,
    setUsuarios,
    loading,
    error,
    setError,
  };
}

export default useUsuarios;