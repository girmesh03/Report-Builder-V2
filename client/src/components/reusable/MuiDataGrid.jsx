/**
 * @module components/reusable/MuiDataGrid
 */

import { DataGrid } from "@mui/x-data-grid/DataGrid";

import MuiEmptyState from "./MuiEmptyState.jsx";

/**
 * Reusable server-side-paginated data grid (1.8): `showToolbar` renders
 * MUI X v9's default toolbar — Columns toggle, Filter (with count badge),
 * and CSV export — on every viewport (in v9 the toolbar slot renders only
 * when `showToolbar` is true; the deprecated `GridToolbar` import from
 * `@mui/x-data-grid/components` is never used). `checkboxSelection` stays
 * enabled on all viewports; `paginationMode="server"`, skeleton loading
 * overlay, MuiEmptyState empty overlay, and
 * `pageSizeOptions={[10, 25, 50, 100]}` (`## MUI Component Standards`
 * §9.6). The toolbar renders `showQuickFilter: false` with a wrapping row:
 * the quick-filter field expands to 260px on focus and, on a non-wrapping
 * toolbar row, pushes the buttons off narrow screens. CSV export honors
 * the selection: `csvOptions.getRowsToExport` receives `{ apiRef }` (the
 * v8 GridToolbar consumes only `showQuickFilter`/`quickFilterProps`/
 * `csvOptions`/`printOptions`/`mainControls`/`additionalExportMenuItems` —
 * any other key, e.g. the v7 `csvExportOptions`, falls through to the DOM)
 * and returns the selected row ids, or `undefined` (all rows) when nothing
 * is selected. Rows are keyed via `getRowId` defaulting to
 * `(row) => row._id` — the client's canonical identity is `_id` (DM-03
 * strips the `id` virtual, so API docs never carry `id`); callers may
 * override `getRowId`. A plain function component (no `forwardRef`); no
 * caller passes a ref. Columns live in `client/src/components/columns/*.jsx`
 * with the action column last.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.emptyResource] - Resource name for the empty-state headline ("No {resource} yet").
 * @returns {JSX.Element} The MUI data grid.
 */
function MuiDataGrid({ emptyResource = "rows", slotProps, sx, ...rest }) {
  const NoRowsOverlay = () => (
    <MuiEmptyState resource={emptyResource} dense minHeight="240px" />
  );

  return (
    <DataGrid
      {...rest}
      getRowId={rest.getRowId ?? ((row) => row._id)}
      checkboxSelection={rest.checkboxSelection ?? true}
      disableRowSelectionOnClick={rest.disableRowSelectionOnClick ?? true}
      showToolbar={rest.showToolbar ?? true}
      paginationMode="server"
      pageSizeOptions={[10, 25, 50, 100]}
      slots={{ noRowsOverlay: NoRowsOverlay, ...rest.slots }}
      slotProps={{
        toolbar: {
          showQuickFilter: false,
          sx: { flexWrap: "wrap" },
          csvOptions: {
            getRowsToExport: ({ apiRef }) => {
              const selected = apiRef.current.getSelectedRows();
              return selected.size ? [...selected.keys()] : undefined;
            },
          },
        },
        loadingOverlay: { variant: "skeleton" },
        ...slotProps,
      }}
      sx={{ height: { xs: 320, sm: 400 }, ...sx }}
    />
  );
}

MuiDataGrid.displayName = "MuiDataGrid";

export default MuiDataGrid;
