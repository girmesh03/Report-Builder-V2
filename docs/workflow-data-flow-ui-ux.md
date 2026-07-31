# Workflow, Data Flow & UI/UX

## 1. Global Reusable Components

- 1.1 MuiAppbar
  - **File:** `client/src/components/reusable/MuiAppbar.jsx`
  - **Purpose:** Single reusable app bar configurable for both PublicLayout (full-width, top-level) and AppShell (inside content area, beside sidebar).
  - **Props:**
    - `position` — MUI AppBar position, default `"fixed"`
    - `elevation` — shadow depth, default `1`
    - `color` — MUI AppBar color prop, default `"inherit"`
    - `sx` — additional sx overrides
    - All standard MUI AppBar props passed through (pure wrapper, no custom API surface)
  - **Left Section:** Logo icon + app name. Click navigates to `/dashboard` if authenticated, `/` if not.
  - **Right Section:** Renders conditionally based on auth state.
  - **Public Layout Behavior:**
    - Full width (`width: 100%`)
    - `position="fixed"`
    - Unauthenticated: Theme toggle, Login button, Sign Up button
    - Authenticated: Theme toggle, Logout button (icon + tooltip)
  - **Protected Layout (AppShell) Behavior:**
    - Sits inside content area (NOT spanning across sidebar)
    - `position="static"`
    - Height: `64px`
    - No title text in the bar
    - Right section: Search icon (opens GlobalSearchDialog), Theme toggle, User avatar (dropdown: Profile + Logout)
    - Avatar sizes: `32px` below 600px, `36px` above 600px
  - **Auth Detection:** Reads auth state from Redux `authSlice` via `useSelector`
  - **Excluded from MuiAppbar:**
    - Search dialog content → handled via `GlobalSearchDialog`
    - User dropdown menu → rendered inline where used
    - Hamburger menu → handled by `AppSidebar` header
- 1.2 MuiButton
  - **File:** `client/src/components/reusable/MuiButton.jsx`
  - **Purpose:** Pure wrapper around MUI Button with safe defaults. Presentation wrapper — no `forwardRef` needed.
  - **Defaults:**
    - `size="small"`
    - `loadingIndicator={<CircularProgress size={20} />}`
    - `loadingPosition="center"`
    - Uses MUI native `loading` prop (not custom loading state)
  - **Prop Passthrough:** All standard MUI Button props pass through (`variant`, `color`, `disabled`, `onClick`, `type`, `startIcon`, `endIcon`, `sx`, `fullWidth`, etc.). Pure wrapper — no custom API surface.
  - **Setup:**
    - Tree-shaken import: `import Button from '@mui/material/Button'`
    - `displayName` set to `"MuiButton"`
  - **Variants (via passthrough):** `contained` (default), `outlined`, `text`
  - **Form Usage:**
    - Submit buttons use `type="submit"` and `size="small"`
    - `sx={{ flexShrink: 0 }}` to prevent shrinking
    - Disabled via `isSubmitting` from RHF `formState`
  - **Icon Rules:**
    - Icon-only buttons use raw `@mui/material/IconButton`, not MuiButton
    - Buttons with icons use standard `startIcon` / `endIcon` props
- 1.3 MuiDialog
  - **File:** `client/src/components/reusable/MuiDialog.jsx`
  - **Purpose:** Structural wrapper providing common dialog skeleton — title bar, scrollable content area, action buttons — with built-in dividers and responsive fullscreen. Always used instead of raw `@mui/material/Dialog`.
  - **Internal Structure:**
    - `<Dialog>` with defaults and passthrough props
    - `<DialogTitle>` with bottom `borderBottom` divider — rendered only if `title` prop is provided
    - `<DialogContent>` with `overflowY: auto` — the only scrollable section
    - `<Divider />` — rendered only if `actions` prop is provided
    - `<DialogActions>` — rendered only if `actions` prop is provided
  - **Props:**
    - `title` — string or ReactNode, rendered in DialogTitle with bottom divider
    - `children` — ReactNode, rendered inside scrollable DialogContent
    - `actions` — ReactNode, rendered inside DialogActions preceded by a Divider
    - `disableEnforceFocus` — default `true`
    - `disableRestoreFocus` — default `true`
    - All standard MUI Dialog props pass through (`open`, `onClose`, `maxWidth`, `fullWidth`, `fullScreen`, `scroll`, `PaperProps`, `sx`, `slotProps`, etc.)
  - **Responsive Fullscreen:**
    - Internal `useMediaQuery` checks `theme.breakpoints.down('sm')` OR `theme.breakpoints.down('md')` with landscape
    - When matched: `fullScreen={true}` — no border radius, 100vh
    - Overridable by caller passing explicit `fullScreen` prop
  - **MuiButton Integration:**
    - Caller provides MuiButton components inside the `actions` slot with proper props (e.g., `<MuiButton variant="outlined">Cancel</MuiButton>`)
    - Exception: GlobalSearchDialog (1.11) is a standalone component and does not use MuiDialog's actions slot
  - **Setup:**
    - Tree-shaken imports: `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`, `Divider`
    - `displayName` set to `"MuiDialog"`
- 1.4 MuiTextField
  - **File:** `client/src/components/reusable/MuiTextField.jsx`
  - **Purpose:** Single reusable text input wrapping MUI TextField. Handles all text types including password (no separate MuiPasswordField). `forwardRef` for RHF `register` compatibility.
  - **Defaults:**
    - `size="small"`
    - Tree-shaken: `import TextField from '@mui/material/TextField'`
    - `displayName` set to `"MuiTextField"`
  - **forwardRef & RHF Integration:**
    - Wrapped with `forwardRef` so `register('fieldName')` works directly
    - Props: `name`, `label`, `error` (bool), `helperText` (string)
    - Caller connects: `error={!!errors.fieldName} helperText={errors.fieldName?.message}`
  - **Start Adornment (mandatory):**
    - Every instance must have a proper start adornment
    - Caller passes via `slotProps.input.startAdornment`
    - Uses `slotProps.input` — never deprecated `InputProps`
  - **End Adornment:**
    - Caller passes via `slotProps.input.endAdornment`
    - When `type="password"`, eye toggle is internally injected as end adornment
  - **Password Type Handling (replaces MuiPasswordField):**
    - When `type="password"`, internal `useState` toggles between `"password"` and `"text"`
    - Eye icon (`Visibility`/`VisibilityOff`) as end adornment
    - `onMouseDown` on eye icon prevents focus loss
    - No layout shift on toggle
    - Merges caller's `slotProps.input.endAdornment` after the eye icon
  - **Prop Passthrough:** All standard MUI TextField props: `type`, `placeholder`, `disabled`, `required`, `multiline`, `rows`, `maxRows`, `fullWidth`, `sx`, `slotProps`, etc. `type` defaults to `"text"`.
  - **Error Display:** `error` and `helperText` passed directly to MUI TextField.
  - **Validation:** No zod — manual validation with consistent error shape.
- 1.5 MuiSelect
  - **File:** `client/src/components/reusable/MuiSelect.jsx`
  - **Purpose:** Reusable select input wrapping MUI Select. `forwardRef` for RHF `register` compatibility.
  - **Defaults:**
    - `size="small"`
    - `MenuProps={{ slotProps: { paper: { sx: { maxHeight: 300 } } } }}` — consistent dropdown height
    - Tree-shaken: `import Select from '@mui/material/Select'`
    - `displayName` set to `"MuiSelect"`
  - **forwardRef & RHF Integration:**
    - Wrapped with `forwardRef` so `register('fieldName')` works directly
    - Props: `name`, `label`, `error` (bool), `helperText` (string), `value`, `onChange`
    - Caller connects: `error={!!errors.fieldName} helperText={errors.fieldName?.message}`
  - **Start Adornment (mandatory):**
    - Every instance must have a proper start adornment
    - Caller passes via `slotProps.input.startAdornment`
    - Uses `slotProps.input` — never deprecated `InputProps`
  - **Children (Options):** Caller provides `<MenuItem>` children rendered directly inside `<Select>`.
  - **Prop Passthrough:** All standard MUI Select props: `variant`, `placeholder`, `disabled`, `required`, `fullWidth`, `sx`, `displayEmpty`, `renderValue`, `slotProps`, etc.
  - **Error Display:** `error` and `helperText` passed directly to MUI Select.
  - **Validation:** No zod — manual validation with consistent error shape.
