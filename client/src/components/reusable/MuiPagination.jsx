/**
 * @module components/reusable/MuiPagination
 */

import Pagination from '@mui/material/Pagination';

/**
 * Pure wrapper around MUI Pagination with safe defaults (1.7); used for
 * list-view pagination only (never inside DataGrid). `count` comes from the
 * server's `totalPages` (`mongoose-paginate-v2`) — no client-side
 * calculation (`## MUI Component Standards` §9.5).
 *
 * @param {Object} props - All standard MUI Pagination props pass through.
 * @returns {JSX.Element} The MUI pagination.
 */
function MuiPagination(props) {
  return <Pagination {...props} color={props.color ?? 'primary'} shape={props.shape ?? 'rounded'} />;
}

MuiPagination.displayName = 'MuiPagination';

export default MuiPagination;
