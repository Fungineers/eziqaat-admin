import React from "react";
import { LoadingButton } from "@mui/lab";
import { Helmet } from "react-helmet-async";
import { Card, Container, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import Iconify from "../components/iconify/Iconify";
import { useAuth } from "src/contexts/auth.context";
import useSettings from "src/hooks/useSettings";

export default function SettingsPage() {
  const settings = useSettings();
  const auth = useAuth();
  const user = auth?.data?.user;

  return (
    <>
      <Helmet>
        <title>Settings | Eziqaat Admin</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, mt: -2 }}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
        </Stack>
        <Card sx={{ maxWidth: 1000, mb: 3 }}>
          {settings.loading && <LinearProgress />}
          <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                <Iconify icon="icon-park-outline:general-branch" style={{ marginRight: 5 }} />
                General
              </Typography>
            </Stack>
            <TextField name="firstname" id="firstName" label="First Name" disabled={true} value={user?.firstName} />
            <TextField name="lastName" id="lastName" label="Last Name" disabled={true} value={user.lastName} />
            <TextField name="cnic" id="cnic" label="CNIC" type="number" disabled={true} value={user.cnic} />
            <TextField name="role" id="role" label="Role" disabled={true} value={user.role} />
            {settings.message && <div>{settings.message}</div>} {/* Display the message */}
          </Stack>
        </Card>
        <Card sx={{ maxWidth: 1000, mb: 3 }}>
          {settings.loading && <LinearProgress />}
          <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                <Iconify icon="mdi:account" style={{ marginRight: 5 }} />
                Account
              </Typography>
            </Stack>
            <Stack>
              <TextField
                name="email"
                id="email"
                label="Email Address"
                type="email"
                sx={{ mb: 2 }}
                value={settings.emailForm.values.email}
                error={!!settings.emailForm.errors.email}
                helperText={settings.emailForm.errors.email}
                onChange={settings.emailForm.handleChange("email")}
                onBlur={settings.emailForm.handleBlur("email")}
              />
              {settings.message && <div>{settings.message}</div>} {/* Display the message */}
              <LoadingButton
                startIcon={<Iconify icon="dashicons:update" />}
                size="large"
                type="button"
                variant="contained"
                sx={{ mb: 3 }}
                onClick={settings.emailForm.handleSubmit}
                loading={settings.loading}
                disabled={settings.loading}
              >
                Update Email
              </LoadingButton>
            </Stack>
            <Stack>
              <TextField
                name="phone"
                id="phone"
                label="Phone Number"
                sx={{ mb: 2 }}
                value={settings.phoneForm.values.phone}
                error={!!settings.phoneForm.errors.phone}
                helperText={settings.phoneForm.errors.phone}
                onChange={settings.phoneForm.handleChange("phone")}
                onBlur={settings.phoneForm.handleBlur("phone")}
              />
              {settings.message && <div>{settings.message}</div>} {/* Display the message */}
              <LoadingButton
                startIcon={<Iconify icon="dashicons:update" />}
                size="large"
                type="button"
                variant="contained"
                sx={{ mb: 3 }}
                onClick={settings.phoneForm.handleSubmit}
                loading={settings.loading}
                disabled={settings.loading}
              >
                Update Phone Number
              </LoadingButton>
            </Stack>
          </Stack>
        </Card>
        <Card sx={{ maxWidth: 1000 }}>
          {settings.loading && <LinearProgress />}
          <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                <Iconify icon="mdi:password-outline" style={{ marginRight: 5 }} />
                Security
              </Typography>
            </Stack>
            <TextField
              name="currentPassword"
              id="currentPassword"
              label="Current Password"
              type="password"
              value={settings.passwordForm.values.currentPassword}
              error={!!settings.passwordForm.errors.currentPassword}
              helperText={settings.passwordForm.errors.currentPassword}
              onChange={settings.passwordForm.handleChange("currentPassword")}
              onBlur={settings.passwordForm.handleBlur("currentPassword")}
            />
            <TextField
              name="newPassword"
              id="newPassword"
              label="New Password"
              type="password"
              value={settings.passwordForm.values.newPassword}
              error={!!settings.passwordForm.errors.newPassword}
              helperText={settings.passwordForm.errors.newPassword}
              onChange={settings.passwordForm.handleChange("newPassword")}
              onBlur={settings.passwordForm.handleBlur("newPassword")}
            />
            {settings.message && <div>{settings.message}</div>} {/* Display the message */}
            <LoadingButton
              fullWidth
              startIcon={<Iconify icon="dashicons:update" />}
              size="large"
              type="button"
              variant="contained"
              onClick={settings.passwordForm.handleSubmit}
              loading={settings.loading}
              disabled={settings.loading}
            >
              Update
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
