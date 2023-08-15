import { Helmet } from "react-helmet-async";
// @mui
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// components
// sections
import { AppConversionRates, AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from "../sections/@dashboard/app";
import useDashboard from "src/hooks/useDashboard";
import { useEffect } from "react";
// ----------------------------------------------------------------------

function getPastDates(numDates) {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < numDates; i++) {
    const date = new Date(today.getTime() - i * 7 * 24 * 60 * 60 * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    dates.push(formattedDate);
  }

  return dates;
}

export default function DashboardAppPage() {
  const theme = useTheme();

  const dashboard = useDashboard();

  useEffect(() => {
    dashboard.fetch();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | Eziqaat </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        {dashboard.loading ? (
          <CircularProgress />
        ) : (
          dashboard.data && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Current Requests"
                  total={dashboard.data.countStats["REQUESTED"]}
                  color="warning"
                  icon={"mdi:collections-bookmark-outline"}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Current Pending"
                  total={dashboard.data.countStats["PENDING"]}
                  color="error"
                  icon={"ic:baseline-pending-actions"}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Accepted"
                  total={dashboard.data.countStats["ACCEPTED"]}
                  color="info"
                  icon={"mdi:collections-bookmark-outline"}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Collections"
                  total={dashboard.data.countStats["COLLECTED"]}
                  color="success"
                  icon={"mdi:donation"}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <AppWebsiteVisits
                  title="Total Collections"
                  subheader="Weekly Representation"
                  chartLabels={getPastDates(10)}
                  chartData={[
                    {
                      name: "Collections",
                      type: "column",
                      fill: "solid",
                      data: dashboard.data?.weeklyData?.map((d) => d.collectionCount),
                    },
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Area Collections"
                  subheader="Comparing collection count"
                  chartData={dashboard.data?.areaStats?.map((a) => ({ label: a.areaName, value: a.collectionCount }))}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <AppWebsiteVisits
                  title={`Total Cash Flow - PKR ${Intl.NumberFormat("en-US").format(dashboard.data?.cashFlow)}`}
                  subheader="Weekly Representation"
                  chartLabels={getPastDates(10)}
                  chartData={[
                    {
                      name: "Cash Flow",
                      type: "column",
                      fill: "solid",
                      data: dashboard.data?.weeklyData?.map((d) => d.totalAmount),
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Area Cash Flows"
                  subheader="Comparing collection amounts"
                  chartData={dashboard.data?.areaStats?.map((a) => ({ label: a.areaName, value: a.cashFlow }))}
                />
              </Grid>
            </Grid>
          )
        )}
      </Container>
    </>
  );
}
