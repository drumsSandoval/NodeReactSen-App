import React from "react";

const Alert = ({ msg }) => {
  return (
    <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
      {msg}
    </div>
  );
};

export default Alert;
