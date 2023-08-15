import { useFormik } from "formik";
import { useAuth } from "src/contexts/auth.context";
import * as Yup from "yup";

const useForgetPassword = () => {
  const auth = useAuth();

  const form = useFormik({
    initialValues: {
      email: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      credential: Yup.string().required("Required"),
    }),
    // onSubmit: auth.signin,
  });

  return {
    loading: auth.data.signingIn,
    success: auth.data.signedIn,
    error: auth.data.error,
    form,
  };
};

export default useForgetPassword;
