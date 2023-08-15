import React from "react";
import { LoadingButton } from "@mui/lab";
import { Helmet } from "react-helmet-async";
import { Card, Container, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import useNewArea from "../hooks/useNewArea";
import Iconify from "../components/iconify/Iconify";

export default function SettingsPage() {
  const newArea = useNewArea();

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
          {newArea.loading && <LinearProgress />}
          <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                <Iconify icon="icon-park-outline:general-branch" style={{ marginRight: 5 }} />
                General
              </Typography>
            </Stack>
            <TextField
              name="firstname"
              id="firstName"
              label="First Name"
              disabled={true}
              //   value={newArea.form.values.areaName}
              //   error={!!newArea.form.errors.areaName}
              //   helperText={newArea.form.errors.areaName}
            />
            <TextField
              name="lastName"
              id="lastName"
              label="Last Name"
              disabled={true}
              //   value={newArea.form.values.areaName}
              //   error={!!newArea.form.errors.areaName}
              //   helperText={newArea.form.errors.areaName}
            />
            <TextField
              name="cnic"
              id="cnic"
              label="CNIC"
              type="number"
              disabled={true}
              //   value={newArea.form.values.areaName}
              //   error={!!newArea.form.errors.areaName}
              //   helperText={newArea.form.errors.areaName}
            />
            <TextField
              name="role"
              id="role"
              label="Role"
              disabled={true}
              //   value={newArea.form.values.areaName}
              //   error={!!newArea.form.errors.areaName}
              //   helperText={newArea.form.errors.areaName}
            />
            {newArea.message && <div>{newArea.message}</div>} {/* Display the message */}
          </Stack>
        </Card>
        <Card sx={{ maxWidth: 1000, mb: 3 }}>
          {newArea.loading && <LinearProgress />}
          <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                <Iconify icon="mdi:account" style={{ marginRight: 5 }} />
                Account
              </Typography>
            </Stack>
            <TextField
              name="email"
              id="email"
              label="Email Address"
              type="email"
              //   value={newArea.form.values.areaName}
              //   error={!!newArea.form.errors.areaName}
              //   helperText={newArea.form.errors.areaName}
            />
            <TextField
              name="phoneNumber"
              id="phoneNumber"
              label="Phone Number"
              type="number"
              //   value={newArea.form.values.areaName}
              //   error={!!newArea.form.errors.areaName}
              //   helperText={newArea.form.errors.areaName}
            />
            {newArea.message && <div>{newArea.message}</div>} {/* Display the message */}
            <LoadingButton
              fullWidth
              startIcon={<Iconify icon="dashicons:update" />}
              size="large"
              type="button"
              variant="contained"
              onClick={newArea.form.handleSubmit}
              loading={newArea.loading}
              disabled={newArea.loading}
            >
              Update
            </LoadingButton>
          </Stack>
        </Card>
        <Card sx={{ maxWidth: 1000 }}>
          {newArea.loading && <LinearProgress />}
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
              //   value={newArea.form.values.areaName}
              //   error={!!newArea.form.errors.areaName}
              //   helperText={newArea.form.errors.areaName}
            />
            <TextField
              name="newPassword"
              id="newPassword"
              label="New Password"
              type="password"
              //   value={newArea.form.values.areaName}
              //   error={!!newArea.form.errors.areaName}
              //   helperText={newArea.form.errors.areaName}
            />
            {newArea.message && <div>{newArea.message}</div>} {/* Display the message */}
            <LoadingButton
              fullWidth
              startIcon={<Iconify icon="dashicons:update" />}
              size="large"
              type="button"
              variant="contained"
              onClick={newArea.form.handleSubmit}
              loading={newArea.loading}
              disabled={newArea.loading}
            >
              Update
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
