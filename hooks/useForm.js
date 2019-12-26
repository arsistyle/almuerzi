import { useState } from 'react';

export default (initialState, onSubmit) => {
  const [inputs, setInputs] = useState(initialState);

  const suscribe = field => value => {
    setInputs({ ...inputs, [field]: value })
  }

  const handleSubmit = () => {
    onSubmit(inputs)
  }

  return { suscribe, handleSubmit, inputs };
};
