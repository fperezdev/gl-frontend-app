import useStore from "../store";
import { Avatar, Paper, Tooltip, Typography } from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import logo from "../assets/logo.png";
import { pink } from "@mui/material/colors";

const Header = () => {
  const userInfo = useStore((state) => state.userInfo);
  const setUserInfo = useStore((state) => state.setUserInfo);
  const handleLogout = () => {
    setUserInfo(null);
  };
  return (
    <Paper
      elevation={0}
      sx={{
        height: 70,
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        columnGap: "25px",
      }}
    >
      <img src={logo} width={50} height={50} alt="logo" />
      <Typography variant="h5">GL App</Typography>
      <div style={{ marginLeft: "auto" }}>
        {userInfo ? (
          <Tooltip title="Cerrar sesión" arrow>
            <Avatar
              onClick={handleLogout}
              sx={{ bgcolor: pink[500], cursor: "pointer" }}
            >
              {userInfo.usuario[0].toUpperCase()}
            </Avatar>
          </Tooltip>
        ) : (
          <Avatar sx={{ bgcolor: pink[500] }}>
            <PersonIcon />
          </Avatar>
        )}
      </div>
    </Paper>
  );
};

export default Header;
