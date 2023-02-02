import { useQuery } from "@tanstack/react-query";
import { getPlayerLimit } from "../api/players";
import { PlayerCard } from "../components/player/PlayerCard";

export function Home() {
  const playersQuery = useQuery({
    queryKey: ["players"],
    queryFn: () => getPlayerLimit(5),
  });

  if (playersQuery.status === "loading") return <h1>Loading...</h1>;
  if (playersQuery.status === "error") {
    return <h1>{JSON.stringify(playersQuery.error)}</h1>;
  }

  return (
    <>
      <main>
        <h1>Just 5 players from database</h1>
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
      </main>
    </>
  );
}
