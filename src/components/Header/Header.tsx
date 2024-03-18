import { Card, Col, Image, Row } from "react-bootstrap";
import Logo from "../../assets/logo.png";

function Header() {
  return (
    <Card.Header className="bg-white">
      <Row className="mt-4 mb-4">
        <Col sm={2}>
          <Image src={Logo} alt="logo" style={{ width: "50px" }} />
        </Col>
        <Col sm={10} className="d-flex align-items-center">
          <h5 className="mb-0">Cadastro rápido de associados</h5>
        </Col>
      </Row>
    </Card.Header>
  );
}

export default Header;
