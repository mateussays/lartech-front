 // @ts-nocheck
import { useForm } from "react-hook-form";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useAssociateContext } from "../../contexts/AssociateContexts";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAssociateById } from "../../services/lartechapi";

type Associate = {
  name: string;
  cpf: string;
  birthDate: string;
  phoneNumber: string;
  isActive: boolean;
  id: string;
  PhoneNumberType: string;
};

type Event = React.ChangeEvent<HTMLInputElement>;

function AssociateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addAssociate, editAssociate } = useAssociateContext();
  const route = useParams();
  const [associate, setAssociates] = useState({
    id: "",
    name: "",
    cpf: "",
    birthDate: "",
    phoneNumber: "",
    PhoneNumberType: "",
    isActive: false,
  });
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAssociate = async () => {
      const response = await getAssociateById(route.id);

      const getPhoneNumber = response.phones[0].phoneNumber;
      const PhoneNumberType = response.phones[0].phoneNumberType;

      setAssociates({
        id: response.id,
        name: response.name,
        cpf: response.cpf,
        birthDate: response.birthDate,
        phoneNumber: getPhoneNumber,
        PhoneNumberType: PhoneNumberType,
        isActive: response.isActive,
      });
    };

    if (route.id) {
      getAssociate();
    }
  }, [route.id]);

  const clearForm = () => {
    setAssociates({
      id: "",
      name: "",
      cpf: "",
      birthDate: "",
      phoneNumber: "",
      PhoneNumberType: "",
      isActive: false,
    });
  };

  const handleInputChange = (e: Event) => {
    setAssociates({ ...associate, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data: Associate) => {
    const createId = () => Math.random().toString(36).substr(2, 9);

    const newAssociate = {
      id: createId(),
      name: data.name,
      cpf: data.cpf,
      birthDate: data.birthDate,
      phoneNumber: data.phoneNumber,
      PhoneNumberType: data.PhoneNumberType,
      isActive: data.isActive,
    };

    await addAssociate(newAssociate);

    clearForm();
  };

  const handleEdit = (data: Associate) => {
    editAssociate(associate.id, data);
  };

  return (
    <Card.Body>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col xs={12} md={4}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                value={associate.name}
                type="text"
                placeholder="Digite seu nome"
                {...register("name", { required: true })}
                onChange={handleInputChange}
              />
              {errors.name && (
                <span className="text-danger">Campo obrigatório</span>
              )}
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="formBasicCPF">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                value={associate.cpf}
                type="text"
                placeholder="XXX.XXX.XXX-XX"
                {...register("cpf", {
                  required: true,
                  pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                })}
                onChange={handleInputChange}
              />
              {errors.cpf && <span className="text-danger">CPF inválido</span>}
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="formBasicDate">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control
                value={associate.birthDate}
                type="date"
                {...register("birthDate", { required: true })}
                onChange={handleInputChange}
              />
              {errors.birthDate && (
                <span className="text-danger">Campo obrigatório</span>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="PhoneNumber">
              <Form.Label>Número de telefone</Form.Label>
              <Form.Control
                value={associate.phoneNumber}
                type="text"
                placeholder="Digite seu número de telefone"
                {...register("phoneNumber", {
                  required: true,
                  pattern: /^\d{11}$/,
                })}
                onChange={handleInputChange}
              />
              {errors.phoneNumber && (
                <span className="text-danger">Telefone inválido</span>
              )}
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="PhoneNumberType">
              <Form.Label>Tipo de telefone</Form.Label>
              <Form.Select
                aria-label="Selecione o tipo de telefone"
                {...register("PhoneNumberType")}
                value={associate.PhoneNumberType}
                onChange={handleInputChange}
              >
                <option value="1">Celular</option>
                <option value="2">Residencial</option>
                <option value="3">Comercial</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formBasicSwitch" className="mb-3">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Associado ativo"
            {...register("isActive")}
            checked={associate.isActive}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row>
          <Col className="d-flex justify-content-end">
            {route.id ? (
              <Button
                className="btn-success me-2"
                onClick={() => handleEdit(associate)}
              >
                Atualizar
              </Button>
            ) : (
              <Button className="btn-primary me-2" type="submit">
                Cadastrar
              </Button>
            )}
            <Link to="/associates">
              <Button className="btn-secondary">Consultar associados</Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </Card.Body>
  );
}

export default AssociateForm;
