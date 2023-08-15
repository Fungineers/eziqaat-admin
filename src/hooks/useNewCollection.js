import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useApi } from "../api";
import regexps from "../constants/regexps";

const useNewCollection = () => {
  const api = useApi();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useFormik({
    initialValues: {
      refName: "",
      amount: null,
      refPhone: "+92",
    },
    validationSchema: Yup.object().shape({
      refName: Yup.string().required("Required"),
      refPhone: Yup.string().required("Required").matches(regexps.phone, { message: "Incorrect format" }),
      amount: Yup.number().min(1).required("Amount Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setError(null);
      api
        .addNewCollection(values)
        .then((res) => {
          toast("Collection Created", { type: "success" });
          navigate("/dashboard/donation");
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "Something went wrong";
          toast(message, { type: "error" });
          setError(message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return {
    loading,
    error,
    form,
  };
};

export default useNewCollection;
