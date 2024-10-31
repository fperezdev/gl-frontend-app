import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";

const Search = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SearchBar />
      <SongList />
    </div>
  );
};

export default Search;
