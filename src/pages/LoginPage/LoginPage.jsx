import React, { useContext, useState } from "react";
import { Card, InputGroup, Button, Form } from "react-bootstrap";
import userService from "../../services/userService";
import { AppContext } from "../../contexts/context";
import Loader from "../../components/Loader/Loader";

export default function LoginPage() {
  const [{}, dispatch] = useContext(AppContext);
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLogging(true);
      const payload = await userService.login(loginValue, passwordValue);

      if (payload.erorr) {
        alert("Ошибка. Проверьте правильность ввода логина и пароля.");
        setPasswordValue("");
        return setIsLogging(false);
      }

      payload.login = loginValue;
      await dispatch({ type: "SET_USER", payload });
      setLoginValue("");
      setPasswordValue("");
      console.log(payload);
    } catch (e) {
      console.log(e);
    }
    setIsLogging(false);
  }

  if (isLogging) {
    return (
      <div style={{ width: "30%", margin: "auto" }}>
        <Loader variant={"light"} />
      </div>
    );
  }
  return (
    <Card
      style={{
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Card.Header>Авторизация</Card.Header>
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Логин</InputGroup.Text>
            <Form.Control
              placeholder="Введите логин"
              value={loginValue}
              onChange={(e) => {
                setLoginValue(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Пароль</InputGroup.Text>
            <Form.Control
              placeholder="Введите пароль"
              type="password"
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value);
              }}
            />
          </InputGroup>
        </Card.Body>
        <Card.Footer>
          <Button type="submit">Войти</Button>
        </Card.Footer>
      </Form>
    </Card>
  );
}
