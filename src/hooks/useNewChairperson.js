import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useApi } from "../api";
import regexps from "../constants/regexps";

const useNewChairperson = () => {
  const api = useApi();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "+92",
      cnic: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().optional().matches(regexps.email, {
        message: "Incorrect format",
      }),
      phone: Yup.string().required("Required").matches(regexps.phone, { message: "Incorrect format" }),
      cnic: Yup.string().required("Required").matches(regexps.cnic, { message: "Incorrect format" }),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setError(null);
      api
        .createUser({ ...values, role: "CHAIRPERSON" })
        .then((res) => {
          toast("Chairperson Created", { type: "success" });
          navigate("/dashboard/chairperson");
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

export default useNewChairperson;
