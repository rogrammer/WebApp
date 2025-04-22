import React from "react";

export const ViewTables = ({ data, getData }) => {
  function clickHandle(index) {
    console.log(data[index]);
    getData(data[index]);
  }
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Week</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>This Week</th>
            <th>Next Week</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            const maxLength = 70;
            const truncatedthis =
              item.thisWeek.length > maxLength
                ? item.thisWeek.substring(0, maxLength) + "..."
                : item.thisWeek;
            const truncatednext =
              item.nextWeek.length > maxLength
                ? item.nextWeek.substring(0, maxLength) + "..."
                : item.nextWeek;
            return (
              <tr onClick={() => clickHandle(index)} key={index}>
                <td>{item.week}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
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
