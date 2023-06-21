import { useContext } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./contexts/context";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  const [{ login }, dispatch] = useContext(AppContext);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={login ? <MainPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={login ? <Navigate to="/" /> : <LoginPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
