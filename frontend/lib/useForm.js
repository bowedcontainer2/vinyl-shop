import { useState } from 'react';

const useForm = (initial = {}) => {
  // create state object for form inputs
  const [inputs, setInputs] = useState(initial);

  const handleChange = (event) => {
    let { value, name, type } = event.target;

    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = event.target.files;
    }
    setInputs({
      // copy existing state
      ...inputs,
      [name]: value,
    });
  };

  const clearForm = () => {
    const blackState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blackState);
  };

  const resetForm = () => {
    setInputs(initial);
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
};

export default useForm;
