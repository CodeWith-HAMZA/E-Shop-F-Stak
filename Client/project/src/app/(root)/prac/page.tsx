"use client";
import React, { useState } from "react";

const Step1 = ({ nextStep, handleChange, values }) => {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleNext}>
      <h2>Step 1</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={values.name}
        onChange={handleChange}
        required
      />
      <button type="submit">Next</button>
    </form>
  );
};

const Step2 = ({ nextStep, prevStep, handleChange, values }) => {
  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handlePrev = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <form onSubmit={handleNext}>
      <h2>Step 2</h2>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <button type="button" onClick={handlePrev}>
        Back
      </button>
      <button type="submit">Next</button>
    </form>
  );
};

const Step3 = ({ prevStep, handleSubmit, values }) => {
  const handlePrev = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleFinalSubmit}>
      <h2>Step 3</h2>
      <p>Name: {values.name}</p>
      <p>Email: {values.email}</p>
      <button type="button" onClick={handlePrev}>
        Back
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Submit form data
    console.log("Form submitted:", formValues);
    // Reset form values and step
    setFormValues({
      name: "",
      email: "",
    });
    setStep(1);
  };

  switch (step) {
    case 1:
      return (
        <Step1
          nextStep={nextStep}
          handleChange={handleChange}
          values={formValues}
        />
      );
    case 2:
      return (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formValues}
        />
      );
    case 3:
      return (
        <Step3
          prevStep={prevStep}
          handleSubmit={handleSubmit}
          values={formValues}
        />
      );
    default:
      return null;
  }
};

export default MultiStepForm;
