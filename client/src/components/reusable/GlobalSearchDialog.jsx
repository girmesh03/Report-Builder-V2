/**
 * @module components/reusable/GlobalSearchDialog
 */

import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
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

import MuiDialog from './MuiDialog.jsx';
import MuiTextField from './MuiTextField.jsx';

/** @type {number} Fullscreen landscape cutoff — below 768px wide. */
const FULLSCREEN_LANDSCAPE_MAX_WIDTH = 768;

/** @type {number} Centered-dialog width below the lg breakpoint. */
const DIALOG_WIDTH_SMALL = 600;

/** @type {number} Centered-dialog width at/above the md breakpoint. */
const DIALOG_WIDTH_LARGE = 600;

/**
 * Global search across Reports and Branches (1.11), opened from the
 * MuiAppbar search icon. The Phase 2 build ships the full UI shell; the
 * grouped results are wired to the Reports/Branches data in Phase 3, so the
 * empty state renders until then.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Dialog visibility.
 * @param {() => void} props.onClose - Close handler.
 * @returns {JSX.Element} The search dialog.
 */
function GlobalSearchDialog({ open, onClose }) {
  const { register, handleSubmit, reset, setValue, control } = useForm({ mode: 'onSubmit' });
  const [results, setResults] = useState({ reports: [], branches: [] });
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

  const handleSearch = handleSubmit(() => {
    // Phase 3: query the Reports/Branches data and populate `results`.
  });

  const handleClear = () => {
    setValue('search', '');
    setResults({ reports: [], branches: [] });
  };

  const handleBack = () => {
    reset({ search: '' });
    setResults({ reports: [], branches: [] });
    onClose();
  };

  const hasResults = results.reports.length > 0 || results.branches.length > 0;

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullScreen={fullscreen}
      contentSx={{ p: 0 }}
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
        {!hasResults ? (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
            No results found
          </Typography>
        ) : (
          <Box>
            {results.reports.length > 0 ? (
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore fontSize="small" />}>Reports</AccordionSummary>
                <AccordionDetails>{/* Phase 3: report result rows */}</AccordionDetails>
              </Accordion>
            ) : null}
            {results.branches.length > 0 ? (
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore fontSize="small" />}>Branches</AccordionSummary>
                <AccordionDetails>{/* Phase 3: branch result rows */}</AccordionDetails>
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
