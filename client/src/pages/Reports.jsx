/**
 * @module pages/Reports
 */

import { useState } from 'react';
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import FilterList from '@mui/icons-material/FilterList';
import ViewGrid from '@mui/icons-material/GridView';
import ViewList from '@mui/icons-material/ViewList';
import Visibility from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import MuiButton from '../components/reusable/MuiButton.jsx';
import MuiConfirmDialog from '../components/reusable/MuiConfirmDialog.jsx';
import MuiDataGrid from '../components/reusable/MuiDataGrid.jsx';
import MuiEmptyState from '../components/reusable/MuiEmptyState.jsx';
import MuiPageHeader from '../components/reusable/MuiPageHeader.jsx';
import MuiPagination from '../components/reusable/MuiPagination.jsx';
import MuiStatusBadge from '../components/reusable/MuiStatusBadge.jsx';
import LoadingSpinner from '../components/reusable/LoadingSpinner.jsx';
import CreateReportDialog from '../components/report/CreateReportDialog.jsx';
import ReportFilterDialog from '../components/report/ReportFilterDialog.jsx';
import { buildReportColumns } from '../components/columns/reportColumns.jsx';
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_PAGE } from '../utils/constants.js';
import { formatEthiopianDateLong, gregorianToEthiopian } from '../utils/ethiopianDate.js';
import { useDeleteReportMutation, useListReportsQuery } from '../redux/features/reportSlice.js';

/**
 * Reports page (`## UI/UX Spec` §10): Page Header with filter badge,
 * list/grid toggle, and Create action (icon-only + tooltip on mobile
 * portrait, labeled button otherwise); filter dialog; card list view with
 * LoadingSpinner while the first page loads, MuiEmptyState when no reports
 * exist, and MuiPagination only when more than one page exists; MuiDataGrid
 * grid view; delete via MuiConfirmDialog.
 * Phase 3 subset: the Edit action (opens the Assistant chat) arrives with
 * Phase 5 and Archive/Restore with the §35 lifecycle in Phase 8.
 *
 * @returns {JSX.Element} The reports page.
 */
function Reports() {
  const navigate = useNavigate();
  const isSmallPortrait = useMediaQuery('(max-width:599.95px) and (orientation: portrait)');
  const [viewMode, setViewMode] = useState('list');
  const [page, setPage] = useState(PAGINATION_DEFAULT_PAGE);
  const [limit, setLimit] = useState(PAGINATION_DEFAULT_LIMIT);
  const [filters, setFilters] = useState({ date: null, branchId: '', isArchived: false });
  const [filterOpen, setFilterOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();

  const activeFilterCount = (filters.date ? 1 : 0) + (filters.branchId ? 1 : 0) + (filters.isArchived ? 1 : 0);

  const dateFilter = filters.date
    ? formatEthiopianDateLong(
        gregorianToEthiopian(filters.date.year(), filters.date.month() + 1, filters.date.date()),
      )
    : undefined;

  const { data, isFetching } = useListReportsQuery({
    page,
    limit,
    date: dateFilter,
    branchId: filters.branchId || undefined,
    isArchived: filters.isArchived,
  });

  const rows = (data?.docs ?? []).map((report) => ({
    _id: report._id,
    date: report.date,
    status: report.status,
    branches: report.branches.map((branch) => branch.branchId?.name ?? '').join(', '),
    clockIn: report.clockIn,
    clockOut: report.clockOut,
    createdAt: report.createdAt,
  }));

  const handleDelete = async () => {
    try {
      await deleteReport(deleteTarget).unwrap();
      toast.success('Report deleted');
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error.data?.message || 'Failed to delete report');
    }
  };

  const handleView = (id) => navigate(`/reports/${id}/details`);

  const reportColumns = buildReportColumns({ onView: handleView, onDelete: setDeleteTarget });

  return (
    <>
      <MuiPageHeader title="Reports" subtitle="Manage daily supervision reports">
        <Tooltip title="Filter Reports">
          <IconButton aria-label="Filter Reports" size="small" onClick={() => setFilterOpen(true)}>
            <Badge badgeContent={activeFilterCount} color="primary" invisible={activeFilterCount === 0}>
              <FilterList />
            </Badge>
          </IconButton>
        </Tooltip>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={viewMode}
          onChange={(_event, nextMode) => {
            if (nextMode) setViewMode(nextMode);
          }}
        >
          <ToggleButton value="list" aria-label="List view">
            <ViewList />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="Grid view">
            <ViewGrid />
          </ToggleButton>
        </ToggleButtonGroup>
        {isSmallPortrait ? (
          <Tooltip title="Create Report">
            <IconButton aria-label="Create Report" color="primary" size="small" onClick={() => setCreateOpen(true)}>
              <Add />
            </IconButton>
          </Tooltip>
        ) : (
          <MuiButton variant="contained" startIcon={<Add />} onClick={() => setCreateOpen(true)} sx={{ flexShrink: 0 }}>
            Create
          </MuiButton>
        )}
      </MuiPageHeader>

      {viewMode === 'list' ? (
        isFetching && !data ? (
          <LoadingSpinner minHeight="320px" />
        ) : data?.docs?.length ? (
          <>
            <Grid container spacing={2}>
              {(data?.docs ?? []).map((report) => (
                <Grid key={report._id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card variant="outlined">
                    <CardContent sx={{ pb: 1 }}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {report.date}
                        </Typography>
                        <MuiStatusBadge status={report.status} />
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {report.branches.map((branch) => branch.branchId?.name ?? '').join(', ') || 'No branches'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {report.clockIn} – {report.clockOut}
                      </Typography>
                    </CardContent>
                    <CardActions>
                        <Tooltip title="View">
                          <IconButton aria-label="View report" size="small" onClick={() => handleView(report._id)}>
                            <Visibility fontSize="small" sx={{ color: 'primary.main' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton aria-label="Delete report" size="small" onClick={() => setDeleteTarget(report._id)}>
                          <Delete fontSize="small" sx={{ color: 'error.main' }} />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {data && data.totalPages > 1 ? (
              <Stack direction="row" sx={{ mt: 2, justifyContent: 'center' }}>
                <MuiPagination page={page} count={data.totalPages} onChange={(_event, value) => setPage(value)} />
              </Stack>
            ) : null}
          </>
        ) : (
          <MuiEmptyState
            resource="reports"
            subtitle="Create a report to get started"
            action={
              <MuiButton variant="contained" startIcon={<Add />} onClick={() => setCreateOpen(true)}>
                Create Report
              </MuiButton>
            }
          />
        )
      ) : (
        <MuiDataGrid
          rows={rows}
          columns={reportColumns}
          loading={isFetching}
          rowCount={data?.totalDocs ?? 0}
          paginationModel={{ page: page - 1, pageSize: limit }}
          onPaginationModelChange={(model) => {
            setPage(model.page + 1);
            setLimit(model.pageSize);
          }}
          emptyResource="reports"
        />
      )}

      <ReportFilterDialog
        open={filterOpen}
        filters={filters}
        onApply={(nextFilters) => {
          setFilters(nextFilters);
          setPage(PAGINATION_DEFAULT_PAGE);
        }}
        onClose={() => setFilterOpen(false)}
      />
      <CreateReportDialog open={createOpen} onClose={() => setCreateOpen(false)} />
      <MuiConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Report"
        message="This permanently deletes the report. This cannot be undone."
        confirmText="Delete"
        confirmColor="error"
        confirmLoading={isDeleting}
      />
    </>
  );
}

Reports.displayName = 'Reports';

export default Reports;
