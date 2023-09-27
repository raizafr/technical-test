"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Edit({ params }) {
  const [data, setData] = useState({
    name: "",
    description: "",
    currency: "",
    price: "",
  });
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/services/${params.id}`
        );
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/services/${params.id}`, {
        name: data.name,
        description: data.description,
        currency: data.currency,
        price: parseFloat(data.price),
      });
      router.push("/");
      toast("Update success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center md:p-24">
      <h1 className="text-3xl font-semibold">Edit Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          <input
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="description">
            <span className="label-text">Description</span>
          </label>
          <input
            onChange={(e) => setData({ ...data, description: e.target.value })}
            value={data.description}
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="currency">
            <span className="label-text">Currency</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            id="currency"
            name="currency"
            onChange={(e) => setData({ ...data, currency: e.target.value })}
            value={data.currency}
          >
            <option value={"IDR"}>IDR</option>
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="price">
            <span className="label-text">Price</span>
          </label>
          <input
            onChange={(e) => setData({ ...data, price: e.target.value })}
            value={data.price}
            type="number"
            id="price"
            placeholder="price"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="flex justify-between mt-4">
          <Link href={"/"} className="btn btn-secondary">
            Back to Home
          </Link>
          <button className="btn btn-primary">Edit</button>
        </div>
      </form>
    </section>
  );
}
