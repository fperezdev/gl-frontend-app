import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useStore from "../../store";
import { API_BASE_URL } from "../../lib/consts";

const Login = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUserInfo = useStore((state) => state.setUserInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
    setError(null);
  };

  const handleLogin = async () => {
    if (user === "") {
      setError("El usuario no puede estar vacío");
      return;
    }

    setLoading(true);

    // Se obtiene un usuario ya existente, de lo contrario se crea uno nuevo
    // Solo pide el nombre de usuario por ahora
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre_usuario: user }),
    });

    if (response.status >= 200 && response.status < 300) {
      const userInfo = await response.json();
      setUserInfo(userInfo);
    } else {
      setError("Error al intentar iniciar sesión");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        width: 300,
        margin: "150px auto 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Login</Typography>
      <div style={{ width: 300, height: 80, marginTop: 60, marginBottom: 10 }}>
        <TextField
          id="login-user"
          label="Nombre usuario"
          helperText={error}
          variant="outlined"
          sx={{ width: "100%" }}
          error={!!error}
          value={user}
          onChange={handleChange}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        sx={{ width: 150 }}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </Button>
    </div>
  );
};

export default Login;
