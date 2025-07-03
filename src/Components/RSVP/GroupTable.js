import { Filter, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box, Checkbox, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import { useState } from "react";

const columns = [
    { field: "first", label: "First" },
    { field: "last", label: "Last" },
    { field: "attending_ceremony", label: "Ceremony" },
    { field: "attending_brunch", label: "Brunch" },
    { field: "invited_rehearsal", label: "Invited to Rehearsal Dinner"},
    { field: "attending_rehearsal", label: "Rehearsal" },
    { field: "updatedAt", label: "Updated" },
    { field: "notes", label: "Notes" },
  ];  

export default function GroupTable ({guests}) {

    const [ceremonyFilter, setCeremonyFilter] = useState("all");
    const [brunchFilter, setBrunchFilter] = useState("all");
    const [invitedRehearsalFilter, setInvitedRehearsalFilter] = useState("all");
    const [rehearsalFilter, setRehearsalFilter] = useState("all");
    const [sortField, setSortField] = useState(null); // "first" or "last"
    const [sortDirection, setSortDirection] = useState("asc"); // "asc" or "desc"
    
    const handleSort = (field) => {
        if (sortField === field) {
          setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
          setSortField(field);
          setSortDirection("asc");
        }
      };      

  
    const filteredGuests = guests.filter((guest) => {
    //   const ceremonyMatch =
        // ceremonyFilter === "all" ||
        // (ceremonyFilter === "yes" && guest.attending_ceremony === 1) ||
        // (ceremonyFilter === "no" && guest.attending_ceremony !== 1);
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
      
        // Convert to lowercase string if text
        if (typeof aVal === "string" && typeof bVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
      
        // Convert to timestamp if date
        if (sortField === "createdAt" || sortField === "updatedAt") {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        }
      
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
      

return (
    <Box p={2}
      sx = {{maxWidth: "100%"}}
      >
    <Typography variant="h6" gutterBottom>
      Guest List Table
    </Typography>
    {/* <Typography variant="h8" gutterBottom>
      Filters
    </Typography> */}
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
    <Box sx = {{overflowX: "auto"}}>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 500,
          overflowY: "auto"
        }}
      >
        <Table>
          <TableHead>
              <TableRow>
                  {columns && columns.map((col) => (
                  <TableCell
                      sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "background.paper",
                        zIndex: 1,
                        whiteSpace: "nowrap",
                        maxWidth: 100,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                      }}
                      // sx={{ whiteSpace: "nowrap", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", cursor: "pointer" }}
                      // className="groupTableHeaderCell"
                      key={col.field}
                      onClick={() => handleSort(col.field)}
                      // sx={{ cursor: "pointer" }}
                  >
                      {
                      col.field === "attending_ceremony" && ceremonyFilter===1 ? <ThumbUp sx={{fontSize: '1.2em'}} color="primary"></ThumbUp>
                      : col.field === "attending_ceremony" && ceremonyFilter ===0 ? <ThumbDown sx={{fontSize: '1.2em'}} color="secondary"></ThumbDown>
                    : col.field === "attending_rehearsal" && rehearsalFilter === "yes" ? <ThumbUp sx={{fontSize: '1.2em'}} color="primary"></ThumbUp>
                    : col.field === "attending_rehearsal" && rehearsalFilter === "no" ? <ThumbDown sx={{fontSize: '1.2em'}} color="secondary"></ThumbDown>
                    : col.field === "attending_brunch" && brunchFilter === "yes" ? <ThumbUp sx={{fontSize: '1.2em'}} color="primary"></ThumbUp>
                    : col.field === "attending_brunch" && brunchFilter === "no" ? <ThumbDown sx={{fontSize: '1.2em'}} color = "secondary"></ThumbDown>
                    :<></>
                    }
                      {col.label}
                      {sortField === col.field ? (sortDirection === "asc" ? " ▲" : " ▼") : ""}
                  </TableCell>
                  ))}
              </TableRow>
          </TableHead>

          <TableBody>
              {sortedGuests && sortedGuests.map((guest) => (
                  <TableRow key={guest.id}>
                  {columns && columns.map((col) => {
                      const val = guest[col.field];
                      let display =
                      col.field === "createdAt" || col.field === "updatedAt"
                          ? new Date(val).toLocaleString()
                          : typeof val === "boolean"
                          ? val ? "Yes" : "No"
                          : typeof val === "number"
                          ? (val === 1 ? "Yes" : val === 0 ? "No" : "Undecided")
                          : val ?? "-";
                      return <TableCell 
                        sx={{ whiteSpace: "nowrap", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis" }}
                        key={col.field}>{display}</TableCell>;
                  })}
                  </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  </Box>
);
}