import { Filter, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Box, Checkbox, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

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
    const [sortField, setSortField] = useState("updatedAt"); // "first" or "last"
    const [sortDirection, setSortDirection] = useState("desc"); // "asc" or "desc"
    const [columnWidths, setColumnWidths] = useState({
      first: 100,
      last: 100,
      attending_ceremony: 75,
      attending_brunch: 75,
      invited_rehearsal: 75,
      attending_rehearsal: 75,
      updatedAt: 100,
      notes: 200,
    });

    const cellSx = {
      padding: "4px 8px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    };

    const resizeRef = useRef({ field: null, startX: 0, initialWidth: 0 });

    const startResizing = (field, startX) => {
      resizeRef.current = {
        field,
        startX,
        initialWidth: columnWidths[field],
      };

      console.log("Resizing...");
    
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopResizing);
    };

    const onMouseMove = (e) => {
      const { field, startX, initialWidth } = resizeRef.current;
      const delta = e.clientX - startX;
    
      setColumnWidths((prev) => ({
        ...prev,
        [field]: Math.max(50, initialWidth + delta),
      }));
    };
    
    const stopResizing = () => {
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
      
        if (sortField === "createdAt" || sortField === "updatedAt") {
          // Convert to Date safely
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        
          if (isNaN(aVal) || isNaN(bVal)) {
            // fallback to string comparison if invalid
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
    {/* <Box sx = {{overflowX: "auto"}}> */}
    <Box sx={{ overflowX: "auto", position: "relative", width: "100%" }}>
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 500,
        overflow: "auto",
      }}
    >
      <Table
          sx={{
            tableLayout: "fixed",
            width: "100%",
            minWidth: Object.values(columnWidths).reduce((a, b) => a + b, 0),
            // minWidth: 800, // or dynamically calculated sum of columnWidths
          }}
        >
          <TableHead>
              <TableRow>
                  {columns && columns.map((col) => (
                    <TableCell
                      key={col.field}
                      sx={{
                        ...cellSx,
                        width: columnWidths[col.field],
                        maxWidth: columnWidths[col.field],
                        minWidth: 15,
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
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box onClick = {() => handleSort(col.field)}
                        sx={{
                          flexGrow: 1,
                          cursor: "pointer",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          pr: 1,
                        }}
                        title={col.label} // Tooltip on hover
                        // sx = {{flexGrow: 1, cursor: "Pointer"}}
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
                      </Box>
                        {/* <Box
                          draggable
                          onDragStart={(e) => e.preventDefault()}
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
                            '&:hover': { borderLeft: '2px solid #aaa' },
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            startResizing(col.field, e.clientX);
                          }}
                        >
                          <Box sx={{ width: 2, height: "100%", backgroundColor: "#ccc" }} />
                        </Box> */}

                        <Box
  draggable
  onDragStart={(e) => e.preventDefault()}
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
    '&:hover': { borderLeft: '2px solid #aaa' },
  }}
  onMouseDown={(e) => {
    console.log("MouseDown on resizer for", col.field);
    e.preventDefault();
    e.stopPropagation();
    console.log("MouseDown on resizer for", col.field); // ✅ debug
    startResizing(col.field, e.clientX);
  }}
>
  <Box
    sx={{
      width: 2,
      height: "100%",
      backgroundColor: "#ccc",
      pointerEvents: "none", // 👈 ensures outer Box receives click
    }}
  />
</Box>

                    </Box>
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
                          return (
                            <TableCell
                              key={col.field}
                              sx={{
                                ...cellSx,
                                width: columnWidths[col.field],
                                maxWidth: columnWidths[col.field],
                                minWidth: 15,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
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

  </Box>
);
}