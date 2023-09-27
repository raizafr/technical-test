"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
function formatNumberWithCommas(number) {
  return number.toLocaleString();
}

export default function Home() {
  const [allData, setAllData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/services");
      setAllData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:5000/services/${id}`
      );
      console.log(response);
      getData();
      toast("Delete success");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center md:p-24">
      <ToastContainer />
      <div className="overflow-x-auto">
        <div className="flex justify-end ">
          <Link href={"/create"} className="btn btn-primary">
            Add Data
          </Link>
        </div>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((data, i) => (
              <tr key={i}>
                <th>{data.id}</th>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td>
                  {data.currency} {formatNumberWithCommas(data.price)}
                </td>
                <td className="flex justify-center gap-2">
                  <Link
                    href={`/edit/${data.id}`}
                    className="bg-yellow-500 text-white px-2 rounded py-1 hover:bg-yellow-400 duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white px-2 rounded py-1 hover:bg-red-400 duration-200"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
