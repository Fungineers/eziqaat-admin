import { filter } from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Popover,
  Select,
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
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { ListHead, ListToolbar } from "../sections/@dashboard/list";
// mock
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import useChairpersons from "../hooks/useChairpersons";
import useUnassignedAreas from "src/hooks/useUnassignedAreas";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Full Name", alignRight: false },
  { id: "email", label: "Email Address", alignRight: false },
  { id: "phone", label: "Phone Number", alignRight: false },
  { id: "cnic", label: "CNIC Number", alignRight: false },
  { id: "areaName", label: "Assigned Area", alignRight: false },
  { id: "Actions", label: "Actions", alignRight: false },
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
    return filter(array, (_chairperson) => _chairperson.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ChairpersonPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const chairpersons = useChairpersons();

  const unassignedAreas = useUnassignedAreas();

  const [assigningId, setAssigningId] = useState(null);

  const [areaId, setAreaId] = useState(null);

  const handleClose = () => {
    setAssigningId(null);
    setAreaId(null);
  };

  useEffect(() => {
    chairpersons.fetch();
  }, []);

  useEffect(() => {
    if (assigningId) {
      unassignedAreas.fetch();
    }
  }, [assigningId]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = chairpersons.data.map((n) => n.id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - chairpersons.data.length) : 0;

  const filteredUsers = applySortFilter(chairpersons.data, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> Chairpersons | Eziqaat Admin </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chairpersons
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => {
              navigate("/dashboard/chairperson/create");
            }}
          >
            New Chairperson
          </Button>
        </Stack>

        <Card>
          <ListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          {chairpersons.loading ? (
            <LinearProgress />
          ) : (
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <ListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={chairpersons.data.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                      const { id, name, email, phone, cnic, areaId, areaName } = row;
                      const selectedArea = selected.indexOf(id) !== -1;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedArea}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedArea} onChange={(event) => handleClick(event, id)} />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {email}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {phone}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {cnic}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {areaName || "(Unassigned)"}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="right">
                            <Stack direction="row" gap={1}>
                              {!!areaId ? (
                                <LoadingButton
                                  disabled={chairpersons.unassigning !== null}
                                  loading={chairpersons.unassigning === id}
                                  onClick={() => chairpersons.unassign(areaId)}
                                  color="error"
                                >
                                  Unassign
                                </LoadingButton>
                              ) : (
                                <Button onClick={() => setAssigningId(id)}>Assign</Button>
                              )}
                            </Stack>
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
            count={chairpersons.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Popover
        open={Boolean(assigningId !== null)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          p: 0,
        }}
        PaperProps={{
          sx: {
            position: "fixed",
            top: 0,
            left: 0,
            background: "transparent",
            boxShadow: "none",
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack
          onClick={handleClose}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100svw", height: "100svh", position: "fixed", top: 0, left: 0, bgcolor: "#0008" }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            bgcolor="#fff"
            borderRadius={2}
            maxWidth={512}
            boxShadow={10}
            width="100%"
          >
            {unassignedAreas.loading && <LinearProgress />}
            <Stack p={4} gap={2} direction="column">
              <Typography variant="h4" gutterBottom>
                Assign Area
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="area-select" sx={{ bgcolor: "#fff", pr: "6px" }}>
                  Select Area
                </InputLabel>
                <Select
                  labelId="area-select"
                  id="demo-simple-select"
                  value={areaId}
                  label="Age"
                  onChange={(e) => {
                    setAreaId(e.target.value);
                  }}
                >
                  <MenuItem value={null} disabled>
                    --Select--
                  </MenuItem>
                  {unassignedAreas.data.map((a) => (
                    <MenuItem key={a.id} value={a.id}>
                      {a.areaName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LoadingButton
                variant="contained"
                loading={chairpersons.assigning}
                disabled={!assigningId || !areaId || chairpersons.assigning}
                onClick={() => {
                  chairpersons.assign(areaId, assigningId);
                }}
              >
                Assign
              </LoadingButton>
            </Stack>
          </Box>
        </Stack>
      </Popover>
    </>
  );
}
