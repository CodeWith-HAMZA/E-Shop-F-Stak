import { ToastOptions, toast } from "react-toastify";
export const showToast = (toastType, toastText: string) => {
  toast[toastType](toastText, {
    // position: "top-right",
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

 
};