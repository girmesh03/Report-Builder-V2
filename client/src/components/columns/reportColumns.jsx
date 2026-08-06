/**
 * @module components/columns/report
 */

import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";

import MuiStatusBadge from "../reusable/MuiStatusBadge.jsx";

/**
 * Builds the report columns for MuiDataGrid (`## MUI Component Standards`
 * §9.6): date, status badge, branch names, clock times, created date, and
 * the action column last (View, Edit → opens the Assistant chat, Delete;
 * Archive/Restore arrive with the §35 lifecycle in Phase 8).
 *
 * @param {Object} handlers - Action callbacks.
 * @param {(id: string) => void} handlers.onView - View action callback.
 * @param {(id: string) => void} handlers.onEdit - Edit (Assistant) action callback.
 * @param {(id: string) => void} handlers.onDelete - Delete action callback.
 * @returns {import('@mui/x-data-grid').GridColDef[]} The report columns.
 */
export function buildReportColumns({ onView, onDelete, onEdit }) {
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
      width: 140,
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
          <Tooltip title="Edit Report">
            <IconButton
              aria-label="Edit report in assistant"
              size="small"
              onClick={() => onEdit(row._id)}
            >
              <Edit fontSize="small" sx={{ color: "info.main" }} />
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
