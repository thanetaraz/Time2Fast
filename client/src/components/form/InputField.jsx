function InputField({
  label,
  type = 'text',
  id,
  required = false,
  placeholder = '',
}) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-400"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 
                   block w-full p-2.5"
      />
    </div>
  );
}

export default InputField;