- 1.6 MuiDatePicker
  - **File:** `client/src/components/reusable/MuiDatePicker.jsx`
  - **Purpose:** Responsive date picker for Ethiopian dates with English day/month names. Always community version.
  - **Responsive Switching (explicit, never auto):**
    - `md+` (>=900px): `DesktopDatePicker` — popper mode
    - `<md` (<900px): `MobileDatePicker` — dialog mode
    - Uses `theme.breakpoints.up('md')` via `useMediaQuery`
    - Both imported tree-shaken from `@mui/x-date-pickers`
  - **Ethiopian Calendar Integration:**
    - Utility file: `client/src/utils/ethiopianDate.js`
      - `ethiopianToGregorian(ethDate)` → JS Date
      - `gregorianToEthiopian(jsDate)` → `{ day, month, year }`
    - Custom lightweight conversion (no external npm package)
    - Ethiopian year offset (~7-8 years behind Gregorian), 13-month structure
  - **Display Format:**
    - Input/display value: DD-MM-YY numeric (e.g., `25-02-18`)
    - Day names: English (Monday, Tuesday...)
    - Month names: English mapped to Ethiopian months (September...August + Pagume)
    - Achieved via custom `format` prop and view format
  - **RHF Integration (Controller required):**
    - Uses `Controller` because DatePicker uses custom onChange (documented with code comment)
    - Props: `name`, `control`, `label`, `error`, `helperText`
  - **Community Edition:**
    - `@mui/x-date-pickers` community only — no Pro features
    - `LocalizationProvider` + `AdapterDayjs` already wraps app in `main.jsx`
  - **Prop Passthrough:** `minDate`, `maxDate`, `disabled`, `slotProps`, `sx`, etc.
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"MuiDatePicker"`
- 1.7 MuiPagination
  - **File:** `client/src/components/reusable/MuiPagination.jsx`
  - **Purpose:** Pure wrapper around MUI Pagination with safe defaults. Used for list view pagination only (not DataGrid).
  - **Defaults:**
    - `color="primary"`
    - `shape="rounded"`
    - Tree-shaken: `import Pagination from '@mui/material/Pagination'`
    - `displayName` set to `"MuiPagination"`
  - **Props:**
    - `count` — total pages (from server response)
    - `page` — current page (from server response)
    - `onChange` — page change handler
    - All standard MUI Pagination props pass through
  - **Backend Integration:**
    - `count` = `totalPages` from server response (`mongoose-paginate-v2` returns `totalPages` directly, no client-side calculation)
    - Constants: `PAGINATION_DEFAULT_PAGE=1`, `PAGINATION_DEFAULT_LIMIT=10`, `PAGINATION_MAX_LIMIT=100`
  - **Usage:** List views only. Parent manages page state via `useState` or Redux. Not used inside DataGrid.
- 1.8 MuiDataGrid
  - **File:** `client/src/components/reusable/MuiDataGrid.jsx`
  - **Package:** `@mui/x-data-grid` — community version only.
  - **Columns:** Defined per domain in `client/src/components/columns/*.js`. Each file exports a `columns` array. Action column is the last column in every domain column set.
  - **Action Column:**
    - View — `Visibility` icon, `sx={{ color: 'primary.main' }}`, tooltip "View", onClick navigates to `/${resource}/${id}` via `useNavigate`
    - Edit — `Edit` icon, `sx={{ color: 'warning.main' }}`, tooltip "Edit", onClick TBD
    - Archive/Delete — conditionally rendered:
      - Active items show `Archive` icon, `sx={{ color: 'text.secondary' }}`, tooltip "Archive"
      - Archived items show `Delete` icon, `sx={{ color: 'error.main' }}`, tooltip "Delete"
    - IconButton uses `sx` for color, never the `color` prop
    - Each action is an `IconButton` in `Tooltip` wrapper inside a `Stack direction="row"`
  - **Archive/Delete Flow:**
    - Archive click → `MuiConfirmDialog` → confirm → dispatch archive → update UI
    - Archived row shows delete icon instead of archive
    - Delete click → `MuiConfirmDialog` → confirm → dispatch permanent delete → update UI
  - **Export Selection:**
    - `checkboxSelection` enabled
    - `disableRowSelectionOnClick={true}`
    - Export button in toolbar for selected rows
  - **Toolbar:** Uses `GridToolbar` from `@mui/x-data-grid` (columns toggle, filter, density, CSV export).
  - **Server-Side Pagination:**
    - `paginationMode="server"`
    - `rowCount` from server's `totalDocs`
    - `onPaginationModelChange` handler
    - `pageSizeOptions={[10, 25, 50, 100]}`
    - Defaults: page=1, pageSize=10
  - **State Coverage:**
    - Loading: `loading` prop with skeleton via `slotProps={{ loadingOverlay: { variant: 'skeleton' } }}`
    - Empty: custom `slotProps={{ noRowsOverlay }}`
  - **Prop Passthrough:** `rows`, `columns`, `loading`, `rowCount`, `paginationModel`, `onPaginationModelChange`, `density`, `slots`, `slotProps`, etc.
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"MuiDataGrid"`
    - Default `sx={{ height: 400 }}` (overridable)
- 1.9 MuiConfirmDialog
  - **File:** `client/src/components/reusable/MuiConfirmDialog.jsx`
  - **Purpose:** Preset confirmation dialog built on MuiDialog. Used for archive/delete and other confirm/dismiss scenarios.
  - **Props:**
    - `open` — dialog visibility
    - `onClose` — dismiss handler
    - `onConfirm` — confirm action handler
    - `title` — dialog title (e.g., "Archive Report")
    - `message` — confirmation message (e.g., "Are you sure you want to archive this report?")
    - `confirmText` — confirm MuiButton label, default `"Confirm"`
    - `cancelText` — cancel MuiButton label, default `"Cancel"`
    - `confirmColor` — MuiButton color for confirm, default `"primary"` (overridable to `"error"` for delete)
  - **Structure:** Uses MuiDialog internally with title, message in content, and two MuiButtons in actions (Cancel + Confirm).
  - **Setup:** `displayName` set to `"MuiConfirmDialog"`
- 1.10 LoadingSpinner
  - **File:** `client/src/components/reusable/LoadingSpinner.jsx`
  - **Purpose:** Centered full-page or full-section loading indicator.
  - **Structure:**
    - Outer `Box` with `display: flex`, `alignItems: center`, `justifyContent: center`, full available dimensions
    - `CircularProgress` centered
    - Optional `message` rendered as `Typography` below the spinner
  - **Props:**
    - `message` — optional string, muted text beneath spinner
    - `size` — CircularProgress size, default `40`
    - `minHeight` — wrapper min-height, default `"100vh"` for full-page, overridable (e.g., `"400px"` for section-level)
    - All standard Box/CircularProgress props pass through
  - **Usage:** ProtectedRoute during `initializing`, page lazy-loading, section-level data fetch.
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"LoadingSpinner"`
- 1.11 GlobalSearchDialog
  - **File:** `client/src/components/reusable/GlobalSearchDialog.jsx`
  - **Purpose:** Global search across Reports and Branches. Opened from MuiAppbar search icon. Standalone — does not use MuiDialog's actions slot.
  - **Responsive Sizing:**
    - `< 600px` and `< 768px` land: full-screen (no border radius, 100vh)
    - `600-1200px`: centered dialog, 80vh / 600px
    - `> 1200px`: centered dialog, 70vh / 720px
    - Uses `Dialog` directly with `fullScreen` and `PaperProps.sx` for sizing
  - **Open/Close:** Opened via `open` prop from MuiAppbar search icon. Closed by back arrow, Escape, or click outside.
  - **Search Input:**
    - `useForm({ mode: 'onSubmit' })` with `register('search')`
    - Uncontrolled — no re-render on keystroke
    - Start adornment: `ArrowBackIcon` — clears field, resets results, closes dialog
    - Fires on Enter or search icon click (no debounce)
  - **Results Display:**
    - Grouped by entity type (Reports, Branches) in MuiAccordion sections
    - Each result navigates to detail page and closes dialog
    - Empty state: "No results found"
  - **Props:** `open`, `onClose`
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"GlobalSearchDialog"`
- 1.12 MuiPageHeader
  - **File:** `client/src/components/reusable/MuiPageHeader.jsx`
  - **Purpose:** Consistent page header for protected pages. Left side: title + subtitle (hidden on vw < 600 portrait). Right side: children slot for action elements.
  - **Structure:** Flex container, `justifyContent="space-between"`, `alignItems="center"`, `mb: 2`, bottom border 1px solid divider
  - **Props:** `title` (string, required), `subtitle` (string, optional), `children` (ReactNode, optional)
  - **Setup:** Tree-shaken imports, `displayName="MuiPageHeader"`
- 1.13 MuiStatusBadge
  - **File:** `client/src/components/reusable/MuiStatusBadge.jsx`
  - **Purpose:** Color-coded, non-interactive status chip for `report.status`. Read-only presentation — no click handling, no hover pointer.
  - **Structure:** MUI `Chip`, `size="small"`, `label={status}`, cursor stays default (no pointer). Never renders inside a button.
  - **Props:** `status` (string, required — one of `draft` | `audio_attached` | `transcribed` | `reviewed` | `completed`)
  - **Color mapping:**
    - `draft` → default
    - `audio_attached` → warning
    - `transcribed` → info
    - `reviewed` → primary
    - `completed` → success
  - **Usage:** Edit Report header (3.5.1.9) and Report Details header (3.6).
  - **Setup:** Tree-shaken imports, `displayName` set to `"MuiStatusBadge"`
- 2.1 PublicLayout
  - **File:** `client/src/components/layout/PublicLayout.jsx`
  - **Purpose:** Root-level wrapper for public routes (Landing, Login, Register). No sidebar, no auth gating.
  - **Structure (column flex):**
    1. `MuiAppbar` (`position="fixed"`, public variant — logo, theme toggle, Login/Sign Up buttons)
    2. `<Outlet />` — scrollable content area, `overflow-y: auto`
  - **Outer container:** `height: 100vh; overflow: hidden`
  - **Auth Awareness:** Reads Redux `authSlice` — renders Login/Sign Up when unauthenticated, Logout (icon + tooltip) when authenticated
  - **Props:** none (structural layout)
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"PublicLayout"`

- 2.2 AppShell
  - **File:** `client/src/components/layout/AppShell.jsx`
  - **Purpose:** Protected layout wrapper for all authenticated pages (Dashboard, Reports, Branches, Profile). Composes AppSidebar and MuiAppbar.
  - **Outer container:** `height: 100vh; overflow: hidden`
  - **Structure (horizontal flex):**
    - Left: `AppSidebar`
    - Right: content area — column flex:
      1. `MuiAppbar` (`position="static"`, 64px, protected variant — search icon, theme toggle, avatar dropdown)
      2. Page header (icon + title, one line) — rendered by each page, not a reusable component
      3. `<Outlet />` — scrollable content, `overflow-y: auto`
  - **Responsive Behavior:** Inherits AppSidebar responsive drawer behavior; content area resizes to fill remaining width
  - **Props:** none (structural layout)
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"AppShell"`

- 2.3 AppSidebar
  - **File:** `client/src/components/layout/AppSidebar.jsx`
  - **Purpose:** Navigation sidebar for protected layout. Dual-mode: temporary overlay on mobile, permanent docked on desktop (full or mini).
  - **Drawer:** Uses MUI `Drawer` with `variant` switching between `"temporary"` and `"permanent"`
  - **Sidebar Header:** Menu icon + Logo + App name "Report Builder". Menu icon toggles full/mini mode on permanent drawer.
  - **Nav Items (top, `flexGrow: 1`):** Dashboard, Reports, Branches, Profile. Each is a `MuiListItemButton` with icon and label.
  - **Bottom:** `MuiDivider` + Logout (`MuiListItemButton` with icon + label). Logout dispatches `logout()` from RTK, clears cookies, navigates to `/login`.
  - **Responsive Drawer Logic:**
    - `< 600px` and `sm` land (600–899px): Temporary overlay drawer, 240px. Opens via menu icon, closes on backdrop / nav select / Escape.
    - `md+` (>= 900px) default: Permanent docked drawer, 240px. Full icon + text.
    - `md+` toggled: Permanent mini drawer, 64px. Icons only, `MuiTooltip` on hover. Header shows menu icon only.
  - **Nav Item Theming:**
    - Default: `backgroundColor: transparent`, `color: text.secondary`
    - Hover: `backgroundColor: action.hover`, `borderRadius: 8px`
    - Selected: `backgroundColor: primary.main + 0.08`, `color: primary.main`, `fontWeight: 600`, `borderLeft: 3px solid primary.main`
    - Icon selected: `color: primary.main`; icon default: `color: action.active`
    - Logout hover: `backgroundColor: error.main + 0.08`, `color: error.main`
  - **Props:** `open` (boolean), `onClose` (function), `sidebarMode` (`"full"` | `"mini"`), `onToggle` (function)
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"AppSidebar"`

## 3. Pages

- 3.1 Landing
  - **File:** `client/src/pages/Landing.jsx`
  - **Route:** `{ index: true, Component: Landing }` — index route inside PublicLayout's children
  - **Layout Context:** Rendered inside PublicLayout (2.1), which provides:
    - MuiAppbar (1.1, public variant) — logo, theme toggle, Login button, Sign Up button
    - Scrollable content area (`overflow-y: auto`)
  - **Structure:** Sections stacked vertically, centered max-width wrapper `maxWidth={1200}`:
    1. **Hero Section** — `py: 8`, `textAlign: center`
       - App logo/icon (`fontSize: 64px`, `color: primary.main`)
       - Headline: `Typography variant="h3" fontWeight={700}` — "Build Better Reports"
       - Subheadline: `Typography variant="h6" color="text.secondary"` — "Record, transcribe, and generate professional reports with AI"
       - CTA Buttons row (`gap: 2`, `mt: 4`, centered):
         - **Get Started** (`MuiButton variant="contained" size="large"`) → navigates to `/register`
         - **Sign In** (`MuiButton variant="outlined" size="large"`) → navigates to `/login`
    2. **Features Section** — TBD
  - **Responsive:**
    - Hero headline: `h3` on `md+`, `h4` on `xs`
    - All text uses ellipsis on overflow; no horizontal scroll
  - **Routing Actions:** CTA buttons use `useNavigate()` from react-router-dom
  - **Data:** No data fetching — fully static page. Already-authenticated users redirected away by PublicRoute guard.
  - **Setup:**
    - `React.lazy(() => import('./pages/Landing.jsx'))` in `main.jsx`
    - Tree-shaken MUI imports
    - No Redux, no RTK Query calls — pure presentational
    - `displayName` set to `"Landing"`
- 3.2 Login
  - **File:** `client/src/pages/Login.jsx`
  - **Route:** `{ path: 'login', Component: Login }` — under PublicLayout children
  - **Layout Context:** PublicLayout (2.1) — MuiAppbar (1.1 public variant) + scrollable content
  - **Page Layout:**
    - Outer: centered flexbox, `minHeight: calc(100vh - 64px)`, `display: flex`, `alignItems: center`, `justifyContent: center`, `py: 4`
    - Card: `MuiPaper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 420 }}`
  - **Card Content (stacked vertically):**
    - Logo/icon centered (`fontSize: 48px`, `color: primary.main`, `mb: 1`)
    - Title: `Typography variant="h5" fontWeight={600} textAlign="center"` — "Sign In"
    - Subtitle: `Typography variant="body2" color="text.secondary" textAlign="center" mb: 3` — "Welcome back! Sign in to continue"
    - Google OAuth Button: `MuiButton variant="outlined" fullWidth`, start adornment `GoogleIcon`, loading spinner on click (stubbed until credentials configured)
    - Divider: `MuiDivider sx={{ my: 2.5 }}` with `"or"` text via `textAlign="center"`
    - `email` field: `MuiTextField type="email"`, start adornment `<EmailIcon />`, `required: 'Email is required'`
    - `password` field: `MuiTextField type="password"`, start adornment `<LockIcon />`, eye toggle built-in, `required: 'Password is required'`
    - Submit: `MuiButton variant="contained" fullWidth size="small" sx={{ mt: 2, flexShrink: 0 }}`, `loading={isSubmitting}`, `loadingPosition="center"` — label "Sign In"
    - Nav link: `Typography variant="body2" textAlign="center" mt: 2` — "Don't have an account?" + `MuiButton variant="text"` → navigates to `/register`
  - **Submit Logic:**
    - RHF `useForm({ mode: 'onBlur' })`, `register` only
    - `handleSubmit(onSubmit)` → try/catch with `isSubmitting` guard
    - Calls `useLoginMutation()` from RTK Query
    - On 422: `setError('email', ...)` / `setError('password', ...)` for backend validation
    - On 401: toast "Invalid email or password"
    - On success: `reset()`, navigate to `location.state?.from?.pathname || '/dashboard'`
  - **Guard:** PublicRoute redirects authenticated users to `/dashboard`
  - **Setup:**
    - `React.lazy(() => import('./pages/Login.jsx'))`
    - Tree-shaken imports
    - `displayName` set to `"Login"`
  - **Data Flow:**
    - **Endpoint:** `POST /api/v1/auth/login`
    - **Request:**
      ```json
      { "email": "beza@example.com", "password": "mypassword" }
      ```
    - **Success Response (200):**

      ```json
      {
        "success": true,
        "message": "Login successful",
        "data": {
          "user": {
            "_id": "...",
            "firstName": "Beza",
            "lastName": "Ayalew",
            "fullName": "Beza Ayalew",
            "email": "beza@example.com",
            "avatar": null,
            "position": null,
            "..."
          }
        }
      }
      ```

      - Backend sets `accessToken` (15m) and `refreshToken` (7d) as httpOnly cookies via `Set-Cookie`
      - Frontend: `reset()`, navigate to `location.state?.from?.pathname || '/dashboard'`

    - **Error Responses:**
      - 401 (invalid credentials): `{ success: false, message: "Invalid email or password" }` → toast
      - 422 (validation): `{ success: false, message: "Validation failed", data: { errors: [{ field: "email", message: "..." }] } }` → `setError()`
      - 429 (rate limit): `{ success: false, message: "Too many requests, please try again later" }` → toast
    - **RTK Query:** `useLoginMutation()` from `authSlice.injectEndpoints`, `credentials: 'include'`
    - **Google OAuth:** Browser redirect to `http://localhost:4000/api/v1/auth/google` → consent → callback sets cookies → redirect to frontend → PublicRoute detects auth → `/dashboard`. Stubbed until credentials configured.

- 3.3 Register
  - **File:** `client/src/pages/Register.jsx`
  - **Route:** `{ path: 'register', Component: Register }` — under PublicLayout children
  - **Layout Context:** PublicLayout (2.1) — MuiAppbar (1.1 public variant) + scrollable content
  - **Page Layout:** Same as Login — centered card, `maxWidth: 420`, same outer flexbox
  - **Card Content (stacked vertically):**
    - Logo/icon centered (same style)
    - Title: "Sign Up"
    - Subtitle: "Create your account to get started"
    - Google OAuth Button: same pattern as Login
    - Divider: same `"or"` divider
    - `email` field: `MuiTextField type="email"`, start adornment `<EmailIcon />`, `required: 'Email is required'`
    - `password` field: `MuiTextField type="password"`, start adornment `<LockIcon />`, eye toggle built-in, `required: 'Password is required'`, `minLength: { value: 6, message: 'At least 6 characters' }`
    - `confirmPassword` field: `MuiTextField type="password"`, start adornment `<LockIcon />`, eye toggle built-in, `validate: (v) => v === getValues('password') || 'Passwords must match'`
    - Submit: `MuiButton variant="contained" fullWidth size="small" sx={{ mt: 2, flexShrink: 0 }}`, `loading={isSubmitting}`, `loadingPosition="center"` — label "Sign Up"
    - Nav link: "Already have an account?" + button → navigates to `/login`
  - **Submit Logic:**
    - RHF `useForm({ mode: 'onBlur' })`, `register` only
    - `handleSubmit(onSubmit)` → try/catch
    - Calls `useRegisterMutation()` from RTK Query
    - On 422: `setError` for field-level (e.g. duplicate email)
    - On success: toast "Account created successfully", navigate to `/dashboard`
  - **No name field** — backend extracts firstName/lastName from email local part per §11
  - **Guard:** PublicRoute redirects authenticated users to `/dashboard`
  - **Setup:**
    - `React.lazy(() => import('./pages/Register.jsx'))`
    - Tree-shaken imports
    - `displayName` set to `"Register"`
  - **Data Flow:**
    - **Email-to-Name Extraction (backend):**
      - `beza@gmail.com` → `firstName: "beza"`, `lastName: "beza"`
      - `beza.ayalew@gmail.com` → `firstName: "beza"`, `lastName: "ayalew"`
      - Split on `@`, split local part on `.`; first segment = firstName, last segment = lastName
    - **Endpoint:** `POST /api/v1/auth/register`
    - **Request:**

      ```json
      { "email": "beza.ayalew@example.com", "password": "mypassword" }
      ```

      - `confirmPassword` validated client-side only (RHF `validate`), never sent to backend

    - **Success Response (201):**

      ```json
      {
        "success": true,
        "message": "Account created successfully",
        "data": {
          "user": {
            "_id": "...",
            "firstName": "beza",
            "lastName": "ayalew",
            "fullName": "beza ayalew",
            "email": "beza.ayalew@example.com",
            "avatar": null,
            "position": null,
            "..."
          }
        }
      }
      ```

      - Backend sets httpOnly cookies same as Login
      - Frontend: toast "Account created successfully", navigate to `/dashboard`

    - **Error Responses:**
      - 409 (duplicate email): `{ success: false, message: "Email already in use" }` → `setError('email', 'Email already in use')`
      - 422 (validation): `{ success: false, message: "Validation failed", data: { errors: [{ field: "email", message: "..." }] } }` → `setError()`
      - 429 (rate limit): `{ success: false, message: "Too many requests, please try again later" }` → toast
    - **RTK Query:** `useRegisterMutation()` from `authSlice.injectEndpoints`, `credentials: 'include'`
    - **User Model Virtual:**

      ```js
      userSchema.virtual("fullName").get(function () {
        return `${this.firstName} ${this.lastName}`.trim();
      });
      ```

      - Schema options: `{ toJSON: { virtuals: true }, toObject: { virtuals: true } }`

    - **Google OAuth:** Same redirect flow as Login

- 3.4 Dashboard
  - **File:** `client/src/pages/Dashboard.jsx`
  - **Route:** `{ path: 'dashboard', Component: Dashboard }` — first child under AppShell
  - **Layout Context:** AppShell (2.2) — AppSidebar + content area (MuiAppbar protected variant → `<Outlet />`). No Page Header.
  - **Page Layout:** `p: 3`, rows stacked vertically with `gap: 3`
  - **Row 1 — Stat Cards:**
    - 4 cards, `Grid container spacing={3}`, `size={{ xs: 12, sm: 6, md: 3 }}`
    - Each: `MuiPaper elevation={2} sx={{ p: 3 }}`, icon + value + label
    - Content: **TBD**
  - **Row 2 — Charts:**
    - `Grid container spacing={3}`, `size={{ xs: 12, md: 6 }}`
    - Bar chart (left): `@mui/x-charts` `BarChart` — **TBD**
    - Pie chart (right): `@mui/x-charts` `PieChart` — **TBD**
  - **Row 3 — Recent Activities:**
    - Title: `Typography variant="h6"` — "Recent Activities"
    - `MuiDataGrid` (1.8) — server-side pagination, no action column
    - Columns, source endpoint: **TBD**
  - **Auth Strategy:**
    - Full page load: `GET /api/v1/auth/me` → populate Redux + localStorage
    - 401 on `/auth/me`: clear everything, redirect to `/login`
    - SPA navigation: ProtectedRoute reads Redux — zero API calls
  - **Data Flow:**
    - **Endpoint:** `GET /api/v1/auth/me`
    - **Success Response:**
      ```json
      {
        "success": true,
        "data": {
          "user": {
            "_id": "...",
            "firstName": "Beza",
            "lastName": "Ayalew",
            "fullName": "Beza Ayalew",
            "email": "beza@example.com",
            "avatar": null,
            "position": null
            "..."
          }
        }
      }
      ```
    - **Error (401):** `{ "success": false, "message": "Not authenticated" }` → clear + redirect
  - **Setup:**
    - `React.lazy(() => import('./pages/Dashboard.jsx'))`
    - Tree-shaken imports
    - `displayName` set to `"Dashboard"`
- 3.5 Reports
  - **File:** `client/src/pages/Reports.jsx`
  - **Route:** `{ path: 'reports', Component: Reports }` — under AppShell children
  - **Layout Context:** AppShell (2.2) + MuiPageHeader (1.12)
  - **MuiPageHeader:**
    - Left: title="Reports", subtitle="Manage daily supervision reports"
    - Right: FilterIconButton (MuiBadge) + ToggleButtonGroup + CreateButton (MuiButton, start icon AddIcon)
  - **Filter Dialog:**
    - Base: MuiDialog (1.3), `maxWidth="sm"`
    - Title: "Filter Reports"
    - Row 1: `Grid container spacing={2}` — MuiDatePicker (left) + MuiSelectField for single branch (right)
    - Row 2: MuiSwitch label="Archived"
    - End adornments: MuiDatePicker + MuiSelectField have CloseIcon as `slotProps.input.endAdornment` for individual clear. On clear: field resets to empty, `activeFilterCount` decrements, badge updates immediately.
    - Cancel: close dialog, reset all filters to empty, badge → 0
    - Apply: set filter state, close dialog, badge → count of active filters (1–3)
    - Badge: MUI Badge on filter icon, `badgeContent={activeFilterCount}`, hidden when 0
  - **List/Grid Toggle:**
    - ToggleButtonGroup with ViewListIcon / ViewGridView
    - **List** → cards view
    - **Grid** → MuiDataGrid view
  - **Cards View (List toggle):**
    - `Grid container spacing={2}`
    - Each card: `MuiCard` with report metadata
    - Card actions (icon buttons with MuiTooltip):
      - View (`VisibilityIcon`, primary) → navigate `/reports/:id/details` (3.6)
      - Edit (`EditIcon`, primary) → navigate `/reports/:id/edit`
      - Archive/Delete conditional:
        - Not archived → ArchiveIcon (warning) → MuiConfirmDialog → confirm → `PATCH /api/v1/reports/:id/archive` → update UI
        - Archived → DeleteIcon (error) → MuiConfirmDialog → confirm → `DELETE /api/v1/reports/:id` → update UI
    - Below cards: MuiPagination (1.7), `page` and `count` from server `totalPages`, `onChange` refetches list for the selected page
  - **MuiDataGrid View (Grid toggle):**
    - Standard MuiDataGrid (1.8) — server-side pagination, toolbar, export selection
    - Action column: view, edit, archive/delete (same behavior as cards)
  - **Data Flow (Reports List):**
    - **Endpoint:** `GET /api/v1/reports?page=1&limit=10&date=&branch=&isArchived=`
    - **Success Response (200):**
      ```json
      {
        "success": true,
        "data": {
          "reports": [
            {
              "_id": "...",
              "date": "29-10-18",
              "branches": ["..."],
              "status": "completed",
              "createdAt": "...",
              "updatedAt": "..."
            }
          ],
          "pagination": {
            "page": 1,
            "limit": 10,
            "totalDocs": 50,
            "totalPages": 5,
            "hasNextPage": true,
            "hasPrevPage": false
          }
        }
      }
      ```
    - **Archive:** `PATCH /api/v1/reports/:id/archive` → 200 `{ success: true, message: "Report archived" }`
    - **Delete:** `DELETE /api/v1/reports/:id` → 200 `{ success: true, message: "Report deleted" }`
  - **Setup:**
    - `React.lazy(() => import('./pages/Reports.jsx'))`
    - Tree-shaken imports
    - `displayName` set to `"Reports"`
  - 3.5.1 Create Report Dialog

    **Dialog File:** `client/src/components/report/CreateReportDialog.jsx`

    **Trigger:** CreateButton (MuiButton, AddIcon) in Reports MuiPageHeader → opens MuiDialog.

    **Base:** MuiDialog, `maxWidth="sm"`, fullWidth., `disableEscapeKeyDown={true}`, `onClose` is no-op (prevents close on backdrop click or Escape). Dialog only closes via Cancel button or successful submit.

    **Title:** "Create New Report"

    ***

    #### 3.5.1.1 Local State (react-hook-form)

    | Field            | Type                                                           | Description                   |
    | ---------------- | -------------------------------------------------------------- | ----------------------------- |
    | `date`           | dayjs \| null                                                  | Ethiopian calendar date       |
    | `branches`       | `[{ branchId, clockIn, clockOut }]`                            | Accumulator, starts empty     |
    | `clockIn`        | dayjs \| null                                                  | Global work start (HH:mm)     |
    | `clockOut`       | dayjs \| null                                                  | Global work end (HH:mm)       |
    | `audio`          | `[{ id, blob, duration }]`                                     | Recorded blobs, starts empty  |
    | `recordingState` | `"idle" \| "countdown" \| "recording" \| "paused" \| "review"` | Audio recording state machine |

    ***

    #### 3.5.1.2 Data Model Mapping To Report Sections

    | Local State                                  | Report Section (Amharic)                    |
    | -------------------------------------------- | ------------------------------------------- |
    | `date`                                       | ቀን                                          |
    | `branches[].branchId` (resolved to name)     | ብራንች header                                 |
    | `branches[].clockIn` / `branches[].clockOut` | ስራ የገባሁበት ሰዓት per-branch lines              |
    | `clockIn`                                    | ስራ የገባሁበት ሰዓት (fallback when single branch) |
    | `clockOut`                                   | ከስራ የወጣሁበት ሰዓት፡                             |

    ***

    #### 3.5.1.3 Dialog Layout (vertical stack)

    **Row 1:** `Grid container spacing={2}`
    - MuiDatePicker — left, `size={{ xs: 12, md: 6 }}`
    - MuiButton "Select Branches" — right, `size={{ xs: 12, md: 6 }}`
      - On click → opens **BranchSelectorDialog**
      - **BranchSelectorDialog** (MuiDialog):
        - Title: "Select Branches"
        - Body: MuiList with MuiListItem (checkbox, branch name, location as secondary text)
        - Footer: Cancel + Apply MuiButtons
        - Branch list fetched from `GET /api/v1/branches` (Redux)
        - On Apply: selected branches pushed to `branches[]`, dialog closes
        - Already-selected branches are checked by default in the list

    **Selected branches display:** below Row 1, for each entry in `branches[]`, rendered in order:
    - **vw ≥ 600:** `[BranchName label] [MuiTimePicker clockIn] [MuiTimePicker clockOut] [✕ RemoveIconButton]` — all inline in one row
    - **vw < 600:** BranchName (full width) + `[✕ Remove]` (end of branch name line). Below it: `[MuiTimePicker clockIn] [MuiTimePicker clockOut]` in a sub-row
    - Each new branch appended below the previous. Remove button splices that branch from `branches[]` and discards its clockIn/clockOut.
    - If a branch is unchecked in BranchSelectorDialog and Apply is clicked, that branch is removed from `branches[]`.
    - BranchName for display is fetched from the branch list (comes from `GET /api/v1/branches` response).

    **Divider 1:** visible only when `branches.length > 0`, below the selected branches section

    **Global times row:** `Grid container spacing={2}`
    - clockIn MuiTimePicker — left, `size={{ xs: 12, md: 6 }}`
    - clockOut MuiTimePicker — right, `size={{ xs: 12, md: 6 }}`

    **Divider 2:** always visible

    **Audio recording section:** (see audio recording state machine below)

    **Footer:** `Grid container justifyContent="space-between"`
    - Cancel MuiButton: outlined, `onClick` clears all local state to defaults, closes dialog
    - Submit MuiButton: contained, `loading={isSubmitting}`, disabled when `isSubmitting`

    ***

    #### 3.5.1.4 MuiTimePicker (reusable component)

    **File:** `client/src/components/reusable/MuiTimePicker.jsx`
    - Follows MuiDatePicker pattern: DesktopTimePicker on md+ (popper), MobileTimePicker below md (dialog), switch via `useMediaQuery(theme.breakpoints.up('md'))`
    - `forwardRef`, `size="small"`, `format="hh:mm A"`, default `null`
    - Requires RHF `Controller` (same as DatePicker — custom onChange)
    - `displayName="MuiTimePicker"`

    ***

    #### 3.5.1.5 Audio Recording State Machine

    **IDLE_EMPTY** (no clips): Shows "Start Recording" MuiButton with FiberManualRecordIcon (red). Click → transitions to COUNTDOWN.

    **COUNTDOWN:** Lightbox overlay on audio section. Shows "3" → "2" → "1" (1 second each) → auto-transitions to RECORDING.

    **RECORDING:**
    - Live waveform canvas (Web Audio API AnalyserNode connected to MediaStream, renders real-time FFT bars)
    - "⏸ Pause" MuiIconButton + "⏹ Stop" MuiIconButton
    - Live duration ticker: `[MM:SS / 15:00]`
    - Pause → PAUSED. Stop → finalizes blob → transitions to REVIEW.
    - Auto-stop at `AUDIO_MAX_DURATION_SEC=900` (15 min, constant).

    **PAUSED:**
    - Waveform frozen. "▶ Resume" + "⏹ Stop" buttons.
    - Resume → RECORDING. Stop → REVIEW.

    **REVIEW** (clips exist):
    - Each clip in `audio[]` displayed as a card/row:
      - "▶/⏸" PlayPauseIconButton — toggles playback
      - Seek bar (MuiSlider) — draggable, updates `currentTime`
      - Duration label: `[MM:SS / MM:SS]`
      - "✕" DeleteIconButton — removes clip from `audio[]`. If array becomes empty → transitions to IDLE_EMPTY.
    - "+ Add Another Recording" text button below clip list — starts new COUNTDOWN.
    - Playback uses HTMLAudioElement or react-player. Play/pause toggles per clip independently.

    **Implementation stack:** MediaRecorder API for capture, Web Audio API AnalyserNode for waveform, `URL.createObjectURL(blob)` for playback, all state in `useAudioRecorder` custom hook (`client/src/hooks/useAudioRecorder.js`).

    **MIME type priority (used by MediaRecorder):**
    1. `audio/webm;codecs=opus`
    2. `audio/webm`
    3. `audio/mp4`
    4. browser default

    ***

    #### 3.5.1.6 Validation Rules (before frontend submit)

    | Field                       | Rule                                                                                        |
    | --------------------------- | ------------------------------------------------------------------------------------------- |
    | `date`                      | Required. Valid Ethiopian date. Error + helperText on MuiDatePicker.                        |
    | `branches`                  | `branches.length >= 1`. Toast "Select at least one branch" on submit attempt.               |
    | Each `branches[i].clockIn`  | Required. Error on respective MuiTimePicker.                                                |
    | Each `branches[i].clockOut` | Required. Error on respective MuiTimePicker. Cross-field: "Out time must be after in time". |
    | `clockIn`                   | Required. Error on MuiTimePicker.                                                           |
    | `clockOut`                  | Required. Error on MuiTimePicker. Cross-field: "End time must be after start time".         |
    | `audio`                     | `audio.length >= 1`. Toast "Record at least one audio clip".                                |
    | Each `audio[i].blob.size`   | `<= 50 MB`. Blocked client-side, warning shown, user asked to re-record.                    |

    **Server-side validation repeats all of the above** via `express-validator` middleware + multer validation for files.

    ***

    #### 3.5.1.7 Submit Flow (frontend)
    1. Frontend form validation passes.
    2. Build FormData:
       - `metadata` field: JSON.stringify of:
         ```json
         {
           "date": "30-07-2026",
           "branches": [
             {
               "branchId": "br_001",
               "clockIn": "02:30 PM",
               "clockOut": "07:40 PM"
             },
             {
               "branchId": "br_002",
               "clockIn": "07:55 PM",
               "clockOut": "12:20 AM"
             }
           ],
           "clockIn": "02:30 PM",
           "clockOut": "12:20 AM",
           "audio": [
             { "id": "clip_1", "duration": 185 },
             { "id": "clip_2", "duration": 312 }
           ]
         }
         ```
    3. `POST /reports` via RTK Query `useCreateReportMutation()`.
    4. While submitting:
       - `isSubmitting = true`
       - Dialog shows indeterminate `LinearProgress` bar + overlay message "Creating report..."
       - All fields frozen, Cancel disabled
       - The submit is one request. The entire backend pipeline (create report → upload audio → transcribe) happens server-side before responding. Frontend does NOT see individual steps.
    5. On **201** (success): close dialog, toast "Report created", refetch report list via `GET /reports`.
    6. On **502 Transcription Failed**: show error "Transcription failed, retry?" with button to call `POST /reports/:id/transcribe`.
    7. On **other error** (including audio upload failure): toast error message, re-enable form fields (keep metadata + audio blobs). Dialog stays open. User can click Submit again to retry or Cancel to discard.

    ***

    #### 3.5.1.8 Backend Pipeline — `POST /reports`

    **Middleware chain (applied in order):**
    1. `authenticate`: JWT verification from `req.cookies.accessToken`.
    2. `upload.array("audio", 10)`: multer receives clips, stores to `backend/uploads/audio/`.
    3. `createReportRules`: express-validator rules from `reportValidator.js`.
    4. `validation`: shared middleware from `validation.js` — checks `validationResult(req)`, stores `req.validated`.
    5. Controller: extracts `req.validated.body`, processes logic.

    **Validator layer:**

    `backend/middlewares/validators/validation.js`:

    ```js
    import { validationResult, matchedData } from "express-validator";

    export default (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Validation failed",
          data: { errors: errors.array() },
        });
      }
      req.validated = {
        body: matchedData(req, { locations: ["body"] }),
        params: matchedData(req, { locations: ["params"] }),
        query: matchedData(req, { locations: ["query"] }),
      };
      next();
    };
    ```

    `backend/middlewares/validators/reportValidator.js`:

    ```js
    import { body } from "express-validator";

    export const createReportRules = [
      body("metadata").custom((value) => {
        try {
          JSON.parse(value);
          return true;
        } catch {
          throw new Error("Invalid JSON in metadata");
        }
      }),
      body("branches")
        .isArray({ min: 1 })
        .withMessage("At least one branch required"),
      body("branches.*.branchId")
        .notEmpty()
        .withMessage("Branch ID is required"),
      body("branches.*.clockIn")
        .notEmpty()
        .withMessage("Branch clock in is required"),
      body("branches.*.clockOut")
        .notEmpty()
        .withMessage("Branch clock out is required"),
      body("clockIn").notEmpty().withMessage("Clock in is required"),
      body("clockOut").notEmpty().withMessage("Clock out is required"),
    ];
    ```

    **Controller — `asyncHandler` wrapper:**

    All controllers use `express-async-handler` (imported as `asyncHandler`). Errors are forwarded via `next(error)`:

    ```js
    import asyncHandler from "express-async-handler";

    export const create = asyncHandler(async (req, res, next) => {
      // logic
    });
    ```

    The global error handler in `app.js` catches all `next(error)` calls and returns consistent error responses.

    **Controller — step by step:**

    ```
    STEP 1 — Parse and validate
    ├── Parse req.body.metadata → JSON.parse → { date, branches, clockIn, clockOut }
    ├── req.files → array of uploaded audio files from multer
    ├── Validate audio files count ≥ 1
    ├── For each file:
    │   ├── Validate mimeType ∈ AUDIO_ALLOWED_MIME_TYPES → 415 if invalid
    │   ├── Validate file.size ≤ AUDIO_MAX_SIZE_BYTES → 413 if exceeded
    │   └── ffprobe duration → validate ≤ AUDIO_MAX_DURATION_SEC

    STEP 2 — Create Report (draft)
    ├── Report.create([{
    │     user: req.user._id,
    │     date,
    │     branches,
    │     clockIn,
    │     clockOut,
    │     status: "draft"
    │   }], { session })
    └── reportId = createdReport[0]._id
        → If DB failure: next(error) → 500

    STEP 3 — Create Audio docs and attach to Report
    ├── audioIds = []
    ├── For each file in req.files:
    │   ├── audioDoc = Audio.create([{
    │   │     user: req.user._id,
    │   │     report: reportId,
    │   │     originalName: file.originalname,
    │   │     mimeType: file.mimetype,
    │   │     filePath: file.path,
    │   │     fileSize: file.size,
    │   │     duration: ffprobeResult
    │   │   }], { session })
    │   └── audioIds.push(audioDoc[0]._id)
    ├── Report.findByIdAndUpdate(reportId,
    │     { $push: { audio: { $each: audioIds } } },
    │     { session })
    │
    ├── If any audio creation fails →
    │   └── Abort transaction
    │   └── Return 502:
    │       {
    │         success: false,
    │         message: "Audio upload failed",
    │         data: null
    │       }

    STEP 4 — Update Report status to audio_attached
    ├── Report.findByIdAndUpdate(reportId,
    │     { status: "audio_attached" },
    │     { session })
    │   → If DB failure: next(error) → 500 (Report exists, status stuck at draft)

    STEP 5 — Transcribe each audio clip
    ├── fullRawText = ""
    ├── For each audioId in audioIds:
    │   ├── audioDoc = Audio.findById(audioId)
    │   ├── Convert to WAV:
    │   │   └── ffmpeg -i audioDoc.filePath -ac 1 -ar 16000
    │   │       -sample_fmt s16 -acodec pcm_s16le temp.wav
    │   ├── PCM-level split via wavSplitter.js:
    │   │   └── Chunks of ADDIS_AI_STT_MAX_DURATION_SEC (60s)
    │   │       (in-memory, no per-chunk re-encoding)
    │   ├── clipRawText = ""
    │   ├── For each chunk:
    │   │   ├── POST https://api.addisassistant.com/api/v2/stt
    │   │   │   FormData: { audio: chunk, request_data: { language_code: "am" } }
    │   │   ├── On network failure: retry 3× (1s, 2s, 4s backoff)
    │   │   ├── On provider error (4xx/5xx): mark chunk failed, continue
    │   │   └── On success: concatenate chunk.transcription → clipRawText
    │   └── fullRawText += clipRawText + "\n"
    │
    ├── If transcription fails for all audio →
    │   └── Do NOT abort transaction. Keep Report at audio_attached with audio preserved.
    │   └── Commit transaction (saving Report + Audio docs)
    │   └── Return 502:
    │       {
    │         success: false,
    │         message: "Transcription failed",
    │         data: { reportId, status: "audio_attached" }
    │       }
    │   └── Frontend: show "Transcription failed, retry?" + button to call
    │       POST /reports/:id/transcribe

    STEP 6 — Create Transcription doc
    ├── transcriptionDoc = Transcription.create([{
    │     user: req.user._id,
    │     report: reportId,
    │     raw: fullRawText,
    │     latest: "",
    │     history: []
    │   }], { session })
    │   → If DB failure: abort transaction in this sub-step only.
    │     Report stays at audio_attached. Audio preserved.

    STEP 7 — Link Transcription to Report → status transcribed
    ├── Report.findByIdAndUpdate(reportId,
    │     {
    │       transcription: transcriptionDoc[0]._id,
    │       status: "transcribed"
    │     },
    │     { session })
    │   → If DB failure: Transcription exists but not linked.
    │     Report stays at audio_attached.

    STEP 8 — Commit transaction
    ├── await session.commitTransaction()
    ├── Populate: report = Report.findById(reportId)
    │     .populate("user", "firstName lastName email")
    │     .populate("branches.branchId", "name location")
    │     .populate("audio")
    │     .populate("transcription")
    └── Return 201:
          {
            "success": true,
            "message": "Report created successfully",
            "data": { "report": { ... } }
          }
    ```

    ***

    #### 3.5.1.9 Post-Creation Flow — Review Transcription

    After `POST /reports` returns successfully, Report status is `transcribed` (or `audio_attached` if STEP 5 failed — see the "Transcription fails" row in 3.5.1.10). The Reports list shows the new item with its status badge. The user clicks an "Edit" action button → navigates to `/reports/:id/edit`.

    ***

    ##### `/reports/:id/edit` Page

    **Purpose:** review and correct the transcription of an existing report, edit its metadata, play back the recorded clips, and restore or delete past revisions.

    **Page component:** `client/src/pages/ReportCorrection.jsx`. The page renders inside the protected root layout (AppShell) — AppShell is provided by routing, the page component does not render it. `/assistant` is the only protected route that lives outside AppShell (3.5.2).

    **Overall structure (top to bottom):**
    1. Header bar
    2. Metadata summary bar
    3. Tab bar (four tabs)
    4. Active tab panel — content swaps when the user switches tabs

    **Header bar (left → right):**
    - **Back button** — MuiButton with start icon ArrowBackIcon, label "Back". On click: `navigate("/reports")`.
    - **Page title** — Typography variant="h6", text "Edit Report".
    - **Flex spacer** — pushes the remaining items to the right edge.
    - **MuiStatusBadge** — renders `report.status` with color mapping: `draft` → default, `audio_attached` → warning, `transcribed` → info, `reviewed` → primary, `completed` → success. Label shows the status text.
    - **"Open in Assistant" button** — MuiButton variant="outlined", start icon SmartToyIcon. On click: find or create the ChatConversation linked to this report, then `navigate("/assistant?conversation=<conversationId>")` (3.5.2).

    **Metadata summary bar:**
    - One line of Typography variant="body2", color="text.secondary", placed directly below the header.
    - Shows the report's Date, Branches (names joined with ", "), Clock In, and Clock Out.
    - Sample content:

    ```
    Date: 30-07-2026  |  Branches: መድኃኒዓለም, ኤርፖርት  |  Clock In: 02:30 PM  |  Clock Out: 12:20 AM
    ```

    **Tab bar:**
    - MUI Tab components in a TabList, placed below the metadata summary bar, separated from the panel content by a MuiDivider.
    - Four tabs in this exact order:
      1. "Editor" (value `editor`) — active by default when the page loads
      2. "Details" (value `details`)
      3. "Audio" (value `audio`)
      4. "History" (value `history`)
    - Clicking a tab switches the visible panel below and highlights the selected tab.
    - The active tab is kept in local state (`tab`); switching tabs does not change the URL.

    **Tab panels:**
    | Tab | Section |
    |---|---|
    | Editor | Editor Tab (below) |
    | Details | Details Tab (below) |
    | Audio | Audio Tab (below) |
    | History | History Tab (below) |

    ***

    ##### Editor Tab

    **Retry banner** (shown only when `report.status === "audio_attached"`):
    - MuiAlert variant="outlined" severity="warning" at the top of the tab
    - Text: "Transcription failed. Retry?" + MuiButton "Retry Transcription"
    - Click → `POST /reports/:id/transcribe` → backend runs the STT pipeline again from stored audio files → on success: status becomes `transcribed`, editor reloads with `Transcription.raw`, banner disappears
    - On failure: toast "Transcription failed, try again" — banner stays

    **Rich text editor:**
    - Uses a rich text editor with toolbar (Bold, Italic, Font size, Text color) for Amharic text editing.
    - Pre-filled with `Transcription.raw` (if `latest` is empty) or `Transcription.latest`.
    - Disabled while `status === "audio_attached"` (nothing to edit yet).

    **Three action buttons below the editor:**

    | Button            | Action                                                                                                                             |
    | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
    | "Save"            | Direct edit (Mode 1). Saves editor content as `latest`.                                                                            |
    | "Correct with AI" | Opens inline form: instruction text field + AI provider dropdown + "Submit" button. On response, shows diff. User accepts → saves. |
    | "Voice Correct"   | Opens short recorder → on stop, sends to STT → fills instruction field → same as AI Correct flow.                                  |

    ***

    ##### Modes Detail

    **Mode 1 — User Direct Edit:**
    - User edits the rich text area → clicks "Save"
    - `PATCH /transcriptions/:id`
    - Body: `{ "reviewed": "የተስተካከለ ጽሑፍ..." }`
    - Controller: push to history with `reviewer: req.user._id`, update `latest`, update Report status to `reviewed`

    **Mode 2 — AI Correction (typed instruction):**
    - User types instruction like "Fix the branch names" → selects provider → clicks "Correct"
    - `POST /transcriptions/:id/correct`
    - Body: `{ "instruction": "Fix the branch names", "provider": "gemini" }`
    - Backend sends raw text + instruction to AI provider → returns corrected text
    - Frontend shows diff/preview → user clicks "Accept"
    - `PATCH /transcriptions/:id` with same shape, `reviewer` is provider string

    **Mode 3 — Voice Correction:**
    - User clicks "Record correction" → records short audio → stops
    - `POST /transcriptions/:id/correct-by-voice`
    - Request: `multipart/form-data` with `audio` blob
    - Backend: STT via Addis AI → returns transcribed instruction text
    - Frontend fills instruction field → user selects provider → same as Mode 2 from there

    **Assistant surface:** Modes 2 and 3 are also available inside the Assistant page (3.5.2) — the `save_transcription` tool performs the same update (`latest` + `history[]` push with `reviewer` = provider string, Report status → `reviewed`) after user approval.

    ***

    ##### Details Tab

    **Form** prefilled from the report:
    - `date` — MuiDatePicker
    - Branches — MuiButton "Select Branches" + BranchSelectorDialog; each selected branch shows per-branch `clockIn` / `clockOut` MuiTimePickers
    - Top-level `clockIn` / `clockOut` — MuiTimePickers (derived from first/last branch times)
    - Save → `PATCH /reports/:id` with `{ date, branches: [{ branchId, clockIn, clockOut }] }`
    - Reset → reverts the form to the last saved values
    - On 422: field-level errors from the backend; on success: toast "Report updated", metadata summary bar refreshes

    ***

    ##### Audio Tab

    **Clip list** — one row per `report.audio` item:
    | Column | Content |
    |---|---|
    | # | Index |
    | File | `originalName` |
    | Duration | `duration` seconds, formatted `m:ss` |
    | Size | `fileSize` bytes, formatted KB/MB |
    | Actions | Play button (inline audio player), Download button |
    - **Play:** streams `GET /api/v1/audio/:audioId/stream` into an inline `<audio>` player
    - **Download:** `GET /api/v1/audio/:audioId/download` → file attachment with `originalName`
    - Clips are read-only here (recording happens on the create page)

    ***

    ##### History Tab

    **Table/cards** showing each history item:
    | Column | Content |
    |---|---|
    | # | Index |
    | Reviewed (preview) | First 100 chars of `reviewed` text |
    | Reviewer | User ObjectId → "You (Beza Ayalew)" ; Provider string → "AI (Gemini)" |
    | Edited At | `editedAt` timestamp, formatted |
    | Actions | Restore button, Delete button |
    - **Restore:** clicking a history item sets its `reviewed` text as the current `latest` and pushes a new history entry.
    - **Delete:** removes the item from `history[]` array via `PATCH /transcriptions/:id/history/:historyId`.

    **Endpoint for history deletion:** `DELETE /transcriptions/:id/history/:historyId`

    **Controller:** `$pull: { history: { _id: historyId } }`

    **Distinguishing reviewer in UI:**

    ```js
    if (mongoose.Types.ObjectId.isValid(entry.reviewer)) {
      // Look up user name → "You (Beza Ayalew)"
    } else {
      // entry.reviewer is "addis" | "gemini" | "nvidia" → "AI (Gemini)"
    }
    ```

    ***

    #### 3.5.1.10 Edge Cases

    | Scenario                                  | Behavior                                                                                                                                                                                                    |
    | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Same branch selected twice                | Checkbox already checked in BranchSelectorDialog. Uncheck to remove.                                                                                                                                        |
    | All branches removed                      | No selected branches shown. "Select Branches" button ready.                                                                                                                                                 |
    | Browser blocks microphone                 | Toast "Microphone access required"                                                                                                                                                                          |
    | Clip exceeds 50 MB                        | Submit blocked. Warning shown.                                                                                                                                                                              |
    | All clips deleted                         | Return to IDLE_EMPTY state showing "Start Recording"                                                                                                                                                        |
    | Dialog closed mid-recording               | Stop MediaRecorder. Clear all state.                                                                                                                                                                        |
    | AI provider fails during correction       | Toast "Correction failed, try again". User can retry with same or different provider.                                                                                                                       |
    | Re-transcription requested                | `POST /reports/:id/transcribe` — backend runs STT pipeline again from stored audio files. Updates `Transcription.raw`. Resets `latest` + `history`. Report status → `transcribed`.                          |
    | Long audio (>60s)                         | Automatically chunked server-side via wavSplitter.js (PCM-level split, no per-chunk re-encoding).                                                                                                           |
    | Audio upload fails (STEP 3)               | Return 502 with `data: null`. Toast error, form stays open with metadata + audio blobs intact. Report not created (transaction aborted). User clicks Submit again or Cancel.                                |
    | Dialog closed via backdrop click / Escape | Prevented. `onClose` is no-op, `disableEscapeKeyDown={true}`. User must click Cancel explicitly.                                                                                                            |
    | Transcription fails (STEP 5)              | Report stays at `audio_attached`, Audio preserved. Dialog closes with toast "Report created but transcription failed". Edit page shows the retry banner on the Editor tab → `POST /reports/:id/transcribe`. |
    | Tool approval request expires (60s)       | Assistant ChatBox shows the approval UI as "expired". Server drops the pending run from the in-memory map. User resends the message.                                                                        |
    | Report deleted while conversation exists  | Conversation stays (keeps `report` id). Opening it still works; tool calls fail with 404 on missing transcription.                                                                                          |
    | DB failure at STEP 4/6/7                  | Error logged. Admin can repair via manual endpoint if needed.                                                                                                                                               |

    ***

    #### 3.5.1.11 Response Shapes

    ##### 201 Created — Report created successfully

    ```json
    {
      "success": true,
      "message": "Report created successfully",
      "data": {
        "report": {
          "_id": "665a1b2c3d4e5f6a7b8c9d0e",
          "user": {
            "_id": "664a...",
            "firstName": "beza",
            "lastName": "ayalew",
            "fullName": "beza ayalew",
            "email": "beza.ayalew@example.com"
          },
          "date": "30-07-2026",
          "branches": [
            {
              "branchId": {
                "_id": "br_001",
                "name": "መድኃኒዓለም"
              },
              "clockIn": "02:30 PM",
              "clockOut": "07:40 PM"
            },
            {
              "branchId": {
                "_id": "br_002",
                "name": "ኤርፖርት"
              },
              "clockIn": "07:55 PM",
              "clockOut": "12:20 AM"
            }
          ],
          "clockIn": "02:30 PM",
          "clockOut": "12:20 AM",
          "audio": [
            {
              "_id": "aud_001",
              "originalName": "clip_1.webm",
              "mimeType": "audio/webm;codecs=opus",
              "fileSize": 1234567,
              "duration": 185
            },
            {
              "_id": "aud_002",
              "originalName": "clip_2.webm",
              "mimeType": "audio/webm;codecs=opus",
              "fileSize": 2345678,
              "duration": 312
            }
          ],
          "transcription": {
            "_id": "tr_001",
            "raw": "ሙሉ የተቀዳ ጽሑፍ...",
            "latest": "",
            "status": "transcribed"
          },
          "status": "transcribed",
          "isArchived": false,
          "createdAt": "2026-07-30T14:30:00.000Z",
          "updatedAt": "2026-07-30T14:35:00.000Z"
        }
      }
    }
    ```

    ##### Error Responses

    ```json
    // 422 Validation Error
    {
      "success": false,
      "message": "Validation failed",
      "data": {
        "errors": [
          { "field": "branches", "message": "At least one branch is required" }
        ]
      }
    }

    // 502 Audio Upload Failed (STEP 3 failure)
    {
      "success": false,
      "message": "Audio upload failed",
      "data": null
    }

    // 502 Transcription Failed (STEP 5 failure)
    {
      "success": false,
      "message": "Transcription failed",
      "data": {
        "reportId": "665a...",
        "status": "audio_attached"
      }
    }

    // 500 Internal Server Error
    {
      "success": false,
      "message": "Internal server error",
      "data": null
    }
    ```

    ##### Generate Report — POST /reports/:id/generate

    ```json
    // 200 Generated
    {
      "success": true,
      "message": "Report generated",
      "data": {
        "report": {
          "_id": "rpt_001",
          "status": "completed",
          "generated": "የመጨረሻ ሪፖርት ጽሑፍ..."
        },
        "generated": "የመጨረሻ ሪፖርት ጽሑፍ..."
      }
    }

    // 403 Archived
    { "success": false, "message": "Report is archived", "data": null }

    // 422 No Reviewed Transcription
    { "success": false, "message": "Review the transcription before generating", "data": null }

    // 429 Provider Rate Limit
    { "success": false, "message": "Rate limit reached, try again later", "data": null }

    // 502 Provider Failure
    { "success": false, "message": "Generation failed, try again", "data": null }
    ```

    ##### Audio Playback — GET /api/v1/audio/:audioId/stream

    ```json
    // 200 — streaming body, Content-Type from Audio.mimeType,
    //       Accept-Ranges: bytes, Range request → 206 Partial Content
    // 404 — { "success": false, "message": "Audio not found", "data": null }
    ```

    ##### Audio Download — GET /api/v1/audio/:audioId/download

    ```json
    // 200 — attachment, Content-Disposition: attachment; filename="<originalName>",
    //       Content-Type from Audio.mimeType
    // 404 — { "success": false, "message": "Audio not found", "data": null }
    ```

    ***

    #### 3.5.1.12 Recap of Amended Namings

    | Old (current doc)               | New (this doc)                    | Reason                                      |
    | ------------------------------- | --------------------------------- | ------------------------------------------- |
    | `selectedBranches`              | `branches`                        | Simpler, matches backend field name         |
    | `selectedBranches[].branchName` | Removed from local state          | Resolved server-side from branchId          |
    | `workStarted`                   | `clockIn`                         | Matches Amharic "ስራ የገባሁበት ሰዓት"             |
    | `workEnd`                       | `clockOut`                        | Matches Amharic "ከስራ የወጣሁበት ሰዓት፡"           |
    | `audioClips`                    | `audio`                           | Simpler, consistent with Report model field |
    | `aiProvider`                    | Removed from dialog state         | Not needed at creation time (deferred)      |
    | `recordingState`                | Unchanged                         | Still valid                                 |
    | `timeIn`/`timeOut` (per-branch) | `clockIn`/`clockOut` (per-branch) | Consistent naming with top-level fields     |
    | `BranchSelector` component      | MuiButton + BranchSelectorDialog  | Better UX for multi-branch selection        |
    | `unique: true` on fields        | `schema.index()`                  | Consistent index management                 |
    | Missing `archivedAt`            | Added to Report + Branch          | Enables TTL auto-delete after 30 days       |
    | Missing toJSON/toObject         | Added to all schemas              | Strips `id`, `__v`, `password`              |

  - 3.5.2 Assistant — AI Report Chat

    ##### Page & Routing
    - **File:** `client/src/pages/Assistant.jsx`
    - **Route:** `{ path: 'assistant', Component: Assistant }` — AppShell **sibling** under ProtectedRoute (NOT inside AppShell children; page is full-screen)
    - **Sidebar:** new AppSidebar nav item "Assistant" (SmartToyIcon) — highlighted when on `/assistant`
    - **Layout:** `<ChatBox adapter={assistantAdapter} features={{ conversationList: true }} sx={{ height: '100vh' }} />`
    - **Conversation list** (built into ChatBox via `features={{ conversationList: true }}`):
      - Left rail lists conversations (title, last message preview, relative timestamp)
      - "New Chat" button → report picker dialog: pick one of the user's reports → `POST /assistant/conversations` `{ reportId }` → welcome assistant message injects the raw transcription text + report metadata
      - Conversation title: `"Report {date}"` (e.g. "Report 30-07-2026")
    - **Deep link:** `/assistant?conversation=<id>` — ChatBox selects that conversation and shows its message history (this is where "Open in Assistant" on the edit page lands, 3.5.1.9)
    - **Adapter:** `client/src/components/assistant/chatAdapter.js` (plain JS object):
      - `sendMessage(messages)` → `POST /api/v1/assistant/conversations/:id/messages` with `{ content }` → returns `response.body` (ReadableStream) consumed by ChatBox
      - `listConversations()` → `GET /api/v1/assistant/conversations`
      - `listMessages(conversationId)` → `GET /api/v1/assistant/conversations/:id/messages`
      - `addToolApprovalResponse({ toolCallId, approved, reason })` → `POST /api/v1/assistant/tools/:toolCallId/approval`
    - **Tool approval flow (built into ChatBox):** on `tool-approval-request` ChatBox shows the approval UI → user Approves/Rejects → adapter calls `addToolApprovalResponse` → server resumes the provider run and emits `tool-output-available` then `finish`
    - **Redux:** `aiConversationSlice` (conversations list, activeConversationId, streaming parts) + RTK Query endpoints in `assistantApi.js`
    - **Package:** `@mui/x-chat` (v9.0.0-alpha.15, MIT license) — `npm install @mui/x-chat`

    ##### Routes (backend)

    | Method | Path                                           | Purpose                                                                                                                  |
    | ------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
    | GET    | `/api/v1/assistant/conversations`              | List current user's conversations, newest first                                                                          |
    | POST   | `/api/v1/assistant/conversations`              | Create conversation for a report. Body `{ reportId }`. Injects welcome assistant message (raw transcription + metadata). |
    | GET    | `/api/v1/assistant/conversations/:id/messages` | Full message history for one conversation                                                                                |
    | POST   | `/api/v1/assistant/conversations/:id/messages` | Send user message → SSE stream (tool-call lifecycle)                                                                     |
    | POST   | `/api/v1/assistant/tools/:toolCallId/approval` | Approve/reject a pending tool call                                                                                       |

    ##### Streaming & Tool Approval Flow
    1. Adapter POSTs the user message. Server persists the user message (`status: complete`), then starts the AI provider run.
    2. When the provider requests the `save_transcription` tool, the server emits `tool-input-available` (`toolCallId`, `toolName`, `input` with `transcriptionId` + proposed `latest`).
    3. Server holds the run in an in-memory pending map (keyed by `toolCallId`) and emits `tool-approval-request`.
    4. ChatBox shows the approval UI → user approves/rejects → `POST /tools/:toolCallId/approval` `{ approved, reason }`. On reject, server tells the provider "user rejected" so it can adjust.
    5. On approval: `save_transcription` updates `Transcription.latest`, pushes `history[]` with `reviewer` = provider string, sets Report status → `reviewed`. Server emits `tool-output-available` with the result, then `finish`.
    6. Assistant + tool messages are persisted into `conversation.messages[]` (`status: complete`).

    **Pending-map cleanup:** entries removed after `finish` or on 60s timeout (approval UI shows "expired", see 3.5.1.10).

    **Streaming discipline:** every SSE `event:`/`data:` write is flushed immediately (`res.flush()`) — no buffering, no aggregation — so partial text parts and tool events render without lag. Keep-alive heartbeat (`: ping` comment line) every 15s while the provider run is in flight.

    ##### Response Shapes

    ```
    // GET /assistant/conversations → 200
    {
      "success": true,
      "data": {
        "conversations": [
          { "_id": "...", "reportId": "...", "title": "Report 30-07-2026", "lastMessageAt": "...", "createdAt": "..." }
        ]
      }
    }

    // POST /assistant/conversations → 201
    {
      "success": true,
      "data": {
        "conversation": {
          "_id": "...",
          "reportId": "...",
          "title": "Report 30-07-2026",
          "messages": [
            { "id": "...", "role": "assistant", "status": "complete",
              "parts": [{ "type": "text", "text": "..." }], "createdAt": "..." }
          ]
        }
      }
    }

    // GET /assistant/conversations/:id/messages → 200
    {
      "success": true,
      "data": {
        "messages": [
          { "id": "...", "role": "user", "status": "complete",
            "parts": [{ "type": "text", "text": "..." }], "createdAt": "..." }
        ]
      }
    }

    // POST /assistant/conversations/:id/messages → text/event-stream
    event: part
    data: { "type": "text", "text": "..." }

    event: part
    data: { "type": "tool-input-available", "toolCallId": "...", "toolName": "save_transcription",
            "input": { "transcriptionId": "tr_001", "latest": "..." } }

    event: part
    data: { "type": "tool-approval-request", "toolCallId": "...", "toolName": "save_transcription",
            "input": { "latest": "..." } }

    event: part
    data: { "type": "tool-output-available", "toolCallId": "...",
            "output": { "message": "Transcription updated" } }

    event: finish
    data: {}

    // POST /tools/:toolCallId/approval → 200
    { "success": true }
    ```

    **Setup:**
    - `React.lazy(() => import('./pages/Assistant.jsx'))`
    - Tree-shaken MUI + `@mui/x-chat` imports
    - `displayName` set to `"Assistant"`

    **Backend reference:** `ChatConversation` model, routes, and the `save_transcription` tool flow are specified in temp.md §1.6 and §3.13.

  - 3.6 Report Details Page

    **Purpose:** read-only detail view of a single report — metadata, reviewed transcription, generated report (when completed) with export actions, audio playback, and revision history.

    **Page component:** `client/src/pages/ReportDetail.jsx`. The page renders inside the protected root layout (AppShell) — AppShell is provided by routing, the page component does not render it. `/assistant` is the only protected route that lives outside AppShell (3.5.2).

    **Route:** `{ path: 'reports/:id/details', Component: ReportDetail }` — under AppShell children.

    **Layout Context:** AppShell (2.2) + MuiPageHeader (1.12). AppShell is provided by routing; the page component does not render it.

    **Entry Points:** Reports list/gird "View" action and GlobalSearchDialog result click → `navigate("/reports/:id/details")`.

    **Page header (MuiPageHeader, 1.12):**
    - Left: title "Report Details", subtitle "{user.fullName} • {formatted report date}" — subtitle hidden on vw < 600 portrait.
    - Right slot (children), fixed order — all actions icon-only on mobile with MuiTooltip labels; Edit Report renders as an icon button on mobile:
      1. **MuiStatusBadge** — renders `report.status` with color mapping: `draft` → default, `audio_attached` → warning, `transcribed` → info, `reviewed` → primary, `completed` → success. Label shows the status text. Non-interactive.
      2. **Back** — icon button (ArrowBackIcon), tooltip "Back". On click: `navigate("/reports")`.
      3. **Edit Report** — MuiButton contained, start icon EditIcon, label "Edit Report". On click: `navigate("/reports/:id/edit")`. Hidden when the report is archived.
      4. **Archive/Delete** — conditional, same flows as the Reports page card actions:
         - Not archived → ArchiveIcon (warning), tooltip "Archive" → MuiConfirmDialog → confirm → `PATCH /api/v1/reports/:id/archive` → toast "Report archived" → header refreshes to archived state (Archive replaced by Delete).
         - Archived → DeleteIcon (error), tooltip "Delete" → MuiConfirmDialog → confirm → `DELETE /api/v1/reports/:id` → toast "Report deleted" → `navigate("/reports")`.
      5. **Copy** — icon button (ContentCopyIcon), tooltip "Copy report". Enabled only when generated text exists. Copies the generated report text to the clipboard; on clipboard failure falls back to legacy `execCommand("copy")`; toast "Copied".
      6. **Print** — icon button (PrintIcon), tooltip "Print / Save as PDF". Enabled only when generated text exists. Calls `window.print()` with print CSS that hides AppShell chrome and header actions, leaving the page title and the generated report.

    **Content (single scrollable column, top → bottom):**
    1. **Report Metadata card** — read-only: date; branches (names joined with ", "); per-branch rows (branch name + `clockIn`–`clockOut` time range); top-level clockIn / clockOut; createdAt / updatedAt (formatted).
    2. **Transcription card** — read-only: shows `Transcription.latest` when non-empty; otherwise shows `Transcription.raw` with the note "Not reviewed yet"; when both are empty → "No transcription yet".
    3. **Generated Report card** — status-dependent:
       - `completed`: generated report text in the initial-doc §6.1 format, pre-wrap; action row: Copy, TXT download (Blob, `text/plain`, UTF-8 BOM `\uFEFF`, filename `Report-<date>.txt`), Print / Save as PDF; collapsible "Show reviewed transcription" for comparison.
       - `reviewed` (`latest` non-empty): "No generated report yet" + Generate Report button (contained) + provider selector (default "addis"; options "addis", "gemini", "nvidia") + helper "Generate the final report from the reviewed transcription".
       - `transcribed` (`latest` empty): Generate Report button disabled + tooltip "Review the transcription first".
       - `draft` / `audio_attached`: Generate Report button disabled + helper "Waiting for transcription".
       - Generate click → `POST /api/v1/reports/:id/generate` body `{ "provider": "..." }`; button shows loading state while pending; on 200 the card renders the generated text + toast "Report generated"; on 422 toast the message and keep the card unchanged; on 429 toast "Rate limit reached, try again later"; on 502 toast "Generation failed, try again".
    4. **Audio card** — read-only, one row per `report.audio` item: label = `originalName`, duration = `duration` seconds formatted `m:ss`. Play: streams `GET /api/v1/audio/:audioId/stream` into an inline `<audio>` player. Download: `GET /api/v1/audio/:audioId/download` → file attachment with `originalName`. Empty state "No audio recorded" when `report.audio` is empty.
    5. **History card** — read-only revision list (same data as the edit page History tab, 3.5.1.9): each entry shows reviewer (user fullName or provider string), timestamp, and status at revision time; expandable to show the text.

    **Data Flow:**
    - `GET /api/v1/reports/:id` → 200:

    ```json
    {
      "success": true,
      "data": {
        "report": {
          "_id": "rpt_001",
          "date": "30-07-2026",
          "branches": [
            {
              "_id": "br_001",
              "name": "መድኃኒዓለም",
              "clockIn": "02:30",
              "clockOut": "07:40"
            },
            {
              "_id": "br_002",
              "name": "ኤርፖርት",
              "clockIn": "07:55",
              "clockOut": "12:20"
            }
          ],
          "audio": [
            {
              "_id": "aud_001",
              "originalName": "clip_1.webm",
              "mimeType": "audio/webm;codecs=opus",
              "duration": 272
            }
          ],
          "clockIn": "02:30",
          "clockOut": "12:20",
          "status": "completed",
          "generated": "...",
          "isArchived": false,
          "user": { "fullName": "Beza Ayelue" },
          "createdAt": "...",
          "updatedAt": "..."
        },
        "transcription": {
          "_id": "tr_001",
          "raw": "...",
          "latest": "...",
          "history": []
        }
      }
    }
    ```

    - 404 → `{ "success": false, "message": "Report not found" }` → toast "Report not found" + `navigate("/reports")`.
    - `POST /api/v1/reports/:id/generate` body `{ "provider": "addis" }` → 200 `{ "success": true, "data": { "report": { "...", "status": "completed", "generated": "..." }, "generated": "..." } }`.
      - 403 archived → toast "Report is archived", card unchanged.
      - 422 empty `latest` → toast the message, card unchanged.
      - 429 → toast "Rate limit reached, try again later", card unchanged.
      - 502 → toast "Generation failed, try again", status and generated text unchanged.

    **Edge Cases:**
    - Report 404 (deleted or bad id) → toast "Report not found" + navigate to `/reports`.
    - Archived report → header shows only Delete (Edit Report, Copy, Print, Archive hidden); Generate Report disabled.
    - Generate on archived report (API) → 403 → toast "Report is archived", card unchanged.
    - Generate invoked with empty `latest` → 422 → toast "Review the transcription before generating", card unchanged.
    - Provider rate limit (429) → toast "Rate limit reached, try again later", card unchanged.
    - Provider failure (502) → toast "Generation failed, try again", status and generated text unchanged.
    - Clipboard blocked → legacy `execCommand("copy")` fallback; still failing → toast "Copy failed".
    - Print → browser print dialog; print CSS hides AppShell chrome and page header actions.
    - Audio clips missing → "No audio recorded" empty state.
    - Transcription missing (`draft`) → "No transcription yet" empty state.

    ##### Generate Report — `POST /api/v1/reports/:id/generate`

    **Purpose:** produce the final report text from `Transcription.latest` using the selected provider (initial-doc §8 — transcription accuracy is the foundation every subsequent step, including report generation, depends on; §5.2 — report content must be generated from the reviewed transcription, not directly from raw audio; §6.8 — the transcription is raw material, the AI converts it into the required report structure).

    **Request body:** `{ "provider": "addis" | "gemini" | "nvidia" }` — default `"addis"` (initial-doc §18.7 Text Generation).

    **Preconditions (checked in order):**
    1. Report exists — else 404.
    2. Report not archived — else 403 `"Report is archived"`.
    3. `Transcription.latest` non-empty — else 422 `"Review the transcription before generating"`.

    **Flow:**
    1. Validate preconditions above.
    2. Build the generation prompt from the initial-doc §6.1 report format + report metadata (date, branches with times, top-level clockIn/clockOut) + `Transcription.latest` (generation prompt per initial-doc §21.1).
    3. Dispatch to the selected provider — initial-doc §18 (Addis), §19.1 (Gemini; "no streaming" per §19.1), §19.2 (Nvidia). All providers return a full text response — no token streaming for generation.
    4. Success: write `report.generated`, append `report.generatedHistory` entry (`{ provider, text, generatedAt }`), set `report.status` → `completed`, respond 200 (`data.report` incl. `generated` + top-level `data.generated` echo).
    5. Provider rate limit → 429 `"Rate limit reached, try again later"` — status and `generated` unchanged.
    6. Provider/network failure (3 retries, exponential backoff — initial-doc §19.1) → 502 `"Generation failed, try again"` — status and `generated` unchanged.

    **Re-generation:** allowed via API — overwrites `report.generated`, appends a new `generatedHistory` entry. No UI path currently (details page shows the Generate button only for status `reviewed`).

    **Frontend reference:** workflow §3.6 (details page generate flow + edge cases).

    **Setup:**
    - `React.lazy(() => import('./pages/ReportDetail.jsx'))`
    - Tree-shaken imports
    - `displayName` set to `"ReportDetail"`

    **Backend reference:** the full details-page spec, response shapes, and edge cases are mirrored in temp.md §3.14; generate endpoint spec in §3.15; generate/audio response shapes in §3.12.
