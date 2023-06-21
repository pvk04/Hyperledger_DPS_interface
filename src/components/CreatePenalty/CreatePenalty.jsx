import { useContext, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import userService from "../../services/userService";
import { AppContext } from "../../contexts/context";
import Loader from "../Loader/Loader";

export default function CreatePenalty() {
  const [{ login }, dispatch] = useContext(AppContext);
  const [license, setLicense] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleInput(e) {
    const value = e.target.value;
    if ("0123456789".includes(value.slice(-1))) {
      setLicense(value);
    }
  }

  async function makePenalty(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await userService.makePenalty(login, license);
      if (Object.keys(response).length && !response.error) {
        setLicense("");
        alert("Штраф успешно выписан");
        dispatch({ type: "SET_ACTIVITY" });
      } else {
        alert(
          "Ошибка. Возможно это удостоверение не зарегистрировано или допущена синтаксическая ошибка."
        );
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  return (
    <Card style={{ marginBottom: "10px" }}>
      <Form onSubmit={makePenalty}>
        <Form.Group>
          <Card.Header>
            <Form.Label>Выписать штраф</Form.Label>
          </Card.Header>
          <Card.Body>
            {!isLoading ? (
              <Form.Control
                value={license}
                onChange={handleInput}
                maxLength="3"
                placeholder="Номер удостоверения"
              />
            ) : (
              <Loader />
            )}
          </Card.Body>
        </Form.Group>
        <Card.Footer>
          <Button disabled={isLoading} type="submit">
            Выписать
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
}
