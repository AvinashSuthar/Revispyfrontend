import React from "react";

const Box = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-[90vh] mb-10">
      <div className="border rounded-xl p-10">
        {children}
      </div>
    </div>
  );
};
export default Box;
