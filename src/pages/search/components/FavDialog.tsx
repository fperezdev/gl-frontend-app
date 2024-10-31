import { Button, Dialog, DialogTitle } from "@mui/material";
import useStore from "../../../store";
import { API_BASE_URL } from "../../../lib/consts";

const FavDialog = () => {
  const artistInfo = useStore((state) => state.artistInfo);
  const userInfo = useStore((state) => state.userInfo);
  const setUserInfo = useStore((state) => state.setUserInfo);
  const favDialogSongId = useStore((state) => state.favDialogSongId);
  const setFavDialogSongId = useStore((state) => state.setFavDialogSongId);

  // Se obtiene la canción que se va a agregar a favoritos
  const song = artistInfo?.canciones.find(
    (song) => song.cancion_id === favDialogSongId
  );

  // Guardar la nueva canción favorita, primero se refleja en la UI,
  // si la respuesta del servicio es negativa se revierte la acción
  const handleFavoriteClick = async (rank: number) => {
    if (!userInfo || !song) return;
    const currentUserInfo = { ...userInfo };
    const ranking = `${rank}/5`;
    const newFav = { cancion_id: song.cancion_id, ranking };
    const newUserInfo = {
      ...userInfo,
      favoritos: [...userInfo.favoritos, newFav],
    };
    setUserInfo(newUserInfo);

    const requestBody = {
      nombre_banda: song.nombre_banda,
      nombre_cancion: song.nombre_tema,
      cancion_id: song.cancion_id,
      usuario: userInfo.usuario,
      ranking,
    };

    setFavDialogSongId(null);

    const response = await fetch(`${API_BASE_URL}/favoritos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: userInfo.usuario,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status < 200 || response.status >= 300)
      setUserInfo(currentUserInfo);
  };

  return (
    <Dialog
      onClose={() => setFavDialogSongId(null)}
      open={favDialogSongId !== null}
    >
      <DialogTitle>{`Dale una calificación a tu nuevo favorito "${song?.nombre_tema}"`}</DialogTitle>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          paddingBottom: 30,
        }}
      >
        {[1, 2, 3, 4, 5].map((rank) => (
          <Button
            key={`fav-rank-${rank}`}
            variant="contained"
            onClick={() => handleFavoriteClick(rank)}
          >
            {rank}
          </Button>
        ))}
      </div>
    </Dialog>
  );
};

export default FavDialog;
