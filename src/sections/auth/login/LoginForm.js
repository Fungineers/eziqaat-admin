import { useState } from "react";
// @mui
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Link, Stack, TextField } from "@mui/material";
// components
import useLogin from "src/hooks/useLogin";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const login = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="credential"
          label="Credential"
          value={login.form.values.credential}
          error={login.form.errors.credential}
          onChange={login.form.handleChange}
          onBlur={login.form.handleBlur}
        />

        <TextField
          name="password"
          label="Password"
          value={login.form.values.password}
          error={login.form.errors.password}
          onChange={login.form.handleChange}
          onBlur={login.form.handleBlur}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={login.form.handleSubmit}
        loading={login.loading}
        disabled={login.loading}
      >
        Login
      </LoadingButton>
    </>
  );
}
