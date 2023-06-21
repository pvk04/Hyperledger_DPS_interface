import Spinner from "react-bootstrap/Spinner";

function Loader({ variant, size }) {
  return (
    <Spinner
      animation="border"
      role="status"
      variant={variant}
      style={{ display: "flex", margin: "auto" }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;
