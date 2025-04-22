import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const DropboxComp = ({ report }) => {
  const [show, setShow] = useState(false);
  const [body1, setBody1] = useState("");
  const [header1, setHeader1] = useState("");
  const [body2, setBody2] = useState("");
  const [header2, setHeader2] = useState("");
  const [weekHeader, setWeekHeader] = useState("");

  function clickRow(data) {
    setWeekHeader("Week: " + data.week);
    setHeader1("Practises");
    setBody1(data.thisWeek);
    setHeader2("To Do");
    setBody2(data.nextWeek);
    setShow(true);
  }

  return (
    <div className="user-details">
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{weekHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Header>
          <Modal.Title>{header1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body1}</Modal.Body>
        <Modal.Header>
          <Modal.Title>{header2}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body2}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Practises</th>
            <th>To Do</th>
          </tr>
        </thead>
        <tbody>
          {report.map((data) => {
            const maxLength = 50;
            const truncatedthis =
              data.thisWeek.length > maxLength
                ? data.thisWeek.substring(0, maxLength) + "..."
                : data.thisWeek;
            const truncatednext =
              data.nextWeek.length > maxLength
                ? data.nextWeek.substring(0, maxLength) + "..."
                : data.nextWeek;

            return (
              <tr onClick={() => clickRow(data)} key={data.id}>
                <td>{data.week}</td>
                <td>{data.startDate}</td>
                <td>{data.endDate}</td>
                <td>{truncatedthis}</td>
                <td>{truncatednext}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DropboxComp;
