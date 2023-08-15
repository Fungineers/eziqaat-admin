import React from "react";
import { LoadingButton } from "@mui/lab";
import { Helmet } from "react-helmet-async";
import { Card, Container, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import useNewCollection from "../hooks/useNewCollection";
import Iconify from "../components/iconify/Iconify";

export default function NewCollectionPage() {
  const newCollection = useNewCollection();

  return (
    <>
      <Helmet>
        <title>Add New Collection | Eziqaat Admin</title>
      </Helmet>

      <Container>
        <Card sx={{ maxWidth: 512 }}>
          {newCollection.loading && <LinearProgress />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" gutterBottom>
                Add New Collection
              </Typography>
            </Stack>
            <TextField
              name="refName"
              id="refName"
              label="Name"
              value={newCollection.form.values.refName}
              error={!!newCollection.form.errors.refName}
              helperText={newCollection.form.errors.refName}
              onChange={newCollection.form.handleChange("refName")}
              onBlur={newCollection.form.handleBlur("refName")}
            />
            <TextField
              name="refPhone"
              id="refPhone"
              label="Phone Number"
              value={newCollection.form.values.refPhone}
              error={!!newCollection.form.errors.refPhone}
              helperText={newCollection.form.errors.refPhone}
              onChange={newCollection.form.handleChange("refPhone")}
              onBlur={newCollection.form.handleBlur("refPhone")}
            />
            <TextField
              name="amount"
              id="amount"
              type="number"
              label="Amount (PKR)"
              value={newCollection.form.values.amount}
              error={!!newCollection.form.errors.amount}
              helperText={newCollection.form.errors.amount}
              onChange={newCollection.form.handleChange("amount")}
              onBlur={newCollection.form.handleBlur("amount")}
            />
            <LoadingButton
              fullWidth
              startIcon={<Iconify icon="eva:plus-fill" />}
              size="large"
              type="button"
              variant="contained"
              onClick={newCollection.form.handleSubmit}
              loading={newCollection.loading}
              disabled={newCollection.loading}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
