import { ChangeEvent, useState } from "react";

export function useForm<T>(inputValues: T) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    let newValue = value;
    if (name === "token") {
      newValue = value.replace(/[.\s]/g, "");
    }
    setValues({ ...values, [name]: newValue });
  };
  return { values, handleChange, setValues };
}
