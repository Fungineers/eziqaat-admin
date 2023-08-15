import { sentenceCase } from "change-case";
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
import Iconify from "../components/iconify";
import Label from "../components/label";
import Scrollbar from "../components/scrollbar";
// sections
import { ListHead, ListToolbar } from "../sections/@dashboard/list";
// mock
import { LoadingButton } from "@mui/lab";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import useAreas from "src/hooks/useAreas";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "areaName", label: "Area Name", alignRight: false },
  { id: "active", label: "Status", alignRight: false },
  { id: "chairperson", label: "Chairperson", alignRight: false },
  { id: "actions", label: "Actions" },
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
    return filter(array, (_area) => _area.areaName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AreaPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("areaName");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const areas = useAreas();

  const navigate = useNavigate();

  useEffect(() => {
    areas.fetch();
    // eslint-disable-next-line
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = areas.data.map((n) => n.id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - areas.data.length) : 0;

  const filteredAreas = applySortFilter(areas.data, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredAreas.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Areas | Eziqaat Admin </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Areas
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => {
              navigate("/dashboard/area/create");
            }}
          >
            New Area
          </Button>
        </Stack>

        <Card>
          <ListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          {areas.loading ? (
            <LinearProgress />
          ) : (
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <ListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={areas.data.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredAreas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                      const {
                        id,
                        areaName,
                        active,
                        chairpersonId,
                        chairpersonName,
                        chairpersonPhone,
                        chairpersonEmail,
                        assignedAt,
                      } = row;
                      const selectedArea = selected.indexOf(id) !== -1;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedArea}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedArea} onChange={(event) => handleClick(event, id)} />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {areaName}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            <Label color={active ? "success" : "error"}>
                              {sentenceCase(active ? "Active" : "Inactve")}
                            </Label>
                          </TableCell>

                          <TableCell align="left">
                            {!chairpersonId ? (
                              <Typography variant="subtitle1" noWrap>
                                (Unassigned)
                              </Typography>
                            ) : (
                              <Stack direction="column">
                                <Typography variant="subtitle1" noWrap>
                                  {chairpersonName}
                                </Typography>
                                <Typography variant="subtitle2" color="gray" noWrap>
                                  (Ph) {chairpersonPhone}
                                </Typography>
                                <Typography variant="subtitle2" color="gray" noWrap>
                                  (Email) {chairpersonEmail}
                                </Typography>
                                <Typography variant="caption" noWrap>
                                  {moment(new Date(assignedAt)).format("LLL")} ({moment(new Date(assignedAt)).fromNow()}
                                  )
                                </Typography>
                              </Stack>
                            )}
                          </TableCell>

                          <TableCell align="right">
                            <Stack direction="row" gap={1}>
                              {active ? (
                                <LoadingButton
                                  color="error"
                                  disabled={!!areas.disabling}
                                  loading={areas.disabling === id}
                                  onClick={() => areas.disable(id)}
                                >
                                  Disable
                                </LoadingButton>
                              ) : (
                                <LoadingButton
                                  disabled={!!areas.enabling}
                                  loading={areas.enabling === id}
                                  onClick={() => areas.enable(id)}
                                >
                                  Enable
                                </LoadingButton>
                              )}
                              {chairpersonId && (
                                <LoadingButton
                                  disabled={areas.unassigning !== null}
                                  loading={areas.unassigning === id}
                                  onClick={() => areas.unassign(id)}
                                  color="error"
                                >
                                  Unassign
                                </LoadingButton>
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
            count={areas.data.length}
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
