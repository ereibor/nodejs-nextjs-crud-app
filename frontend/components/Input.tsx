type InputFieldProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
}: InputFieldProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full mb-3 p-2 border rounded"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default InputField;
