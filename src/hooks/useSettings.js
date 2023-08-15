import { useFormik } from "formik";
import { useAuth } from "src/contexts/auth.context";
import * as Yup from "yup";

const useSettings = () => {
  const auth = useAuth();

  const passwordForm = useFormik({
    initialValues: {
      currPassword: "",
      newPassword: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      currPassword: Yup.string().required("Required"),
      newPassword: Yup.string().required("Required"),
    }),
    // onSubmit: auth.signin,
  });
  const profileForm = useFormik({
    initialValues: {
      email: auth?.data.user.email,
      phone: auth?.data.user.phone,
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
    }),
    // onSubmit: auth.signin,
  });

  return {
    loading: auth.data.signingIn,
    success: auth.data.signedIn,
    error: auth.data.error,
    passwordForm,
    profileForm,
  };
};

export default useSettings;
