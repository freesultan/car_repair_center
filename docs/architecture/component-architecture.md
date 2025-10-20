# Component Architecture

## Last Updated
- **Date and Time (UTC)**: 2025-10-20 05:14:55
- **User**: freesultan

## Overall Architecture

The Car Repair Center application follows a layered architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                      UI Components Layer                    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐  │
│  │ Layout  │ │  Pages  │ │  Forms  │ │ Common  │ │Dialogs│  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └───────┘  │
├─────────────────────────────────────────────────────────────┤
│                    Application Logic Layer                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐   │
│  │ Hooks   │ │Contexts │ │  Redux  │ │ Service Workers │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                      Data Access Layer                      │
│  ┌─────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │API Client│ │Local Storage│ │ IndexedDB  │ │File System│ │
│  └─────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────────────────────────────────┘
             │                                   │
             ▼                                   ▼
┌──────────────────────┐             ┌────────────────────────┐
│   Backend Server     │             │ Local Storage & Files  │
│  (Express + Node.js) │             │ (Images, Audio, Cache) │
└──────────────────────┘             └────────────────────────┘
             │
             ▼
┌──────────────────────┐
│     PostgreSQL       │
│     Database         │
└──────────────────────┘
```

## Component Hierarchy

### Layout Components
- **AppLayout**: Main application wrapper with RTL support
  - **Header**: App header with navigation and language selector
  - **Sidebar**: Navigation sidebar with collapsible menu
  - **MobileNav**: Bottom navigation for tablet/mobile
  - **Footer**: App footer with version info
  - **PageContainer**: Container for page content with proper RTL padding

### Page Components
- **Dashboard**: Main dashboard view
  - **StatisticCards**: Summary statistics display
  - **RecentRepairs**: Recent repair requests list
  - **TechnicianStatus**: Technician workload indicators
  - **ActivityFeed**: Recent activity timeline
  
- **CustomerPages**
  - **CustomersList**: List of all customers with search and filters
  - **CustomerDetail**: Single customer view with tabs for details and vehicles
  - **CustomerForm**: Add/edit customer with validation
  - **CustomerVehicles**: List of customer's vehicles
  
- **VehiclePages**
  - **VehiclesList**: List of all vehicles with advanced search
  - **VehicleDetail**: Single vehicle view with repair history
  - **VehicleForm**: Add/edit vehicle with validation
  - **VehicleRepairHistory**: Timeline of vehicle repairs
  
- **RepairPages**
  - **RepairsList**: List of all repairs with status filters
  - **RepairDetail**: Single repair view with multiple sections
  - **RepairForm**: Add/edit repair with multi-step process
  - **RepairApproval**: Customer approval collection interface
  - **RepairDocumentation**: Photo documentation management
  - **RepairCosts**: Cost breakdown and estimates
  
- **UserPages**
  - **UsersList**: List of all users with role filters
  - **UserDetail**: Single user view with permissions
  - **UserForm**: Add/edit user with role assignment
  - **UserPreferences**: User preference settings
  
- **AuthPages**
  - **Login**: User login with validation
  - **ForgotPassword**: Password recovery flow
  - **ChangePassword**: Password change form

### Form Components
- **CustomerForms**
  - **BasicInfoForm**: Basic customer info (name, phone)
  - **ContactInfoForm**: Customer contact details (email, address)
  - **SearchCustomerForm**: Advanced customer search

- **VehicleForms**
  - **VehicleInfoForm**: Vehicle details (make, model, year)
  - **LicenseForm**: Vehicle license and identification
  - **SearchVehicleForm**: Advanced vehicle search

- **RepairForms**
  - **RepairDetailsForm**: Basic repair info and description
  - **CostEstimateForm**: Repair cost breakdown and totals
  - **TechnicianAssignForm**: Assign repair to technician
  - **RepairStatusForm**: Update repair status

### Common Components
- **Buttons**
  - **PrimaryButton**: Main action button
  - **SecondaryButton**: Secondary action button
  - **IconButton**: Button with icon
  - **FloatingActionButton**: Floating action button

- **Inputs**
  - **TextInput**: Text input field with RTL support
  - **SelectInput**: Select dropdown with search
  - **DatePicker**: Persian date selection
  - **FileInput**: File upload input with preview
  - **SearchInput**: Search field with suggestions
  - **PhoneInput**: Phone number input with formatting

- **Feedback**
  - **Alert**: Alert/notification component with types
  - **Spinner**: Loading indicator with size variants
  - **ProgressBar**: Progress indicator
  - **Snackbar**: Temporary notifications
  - **ErrorBoundary**: Error catching component

- **Display**
  - **Card**: Content card with header and actions
  - **Table**: Data table with sorting and pagination
  - **StatusBadge**: Status indicator with colors
  - **Avatar**: User or customer avatar
  - **TabPanel**: Tabbed content panel
  - **Accordion**: Collapsible content sections
  - **Timeline**: Vertical timeline display

### Media Components
- **CameraCapture**: Camera access and photo capture
  - **CameraPreview**: Live camera preview
  - **CaptureButton**: Photo capture trigger
  - **GalleryAccess**: Access to device gallery

- **VoiceRecorder**: Microphone access and voice recording
  - **RecordButton**: Recording control
  - **AudioWaveform**: Audio visualization
  - **PlaybackControls**: Audio playback interface

- **SignaturePad**: Digital signature capture
  - **SignatureCanvas**: Drawing area
  - **ClearButton**: Clear signature button
  - **SaveSignature**: Save signature action

- **ImageViewer**: Image viewing with zoom
  - **ZoomControls**: Image zoom interface
  - **FullscreenToggle**: Fullscreen view toggle
  - **ImageAnnotator**: Image markup tools

- **ImageGallery**: Multiple image gallery
  - **ThumbnailStrip**: Small image previews
  - **MainImageView**: Featured image display
  - **CategoryFilter**: Filter by image category

## State Management

### Redux Store Structure
- **auth**: Authentication state
  - currentUser: Current logged in user
  - permissions: User permissions
  - loginStatus: Authentication status
  - error: Authentication errors

- **customers**: Customer data
  - list: Array of customers
  - selected: Currently selected customer
  - loading: Loading state
  - error: Error state
  - filters: Active search/filters

- **vehicles**: Vehicle data
  - list: Array of vehicles
  - selected: Currently selected vehicle
  - loading: Loading state
  - error: Error state
  - filters: Active search/filters

- **repairs**: Repair data
  - list: Array of repairs
  - selected: Currently selected repair
  - loading: Loading state
  - error: Error state
  - filters: Active search/filters

- **ui**: UI state
  - theme: Light/dark theme preference
  - language: Current language selection
  - sidebarOpen: Sidebar open state
  - notifications: Active notifications
  - mobileNavActive: Mobile navigation state

- **offline**: Offline state
  - isOnline: Online status
  - syncedAt: Last sync timestamp
  - pendingOperations: Operations waiting to sync
  - syncErrors: Failed sync operations

### Context Providers
- **ThemeProvider**: Provides theme and RTL direction
  - theme: Current theme object
  - direction: RTL/LTR text direction
  - toggleTheme: Theme switching function

- **AuthProvider**: Provides authentication context
  - user: Current user object
  - login: Login function
  - logout: Logout function
  - isAuthenticated: Authentication state

- **NotificationProvider**: Provides notification system
  - notifications: Current notifications
  - addNotification: Add notification function
  - removeNotification: Remove notification function
  - clearAll: Clear all notifications

- **OfflineProvider**: Provides offline status and syncing
  - isOnline: Online/offline state
  - lastSynced: Last sync timestamp
  - pendingChanges: Number of pending changes
  - syncNow: Manual sync trigger function

## Data Flow

1. **User Interaction** → User interacts with component (e.g., form submission)
2. **Action Dispatch** → Component dispatches Redux action or calls service
3. **Service Layer** → Service makes API call or accesses local storage
4. **API/Storage Operation** → Data is retrieved or modified
5. **Action Resolution** → Redux action is resolved with success/error
6. **State Update** → Redux store updates with new data
7. **Component Re-render** → Connected components update with new state

## Responsive Design Approach

- **Mobile-first** design principles throughout the application
- **Breakpoint system** using Material UI's breakpoint helpers:
  - xs: < 600px (mobile phones)
  - sm: 600-960px (tablets)
  - md: 960-1280px (small laptops)
  - lg: 1280-1920px (desktops)
  - xl: > 1920px (large screens)

- **Component adaptation** strategies:
  - Stack layouts on mobile, horizontal on desktop
  - Hide non-essential UI on smaller screens
  - Larger touch targets on tablet devices
  - Bottom navigation on mobile, sidebar on desktop
  - Full-width forms on mobile, constrained on desktop

## RTL & Internationalization Strategy

- **Direction management**:
  - Material UI ThemeProvider with RTL direction
  - Emotion cache with stylis-plugin-rtl
  - CSS logical properties where possible (start/end vs left/right)

- **Text content**:
  - All text in translation files (fa.json, en.json)
  - Dynamic interpolation for variable content
  - Translation namespaces by feature area

- **Layout considerations**:
  - Mirror layouts when switching directions
  - Icons that imply direction need mirroring
  - Text alignment follows direction

- **Date and number formatting**:
  - Persian date display using appropriate libraries
  - Number localization for Persian/Arabic numerals
  - Currency formatting for Rial/Toman

## Performance Optimization

- **Code splitting** by route using React.lazy and Suspense
- **Image optimization** techniques:
  - Responsive images with srcset
  - Lazy loading for off-screen images
  - Proper compression for photos
  - Local caching of images

- **Render optimization**:
  - Memoization of expensive components
  - Virtualization for long lists
  - Pagination for large data sets
  - Optimistic UI updates

- **Offline capabilities**:
  - Service worker for asset caching
  - IndexedDB for offline data storage
  - Queue system for offline operations
  - Sync on reconnection
