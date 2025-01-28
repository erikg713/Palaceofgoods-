import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (message: string) => {
  toast.error(message);
};
