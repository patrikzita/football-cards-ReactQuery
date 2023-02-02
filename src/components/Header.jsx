import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <Navbar>
      <Nav className="p-3">
        <Nav.Link to="/" as={NavLink}>
          Home
        </Nav.Link>
        <Nav.Link to="/players" as={NavLink}>
          Players
        </Nav.Link>
        <Nav.Link to="/clubs" as={NavLink}>
          Clubs
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
