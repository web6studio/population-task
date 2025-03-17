const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-red-700">
      <strong>Error:</strong> {message}
    </div>
  </div>
);

export default ErrorMessage;
