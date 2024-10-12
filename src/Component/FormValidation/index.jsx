import React, { useState } from "react";
import ComponentForm from "../ComponentForm";
import { RxCross2 } from "react-icons/rx";

const Formvalidation = ({ closeModal, getData, defaultData }) => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    number: "",
    username: "",
    address: "",
    companyname: "",
    website: "",
    ...defaultData,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const formSubmit = () => {
    let validationErrors = {};
    if (!formDetails.name || formDetails.name.length < 3) {
      validationErrors.name =
        "Name is required and must be at least 3 characters long.";
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formDetails.email || !emailPattern.test(formDetails.email)) {
      validationErrors.email =
        "Email is required and must be in a valid format (e.g., example@domain.com).";
    }
    const phonePattern = /^\+?\d{10,15}$/;
    if (!formDetails.number || !phonePattern.test(formDetails.number)) {
      validationErrors.phone =
        "Phone number is required and must be valid (e.g.,1234565456).";
    }
    if (!formDetails.username || formDetails.username.length < 3) {
      validationErrors.username =
        "Username is required and must be at least 3 characters long.";
    }

    if (!formDetails.address) {
      validationErrors.address =
        "Street and city are required for the address.";
    }
    if (formDetails.companyname && formDetails.companyname.length < 3) {
      validationErrors.companyname =
        "Company name, if provided, must be at least 3 characters long.";
    }

    if (!formDetails.website) {
      validationErrors.website = "Website is required.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    } else {
      setErrors({});
      if (!defaultData.id) {
        fetch("https://656894a69927836bd975143f.mockapi.io/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDetails),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            alert("Form submitted successfully!");
            getData();
            closeModal();
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("There was an error submitting the form.");
          });
      } else {
        fetch(
          `https://656894a69927836bd975143f.mockapi.io/users/${defaultData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDetails),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            alert("Form updated successfully!");
            getData();
            closeModal();
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("There was an error updating the form.");
          });
      }
    }
  };

  const closeFormModal = () => {
    closeModal();
  };

  return (
    <>
      <div className="container max-w-full md:max-w-[1140px] m-auto text-center p-4 relative">
        <div className="w-full md:w-[400px] mx-auto">
          <div className="w-full bg-[#379eb9] text-center rounded-lg shadow-lg p-6 relative ">
            <button
              className="p-1 my-2 absolute right-2 top-2"
              onClick={closeFormModal}
            >
              <RxCross2 />
            </button>
            <h2 className="text-lg md:text-xl text-blue-800 mb-4">
              Form Validation
            </h2>
            <ComponentForm
              type="name"
              placeholder="Name"
              name="name"
              value={formDetails.name || ""}
              handleChange={handleChange}
              className="mb-4 w-full p-2 rounded border"
            />
            {errors.name && (
              <p className="text-cyan-300 text-xs">{errors.name}</p>
            )}
            <ComponentForm
              type="email"
              placeholder="Email"
              name="email"
              value={formDetails.email || ""}
              handleChange={handleChange}
              className="mb-4 w-full p-2 rounded border"
            />
            {errors.email && (
              <p className="text-cyan-300 text-xs">{errors.email}</p>
            )}

            {/* Phone Number Input */}
            <ComponentForm
              type="number"
              placeholder="Phone Number"
              name="number"
              value={formDetails.number || ""}
              handleChange={handleChange}
              className="mb-4 w-full p-2 rounded border"
            />
            {errors.phone && (
              <p className="text-cyan-300 text-xs">{errors.phone}</p>
            )}

            {/* Username Input */}
            <ComponentForm
              type="text"
              placeholder="Username"
              name="username"
              value={formDetails.username || ""}
              handleChange={handleChange}
              className="mb-4 w-full p-2 rounded border"
            />
            {errors.username && (
              <p className="text-cyan-300 text-xs">{errors.username}</p>
            )}

            {/* Address Input */}
            <ComponentForm
              type="text"
              placeholder="Address"
              name="address"
              value={formDetails.address || ""}
              handleChange={handleChange}
              className="mb-4 w-full p-2 rounded border"
            />
            {errors.address && (
              <p className="text-cyan-300 text-xs">{errors.address}</p>
            )}

            {/* Company Name Input */}
            <ComponentForm
              type="text"
              placeholder="Company Name"
              name="companyname"
              value={formDetails.companyname || ""}
              handleChange={handleChange}
              className="mb-4 w-full p-2 rounded border"
            />
            {errors.companyname && (
              <p className="text-cyan-300 text-xs">{errors.companyname}</p>
            )}

            {/* Website Input */}
            <ComponentForm
              type="text"
              placeholder="Website"
              name="website"
              value={formDetails.website || ""}
              handleChange={handleChange}
              className="mb-4 w-full p-2 rounded border"
            />
            {errors.website && (
              <p className="text-cyan-300 text-xs">{errors.website}</p>
            )}

            {/* Submit Button */}
            <div className="text-sm text-black">
              <button
                onClick={formSubmit}
                className="bg-cyan-400 text-base py-2 px-8 rounded hover:bg-sky-400 transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Formvalidation;
