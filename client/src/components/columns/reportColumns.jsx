/**
 * @module components/columns/report
 */

import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Delete from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";

import MuiStatusBadge from "../reusable/MuiStatusBadge.jsx";

/**
 * Builds the report columns for MuiDataGrid (`## MUI Component Standards`
 * §9.6): date, status badge, branch names, clock times, created date, and
 * the action column last (View + Delete — Phase 3 scope; the Edit action
 * opens the Assistant chat in Phase 5 and Archive/Restore arrive with the
 * §35 lifecycle in Phase 8, so the Phase 3 UI never offers them).
 *
 * @param {Object} handlers - Action callbacks.
 * @param {(id: string) => void} handlers.onView - View action callback.
 * @param {(id: string) => void} handlers.onDelete - Delete action callback.
 * @returns {import('@mui/x-data-grid').GridColDef[]} The report columns.
 */
export function buildReportColumns({ onView, onDelete }) {
  return [
    { field: "date", headerName: "Date", flex: 1, minWidth: 120 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 140,
      renderCell: ({ row }) => <MuiStatusBadge status={row.status} />,
    },
    { field: "branches", headerName: "Branches", flex: 2, minWidth: 200 },
    { field: "clockIn", headerName: "Clock In", flex: 1, minWidth: 110 },
    { field: "clockOut", headerName: "Clock Out", flex: 1, minWidth: 110 },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      minWidth: 150,
      valueGetter: (value) => dayjs(value).format("DD-MM-YYYY hh:mm A"),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 110,
      renderCell: ({ row }) => (
        <Stack direction="row">
          <Tooltip title="View">
            <IconButton
              aria-label="View report"
              size="small"
              onClick={() => onView(row._id)}
            >
              <Visibility fontSize="small" sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete report"
              size="small"
              onClick={() => onDelete(row._id)}
            >
              <Delete fontSize="small" sx={{ color: "error.main" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];
}
