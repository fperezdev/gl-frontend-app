import { create } from "zustand";
import { ArtistInfo, UserInfo } from "./lib/types";

interface AppState {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
  artistsInfoCache: { [key: string]: ArtistInfo };
  setArtistInfoCache: (query: string, artistInfo: ArtistInfo) => void;
  artistInfo: ArtistInfo | null;
  setArtistInfo: (artistInfo: ArtistInfo | null) => void;
  loadingArtistInfo: boolean;
  setLoadingArtistInfo: (loading: boolean) => void;
  favDialogSongId: number | null;
  setFavDialogSongId: (songId: number | null) => void;
}

const useStore = create<AppState>()((set) => ({
  userInfo: null,
  setUserInfo: (newUserInfo: UserInfo | null) => set({ userInfo: newUserInfo }),
  artistsInfoCache: {},
  setArtistInfoCache: (query: string, artistInfo: ArtistInfo) =>
    set((state) => ({
      artistsInfoCache: {
        ...state.artistsInfoCache,
        [query]: artistInfo,
      },
    })),
  artistInfo: null,
  setArtistInfo: (artistInfo: ArtistInfo | null) => set({ artistInfo }),
  loadingArtistInfo: false,
  setLoadingArtistInfo: (loading: boolean) =>
    set({ loadingArtistInfo: loading }),
  favDialogSongId: null,
  setFavDialogSongId: (songId: number | null) =>
    set({ favDialogSongId: songId }),
}));

export default useStore;
