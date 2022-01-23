import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "./API";

const AddDrug = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [drugId, setDrugId] = useState(null);
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    refreshDrugs();
  }, []);

  const refreshDrugs = () => {
    API.get("/")
      .then((res) => {
        setDrugs(res.data);
        // setName(res[0].name)
        // setDescription(res[0].description)
        // setPrice(res[0].prrice)
        // setDrugId(res[0].id)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { name, description, price };
    API.post("/", item).then(() => refreshDrugs());
  };

  const onUpdate = (id) => {
    let item = { name };
    API.patch(`/${id}/`, item).then((res) => refreshDrugs());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshDrugs());
  };

  function selectDrug(id) {
    let item = drugs.filter((drug) => drug.id === id)[0];
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setDrugId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new Drug</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{drugId}Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStarring">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(drugId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Drug Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((drug, index) => {
                return (
                  <tr key="">
                    <th scope="row">{drug.id}</th>
                    <td> {drug.name}</td>
                    <td>{drug.description}</td>
                    <td>{drug.price}</td>
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectDrug(drug.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(drug.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddDrug;