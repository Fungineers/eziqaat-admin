import React from "react";
import { LoadingButton } from "@mui/lab";
import { Helmet } from "react-helmet-async";
import { Card, Container, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import useNewOfficeSecretary from "../hooks/useNewOfficeSecretary";
import Iconify from "../components/iconify/Iconify";

export default function NewOfficeSecretaryPage() {
  const newOfficeSecretary = useNewOfficeSecretary();

  return (
    <>
      <Helmet>
        <title>Add New Office Secretary | Eziqaat Admin</title>
      </Helmet>

      <Container>
        <Card sx={{ maxWidth: 766, marginLeft: "auto", marginRight: "auto" }}>
          {newOfficeSecretary.loading && <LinearProgress />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" gutterBottom>
                Add New Office Secretary
              </Typography>
            </Stack>
            <Stack gap={2} direction="row">
              <TextField
                name="firstName"
                id="firstName"
                label="First Name"
                value={newOfficeSecretary.form.values.firstName}
                error={!!newOfficeSecretary.form.errors.firstName}
                helperText={newOfficeSecretary.form.errors.firstName}
                onChange={newOfficeSecretary.form.handleChange("firstName")}
                onBlur={newOfficeSecretary.form.handleBlur("firstName")}
              />
              <TextField
                name="lastName"
                id="lastName"
                label="Last Name"
                value={newOfficeSecretary.form.values.lastName}
                error={!!newOfficeSecretary.form.errors.lastName}
                helperText={newOfficeSecretary.form.errors.lastName}
                onChange={newOfficeSecretary.form.handleChange("lastName")}
                onBlur={newOfficeSecretary.form.handleBlur("lastName")}
              />
            </Stack>
            <TextField
              name="email"
              id="email"
              label="Email Address"
              value={newOfficeSecretary.form.values.email}
              error={!!newOfficeSecretary.form.errors.email}
              helperText={newOfficeSecretary.form.errors.email}
              onChange={newOfficeSecretary.form.handleChange("email")}
              onBlur={newOfficeSecretary.form.handleBlur("email")}
            />
            <TextField
              name="phone"
              id="phone"
              label="Phone Number"
              value={newOfficeSecretary.form.values.phone}
              error={!!newOfficeSecretary.form.errors.phone}
              helperText={newOfficeSecretary.form.errors.phone}
              onChange={newOfficeSecretary.form.handleChange("phone")}
              onBlur={newOfficeSecretary.form.handleBlur("phone")}
            />
            <TextField
              name="cnic"
              id="cnic"
              label="CNIC Number"
              value={newOfficeSecretary.form.values.cnic}
              error={!!newOfficeSecretary.form.errors.cnic}
              helperText={newOfficeSecretary.form.errors.cnic}
              onChange={newOfficeSecretary.form.handleChange("cnic")}
              onBlur={newOfficeSecretary.form.handleBlur("cnic")}
            />
            <LoadingButton
              fullWidth
              startIcon={<Iconify icon="eva:plus-fill" />}
              size="large"
              type="button"
              variant="contained"
              onClick={newOfficeSecretary.form.handleSubmit}
              loading={newOfficeSecretary.loading}
              disabled={newOfficeSecretary.loading}
            >
              Add
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
