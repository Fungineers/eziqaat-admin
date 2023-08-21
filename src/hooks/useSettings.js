import { useFormik } from "formik";
import { useState } from "react";
import { useApi } from "src/api";
import { useAuth } from "src/contexts/auth.context";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useSettings = () => {
  const auth = useAuth();
  const api = useApi();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const passwordForm = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required("Required"),
      newPassword: Yup.string().required("Required"),
    }),
    onSubmit: ({ currentPassword, newPassword }) => {
      setLoading(true);
      setError(null);
      api
        .changePassword({ currentPassword, newPassword })
        .then((res) => {
          setLoading(false);
          toast("Password Updated Successfully", { type: "success" });
          navigate(0);
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "Something went wrong";
          toast(message, { type: "error" });
          setError(message);
        });
    },
  });

  const emailForm = useFormik({
    initialValues: {
      email: auth?.data.user.email,
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Required"),
    }),
    onSubmit: ({ email }) => {
      setLoading(true);
      setError(null);
      api
        .changeEmail({ email })
        .then((res) => {
          setLoading(false);
          toast("Email Updated Successfully", { type: "success" });
          navigate(0);
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "Something went wrong";
          toast(message, { type: "error" });
          setError(message);
        });
    },
  });

  const phoneForm = useFormik({
    initialValues: {
      phone: auth?.data.user.phone,
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      phone: Yup.string().required("Required"),
    }),
    onSubmit: ({ phone }) => {
      setLoading(true);
      setError(null);
      api
        .changePhone({ phone })
        .then((res) => {
          setLoading(false);
          toast("Phone Number Updated Successfully", { type: "success" });
          navigate(0);
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "Something went wrong";
          toast(message, { type: "error" });
          setError(message);
        });
    },
  });

  return {
    loading: auth.data.signingIn,
    success: auth.data.signedIn,
    error: auth.data.error,
    passwordForm,
    emailForm,
    phoneForm,
  };
};

export default useSettings;
