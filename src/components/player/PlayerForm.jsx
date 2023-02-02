import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { createPlayer, getClubs } from "../../api/players";

export function PlayerForm({
  name = "",
  number = "",
  position = "",
  country = "",
  club = "",
  image = "",
}) {
  const nameRef = useRef(null);
  const numberRef = useRef(null);
  const positionRef = useRef(null);
  const countryRef = useRef(null);
  const clubRef = useRef(null);
  const imageRef = useRef(null);

  const [doesntExist, setDoesntExist] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* TODO: Vytvořit on succes a zároveň, když nebude klub existovat v databázi, tak aby ho uživatel vytvořil */
  const createPlayerMutation = useMutation({
    mutationFn: createPlayer,
    onSuccess: (data) => {
      // uložení výsledku do lokálního cache
      queryClient.setQueryData(["players", data.id], data);
      // Obnovení dat z Cache
      queryClient.invalidateQueries(["players"], { exact: true });
      navigate(`/players/${data.id}`);
    },
  });

  const clubsQuery = useQuery({
    queryKey: ["clubs"],
    queryFn: getClubs,
  });

  const getClubId = (name) => {
    const club = clubsQuery?.data?.find((club) => club.name == name);
    if (club) {
      return club.id;
    }
    return undefined;
  };
  const handleSubmit = (e) => {
    /* stránka se nerefreshne*/
    e.preventDefault();
    const clubId = getClubId(clubRef.current.value);
    if (clubId) {
      createPlayerMutation.mutate({
        name: nameRef.current.value,
        number: numberRef.current.value,
        position: positionRef.current.value,
        country: countryRef.current.value,
        clubId: clubId,
        image: imageRef.current.value,
      });
      /* Vrátí o jednu stránku zpět */
      navigate(-1);
    } else {
      setDoesntExist(true);
    }
  };
  return (
    <>
      <h1 className="m-3">Create Player</h1>
      <Form className="m-3" onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control ref={nameRef} required defaultValue={name} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="number">
                <Form.Label>Number</Form.Label>
                <Form.Control ref={numberRef} required defaultValue={number} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="position">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  ref={positionRef}
                  required
                  defaultValue={position}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  ref={countryRef}
                  required
                  defaultValue={country}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="club">
                <Form.Label>Club</Form.Label>
                <Form.Control
                  ref={clubRef}
                  required
                  className={doesntExist ? "bg-danger" : ""}
                  defaultValue={club}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control ref={imageRef} required defaultValue={image} />
              </Form.Group>
            </Col>
          </Row>
          <Stack direction="horizontal" gap={3} className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
        {doesntExist && (
          <>
            <h3>
              Club "{clubRef.current.value}" doesn´t exist in database. Try
              Again!
            </h3>
            <Link to="/clubs/new">
              <Button>Create Club</Button>
            </Link>
          </>
        )}
      </Form>
    </>
  );
}
