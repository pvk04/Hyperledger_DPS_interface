import { Button, Card, Form } from "react-bootstrap";

export default function RegistrationPage() {
  return (
    <Card>
      <Form>
        <Card.Header>
          <Card.Text>Регистрация</Card.Text>
        </Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer>
          <Button>Зарегистрироваться</Button>
        </Card.Footer>
      </Form>
    </Card>
  );
}
