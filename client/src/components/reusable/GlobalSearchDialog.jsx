/**
 * @module components/reusable/GlobalSearchDialog
 */

import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Close from '@mui/icons-material/Close';
import Search from '@mui/icons-material/Search';
import { useForm, useWatch } from 'react-hook-form';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';

import MuiDialog from './MuiDialog.jsx';
import MuiTextField from './MuiTextField.jsx';
import { useLazyListBranchesQuery } from '../../redux/features/branchSlice.js';
import { useLazyListReportsQuery } from '../../redux/features/reportSlice.js';

/** @type {number} Fullscreen landscape cutoff — below 768px wide. */
const FULLSCREEN_LANDSCAPE_MAX_WIDTH = 768;

/** @type {number} Centered-dialog width below the lg breakpoint. */
const DIALOG_WIDTH_SMALL = 600;

/** @type {number} Centered-dialog width at/above the md breakpoint. */
const DIALOG_WIDTH_LARGE = 600;

/** @type {number} Result page size per entity group. */
const SEARCH_LIMIT = 10;

/**
 * Global search across Reports and Branches (1.11), opened from the
 * MuiAppbar search icon. Phase 3 wires the grouped results to the
 * Reports/Branches data (T-3-01b): both queries fire on submit and results
 * render grouped in MuiAccordion sections; clicking a result navigates to
 * its detail page.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Dialog visibility.
 * @param {() => void} props.onClose - Close handler.
 * @returns {JSX.Element} The search dialog.
 */
function GlobalSearchDialog({ open, onClose }) {
  const { register, handleSubmit, reset, setValue, control } = useForm({ mode: 'onSubmit' });
  const [results, setResults] = useState({ reports: [], branches: [] });
  const [searched, setSearched] = useState(false);
  const [searchReports] = useLazyListReportsQuery();
  const [searchBranches] = useLazyListBranchesQuery();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('sm'));
  const isShortLandscape = useMediaQuery(
    `(max-width:${FULLSCREEN_LANDSCAPE_MAX_WIDTH}px) and (orientation: landscape)`,
  );
  const isLargeViewport = useMediaQuery(theme.breakpoints.up('md'));

  const searchQuery = useWatch({ control, name: 'search', defaultValue: '' });
  const hasQuery = Boolean(searchQuery?.trim());

  const fullscreen = isSmallViewport || isShortLandscape;
  const dialogWidth = isLargeViewport ? DIALOG_WIDTH_LARGE : DIALOG_WIDTH_SMALL;
  const dialogHeight = '80vh';

  const handleSearch = handleSubmit(async (values) => {
    const query = values.search.trim();
    if (!query) return;
    const [reportsResult, branchesResult] = await Promise.all([
      searchReports({ page: 1, limit: SEARCH_LIMIT, search: query, isArchived: false }),
      searchBranches({ page: 1, limit: SEARCH_LIMIT, search: query }),
    ]);
    setResults({ reports: reportsResult.data?.docs ?? [], branches: branchesResult.data?.docs ?? [] });
    setSearched(true);
  });

  const handleClear = () => {
    setValue('search', '');
    setResults({ reports: [], branches: [] });
    setSearched(false);
  };

  const handleBack = () => {
    reset({ search: '' });
    setResults({ reports: [], branches: [] });
    setSearched(false);
    onClose();
  };

  const hasResults = results.reports.length > 0 || results.branches.length > 0;

  const openReport = (report) => {
    navigate(`/reports/${report._id}/details`);
    handleBack();
  };

  const openBranch = (branch) => {
    navigate(`/branches/${branch._id}/details`);
    handleBack();
  };

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullScreen={fullscreen}
      slotProps={{
        paper: {
          sx: fullscreen
            ? undefined
            : { width: dialogWidth, maxWidth: dialogWidth, height: dialogHeight },
        },
      }}
    >
      <Box component="form" onSubmit={handleSearch} sx={{ pt: 1, px: 2, pb: 2 }}>
        <MuiTextField
          {...register('search')}
          placeholder="Search reports and branches"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <IconButton aria-label="Back" onClick={handleBack} edge="start" size="small">
                  <ArrowBack fontSize="small" />
                </IconButton>
              ),
              endAdornment: (
                <>
                  {hasQuery ? (
                    <IconButton aria-label="Clear search" onClick={handleClear} size="small">
                      <Close fontSize="small" />
                    </IconButton>
                  ) : null}
                  <IconButton aria-label="Search" type="submit" edge="end" size="small">
                    <Search fontSize="small" />
                  </IconButton>
                </>
              ),
            },
          }}
        />
      </Box>
      <Box sx={{ p: 2, overflowY: 'auto', flexGrow: 1 }}>
        {searched && !hasResults ? (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
            No results found
          </Typography>
        ) : (
          <Box>
            {results.reports.length > 0 ? (
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore fontSize="small" />}>Reports</AccordionSummary>
                <AccordionDetails>
                  {results.reports.map((report) => (
                    <ListItemButton key={report._id} onClick={() => openReport(report)}>
                      <ListItemText
                        primary={`${report.date} · ${report.status}`}
                        secondary={report.branches.map((branch) => branch.branchId?.name ?? '').join(', ')}
                      />
                    </ListItemButton>
                  ))}
                </AccordionDetails>
              </Accordion>
            ) : null}
            {results.branches.length > 0 ? (
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore fontSize="small" />}>Branches</AccordionSummary>
                <AccordionDetails>
                  {results.branches.map((branch) => (
                    <ListItemButton key={branch._id} onClick={() => openBranch(branch)}>
                      <ListItemText primary={branch.name} secondary={branch.location || undefined} />
                    </ListItemButton>
                  ))}
                </AccordionDetails>
              </Accordion>
            ) : null}
          </Box>
        )}
      </Box>
    </MuiDialog>
  );
}

GlobalSearchDialog.displayName = 'GlobalSearchDialog';

export default GlobalSearchDialog;
