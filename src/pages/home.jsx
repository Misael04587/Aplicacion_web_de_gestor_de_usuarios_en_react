import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="app-shell">
      <section className="loading-panel">
        <h1>Home</h1>
        <p className="loading-copy">
          Bienvenido a la aplicacion. Usa la navegacion para entrar a Usuarios.
        </p>

        <button onClick={() => navigate("/usuarios")}>
          Ir a Usuarios
        </button>

        <button 
          className = "action-button "
          onClick={() => navigate(-1)}>
          Volver atras
        </button>
      </section>
    </main>
  );
}

export default Home;
