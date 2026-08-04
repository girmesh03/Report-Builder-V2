/**
 * @module components/columns/branch
 */

import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";

/**
 * Builds the branch columns for MuiDataGrid (`## MUI Component Standards`
 * §9.6): name, location, created date, and the action column last (View,
 * Edit, Delete — Phase 3 scope; Archive/Restore arrive with the §35
 * lifecycle in Phase 8).
 *
 * @param {Object} handlers - Action callbacks.
 * @param {(id: string) => void} handlers.onView - View action callback.
 * @param {(id: string) => void} handlers.onEdit - Edit action callback.
 * @param {(id: string) => void} handlers.onDelete - Delete action callback.
 * @returns {import('@mui/x-data-grid').GridColDef[]} The branch columns.
 */
export function buildBranchColumns({ onView, onEdit, onDelete }) {
  return [
    { field: "name", headerName: "Name", flex: 2, minWidth: 180 },
    { field: "location", headerName: "Location", flex: 2, minWidth: 180 },
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
      width: 150,
      renderCell: ({ row }) => (
        <Stack direction="row">
          <Tooltip title="View">
            <IconButton
              aria-label="View branch"
              size="small"
              onClick={() => onView(row._id)}
            >
              <Visibility fontSize="small" sx={{ color: "primary.main" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              aria-label="Edit branch"
              size="small"
              onClick={() => onEdit(row._id)}
            >
              <Edit fontSize="small" sx={{ color: "warning.main" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete branch"
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
