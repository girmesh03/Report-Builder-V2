/**
 * @module components/branch/BranchFormDialog
 */

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import LocationOn from '@mui/icons-material/LocationOn';
import Storefront from '@mui/icons-material/Storefront';
import { toast } from 'react-toastify';

import MuiButton from '../reusable/MuiButton.jsx';
import MuiDialog from '../reusable/MuiDialog.jsx';
import MuiTextField from '../reusable/MuiTextField.jsx';
import { useCreateBranchMutation, useUpdateBranchMutation } from '../../redux/features/branchSlice.js';

/**
 * Branch create/edit dialog (`## UI/UX Spec` §11 — branch dialogs live
 * under `client/src/components/branch/`): name (required) and location
 * (optional). The dialog is centered on all viewports (`fullScreen={false}` —
 * it never takes over the screen) with the shared paper treatment
 * `sx={{ "& .MuiPaper-root": { m: 1, py: 1 } }}`; DialogContent is `p: 0`
 * with a 400px scroll cap (`## MUI Component Standards` §5), so the form
 * grid restores the inset with `px: 1, py: 2`. Create mode posts
 * `POST /api/v1/branches`; edit mode puts `PUT /api/v1/branches/:id`; 422
 * responses surface per-field via `setError` (`## React Hook Form
 * Standards` §6).
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Dialog visibility.
 * @param {object | null} props.branch - Branch being edited, or null for create.
 * @param {() => void} props.onClose - Close handler.
 * @returns {JSX.Element} The branch form dialog.
 */
function BranchFormDialog({ open, branch, onClose }) {
  const [createBranch, { isLoading: isCreating }] = useCreateBranchMutation();
  const [updateBranch, { isLoading: isUpdating }] = useUpdateBranchMutation();
  const isEditing = Boolean(branch);
  const { register, handleSubmit, reset, setError, formState } = useForm({
    mode: 'onBlur',
    defaultValues: { name: '', location: '' },
  });

  useEffect(() => {
    if (open) {
      reset({ name: branch?.name ?? '', location: branch?.location ?? '' });
    }
  }, [open, branch, reset]);

  const handleSubmitForm = handleSubmit(async (values) => {
    try {
      if (isEditing) {
        await updateBranch({ id: branch._id, ...values }).unwrap();
        toast.success('Branch updated');
      } else {
        await createBranch(values).unwrap();
        toast.success('Branch created');
      }
      onClose();
    } catch (error) {
      const errors = error.data?.data?.errors;
      if (errors) {
        errors.forEach((item) => setError(item.field ?? 'root', { type: 'server', message: item.message }));
      }
    }
  });

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      title={isEditing ? 'Edit Branch' : 'Create Branch'}
      maxWidth="sm"
      fullWidth
      fullScreen={false}
      sx={{ "& .MuiPaper-root": { m: 1, py: 1 } }}
      actions={
        <>
          <MuiButton variant="outlined" onClick={onClose} sx={{ flexShrink: 0 }}>
            Cancel
          </MuiButton>
          <MuiButton
            type="submit"
            variant="contained"
            loading={isCreating || isUpdating}
            form="branch-form"
            sx={{ flexShrink: 0 }}
          >
            Submit
          </MuiButton>
        </>
      }
    >
      <form id="branch-form" onSubmit={handleSubmitForm} noValidate>
        <Grid container spacing={2} sx={{ px: 1, py: 2 }}>
          <Grid size={{ xs: 12 }}>
            <MuiTextField
              {...register('name', { required: 'Name is required' })}
              label="Name"
              fullWidth
              error={Boolean(formState.errors.name)}
              helperText={formState.errors.name?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <Storefront sx={{ color: 'text.secondary', mr: 1 }} />
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <MuiTextField
              {...register('location')}
              label="Location"
              fullWidth
              error={Boolean(formState.errors.location)}
              helperText={formState.errors.location?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <LocationOn sx={{ color: 'text.secondary', mr: 1 }} />
                  ),
                },
              }}
            />
          </Grid>
        </Grid>
      </form>
    </MuiDialog>
  );
}

BranchFormDialog.displayName = 'BranchFormDialog';

export default BranchFormDialog;
