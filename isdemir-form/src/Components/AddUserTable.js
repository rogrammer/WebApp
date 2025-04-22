import React from "react";

export const AddUserTable = ({ data, getdata }) => {
  function clickHandle(index) {
    console.log(data[index]);
    getdata(data[index]);
  }
  return (
    <div className="user-table">
      <table>
        <thead>
          <tr>
            <th>Register No</th>
            <th>Name</th>
            <th>Surname</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr onClick={() => clickHandle(index)} key={index}>
                <td>{item.registerNo}</td>
                <td>{item.name}</td>
                <td>{item.surname}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
