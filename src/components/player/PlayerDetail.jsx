import { useQuery } from "@tanstack/react-query";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getClub, getPlayer } from "../../api/players";

export function PlayerDetail() {
  const { id } = useParams();
  const playerQuery = useQuery({
    queryKey: ["players", id],
    queryFn: () => getPlayer(id),
  });

  const clubQuery = useQuery({
    queryKey: ["clubs", playerQuery?.data?.clubId],
    enabled: playerQuery?.data?.clubId != null,
    queryFn: () => getClub(playerQuery.data.clubId),
  });

  if (playerQuery.status === "loading") return <h1>Loading...</h1>;
  if (playerQuery.status === "error") {
    return <h1>{JSON.stringify(playerQuery.error)}</h1>;
  }

  return (
    <Container>
      <Row className="align-items-center">
        <Col>
          <h1>{playerQuery.data.name}</h1>
        </Col>
        <Col>
          <Stack gap={2} direction="horizontal">
            <Link to={`/players/${playerQuery.data.id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            src={`../${playerQuery.data.image}`}
            style={{ maxWidth: "30rem" }}
          />
        </Col>
        <Col>
          <Stack>
            <h4 className="info-title">
              Position:{" "}
              <span className="text-body-secondary">
                {playerQuery.data.position}
              </span>
            </h4>
            <h4 className="info-title">
              Country:{" "}
              <span className="text-body-secondary">
                {playerQuery.data.country}
              </span>
            </h4>
            <h4 className="info-title">
              Club:{" "}
              <span>
                {clubQuery.isLoading
                  ? "Club is loading"
                  : clubQuery.isError
                  ? "Error loading club"
                  : clubQuery.data.name}
              </span>
            </h4>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
