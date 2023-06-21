import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { AppContext } from "../../contexts/context";
import userService from "../../services/userService";
import Loader from "../../components/Loader/Loader";
import CreatePenalty from "../../components/CreatePenalty/CreatePenalty";

export default function PenaltysPage() {
  const [{ login, isDPS, activity }, dispatch] = useContext(AppContext);
  const [penaltys, setPenaltys] = useState();

  useEffect(() => {
    async function getData() {
      const user = await userService.getUsers();

      setPenaltys(user[login].penaltys);
      console.log(user[login].penaltys);
    }
    getData();
  }, [activity]);

  async function payPenalty() {
    console.log(123);
  }

  if (!penaltys) {
    return <Loader />;
  }

  return (
    <div style={{ maxHeight: "300px", overflowX: "auto" }}>
      {isDPS && <CreatePenalty />}
      {penaltys.length > 0 && (
        <Card.Text>
          <strong>Мои штрафы:</strong>
        </Card.Text>
      )}
      {penaltys.map(({ date, status }, index) => (
        <Card key={index} style={{ marginBottom: "10px" }}>
          <Card.Header>
            Дата: {new Date(date).getDate()}.
            {new Date(date).getMonth() < 9
              ? "0" + (new Date(date).getMonth() + 1)
              : new Date(date).getMonth() + 1}
            .{new Date(date).getUTCFullYear()}
          </Card.Header>
          <Card.Body>
            {status ? (
              <Card.Text style={{ color: "green" }}>Оплачен</Card.Text>
            ) : (
              <Button onClick={payPenalty}>Оплатить</Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
