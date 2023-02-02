import { Route, Routes } from "react-router-dom";
import { ClubForm } from "./components/clubs/ClubForm";
import { Header } from "./components/Header";
import { EditPlayer } from "./components/player/EditPlayer";
import { PlayerDetail } from "./components/player/PlayerDetail";
import { PlayerForm } from "./components/player/PlayerForm";
import { ClubsPage } from "./pages/clubsPage";
import { Home } from "./pages/home";
import { PlayersPage } from "./pages/playersPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/players/:id" element={<PlayerDetail />} />
        <Route path="/players/:id/edit" element={<EditPlayer />} />
        <Route path="/players/new" element={<PlayerForm />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/clubs/new" element={<ClubForm />} />
      </Routes>
    </>
  );
}

export default App;
