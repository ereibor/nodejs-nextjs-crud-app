type ButtonProps = {
  type: 'submit' | 'button';
  text: string;
  onClick?: () => void;
};

const Button = ({ type, text, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-300"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
