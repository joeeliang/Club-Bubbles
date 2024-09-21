import { useState } from 'react'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="tw-bg-gradient-to-r tw-from-zinc-700 tw-to-zinc-950 tw-min-h-screen tw-w-screen">
          <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
              <Container>
                  <Navbar.Brand href="#home">Club club</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                          <Nav.Link href="#home">Home</Nav.Link>
                          <Nav.Link href="#link">Elsewhere</Nav.Link>
                          <NavDropdown title="down" id="basic-nav-dropdown">
                              <NavDropdown.Item href="#action/3.1">Somewhere</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.2">
                                  Over
                              </NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.3">The</NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item href="#action/3.4">
                                  Rainbow
                              </NavDropdown.Item>
                          </NavDropdown>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
      </div>
  )
}

export default App
