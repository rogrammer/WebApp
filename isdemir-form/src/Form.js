import { useEffect, useState } from "react";
import logo from "./isdemir-logo.jpg";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ViewTables } from "./Components/ViewTables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Form() {
  const [formData, setFormData] = useState({
    id: null,
    registerNo: "",
    week: "",
    startDate: "",
    endDate: "",
    thisWeek: "",
    nextWeek: "",
  });
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [body, setBody] = useState("");
  const [header, setHeader] = useState("");
  const [viewdata, setViewData] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [userData, setUserData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [saveValid, setSaveValid] = useState();
  const [confirm, setConfirm] = useState(false);

  useEffect(() => getAllUsers, []);
  useEffect(() => {
    setSaveValid(Object.values({ ...formData }).every((field) => field !== ""));
  }, [formData]);

  async function getAllUsers() {
    const respose = await fetch("http://localhost:8080/user/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const d = await respose.json();
    console.log(d);
    if (d.length === 0) {
      setIsEmpty(true);
    }
    setUserData(d);
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function cleanForm() {
    document.getElementById("registerNo").value = "all";
    setFormData({
      registerNo: "",
      week: "",
      startDate: "",
      endDate: "",
      thisWeek: "",
      nextWeek: "",
    });
    setUpdate(false);
  }

  async function deleteForm() {
    await fetch("http://localhost:8080/reports/delete/" + formData.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        setHeader("Error Occur");
        setBody("The report didn't exist!");
        setShow(true);
      }
    });
    handleViewReports();
    cleanForm();
    setConfirm(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    await fetch("http://localhost:8080/" + formData.registerNo + "/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.status === 409) {
        showPopup(
          "Error Occur",
          "The week " + formData.week + " is already added into Database!"
        );
      } else if (!response.ok) {
        showPopup("Error Occur", "Ooops! You enter something wrong!");
      } else {
        showPopup("Success", "Report submited!");
        handleViewReports();
      }
    });

    cleanForm();
  };

  const handleViewReports = async () => {
    // Handle view reports logic here
    console.log("Viewing all reports");

    try {
      const response = await fetch(
        "http://localhost:8080/" + parseInt(formData.registerNo) + "/reports"
      );
      if (!response.ok) {
        console.log("We can't get reports tables from API!");
      }
      const d = await response.json();
      console.log(d);

      if (d.length !== 0) setViewData(d);
    } catch (error) {
      console.error("There was an error fetching the report data!", error);
    }
  };

  function conpleteWeek() {
    const startDateValue = document.getElementById("startDate").value;
    const weekNumber = getWeekOfYear(new Date(startDateValue));
    setFormData({
      ...formData,
      week: weekNumber + "",
    });
    document.getElementById("week").value = weekNumber;
  }

  function getDataHandler(data) {
    setFormData({
      id: data.id,
      registerNo: data.user.registerNo,
      week: data.week,
      startDate: data.startDate,
      endDate: data.endDate,
      thisWeek: data.thisWeek,
      nextWeek: data.nextWeek,
    });
    setUpdate(true);
    document.getElementById("registerNo").value = data.user.registerNo;
  }

  function getWeekOfYear(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;

    // Get the ISO week number
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  function showPopup(header, body) {
    setBody(body);
    setHeader(header);
    setShow(true);
  }

  return (
    <>
      {isEmpty ? (
        <div className="dropbox-empty">
          <h2>Firstly add User to the System!</h2>
        </div>
      ) : (
        <div className="app">
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
              <Button variant="primary" onClick={deleteForm}>
                Yes
              </Button>
              <Button variant="secondary" onClick={() => setConfirm(false)}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="form-container">
            <h2>
              <img src={logo} alt="Logo" className="logo" />
              <p>WEEKLY REPORT SYSTEM</p>
            </h2>
            <FontAwesomeIcon
              icon={faCircleXmark}
              color="red"
              className="form-close fa-2x"
              onClick={() => navigate("/")}
            />
            <form id="employeeForm" onSubmit={handleSubmit}>
              <select
                className="top"
                name="registerNo"
                id="registerNo"
                defaultValue="all"
                disabled={update}
                onChange={handleChange}
                onBlur={(e) =>
                  e.target.value !== "all" ? handleViewReports() : ""
                }
              >
                <option value="all" disabled>
                  Select User
                </option>
                {userData ? (
                  userData.map((user) => (
                    <option key={user.registerNo} value={user.registerNo}>
                      {user.registerNo + " - " + user.name + " " + user.surname}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <input
                className="top"
                placeholder="Start Date"
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  e.target.type = "text";
                  conpleteWeek();
                }}
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />

              <input
                className="top"
                placeholder="End Date"
                type="text"
                disabled={!formData.startDate}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate}
                max={
                  formData.startDate
                    ? new Date(
                        new Date(formData.startDate).setDate(
                          new Date(formData.startDate).getDate() + 7
                        )
                      )
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                required
              />

              <input
                className="top"
                placeholder="Week Of The Year"
                type="text"
                id="week"
                name="week"
                value={formData.week}
                onChange={handleChange}
                required
                disabled
              />
              <br />

              <textarea
                className="bottom"
                placeholder="This Week's Work"
                id="thisWeek"
                name="thisWeek"
                rows="4"
                value={formData.thisWeek}
                onChange={handleChange}
                spellCheck={true}
                required
              ></textarea>
              <br />

              <textarea
                className="bottom"
                placeholder="Next Week's Work"
                id="nextWeek"
                name="nextWeek"
                rows="4"
                value={formData.nextWeek}
                onChange={handleChange}
                spellCheck={true}
                required
              ></textarea>
              <br />
            </form>
            <div className="button-container">
              <button
                className="submit-button"
                disabled={!saveValid}
                onClick={handleSubmit}
              >
                {update ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  document.getElementById("registerNo").value = "all";
                  setViewData(null);
                  cleanForm();
                }}
                className="clean-button"
              >
                Clean
              </button>
              <button
                className="delete-button"
                disabled={!update}
                onClick={() => setConfirm(true)}
              >
                Delete
              </button>
            </div>
            <div className="view">
              {viewdata !== null ? (
                <ViewTables
                  data={viewdata.sort(
                    (a, b) => parseInt(a.week) - parseInt(b.week)
                  )}
                  getData={getDataHandler}
                />
              ) : (
                "Data can not found."
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;
