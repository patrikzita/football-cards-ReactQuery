import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createClub } from "../../api/players";

export function ClubForm() {
  const nameRef = useRef(null);
  const countryRef = useRef(null);
  const stadiumRef = useRef(null);
  const capacityRef = useRef(null);
  const websiteRef = useRef(null);

  const createClubMutation = useMutation({
    mutationFn: createClub,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createClubMutation.mutate({
      name: nameRef.current.value,
      country: countryRef.current.value,
      stadium: stadiumRef.current.value,
      capacity: capacityRef.current.value,
      website: websiteRef.current.value,
    });
  };
  return (
    <>
      <h1>Create Club</h1>
      <Form className="m-3" onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control ref={nameRef} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control ref={countryRef} required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="capacity">
                <Form.Label>Capacity</Form.Label>
                <Form.Control ref={capacityRef} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control ref={websiteRef} required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="stadium">
                <Form.Label>Stadium</Form.Label>
                <Form.Control ref={stadiumRef} required />
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
      </Form>
    </>
  );
}
