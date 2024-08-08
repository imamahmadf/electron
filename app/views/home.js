import React, { useState, useEffect } from "react";
import Api from "../helpers/api";
import { Button, Card, Dropdown } from "react-bootstrap";

const Home = () => {
  const [name, setName] = useState("Bob");

  useEffect(() => {
    // Do something when loaded
  }, []);

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    Api.getThing().then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="container text-center">
      <h2>Name: {name}</h2>

      <form className="search" onSubmit={handleSearch}>
        <input onChange={handleInput} type="search" placeholder="Search" />
        <Button type="submit" className="btn">
          Search
        </Button>
      </form>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Welcome to Home</Card.Title>
          <Card.Text>
            This is a simple card component using React Bootstrap.
          </Card.Text>
        </Card.Body>
      </Card>

      <Dropdown className="mt-3">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Pilih Opsi
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Opsi 1</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Opsi 2</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Opsi 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="bg-test" />
      <img src="assets/apple-icon.png" width="100" alt="Black box" />
      <h1>tessssss woooooiiiiii</h1>
    </div>
  );
};

export default Home;
