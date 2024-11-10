import React, { useState } from "react";
import AdopterData from "./AdopterData";
import { validation } from "../utils/validation";
const PetAdoptionForm = () => {
  const [formData, setFormData] = useState([]);
  const [values, setValues] = useState({
    petName: "",
    petType: "Dog",
    breed: "",
    adopterName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    petName: "",
    petType: "",
    breed: "",
    adopterName: "",
    email: "",
    phone: "",
  });
  const [showTable, setShowTable] = useState(false);
  const { petName, petType, breed, adopterName, email, phone } = values;
  console.log(values);
  const handleInputs = (event) => {
    const { name, value } = event.target;
    console.log(name, " : ", value);
    setValues((oldValues) => ({
      ...oldValues,
      [name]: value,
    }));

    let errorsCopy = { ...errors };
    const errorR = validation(name, value, errorsCopy);
    setErrors(errorR);
  };

  const handleSubmit = () => {
    if (!petName || !breed || !adopterName || !email || !phone) {
      alert("Please fill out all fields");
      return;
    }
    const data = { petName, petType, breed, adopterName, email, phone };
    setFormData((prevData) => [...prevData, data]);
    setShowTable(true);
    setValues({
      petName: "",
      petType: "Dog",
      breed: "",
      adopterName: "",
      email: "",
      phone: "",
    });
    setErrors({
      petName: "",
      petType: "",
      breed: "",
      adopterName: "",
      email: "",
      phone: "",
    });
  };

  if (!showTable) {
    return (
      <div className="form">
        <div>
          <label htmlFor="petName">Pet Name</label>
          <input
            type="text"
            name="petName"
            placeholder="Pet Name"
            value={petName}
            onChange={handleInputs}
          />
          <small>{errors.petName}</small>
        </div>
        <div>
          <label htmlFor="petType">Pet Type</label>
          <select value={petType} name="petType" onChange={handleInputs}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
          </select>
        </div>
        <div>
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            name="breed"
            placeholder="Breed"
            value={breed}
            onChange={handleInputs}
          />
          <small>{errors.breed}</small>
        </div>
        <div>
          <label htmlFor="adopterName">Your Name</label>
          <input
            type="text"
            name="adopterName"
            placeholder="Your Name"
            value={adopterName}
            onChange={handleInputs}
          />
          <small>{errors.adopterName}</small>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputs}
          />
          <small>{errors.email}</small>
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={handleInputs}
          />
          <small>{errors.phone}</small>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
  const handleGoBack = () => setShowTable(!showTable);

  return (
    <AdopterData formData={formData} handleGoBack={handleGoBack}></AdopterData>
  );
};

export default PetAdoptionForm;
