import { useQuery } from "@tanstack/react-query";
import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPlayers } from "../api/players";
import { PlayerCard } from "../components/player/PlayerCard";

export function PlayersPage() {
  const playersQuery = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  if (playersQuery.status === "loading") return <h1>Loading...</h1>;
  if (playersQuery.status === "error") {
    return <h1>{JSON.stringify(playersQuery.error)}</h1>;
  }
  return (
    <>
      <article>
        <Stack direction="horizontal" className="justify-content-between">
          <h1>All players</h1>
          <Link to="/players/new">
            <Button>Create</Button>
          </Link>
        </Stack>
        <div className="player-layout">
          {playersQuery.data.map((player) => (
            <PlayerCard
              key={player.id}
              id={player.id}
              image={player.image}
              name={player.name}
              position={player.position}
              country={player.country}
            />
          ))}
        </div>
      </article>
    </>
  );
}
