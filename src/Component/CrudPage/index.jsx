import React, { useEffect, useState } from "react";
import axios from "axios";
import Formvalidation from "../FormValidation";

const Crudpage = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [inputData, setinputData] = useState({
    name: "",
    email: "",
    number: "",
    username: "",
    address: "",
    companyname: "",
    website: "",
  });

  const getData = async () => {
    const url = "https://656894a69927836bd975143f.mockapi.io/users";
    try {
      let response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const postData = async () => {
    setModal(true);
  };

  const editBtn = (id) => {
    const saveData = data.find((item) => item.id === id);
    if (saveData) {
      setinputData({
        name: saveData.name,
        email: saveData.email,
        number: saveData.phone,
        username: saveData.username,
        address: saveData.address,
        companyname: saveData.company,
        website: saveData.website,
        id: id,
      });
    }
    setModal(true);
  };

  const deleteBtn = async (id) => {
    try {
      await fetch(`https://656894a69927836bd975143f.mockapi.io/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log("Error during deletion:", error);
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <div className="container max-w-7xl mx-auto p-4 relative">
        {modal && (
          <div
            className="absolute top-0 right-0 w-full h-full bg-black opacity-20"
            onClick={closeModal}
          ></div>
        )}

        <div className="absolute top-[18%] left-[33%]">
          {modal && (
            <Formvalidation
              closeModal={closeModal}
              getData={getData}
              defaultData={inputData}
            />
          )}
        </div>

        <button
          onClick={postData}
          className="border-2 border-cyan-600 py-2 px-8 mb-6 w-full rounded-md bg-cyan-200 hover:bg-cyan-300 transition-all"
        >
          Add
        </button>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead className="hidden md:table-header-group">
              <tr className="bg-cyan-100">
                <th className="border-2 border-cyan-600 p-2">ID</th>
                <th className="border-2 border-cyan-600 p-2">Name</th>
                <th className="border-2 border-cyan-600 p-2">Email</th>
                <th className="border-2 border-cyan-600 p-2">Phone</th>
                <th className="border-2 border-cyan-600 p-2">username</th>

                <th className="border-2 border-cyan-600 p-2">Address</th>
                <th className="border-2 border-cyan-600 p-2">Companyname</th>
                <th className="border-2 border-cyan-600 p-2">website</th>

                <th className="border-2 border-cyan-600 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr
                  key={item.id}
                  className="md:table-row border-b md:border-none"
                >
                  <td className="block md:table-cell p-2 border-2 md:border-cyan-600 text-left md:text-center">
                    <span className="md:hidden font-bold">ID: </span>
                    {item.id}
                  </td>
                  <td className="block md:table-cell p-2 border-2 md:border-cyan-600 text-left md:text-center">
                    <span className="md:hidden font-bold">Name: </span>
                    {item.name}
                  </td>
                  <td className="block md:table-cell p-2 border-2 md:border-cyan-600 text-left md:text-center">
                    <span className="md:hidden font-bold">Email: </span>
                    {item.email}
                  </td>
                  <td className="block md:table-cell p-2 border-2 md:border-cyan-600 text-left md:text-center">
                    <span className="md:hidden font-bold">Phone: </span>
                    {item.phone}
                  </td>
                  <td className="block md:table-cell p-2 border-2 md:border-cyan-600 text-left md:text-center">
                    <span className="md:hidden font-bold">username: </span>
                    {item.username}
                  </td>
                  <td className="block md:table-cell p-2 border-2 md:border-cyan-600 text-left md:text-center">
                    <span className="md:hidden font-bold">Address: </span>
                    {item.address}
                  </td>
                  <td className="block md:table-cell p-2 border-2 md:border-cyan-600 text-left md:text-center">
                    <span className="md:hidden font-bold">company: </span>
                    {item.company}
                  </td>
                  <td className="block md:table-cell p-2 border-2 md:border-cyan-600 text-left md:text-center">
                    <span className="md:hidden font-bold">website: </span>
                    {item.website}
                  </td>
                  <td className="block md:table-cell p-2 border-2 md:border-cyan-600 text-left md:text-center">
                    <button
                      onClick={() => editBtn(item.id)}
                      className="border-2 border-cyan-600 py-1 px-4 mr-2 bg-cyan-200 hover:bg-cyan-300 rounded-md transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBtn(item.id)}
                      className="border-2 border-cyan-600 py-1 px-4 bg-cyan-400 hover:bg-[#13eedf] rounded-md transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Crudpage;
