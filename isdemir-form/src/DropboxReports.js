import React, { useEffect, useState } from "react";
import DropboxComp from "./Components/DropboxComp";
import { AllReports } from "./Components/AllReports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const DropboxReports = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [dic, setDic] = useState(null);
  const [value, setValue] = useState("all");
  const [divContent, setDiv] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    async function getReports() {
      console.log("getReports worked!");

      try {
        const response = await fetch("http://localhost:8080/reports", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const d = await response.json();
        const da = d.reduce((acc, current) => {
          if (!acc[current.user.registerNo]) {
            acc[current.user.registerNo] = [];
          }

          acc[current.user.registerNo].push(current);

          return acc;
        }, {});
        setDic(da);
        const dat = Object.entries(da);
        console.log(dat);
        setData(dat);

        if (dat.length === 0) {
          setIsEmpty(true);
        }
      } catch (error) {
        console.error("There was an error fetching the report data!", error);
      }
    }

    getReports();
  }, []);

  function handleFindButton() {
    if (value !== "all") {
      setDiv(
        <DropboxComp
          report={dic[value].sort(
            (a, b) => parseInt(a.week) - parseInt(b.week)
          )}
        />
      );
    } else {
      setDiv(<AllReports data={data} />);
    }
  }

  return (
    <div className="report">
      {isEmpty ? (
        <div className="dropbox-empty">
          <h2>Firstly add Report to the System!</h2>
        </div>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faCircleXmark}
            color="red"
            className="dropbox-close fa-xl"
            onClick={() => navigate("/")}
          />
          <div className="selectUser">
            <select
              className="user-dropdown"
              onChange={(e) => setValue(e.target.value)}
            >
              <option value="all">Select User</option>
              {data ? (
                data.map(([ident, reports]) => (
                  <option key={ident} value={ident}>
                    {reports[0].user.registerNo +
                      " - " +
                      reports[0].user.name +
                      " " +
                      reports[0].user.surname}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
            <button onClick={handleFindButton}>Find</button>
          </div>
          <div className="dropdown-container">{divContent}</div>
        </>
      )}
    </div>
  );
};

export default DropboxReports;
