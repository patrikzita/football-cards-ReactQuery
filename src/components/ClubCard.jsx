import { Card } from "react-bootstrap";

export function ClubCard({ name, country, stadium, capacity }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ fontSize: "2rem" }}>{name}</Card.Title>
        <h5>
          Country: <span>{country}</span>
        </h5>
        <h5>
          Stadium: <span>{stadium}</span>
        </h5>
        <h5>
          Capacity: <span>{capacity}</span>
        </h5>
      </Card.Body>
    </Card>
  );
}
