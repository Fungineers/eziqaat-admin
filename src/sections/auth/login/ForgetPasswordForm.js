// @mui
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
// components
import useForgetPassword from "src/hooks/useForgetPassword";

// ----------------------------------------------------------------------

export default function ForgetPasswordForm() {
  const ForgetPassword = useForgetPassword();

  return (
    <>
      <Stack spacing={3}>
        <TextField
          sx={{ mb: 3 }}
          name="credential"
          label="Credential"
          value={ForgetPassword.form.values.email}
          error={ForgetPassword.form.errors.email}
          onBlur={ForgetPassword.form.handleBlur}
          //   onChange={ForgetPassword.form.handleChange}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={ForgetPassword.form.handleSubmit}
        loading={ForgetPassword.loading}
        disabled={ForgetPassword.loading}
      >
        Get Verification Link
      </LoadingButton>
    </>
  );
}
