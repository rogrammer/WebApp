import React, { useEffect, useState } from "react";
import { AddUserTable } from "./Components/AddUserTable";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [formData, setFormData] = useState({
    registerNo: "",
    name: "",
    surname: "",
    management: "Software",
  });
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [registerValid, setRegisterValid] = useState(false);
  const [show, setShow] = useState(false);
  const [body, setBody] = useState("");
  const [header, setHeader] = useState("");
  const [update, setUpdate] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // Show table content when page opened
  useEffect(() => {
    viewTable();
  }, []);

  useEffect(() => {
    setRegisterValid(
      Object.values({ ...formData }).every((field) => field !== "")
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limit the input to 6 characters for number type
    if (name === "registerNo" && value.length > 6) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const theUserExist = data.some(
      (data) => parseInt(data.registerNo) === parseInt(formData.registerNo)
    );
    if (update) {
      await fetch("http://localhost:8080/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        if (!response.ok) {
          console.log("Error occured!");
        }
        setUpdate(false);
      });

      console.log("Form data submitted:", formData);
    } else {
      if (theUserExist) {
        setHeader("Error Occur");
        setBody("We already have this user!");
        setShow(true);
      } else {
        await fetch("http://localhost:8080/user/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }).then((response) => {
          if (!response.ok) {
            console.log("Error occured!");
          }
        });

        console.log("Form data submitted:", formData);
      }
    }

    viewTable();
    cleanHandeler();
  };

  const viewTable = async () => {
    const respose = await fetch("http://localhost:8080/user/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const d = await respose.json();
    console.log(d);
    setData(d);
  };

  function getDataHandler(data) {
    setFormData(data);
    setUpdate(true);
  }

  async function deleteHandeler() {
    const response = await fetch(
      "http://localhost:8080/user/" + formData.registerNo,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      await fetch("http://localhost:8080/user/delete/" + formData.registerNo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => viewTable());
    } else {
      setHeader("Error Occur");
      setBody("The user didn't exist!");
      setShow(true);
    }

    cleanHandeler();
    setUpdate(false);
    setConfirm(false);
  }

  function cleanHandeler() {
    setFormData({
      registerNo: "",
      name: "",
      surname: "",
      management: "Software",
    });
    setUpdate(false);
  }

  return (
    <div className="register-page">
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={confirm}>
        <Modal.Body>Are you sure to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteHandeler}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => setConfirm(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <h2>User Registration</h2>
      <FontAwesomeIcon
        icon={faCircleXmark}
        color="red"
        className="adduser-close fa-2x"
        onClick={() => navigate("/")}
      />
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <div>
            <label htmlFor="registerNo">Register No:</label>
            <br />
            <input
              type="number"
              id="registerNo"
              name="registerNo"
              value={formData.registerNo}
              onChange={handleChange}
              disabled={update}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="surname">Surname:</label>
            <br />
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </form>
      <div className="button-group">
        <button
          onClick={handleSubmit}
          className="submit-button"
          disabled={!registerValid}
        >
          {update ? "Update" : "Register"}
        </button>
        <button onClick={cleanHandeler} className="clean-button">
          Clean
        </button>
        <button
          onClick={() => {
            setConfirm(true);
          }}
          className="delete-button"
          disabled={!update}
        >
          Delete
        </button>
      </div>
      <div className="add-user-table">
        {data ? <AddUserTable data={data} getdata={getDataHandler} /> : ""}
      </div>
    </div>
  );
}

export default AddUser;
