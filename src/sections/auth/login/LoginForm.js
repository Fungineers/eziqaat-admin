import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import useLogin from "src/hooks/useLogin";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const login = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate("/dashboard", { replace: true });
  };

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
        <Checkbox name="remember" label="Remember me" />
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
