import React from "react";
import { LoadingButton } from "@mui/lab";
import { Helmet } from "react-helmet-async";
import { Card, Container, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import useNewChairperson from "../hooks/useNewChairperson";
import Iconify from "../components/iconify/Iconify";

export default function NewChairpersonPage() {
  const newChairperson = useNewChairperson();

  return (
    <>
      <Helmet>
        <title>Add New Chairperson | Eziqaat Admin</title>
      </Helmet>

      <Container>
        <Card sx={{ maxWidth: 766, marginLeft: "auto", marginRight: "auto" }}>
          {newChairperson.loading && <LinearProgress />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" gutterBottom>
                Add New Chairperson
              </Typography>
            </Stack>
            <Stack gap={2} direction="row">
              <TextField
                fullWidth
                name="firstName"
                id="firstName"
                label="First Name"
                value={newChairperson.form.values.firstName}
                error={!!newChairperson.form.errors.firstName}
                helperText={newChairperson.form.errors.firstName}
                onChange={newChairperson.form.handleChange("firstName")}
                onBlur={newChairperson.form.handleBlur("firstName")}
              />
              <TextField
                fullWidth
                name="lastName"
                id="lastName"
                label="Last Name"
                value={newChairperson.form.values.lastName}
                error={!!newChairperson.form.errors.lastName}
                helperText={newChairperson.form.errors.lastName}
                onChange={newChairperson.form.handleChange("lastName")}
                onBlur={newChairperson.form.handleBlur("lastName")}
              />
            </Stack>
            <TextField
              name="email"
              id="email"
              label="Email Address"
              value={newChairperson.form.values.email}
              error={!!newChairperson.form.errors.email}
              helperText={newChairperson.form.errors.email}
              onChange={newChairperson.form.handleChange("email")}
              onBlur={newChairperson.form.handleBlur("email")}
            />
            <TextField
              name="phone"
              id="phone"
              label="Phone Number"
              value={newChairperson.form.values.phone}
              error={!!newChairperson.form.errors.phone}
              helperText={newChairperson.form.errors.phone}
              onChange={newChairperson.form.handleChange("phone")}
              onBlur={newChairperson.form.handleBlur("phone")}
            />
            <TextField
              name="cnic"
              id="cnic"
              label="CNIC Number"
              value={newChairperson.form.values.cnic}
              error={!!newChairperson.form.errors.cnic}
              helperText={newChairperson.form.errors.cnic}
              onChange={newChairperson.form.handleChange("cnic")}
              onBlur={newChairperson.form.handleBlur("cnic")}
            />
            <LoadingButton
              fullWidth
              startIcon={<Iconify icon="eva:plus-fill" />}
              size="large"
              type="button"
              variant="contained"
              onClick={newChairperson.form.handleSubmit}
              loading={newChairperson.loading}
              disabled={newChairperson.loading}
            >
              Add
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
