/**
 * @module pages/Branches
 */

import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import Add from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import BranchFormDialog from '../components/branch/BranchFormDialog.jsx';
import { buildBranchColumns } from '../components/columns/branchColumns.jsx';
import MuiButton from '../components/reusable/MuiButton.jsx';
import MuiConfirmDialog from '../components/reusable/MuiConfirmDialog.jsx';
import MuiDataGrid from '../components/reusable/MuiDataGrid.jsx';
import MuiPageHeader from '../components/reusable/MuiPageHeader.jsx';
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_PAGE } from '../utils/constants.js';
import { useDeleteBranchMutation, useListBranchesQuery } from '../redux/features/branchSlice.js';

/**
 * Branches page (`## UI/UX Spec` §11, route `branches`): branch list with
 * create and edit dialogs (under `client/src/components/branch/`), delete
 * via MuiConfirmDialog; the Create action is icon-only + tooltip on mobile
 * portrait, a labeled button otherwise. Phase 3 subset: Archive/Restore
 * arrive with the §35 lifecycle in Phase 8; BranchDetails is a later-phase
 * page.
 *
 * @returns {JSX.Element} The branches page.
 */
function Branches() {
  const navigate = useNavigate();
  const isSmallPortrait = useMediaQuery('(max-width:599.95px) and (orientation: portrait)');
  const [page, setPage] = useState(PAGINATION_DEFAULT_PAGE);
  const [limit, setLimit] = useState(PAGINATION_DEFAULT_LIMIT);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteBranch, { isLoading: isDeleting }] = useDeleteBranchMutation();
  const { data, isFetching } = useListBranchesQuery({ page, limit, search: '' });

  const rows = (data?.docs ?? []).map((branch) => ({
    _id: branch._id,
    name: branch.name,
    location: branch.location ?? '',
    createdAt: branch.createdAt,
  }));

  const handleDelete = async () => {
    try {
      await deleteBranch(deleteTarget).unwrap();
      toast.success('Branch deleted');
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error.data?.message || 'Failed to delete branch');
    }
  };

  const branchColumns = buildBranchColumns({
    onView: (id) => navigate(`/branches/${id}/details`),
    onEdit: (id) => {
      setEditingBranch(rows.find((branch) => branch._id === id) ?? null);
      setFormOpen(true);
    },
    onDelete: setDeleteTarget,
  });

  return (
    <>
      <MuiPageHeader title="Branches" subtitle="Manage supervision branches">
        {isSmallPortrait ? (
          <Tooltip title="Create Branch">
            <IconButton
              aria-label="Create Branch"
              color="primary"
              size="small"
              onClick={() => {
                setEditingBranch(null);
                setFormOpen(true);
              }}
            >
              <Add />
            </IconButton>
          </Tooltip>
        ) : (
          <MuiButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setEditingBranch(null);
              setFormOpen(true);
            }}
            sx={{ flexShrink: 0 }}
          >
            Create
          </MuiButton>
        )}
      </MuiPageHeader>

      <MuiDataGrid
        rows={rows}
        columns={branchColumns}
        loading={isFetching}
        rowCount={data?.totalDocs ?? 0}
        paginationModel={{ page: page - 1, pageSize: limit }}
        onPaginationModelChange={(model) => {
          setPage(model.page + 1);
          setLimit(model.pageSize);
        }}
        emptyResource="branches"
      />

      <BranchFormDialog open={formOpen} branch={editingBranch} onClose={() => setFormOpen(false)} />
      <MuiConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Branch"
        message="This permanently deletes this branch. This cannot be undone."
        confirmText="Delete"
        confirmColor="error"
        confirmLoading={isDeleting}
      />
    </>
  );
}

Branches.displayName = 'Branches';

export default Branches;
