import { useContext, useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import Loader from "../Loader/Loader";
import userService from "../../services/userService";
import { AppContext } from "../../contexts/context";

export default function CreateCar() {
  const [{ login }, dispatch] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [term, setTerm] = useState("");

  async function addCar(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await userService.addCar(login, category, price, term);
      console.log(response);
      if (Object.keys(response).length && !response.error) {
        setCategory("");
        setPrice("");
        setTerm("");
        alert("Машина успешно зарегистрирована");
        dispatch({ type: "SET_ACTIVITY" });
      } else {
        alert("Ошибка. Проверьте правильность введенных данных");
        response.error && alert(response.error);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  function handleSetCategory(e) {
    if ("ABC".includes(e.target.value.toUpperCase())) {
      setCategory(e.target.value.toUpperCase());
    }
  }

  function handleSetNumbers(e, type) {
    const value = e.target.value;
    console.log(value.slice(-1));
    if ("0123456789".includes(value.slice(-1))) {
      if (type == "price") {
        setPrice(value);
      }
      if (type == "term") {
        setTerm(value);
      }
    }
  }

  return (
    <Card style={{ marginBottom: "10px" }}>
      <Form onSubmit={addCar}>
        <Form.Group>
          <Card.Header>
            <Form.Label>Зарегистрировать машину</Form.Label>
          </Card.Header>
          <Card.Body>
            {!isLoading ? (
              <>
                <Form.Control
                  style={{ marginBottom: "5px" }}
                  maxLength="1"
                  placeholder="Категория машины"
                  value={category}
                  onChange={handleSetCategory}
                />
                <Form.Control
                  style={{ marginBottom: "5px" }}
                  placeholder="Рыночная стоимость машины"
                  value={price}
                  onChange={(e) => {
                    handleSetNumbers(e, "price");
                  }}
                />
                <Form.Control
                  placeholder="Срок эксплуатации (лет)"
                  value={term}
                  onChange={(e) => {
                    handleSetNumbers(e, "term");
                  }}
                />
              </>
            ) : (
              <Loader />
            )}
          </Card.Body>
        </Form.Group>
        <Card.Footer>
          <Button disabled={isLoading} type="submit">
            Добавить машину
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
}
