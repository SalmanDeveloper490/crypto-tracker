import { toast } from "react-toastify";

const Toast = ({ message }) => {
  return (
    toast((message = { message })),
    {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "error",
      theme: "colored",
    }
  );
};

export default Toast;
