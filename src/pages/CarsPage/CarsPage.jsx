import { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import CreateCar from "../../components/CreateCar/CreateCar";
import Loader from "../../components/Loader/Loader";
import { AppContext } from "../../contexts/context";
import userService from "../../services/userService";

export default function CarsPage() {
  const [{ login, isDPS, activity }, dispatch] = useContext(AppContext);
  const [cars, setCars] = useState();

  useEffect(() => {
    async function getData() {
      const user = await userService.getUsers();

      setCars(user[login].cars);
    }
    getData();
  }, [activity]);

  if (!cars) {
    return <Loader />;
  }

  return (
    <div style={{ maxHeight: "300px", overflowX: "auto" }}>
      <CreateCar />
      {cars.length > 0 && (
        <Card.Text>
          <strong>Мои машины: </strong>
        </Card.Text>
      )}
      {cars.map(({ category, price, term }, index) => (
        <Card key={index} style={{ marginBottom: "10px" }}>
          <Card.Header>Машина №{index + 1}</Card.Header>
          <Card.Body>
            <Card.Text>Категория: {category}</Card.Text>
            <Card.Text>Рыночная стоимость: {price} PROFI</Card.Text>
            <Card.Text>Срок эксплуатации (лет): {term}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
