"use client";
import {
  productsApi,
  useGetProductsQuery,
} from "@/app/reduxToolkit/services/products";
import { FormikHelpers, useFormik } from "formik";
import React, { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import Yup from "yup";
interface SearchProductsQuery {
  searchQuery: string;
}
const initialValues: SearchProductsQuery = { searchQuery: "" };

const onSubmit = async (
  values: SearchProductsQuery,
  formActions: FormikHelpers<SearchProductsQuery>
) => {
  formActions.setSubmitting(false);
};

const SearchBar = () => {
  // const { data, error, isLoading } = useGetProductsQuery({});
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="form-control">
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered responsiveSearchBar"
          name="searchQuery"
          onChange={handleChange}
          value={values.searchQuery}
        />
        <button
          type="submit"
          onClick={() => {}}
          className="btn btn-primary btn-square "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
