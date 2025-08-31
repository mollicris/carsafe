import {ChangeEventHandler} from 'react'

interface FieldInputProps {
  legend: string;
  type?: HTMLInputElement['type'];
  placeholder?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  id?: string;
  disabled?: boolean;
}

const FieldSet = ({
  legend,
  type = "text",
  placeholder = "Type here",
  required = false,
  className = "",
  inputClassName = "",
  value,
  onChange,
  name,
  id,
  disabled = false
}:FieldInputProps) => {
  return (
    <fieldset className={`fieldset ${className}`}>
      <legend className="fieldset-legend">{legend}</legend>
      <input
        type={type}
        className={`input input-bordered w-full ${inputClassName}`}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        name={name}
        id={id || name}
        disabled={disabled}
      />
    </fieldset>
  )
}

export default FieldSet