 // @ts-nocheck
import { Button, Card, Container } from "react-bootstrap";
import Associate from "../../components/Associate/Associate";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useAssociateContext } from "../../contexts/AssociateContexts";

function AssociatesList() {
  const { associates } = useAssociateContext();

  return (
    <Container>
      <Card>
        <Header />
        <Card.Body>
          {!associates || associates.length === 0 ? (
            <div className="text-center my-5">
              <p>Não há nenhum associado cadastrado</p>
            </div>
          ) : (
            <>
              {associates.map((associate) =>
                associate.phones.map((phone) => (
                  <Associate
                    key={associate.id}
                    name={associate.name}
                    cpf={associate.cpf}
                    birthDate={associate.birthDate}
                    phoneNumber={phone.phoneNumber}
                    active={associate.isActive}
                    id={associate.id}
                  />
                ))
              )}
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
