import React from "react";
import { LoadingButton } from "@mui/lab";
import { Helmet } from "react-helmet-async";
import { Card, Container, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import useNewArea from "../hooks/useNewArea";
import Iconify from "../components/iconify/Iconify";

export default function NewAreaPage() {
  const newArea = useNewArea();

  return (
    <>
      <Helmet>
        <title>Add New Area | Eziqaat Admin</title>
      </Helmet>

      <Container>
        <Card sx={{ maxWidth: 512, marginLeft: "auto", marginRight: "auto" }}>
          {newArea.loading && <LinearProgress />}
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" gutterBottom>
                Add New Area
              </Typography>
            </Stack>
            <TextField
              name="areaName"
              id="areaName"
              label="Area Name"
              value={newArea.form.values.areaName}
              error={!!newArea.form.errors.areaName}
              helperText={newArea.form.errors.areaName}
              onChange={newArea.form.handleChange("areaName")}
              onBlur={newArea.form.handleBlur("areaName")}
            />
            {newArea.message && <div>{newArea.message}</div>} {/* Display the message */}
            <LoadingButton
              fullWidth
              startIcon={<Iconify icon="eva:plus-fill" />}
              size="large"
              type="button"
              variant="contained"
              onClick={newArea.form.handleSubmit}
              loading={newArea.loading}
              disabled={newArea.loading}
            >
              Add
            </LoadingButton>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
