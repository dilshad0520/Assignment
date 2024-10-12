import React from "react";

const ComponentForm = ({
  type,
  placeholder,
  id,
  value,
  name,
  handleChange,
}) => {
  return (
    <>
      <div className=" px-4">
        <div className="">
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            value={value}
            name={name}
            onChange={handleChange}
            className="w-full h-[45px] mb-5 text-xs border-none bg-[rgb(165,240,253)] px-2.5 rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default ComponentForm;
