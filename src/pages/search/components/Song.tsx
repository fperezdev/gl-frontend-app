import { pink } from "@mui/material/colors";
import { Song as SongType, UserInfo } from "../../../lib/types";
import { Tooltip, Typography } from "@mui/material";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";
import useStore from "../../../store";
import { API_BASE_URL } from "../../../lib/consts";

interface SongProps {
  song: SongType;
  userInfo: UserInfo | null;
  sm: boolean;
}

const Song = ({ song, userInfo, sm }: SongProps) => {
  const setUserInfo = useStore((state) => state.setUserInfo);
  const setFavDialogSongId = useStore((state) => state.setFavDialogSongId);

  // Obtener el ranking de la canción en favoritos si es que está
  const favRank = userInfo?.favoritos?.find(
    (fav) => fav.cancion_id === song.cancion_id
  )?.ranking;

  // Eliminar la canción de favoritos, primero se refleja en la UI,
  // si la respuesta del servicio es negativa se revierte la acción
  const handleUnfav = async () => {
    if (!userInfo) return;
    const currentFavs = [...userInfo.favoritos];
    const newFavs = [...currentFavs];
    const index = newFavs.findIndex(
      (fav) => fav.cancion_id === song.cancion_id
    );
    if (index === -1) return;
    newFavs.splice(index, 1);
    setUserInfo({ ...userInfo, favoritos: newFavs });

    const requestBody = {
      cancion_id: song.cancion_id,
      usuario: userInfo.usuario,
    };

    setFavDialogSongId(null);

    const response = await fetch(`${API_BASE_URL}/favoritos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: userInfo.usuario,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status < 200 || response.status >= 300)
      setUserInfo({ ...userInfo, favoritos: currentFavs });
  };

  return (
    <div
      key={song.cancion_id}
      style={{
        width: sm ? 320 : 450,
        height: 120,
        position: "relative",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        border: `2px solid ${pink[300]}`,
        borderRadius: 5,
        textAlign: "left",
        gap: "10px",
        overflow: "hidden",
      }}
    >
      <img src={song.img} alt={song.nombre_tema} width={100} height={100} />

      <div>
        <Typography
          variant="body1"
          fontWeight={600}
          maxWidth={350}
          noWrap
          textOverflow="ellipsis"
        >
          {song.nombre_tema}
        </Typography>
        <Typography
          variant="body2"
          maxWidth={350}
          noWrap
          textOverflow="ellipsis"
        >
          {`Album "${song.nombre_album}"`}
        </Typography>
        <Typography variant="body2">{`Precio ${song.precio.valor} ${song.precio.moneda}`}</Typography>
        <Typography variant="body2">
          {`Lanzado ${new Date(song.fecha_lanzamiento).toLocaleDateString()}`}
        </Typography>
        <div style={{ display: "flex" }}>
          <a href={song.preview_url}>
            <Typography variant="body2">Descargar Preview</Typography>
          </a>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 15,
            cursor: "pointer",
          }}
        >
          {favRank ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2">{favRank}</Typography>
              <Tooltip title="Quitar de favoritos">
                <StarIcon
                  fontSize="large"
                  color="primary"
                  onClick={handleUnfav}
                />
              </Tooltip>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <Tooltip title="Agrear a favoritos">
                <StarBorderIcon
                  fontSize="large"
                  onClick={() => setFavDialogSongId(song.cancion_id)}
                />
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Song;
