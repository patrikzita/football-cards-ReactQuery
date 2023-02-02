import { useQuery } from "@tanstack/react-query";
import { Button, Spinner, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getClubs } from "../api/players";
import { ClubCard } from "../components/ClubCard";

export function ClubsPage() {
  const clubsQuery = useQuery({
    queryKey: ["clubs"],
    queryFn: getClubs,
  });
  if (clubsQuery.status === "loading")
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  return (
    <>
      <div className="clubs-container">
        <Stack direction="horizontal" className="justify-content-between">
          <h1>All CLUBS</h1>
          {/* Možnost vytvoření klubu */}
          <Link to="/clubs/new">
            <Button>Create</Button>
          </Link>
        </Stack>
        <div className="clubs-layout">
          {clubsQuery.data.map((club) => (
            <ClubCard key={club.id} {...club} />
          ))}
        </div>
      </div>
    </>
  );
}
