import { filter } from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import {
  Button,
  Card,
  Checkbox,
  Container,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
// sections
import { ListHead, ListToolbar } from "../sections/@dashboard/list";
// mock
import { sentenceCase } from "change-case";
import { useNavigate } from "react-router-dom";
import Iconify from "src/components/iconify/Iconify";
import Label from "src/components/label/Label";
import { useAuth } from "src/contexts/auth.context";
import useDonations from "src/hooks/useDonations";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "donor", label: "Donor", alignRight: false },
  { id: "amount", label: "Amount (Rs)", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "status", label: "Status" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_donation) => _donation.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DonationPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const donations = useDonations();

  useEffect(() => {
    donations.fetch();
    // eslint-disable-next-line
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = donations.data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - donations.data.length) : 0;

  const filteredUsers = applySortFilter(donations.data, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const navigate = useNavigate();

  const auth = useAuth();

  return (
    <>
      <Helmet>
        <title> Donations | Eziqaat Admin </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Donations
          </Typography>
          {auth.data.user?.role === "OFFICE_SECRETARY" && (
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => {
                navigate("/dashboard/donations/create");
              }}
            >
              New Collection
            </Button>
          )}
        </Stack>

        <Card>
          <ListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          {donations.loading ? (
            <LinearProgress />
          ) : (
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <ListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={donations.data.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                      const {
                        id,
                        amount,
                        address,
                        status,
                        refName,
                        refPhone,
                        // donorId,
                        // workerId,
                        // areaId,
                        // createdAt,
                        // updatedAt,
                        // requestedAt,
                        // approvedAt,
                        // acceptedAt,
                        // collectedAt,
                        // areaName,
                        // chairpersonId,
                        // active,
                        // assignedAt,
                        // chairpersonName,
                        // chairpersonPhone,
                        // chairpersonCnic,
                        // chairpersonEmail,
                        donorName,
                        donorPhone,
                        // donorCnic,
                        donorEmail,
                        // workerName,
                        // workerPhone,
                        // workerCnic,
                        // workerEmail,
                      } = row;
                      const selectedArea = selected.indexOf(id) !== -1;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedArea}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedArea} onChange={(event) => handleClick(event, id)} />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="normal">
                            <Stack direction="column">
                              <Typography variant="subtitle1" noWrap>
                                {donorName || refName}
                              </Typography>
                              <Typography variant="subtitle2" color="gray" noWrap>
                                (Ph) {donorPhone || refPhone}
                              </Typography>
                              <Typography variant="subtitle2" color="gray" noWrap>
                                (Email) {donorEmail || "N/A"}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {amount}/Rs
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="normal">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {address || "On-Premises"}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              color={
                                status === "REQUESTED"
                                  ? "warning"
                                  : status === "PENDING"
                                  ? "error"
                                  : status === "ACCEPTED"
                                  ? "primary"
                                  : "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
          )}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={donations.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
