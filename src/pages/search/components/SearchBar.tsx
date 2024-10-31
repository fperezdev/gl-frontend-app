import { IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import useStore from "../../../store";
import { ArtistInfo } from "../../../lib/types";
import { API_BASE_URL } from "../../../lib/consts";

const SearchBar = () => {
  const userInfo = useStore((state) => state.userInfo);
  const artistsInfoCache = useStore((state) => state.artistsInfoCache);
  const setArtistInfoCache = useStore((state) => state.setArtistInfoCache);
  const setArtistInfo = useStore((state) => state.setArtistInfo);
  const setLoading = useStore((state) => state.setLoadingArtistInfo);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSearchQuery(e.target.value);
  };

  // Se buscan las canciones de un artista en específico
  // Se guarda en caché para no repetir la misma petición
  // Sería mejor usar React Query para esto
  const handleSearch = async () => {
    if (searchQuery === "") {
      setError("La búsqueda no puede estar vacía");
      return;
    }

    setLoading(true);

    if (artistsInfoCache[searchQuery]) {
      setArtistInfo(artistsInfoCache[searchQuery]);
    } else {
      const url = new URL(`${API_BASE_URL}/search_tracks?name=${searchQuery}`);

      const response = await fetch(url, {
        headers: { authorization: userInfo?.usuario || "" },
      });

      if (response.status < 200 || response.status >= 300) {
        if (response.status === 404) setError("No se encontró el artista");
        else setError("Ocurrió un error al buscar el artista");
        setArtistInfo(null);
        setLoading(false);
        return;
      }

      const data: ArtistInfo = await response.json();

      setArtistInfoCache(searchQuery, data);
      setArtistInfo(data);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        width: "fit-content",
        height: 50,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        id="artist-search"
        label="Buscar canciones por artista"
        variant="standard"
        helperText={error}
        error={!!error}
        value={searchQuery}
        onChange={handleChange}
        sx={{ width: 300 }}
      />
      <IconButton
        aria-label="search"
        onClick={handleSearch}
        sx={{
          position: "absolute",
          right: -45,
          bottom: 0,
        }}
      >
        <Search color={error ? "error" : "primary"} />
      </IconButton>
    </div>
  );
};

export default SearchBar;
