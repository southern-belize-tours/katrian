import { Filter, ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

const columns = [
  { field: "first", label: "First" },
  { field: "last", label: "Last" },
  { field: "attending_ceremony", label: "Ceremony" },
  { field: "attending_brunch", label: "Brunch" },
  { field: "invited_rehearsal", label: "Invited to Rehearsal Dinner" },
  { field: "attending_rehearsal", label: "Rehearsal" },
  { field: "updatedAt", label: "Updated" },
  { field: "notes", label: "Notes" },
];

export default function GroupTable({ guests }) {
  const [ceremonyFilter, setCeremonyFilter] = useState("all");
  const [brunchFilter, setBrunchFilter] = useState("all");
  const [invitedRehearsalFilter, setInvitedRehearsalFilter] = useState("all");
  const [rehearsalFilter, setRehearsalFilter] = useState("all");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [columnWidths, setColumnWidths] = useState({
    first: 50,
    last: 50,
    attending_ceremony: 50,
    attending_brunch: 50,
    invited_rehearsal: 50,
    attending_rehearsal: 50,
    updatedAt: 75,
    notes: 100,
  });

  const cellSx = {
    padding: "4px 8px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const resizeRef = useRef({ field: null, startX: 0, initialWidth: 0 });

  const startResizing = (field, startX) => {
    resizeRef.current = { field, startX, initialWidth: columnWidths[field] };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", stopResizing);
  };

  const onMouseMove = (e) => {
    const { field, startX, initialWidth } = resizeRef.current;
    if (!field) return;
    const delta = e.clientX - startX;
    setColumnWidths((prev) => {
      const newWidth = Math.max(25, initialWidth + delta);

      // Calculate total width except current resizing column
      // const otherColsTotal = Object.entries(prev)
      //   .filter(([key]) => key !== field)
      //   .reduce((sum, [, w]) => sum + w, 0);

      // const containerWidth = 750; // Set a fixed total width you want to fit in (adjust as needed)

      // Prevent total width exceeding container width
      // if (newWidth + otherColsTotal > containerWidth) {
        // return prev; // ignore width increase beyond total
      // }

      return { ...prev, [field]: newWidth };
    });
  };

  const stopResizing = () => {
    resizeRef.current.field = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filtering and sorting code unchanged
  const filteredGuests = guests.filter((guest) => {
    const ceremonyMatch =
      ceremonyFilter === "all" || guest.attending_ceremony === Number(ceremonyFilter);

    const invitedRehearsalMatch =
      invitedRehearsalFilter === "all" ||
      (invitedRehearsalFilter === "yes" && guest.invited_rehearsal) ||
      (invitedRehearsalFilter === "no" && !guest.invited_rehearsal);

    const brunchMatch =
      brunchFilter === "all" ||
      (brunchFilter === "yes" && guest.attending_brunch) ||
      (brunchFilter === "no" && !guest.attending_brunch);

    const rehearsalMatch =
      rehearsalFilter === "all" ||
      (rehearsalFilter === "yes" && guest.attending_rehearsal) ||
      (rehearsalFilter === "no" && !guest.attending_rehearsal);

    return ceremonyMatch && brunchMatch && rehearsalMatch && invitedRehearsalMatch;
  });

  const sortedGuests = [...filteredGuests].sort((a, b) => {
    if (!sortField) return 0;
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === "string" && typeof bVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    if (sortField === "createdAt" || sortField === "updatedAt") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
      if (isNaN(aVal) || isNaN(bVal)) {
        aVal = a[sortField]?.toString() || "";
        bVal = b[sortField]?.toString() || "";
      } else {
        aVal = aVal.getTime();
        bVal = bVal.getTime();
      }
    }
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Box p={2} sx={{ maxWidth: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Guest List Table
      </Typography>

      {/* <Box
        display="flex"
        sx={{ maxWidth: "100%" }}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        mb={2}
      >
      </Box> */}
          <Box display="flex"
            sx = {{maxWidth: "100%"}}
            flexDirection={{ xs: "column", sm: "row" }}   
            gap={2}
            mb={2}>
            <Typography variant="h8">
              Filters
            </Typography>
            <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel>Ceremony</InputLabel>
              <Select
                  value={ceremonyFilter}
                  onChange={(e) => setCeremonyFilter(e.target.value)}
                  label="Ceremony"
              >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={0}>No</MenuItem>
                  <MenuItem value={-1}>Undecided</MenuItem>
              </Select>
          </FormControl>
      
          <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel>Brunch</InputLabel>
              <Select
                value={brunchFilter}
                onChange={(e) => setBrunchFilter(e.target.value)}
                label="Brunch"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
      
            <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel>Invited Rehearsal</InputLabel>
              <Select
                value={invitedRehearsalFilter}
                onChange={(e) => setInvitedRehearsalFilter(e.target.value)}
                label="Invited Rehearsal Dinner"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
      
            <FormControl size="small" sx={{ flex: 1 }}>
              <InputLabel>Rehearsal</InputLabel>
              <Select
                value={rehearsalFilter}
                onChange={(e) => setRehearsalFilter(e.target.value)}
                label="Rehearsal"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Box>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Showing {sortedGuests.length} guest{sortedGuests.length !== 1 ? "s" : ""}
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 500,
          overflowY: "auto",
          overflowX: "hidden", // <-- Disable horizontal scroll here
          width: 750, // fixed width for the container
        }}
      >
        <Table
          sx={{
            tableLayout: "fixed",
            width: "100%", // fill container exactly
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{
                    ...cellSx,
                    width: columnWidths[col.field],
                    maxWidth: columnWidths[col.field],
                    minWidth: 25,
                    position: "sticky",
                    top: 0,
                    backgroundColor: "background.paper",
                    zIndex: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingRight: 0,
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      onClick={() => handleSort(col.field)}
                      sx={{
                        flexGrow: 1,
                        cursor: "pointer",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        pr: 1,
                      }}
                      title={col.label}
                    >
                      {col.label}
                      {sortField === col.field
                        ? sortDirection === "asc"
                          ? " ▲"
                          : " ▼"
                        : ""}
                    </Box>

                    <Box
                      sx={{
                        width: 8,
                        minWidth: 8,
                        height: 24,
                        cursor: "col-resize",
                        ml: 1,
                        userSelect: "none",
                        flexShrink: 0,
                        pointerEvents: "all",
                        touchAction: "none",
                        zIndex: 1000,
                        "&:hover": { borderLeft: "2px solid #aaa" },
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        startResizing(col.field, e.clientX);
                      }}
                    >
                      <Box
                        sx={{
                          width: 2,
                          height: "100%",
                          backgroundColor: "#ccc",
                          pointerEvents: "none",
                        }}
                      />
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedGuests.map((guest) => (
              <TableRow key={guest.id}>
                {columns.map((col) => {
                  const val = guest[col.field];
                  let display =
                    col.field === "createdAt" || col.field === "updatedAt"
                      ? new Date(val).toLocaleString()
                      : typeof val === "boolean"
                      ? val
                        ? "Yes"
                        : "No"
                      : typeof val === "number"
                      ? val === 1
                        ? "Yes"
                        : val === 0
                        ? "No"
                        : "Undecided"
                      : val ?? "-";
                  return (
                    <TableCell
                      key={col.field}
                      sx={{
                        ...cellSx,
                        width: columnWidths[col.field],
                        maxWidth: columnWidths[col.field],
                        minWidth: 25,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {display}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
