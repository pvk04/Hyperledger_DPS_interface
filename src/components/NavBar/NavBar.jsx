import { useContext, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/context";

export default function NavBar() {
  const [{ isDPS, penaltys, licenseNumber, activity }, dispatch] =
    useContext(AppContext);

  useEffect(() => {
    
  }, [activity]);

  const NavElements = [
    { name: "Профиль", href: "/profile", visibility: true },
    {
      name: "Штрафы",
      href: "/penaltys",
      visibility: isDPS || penaltys.length > 0,
    },
    { name: "Машины", href: "/cars", visibility: licenseNumber != "" },
  ];

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ДПС
        </Navbar.Brand>
        <Nav className="me-auto">
          {NavElements.map(({ name, href, visibility }, index) => {
            if (visibility) {
              return (
                <Nav.Link key={index} as={Link} to={href}>
                  {name}
                </Nav.Link>
              );
            }
          })}
        </Nav>
      </Container>
    </Navbar>
  );
}
