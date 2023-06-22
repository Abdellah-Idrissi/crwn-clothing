import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

export const handleSignOut = async () => {
  let result = await Swal.fire({
    title: "Do you want to sign out?",
    showCancelButton: true,
    iconColor: "green",
    color:'#212529',
    width: "fit-content",
    confirmButtonColor: "#ba181b",
    cancelButtonColor: "#808282",
    confirmButtonText: "Yes, sign out!",
  });

  if (result.isConfirmed) {
    await signOut(auth);
    toast.success("You logged out succefully");
  }
};