import "./App.css";
import Header from "./components/Header";
import Login from "./pages/login/Login";
import Search from "./pages/search/Search";
import useStore from "./store";

function App() {
  const userInfo = useStore((state) => state.userInfo);

  return (
    <>
      <Header />
      {userInfo?.usuario ? <Search /> : <Login />}
    </>
  );
}

export default App;
