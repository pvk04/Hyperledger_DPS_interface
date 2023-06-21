import { useContext, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import userService from "../../services/userService";
import { AppContext } from "../../contexts/context";

export default function AddLicense() {
  const [{ login }, dispatch] = useContext(AppContext);
  const [license, setLicense] = useState("");
  const [category, setCategory] = useState("");
  const [term, setTerm] = useState("");

  async function addLicense(e) {
    e.preventDefault();
    try {
      const response = await userService.addLicense(
        login,
        license,
        term,
        category
      );

      if (Object.keys(response).length && !response.error) {
        alert("Удостоверение добавлено успешно");
        dispatch({ type: "SET_ACTIVITY" });
      } else {
        alert("Ошибка. Проверьте правильность введенных данных");
        response.error && alert(response.error);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Card>
      <Form onSubmit={addLicense}>
        <Card.Header>Добавить удостоверени</Card.Header>
        <Card.Body>
          <Form.Control
            style={{ marginBottom: "5px" }}
            placeholder="Номер удостоверения"
            value={license}
            onChange={(e) => {
              setLicense(e.target.value);
            }}
          />
          <Form.Control
            style={{ marginBottom: "5px" }}
            placeholder="Категория"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <Form.Control
            placeholder="Срок окончания"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
        </Card.Body>
        <Card.Footer>
          <Button type="submit">Применить</Button>
        </Card.Footer>
      </Form>
    </Card>
  );
}
