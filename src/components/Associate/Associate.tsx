import { Button, Col, Row } from "react-bootstrap";
import { useAssociateContext } from "../../contexts/AssociateContexts";
import { useNavigate } from "react-router-dom";

type AssociateProps = {
  name: string;
  cpf: string;
  birthDate: string;
  phoneNumber: string;
  active: boolean;
  id: string;
};

function Associate({
  id,
  name,
  cpf,
  birthDate,
  phoneNumber,
  active,
}: AssociateProps) {
  const { deleteAssociate } = useAssociateContext();
  const history = useNavigate();

  const handleDelete = (id: string) => {
    deleteAssociate(id);
  };

  const handleEdit = (id: string) => {
    history(`/associates/${id}`);
  };

  const formatDateToBR = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <Row className="mb-3 align-items-center border-bottom pb-3">
      <Col xs={12} md={3}>
        {name}
      </Col>
      <Col xs={12} md={2}>
        {cpf}
      </Col>
      <Col xs={12} md={2}>
        {formatDateToBR(birthDate)}
      </Col>
      <Col xs={12} md={2}>
        {phoneNumber}
      </Col>
      <Col xs={12} md={2}>
        {active ? "Ativo" : "Inativo"}
      </Col>
      <Col xs={12} md={1} className="d-flex justify-content-end">
        <Button
          variant="success"
          onClick={() => handleEdit(id)}
          className="me-2"
        >
          Editar
        </Button>
        <Button variant="danger" onClick={() => handleDelete(id)}>
          Excluir
        </Button>
      </Col>
    </Row>
  );
}

export default Associate;
