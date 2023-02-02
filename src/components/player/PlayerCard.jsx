import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function PlayerCard({ id, image, name, position, country }) {
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Img
        variant="top"
        src={image}
        style={{ height: "100%", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <h5>
          Position: <span>{position}</span>
        </h5>
        <h5>
          Country: <span>{country}</span>
        </h5>
        <Button variant="primary" onClick={() => navigate(`/players/${id}`)}>
          More Details
        </Button>
      </Card.Body>
    </Card>
  );
}
