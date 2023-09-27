"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import React from "react";

const Create = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      description: e.target.description.value,
      currency: e.target.currency.value,
      price: parseFloat(e.target.price.value),
    };
    
    try {
      await axios.post("http://localhost:5000/services", formData);
      toast("Created success");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="flex min-h-screen flex-col items-center md:p-24">
      <h1 className="text-3xl font-semibold">Add Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          <input
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
          >
            <option value={"IDR"}>IDR</option>
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="price">
            <span className="label-text">Price</span>
          </label>
          <input
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
          <button className="btn btn-primary">Create</button>
        </div>
      </form>
    </section>
  );
};

export default Create;
