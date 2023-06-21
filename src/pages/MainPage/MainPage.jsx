import { Card } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "../ProfilePage/ProfilePage";
import PenaltysPage from "../PenaltysPage/PenaltysPage";
import NavBar from "../../components/NavBar/NavBar";
import CarsPage from "../CarsPage/CarsPage";

export default function MainPage() {
  return (
    <Card style={{ margin: "auto" }}>
      <Card.Header>
        <NavBar />
      </Card.Header>
      <Card.Body>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/penaltys" element={<PenaltysPage />} />
          <Route path="/cars" element={<CarsPage />} />
        </Routes>
      </Card.Body>
    </Card>
  );
}
