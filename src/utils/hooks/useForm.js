import { useState } from "react";

export function useForm(inputValues = {}) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    let newValue = value;
    if (name === "token") {
      newValue = value.replace(/[.\s]/g, "");
    }
    setValues({ ...values, [name]: newValue });
  };
  return { values, handleChange, setValues };
}
