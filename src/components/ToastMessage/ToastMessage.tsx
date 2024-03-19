import { useEffect } from "react";
import { Toast } from "react-bootstrap";

type ToastMessageProps = {
  message: string;
  onClose: () => void;
};

const ToastMessage = ({ message, onClose }: ToastMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Toast
      style={{ position: "fixed", bottom: 20, right: 20 }}
      onClose={onClose}
      show
      delay={3000}
      autohide
      className={message.includes("Erro") ? "bg-danger" : "bg-success"}
    >
      <Toast.Body className="text-light">{message}</Toast.Body>
    </Toast>
  );
};

export default ToastMessage;
