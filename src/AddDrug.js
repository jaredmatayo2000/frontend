import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "./API";

const AddLand = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [landId, setLandId] = useState(null);
  const [landLocation, setLandLocation] = useState(null);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    refreshLands();
  }, []);

  const refreshLands = () => {
    API.get("/")
      .then((res) => {
        setLands(res.data);
        setTitle(res[0].name)
        setDescription(res[0].description)
        setPrice(res[0].price)
        setLandId(res[0].id)
        setLandLocation(res[0].location)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { title, description, price };
    API.post("/", item).then(() => refreshLands());
  };

  const onUpdate = (id) => {
    let item = { title };
    API.patch(`/${id}/`, item).then((res) => refreshLands());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshLands());
  };

  function selectLand(id) {
    let item = lands.filter((land) => land.id === id)[0];
    setTitle(item.title);
    setDescription(item.description);
    setPrice(item.price);
    setLandId(item.id);
    setLandLocation(item.location);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new land</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{landId}Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Land title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                  <Form.Group className="mb-3" controlId="formBasicStarring">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Land Location"
                value={location}
                onChange={(e) => setLandLocation(e.target.value)}
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
                onClick={() => onUpdate(landId)}
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
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                  <th scope="col">Location</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {lands.map((land, index) => {
                return (
                  <tr key="">
                    <th scope="row">{land.id}</th>
                    <td> {land.title}</td>
                    <td>{land.description}</td>
                    <td>{land.price}</td>
                    <td>{land.location}</td>
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectLand(land.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(land.id)}
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

export default AddLand;
