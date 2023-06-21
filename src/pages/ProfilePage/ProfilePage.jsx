import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/context";
import userService from "../../services/userService";
import { Card } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import AddLicense from "../../components/AddLicense/AddLicense";

export default function ProfilePage() {
  const [{ login, activity }, dispatch] = useContext(AppContext);
  const [user, setUser] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const user = await userService.getUsers();

        setUser(user[login]);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, [activity]);

  if (!user) {
    return <Loader />;
  }
  return (
    <>
      <Card.Text>Логин: {login}</Card.Text>
      <Card.Text>ФИО: {user.fio}</Card.Text>
      <Card.Text>Баланс: {user.balance} PROFI</Card.Text>
      {user.isDPS && (
        <Card.Text style={{ color: "green" }}>Сотрудник ДПС</Card.Text>
      )}
      <Card.Text>
        Стаж (лет): {new Date().getFullYear() - user.yearBegin}
      </Card.Text>
      <Card.Text>
        Количество неоплаченных штрафов: {user.unpaidPenaltys}
      </Card.Text>
      <Card.Text>Количество машин: {user.cars.length}</Card.Text>
      {user.licenseNumber != "" ? (
        <Card.Text>
          Номер водительского удостоверения: {user.licenseNumber}
        </Card.Text>
      ) : (
        <AddLicense />
      )}
    </>
  );
}
