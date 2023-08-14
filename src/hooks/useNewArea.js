import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useApi } from "../api";

const useNewDepartment = () => {
  const api = useApi();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useFormik({
    initialValues: {
      areaName: "",
    },
    validationSchema: Yup.object().shape({
      areaName: Yup.string().required("Area name is required"),
    }),
    onSubmit: ({ areaName }) => {
      setLoading(true);
      setError(null);
      api
        .createArea({ areaName })
        .then((res) => {
          setLoading(false);
          toast("Area Created", { type: "success" });
          navigate("/dashboard/area");
        })
        .catch((err) => {
          const message = err?.response?.data?.message || "Something went wrong";
          toast(message, { type: "error" });
          setError(message);
        });
    },
  });

  return {
    loading,
    error,
    form,
  };
};

export default useNewDepartment;
