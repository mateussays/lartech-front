import { Button, Card, Container, Row } from "react-bootstrap";
import Associate from "../../components/Associate/Associate";
import { useAssociateContext } from "../../contexts/AssociateContexts";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

function AssociatesList() {
  const { associates } = useAssociateContext();
  return (
    <Container>
      <Card>
        <Header />
        <Card.Body>
          {associates.length === 0 ? (
            <div className="text-center my-5">
              <p>Não há nenhum associado cadastrado</p>
            </div>
          ) : (
            <>
              {associates.map((associate) => (
                <Associate
                  key={associate.id}
                  name={associate.name}
                  cpf={associate.cpf}
                  birthDate={associate.birthDate}
                  phoneNumber={associate.phoneNumber}
                  active={associate.active}
                  id={associate.id}
                />
              ))}
            </>
          )}
          <div className="text-end">
            <Link to="/">
              <Button variant="primary">Voltar</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AssociatesList;
