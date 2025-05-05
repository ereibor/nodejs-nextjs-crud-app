// components/ErrorMessage.tsx
type ErrorMessageProps = {
    message: string;
  };
  
  const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return <p className="text-red-500 mb-2">{message}</p>;
  };
  
  export default ErrorMessage;
  