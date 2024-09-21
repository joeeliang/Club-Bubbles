import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function NavbarComponent() {
    return (
        <Navbar expand="lg" className="tw-bg-gradient-to-r tw-from-blue-800 tw-to-blue-950 tw-shadow-lg" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Club club</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Elsewhere</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link href="#home">otherHome</Nav.Link>
                        <Nav.Link href="#link">otherElsewhere</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;