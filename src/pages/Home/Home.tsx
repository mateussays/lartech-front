import { Card, Container } from "react-bootstrap";
import AssoctiateForm from "../../components/AssociateForm/AssociateForm";
import Header from "../../components/Header/Header";

function Home() {
  return (
    <Container>
      <Card>
        <Header />
        <AssoctiateForm />
      </Card>
    </Container>
  );
}

export default Home;
