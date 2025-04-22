import React, { useState } from "react";
import DropboxComp from "./DropboxComp";

export const AllReports = ({ data }) => {
  const [expandedUserId, setExpandedUserId] = useState(null);

  const toggleUserDetails = (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null);
    } else {
      setExpandedUserId(userId);
    }
  };
  return data.map(([ident, reports]) => (
    <div key={ident} className="user-item">
      <div className="user-name" onClick={() => toggleUserDetails(ident)}>
        {reports[0].user.registerNo +
          " - " +
          reports[0].user.name +
          " " +
          reports[0].user.surname}
      </div>
      {expandedUserId === ident && (
        <DropboxComp
          report={reports.sort((a, b) => parseInt(a.week) - parseInt(b.week))}
        />
      )}
    </div>
  ));
};
