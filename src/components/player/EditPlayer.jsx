import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPlayer } from "../../api/players";
import { PlayerForm } from "./PlayerForm";

export function EditPlayer() {
  const { id } = useParams();
  const playerQuery = useQuery({
    queryKey: ["players", id],
    queryFn: () => getPlayer(id),
  });

  if (playerQuery.status === "loading") return <h1>Loading...</h1>;

  return (
    <>
      <h1 className="m-3">Edit Player</h1>
      <PlayerForm
        name={playerQuery.data.name}
        number={playerQuery.data.number}
        position={playerQuery.data.position}
        country={playerQuery.data.country}
        club={playerQuery.data.clubId}
        image={playerQuery.data.image}
      />
    </>
  );
}
