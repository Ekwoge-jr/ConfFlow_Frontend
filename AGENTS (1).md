# ConfFlow Frontend --- AI Agent Development Guide

## 1. Source of Truth

This frontend must be developed against the official ConfFlow Software
Requirements Specification (SRS), Version 1.0, together with approved
UI/UX designs.

The SRS defines ConfFlow as a multi-conference, white-label conference
participant-management platform. It covers conference setup,
registration, participant management, groups, communication, badges,
scanning, attendance, dashboards, reporting, and later program/session,
portal, certificate, feedback, and offline capabilities.

When requirements conflict:

1.  Follow the SRS for product functionality and scope.
2.  Follow approved UI designs for visual presentation and interaction
    design.
3.  Do not invent functionality that is unsupported by either source.
4.  If an implementation decision is ambiguous, preserve the SRS
    terminology and ask for clarification rather than inventing major
    behavior.

------------------------------------------------------------------------

## 2. MVP Scope

The SRS defines Phase 1 --- MVP as:

-   Conference setup
-   Registration/import
-   Participant management
-   Participant groups
-   Email/communication
-   QR badges
-   QR scanning
-   Attendance
-   Dashboard
-   XLSX/CSV/PDF export

The MVP should therefore be treated as the primary implementation scope.

The frontend must provide a structure capable of supporting these MVP
capabilities without requiring a major architectural rewrite.

### MVP feature areas

``` text
features/
├── auth/
├── conferences/
├── registration/
├── participants/
├── groups/
├── campaigns/
├── templates/
├── badges/
├── scanner/
├── attendance/
├── dashboard/
└── reports/
```

------------------------------------------------------------------------

## 3. Post-MVP Scope

The SRS places the following capabilities outside the Phase 1 MVP:

### Phase 2

-   Program builder
-   Parallel-session selection
-   Participant portal
-   Certificates
-   Advanced reporting

### Phase 3

-   Offline synchronization hardening
-   Surveys
-   Integrations
-   Advanced analytics
-   Automation

### Phase 4 / Optional AI

-   AI-assisted email drafting
-   Natural-language search
-   Participant segmentation suggestions
-   Session demand/capacity forecasting
-   Attendance anomaly detection
-   Feedback summarization
-   Personalized session recommendations
-   Conference chatbot
-   AI-generated executive reports

Do not implement these as MVP functionality unless explicitly requested.

The architecture may prepare for them, but avoid building speculative
functionality.

------------------------------------------------------------------------

## 4. Product Principles

The SRS establishes these principles:

### White-label first

Conference identity is participant-facing while ConfFlow remains the
platform identity.

Conference configuration must therefore support conference-specific
branding such as:

-   Name
-   Logo
-   Colors
-   Email identity
-   Templates

### Mobile first

Registration desk and participant workflows must work well on
smartphones.

### Operational simplicity

Common conference tasks should require few clicks and use clear status
indicators.

### Privacy by design

Only necessary participant information should be collected. QR payloads
must not unnecessarily expose personal data.

### Auditability

Significant administrative actions and attendance changes must be
traceable.

### Low-connectivity resilience

Scanning must be designed with intermittent connectivity in mind.

------------------------------------------------------------------------

## 5. Technology Stack

The frontend uses:

-   Next.js with the App Router
-   React
-   TypeScript
-   Tailwind CSS
-   Reusable React components
-   Backend API integration

Use functional React components and TypeScript throughout.

------------------------------------------------------------------------

## 6. Project Architecture

Use a feature-based architecture.

``` text
src/
├── app/          # Routing and route-level composition
├── components/   # Shared, domain-agnostic UI
├── features/     # Business features and feature-specific UI
├── lib/          # Shared infrastructure and utilities
├── hooks/        # Globally reusable React hooks
├── types/        # Globally reusable TypeScript types
├── config/       # Application configuration
├── providers/    # Global React providers
└── styles/       # Global design tokens/styles
```

### Architectural decision rule

``` text
Is it a route/page/layout?
    → src/app/

Is it specific to one business feature?
    → src/features/<feature>/

Is it reusable across multiple features and domain-agnostic?
    → src/components/

Is it infrastructure such as API/auth/storage/utilities?
    → src/lib/

Is it a globally reusable React hook?
    → src/hooks/

Is it a global TypeScript type?
    → src/types/

Is it application configuration?
    → src/config/

Is it a global React provider?
    → src/providers/
```

Do not create duplicate implementations when an existing component,
hook, utility, or service can be reused.

------------------------------------------------------------------------

## 7. Recommended Route Structure

``` text
src/app/
│
├── (auth)/
│   └── login/
│       └── page.tsx
│
├── (platform)/
│   ├── conferences/
│   │   └── page.tsx
│   │
│   └── c/
│       └── [conferenceId]/
│           ├── layout.tsx
│           ├── dashboard/
│           │   └── page.tsx
│           │
│           ├── registration/
│           │   ├── page.tsx
│           │   └── import/
│           │       └── page.tsx
│           │
│           ├── participants/
│           │   ├── page.tsx
│           │   ├── new/
│           │   └── [participantId]/
│           │
│           ├── groups/
│           │   ├── page.tsx
│           │   └── [groupId]/
│           │
│           ├── campaigns/
│           │   ├── page.tsx
│           │   ├── new/
│           │   └── [campaignId]/
│           │
│           ├── templates/
│           │   ├── page.tsx
│           │   └── [templateId]/
│           │
│           ├── badges/
│           │   └── page.tsx
│           │
│           ├── scanner/
│           │   └── page.tsx
│           │
│           ├── attendance/
│           │   └── page.tsx
│           │
│           ├── reports/
│           │   └── page.tsx
│           │
│           └── settings/
│               └── page.tsx
│
└── globals.css
```

The exact routes may change as designs evolve, but the feature
boundaries should remain clear.

------------------------------------------------------------------------

## 8. Conference Context

ConfFlow is multi-conference.

Conference-specific routes use:

``` text
/c/[conferenceId]/
```

Examples:

``` text
/c/dsa-2027/dashboard
/c/dsa-2027/participants
/c/dsa-2027/campaigns
/c/dsa-2027/scanner
```

Rules:

-   Never hard-code a conference ID.
-   Never assume only one conference exists.
-   Conference-specific data must use the active `conferenceId`.
-   The selected conference is the context for the authenticated
    conference workspace.
-   Conference configuration must remain isolated between conferences.

------------------------------------------------------------------------

## 9. Feature Architecture

Each business feature should normally use:

``` text
features/<feature>/
├── components/
├── hooks/
├── services/
├── types.ts
├── constants.ts
└── index.ts
```

### Components

Feature-specific UI.

### Hooks

Feature-specific state and React behavior.

### Services

Feature-specific API/business operations.

### Types

Types used primarily by the feature.

### Constants

Feature-specific constants.

### Index

Public exports from the feature where useful.

------------------------------------------------------------------------

## 10. Conference Management

The SRS requires conference creation, editing, archiving, cloning,
isolated data, and configurable conference identity.

Conference functionality belongs in:

``` text
features/conferences/
```

Conference configuration should account for:

-   Event name
-   Acronym
-   Logo
-   Colors
-   Venue
-   Dates
-   Website
-   Email identity
-   Templates
-   Conference-specific settings

Do not mix conference-level configuration with participant-specific
logic.

------------------------------------------------------------------------

## 11. Registration

Registration is an MVP capability and must have its own feature
boundary.

``` text
features/registration/
├── components/
├── hooks/
├── services/
├── types.ts
└── constants.ts
```

The SRS requires configurable registration forms and participant import
from validated CSV/XLSX files with duplicate detection.

Registration-related UI should therefore be designed around:

-   Registration configuration
-   Custom fields
-   Participant import
-   Validation
-   Duplicate detection states
-   Registration status

Do not hide all registration logic inside the participants feature.

------------------------------------------------------------------------

## 12. Participant Management

The SRS requires participant search/filtering by:

-   Name
-   Email
-   Participant ID
-   Country
-   Institution
-   Category
-   Status

Participant functionality belongs in:

``` text
features/participants/
```

The participant feature may contain:

``` text
ParticipantTable
ParticipantFilters
ParticipantForm
ParticipantProfile
ParticipantStatus
ParticipantImport
Participant360
```

The participant profile should be structured so it can later represent
the participant's groups, communications, sessions, attendance, and
certificate information.

------------------------------------------------------------------------

## 13. Groups

The SRS requires:

-   Static groups
-   Dynamic groups
-   Multiple group membership
-   Group-based filtering
-   Groups as campaign recipients

Groups belong in:

``` text
features/groups/
```

Do not implement groups as merely a visual filter inside the participant
table.

------------------------------------------------------------------------

## 14. Communication and Campaigns

Communication is an MVP capability.

The SRS requires:

-   Personalized email
-   Recipients based on all participants, selected participants, groups,
    or filters
-   Templates
-   Scheduled campaigns
-   Communication history
-   Delivery states

Campaign functionality belongs in:

``` text
features/campaigns/
```

Template functionality belongs in:

``` text
features/templates/
```

Campaign UI should support the concepts represented by the SRS:

``` text
Recipients
Template
Variables
Preview
Schedule
Delivery status
```

Safe variables include examples such as:

``` text
{{FirstName}}
{{ConferenceName}}
{{SessionName}}
{{Room}}
{{PresentationTime}}
```

Do not hard-code campaign recipients into UI components.

------------------------------------------------------------------------

## 15. Badges and QR

QR badges are an MVP capability.

Badge functionality belongs in:

``` text
features/badges/
```

The SRS requires:

-   Unique participant badge
-   Configurable conference branding
-   Participant identity
-   Human-readable participant ID
-   Secure QR token

Important security rule:

The QR code should reference an opaque/revocable token rather than
unnecessarily embedding participant personal data.

Do not place personal participant data directly into QR payloads unless
explicitly required by the backend contract.

------------------------------------------------------------------------

## 16. Scanner

The scanner belongs in:

``` text
features/scanner/
├── components/
├── hooks/
├── services/
├── types.ts
└── constants.ts
```

Scanner functionality includes:

-   Camera scanning
-   QR validation
-   Participant result
-   Manual lookup fallback
-   Scan state
-   Attendance recording
-   Duplicate handling
-   Synchronization status

The SRS requires valid QR resolution normally within 2 seconds for
online scanning.

The scanner UI must therefore prioritize:

-   Speed
-   Clear feedback
-   Large touch targets
-   Minimal interaction steps
-   Obvious success/error states

------------------------------------------------------------------------

## 17. Attendance

Attendance belongs in:

``` text
features/attendance/
```

The SRS defines:

-   Conference-day attendance
-   Session-level attendance
-   Duplicate scan handling
-   Configurable duplicate grace period
-   Authorized manual corrections
-   Audit logging
-   Attendance percentage

Do not treat attendance as merely a dashboard statistic. It is an
operational feature with its own business rules.

------------------------------------------------------------------------

## 18. Dashboard

Dashboard belongs in:

``` text
features/dashboard/
```

The SRS recommends KPIs including:

-   Registered
-   Confirmed
-   Checked in
-   Onsite
-   Attendance rate
-   Countries
-   Institutions
-   Categories
-   Academic levels
-   Session demand
-   Room utilization
-   Communication delivery
-   Operational alerts

The current approved dashboard design already establishes reusable
patterns such as:

``` text
DashboardHeader
KpiCard
AttendanceTrend
AcademicLevels
OperationalAlerts
RecentActivity
```

Repeated KPI cards and alerts must use reusable components rather than
duplicated implementations.

------------------------------------------------------------------------

## 19. Reporting

Reports belong in:

``` text
features/reports/
```

The MVP requires export to:

-   XLSX
-   CSV
-   PDF

The SRS describes report types including:

-   Daily attendance
-   Session attendance/capacity
-   Participant demographics
-   Communication delivery
-   Certificate eligibility

Do not build export logic directly inside a dashboard component.

------------------------------------------------------------------------

## 20. Program and Session Selection

Program management and parallel-session selection are Phase 2.

The architecture may reserve:

``` text
features/program/
features/session-selection/
```

but these should not be treated as MVP requirements unless explicitly
requested.

Phase 2 program concepts include:

-   Days
-   Tracks
-   Rooms
-   Sessions
-   Speakers
-   Chairs
-   Capacity
-   Conflict-free parallel-session selection

------------------------------------------------------------------------

## 21. Certificates, Portal, and Feedback

These are not primary MVP implementation areas.

Potential future boundaries:

``` text
features/certificates/
features/portal/
features/feedback/
```

Do not build them as MVP functionality unless requested.

The SRS describes certificates as calculating eligibility and generating
verifiable certificates; the participant portal includes program, badge,
sessions, materials, and certificates; feedback includes configurable
surveys and analytics.

------------------------------------------------------------------------

## 22. Offline Scanning

Offline functionality is important to the product architecture, but the
SRS places full offline synchronization in a later phase.

The scanner should therefore be architected so offline synchronization
can be added without rewriting the scanner.

Use:

``` text
lib/storage/
```

for generic browser storage infrastructure.

Keep scanner-specific queue and synchronization behavior in:

``` text
features/scanner/
```

Do not scatter offline logic throughout unrelated UI components.

------------------------------------------------------------------------

## 23. API Architecture

Preferred flow:

``` text
Page
  ↓
Feature Component
  ↓
Feature Hook
  ↓
Feature Service
  ↓
Shared API Client
  ↓
Backend
```

API infrastructure belongs in:

``` text
src/lib/api/
```

Feature API operations belong in:

``` text
src/features/<feature>/services/
```

Do not repeatedly write raw API calls inside UI components.

Centralize:

-   Base API URL
-   Request configuration
-   Authentication headers
-   Common error handling
-   Response handling

------------------------------------------------------------------------

## 24. Data Model Awareness

The frontend should respect the SRS domain model.

Important entities include:

``` text
Conference
User
Participant
Registration
ParticipantGroup
GroupMembership
Track
Room
Session
SessionSelection
Attendance
Badge
QRToken
EmailTemplate
EmailCampaign
EmailDelivery
Certificate
Survey
SurveyResponse
Notification
AuditLog
```

The frontend does not own the backend data model, but feature names, API
payloads, UI terminology, and TypeScript models should remain consistent
with the SRS.

Do not invent conflicting entity names without a reason.

------------------------------------------------------------------------

## 25. Roles and Permissions

The SRS identifies roles including:

-   Super Administrator
-   Conference Administrator
-   Program Chair
-   Registration Team
-   Communication Manager
-   Logistics Manager
-   Instructor/Speaker
-   Participant

Privileged actions must require authenticated and authorized access.

Frontend permission checks improve UX, but authorization must ultimately
be enforced by the backend.

Do not treat hiding a button as a security mechanism.

------------------------------------------------------------------------

## 26. Design System

The approved ConfFlow designs establish the initial visual language:

-   Purple/indigo primary color
-   Light lavender/neutral backgrounds
-   White cards/surfaces
-   Dark navy/gray text
-   Soft borders
-   Rounded cards and controls
-   Subtle shadows
-   Green success states
-   Orange warning states
-   Red error states
-   Clean, minimal dashboard presentation

Use design tokens instead of repeatedly hard-coding values.

Do not introduce arbitrary colors or styles without checking the
existing design system.

------------------------------------------------------------------------

## 27. Responsive and Mobile Requirements

The SRS explicitly requires modern smartphone support for participant
and scanning workflows.

Therefore:

-   Participant workflows must be responsive.
-   Scanner must be optimized for smartphones.
-   Touch targets must be usable.
-   Layouts must adapt to smaller screens.
-   Do not assume a fixed desktop viewport.

The admin dashboard may be desktop-oriented, but it should still degrade
gracefully on smaller screens.

------------------------------------------------------------------------

## 28. Accessibility

The SRS targets WCAG 2.1 AA for primary web workflows.

Use:

-   Semantic HTML
-   Accessible labels
-   Keyboard navigation
-   Visible focus states
-   Appropriate contrast
-   Accessible dialogs
-   Meaningful alternative text
-   Status communication that does not rely only on color

Accessibility is a product requirement, not an optional enhancement.

------------------------------------------------------------------------

## 29. Performance

The SRS specifies:

-   Typical participant search should return results within 2 seconds
    under normal load.
-   Online QR validation should normally complete within 2 seconds.
-   Architecture should support at least 10,000 participant
    registrations per conference without redesign.

Frontend rules:

-   Avoid unnecessary rendering.
-   Use pagination or appropriate data loading for large lists.
-   Debounce participant search where appropriate.
-   Do not load large datasets unnecessarily.
-   Keep scanner interactions lightweight.
-   Avoid unnecessary client-side dependencies.

------------------------------------------------------------------------

## 30. Loading, Empty, Error, and Success States

Every data-driven feature should consider:

``` text
Loading
Success
Empty
Error
```

Reusable states belong in:

``` text
components/feedback/
```

For operational workflows such as scanning, use explicit states such as:

``` text
Valid scan
Invalid QR
Participant not found
Already checked in
Network unavailable
Sync pending
Sync successful
```

------------------------------------------------------------------------

## 31. Forms

Forms must:

-   Have accessible labels.
-   Validate input.
-   Display clear validation errors.
-   Provide loading states.
-   Prevent duplicate submission.
-   Provide success/error feedback.
-   Preserve user-entered values where appropriate after recoverable
    errors.

Feature-specific forms belong inside their feature.

------------------------------------------------------------------------

## 32. Naming Conventions

Use:

-   PascalCase for React components.
-   camelCase for functions and variables.
-   `useX` naming for hooks.
-   kebab-case for URL route segments.
-   Descriptive names.

Examples:

``` text
CampaignBuilder.tsx
useCampaignBuilder.ts
campaign.service.ts
ConferenceCard.tsx
```

Avoid:

``` text
Thing.tsx
Helper.ts
Component1.tsx
Stuff.tsx
```

------------------------------------------------------------------------

## 33. Mock Data

Mock data is allowed while backend endpoints are unavailable.

Keep mocks separate from production API logic.

Example:

``` text
features/dashboard/
├── mocks/
│   └── dashboard.mock.ts
├── services/
│   └── dashboard.service.ts
```

When backend integration becomes available, replace the mock
implementation without unnecessarily changing the UI.

Do not present mock behavior as completed backend functionality.

------------------------------------------------------------------------

## 34. Security

Frontend security rules:

-   Never commit secrets.
-   Never expose private credentials.
-   Do not put sensitive participant information into QR payloads.
-   Do not assume frontend permission checks provide security.
-   Do not store unnecessary sensitive information in browser storage.
-   Respect backend authorization.
-   Avoid exposing detailed backend errors to end users.

The SRS requires authenticated/authorized privileged actions and
auditable logging.

------------------------------------------------------------------------

## 35. Environment Variables

Use:

``` text
.env.local
```

for local configuration.

Maintain:

``` text
.env.example
```

as documentation.

Never commit:

-   API secrets
-   Private keys
-   Authentication secrets
-   Database credentials
-   Other sensitive credentials

Only browser-safe variables should use `NEXT_PUBLIC_`.

------------------------------------------------------------------------

## 36. Dependencies

Before installing a dependency:

1.  Check whether the project already provides the capability.
2.  Check whether the requirement can be solved simply without a
    dependency.
3.  Consider bundle size and maintenance.
4.  Ensure it does not conflict with the existing design system.
5.  Add only when there is a clear benefit.

Do not introduce multiple overlapping UI libraries.

------------------------------------------------------------------------

## 37. Figma-to-Code Workflow

When implementing an approved design:

1.  Identify the corresponding SRS feature.
2.  Confirm whether the feature is MVP or later phase.
3.  Identify reusable design-system components.
4.  Identify feature-specific components.
5.  Implement the route.
6.  Implement the layout.
7.  Implement interactions.
8.  Implement loading/error/empty states.
9.  Implement responsive behavior.
10. Validate against the design.
11. Verify that the implementation still respects the SRS.

Never let a Figma screen silently introduce unsupported product
functionality.

------------------------------------------------------------------------

## 38. Existing Approved Screens

Current approved designs include:

### Login

Purpose:

-   Authenticate the user.

Route:

``` text
/login
```

### Conference Selector

Purpose:

-   Display/select conferences available to the authenticated user.

Route:

``` text
/conferences
```

### Conference Dashboard

Purpose:

-   Provide conference-level operational and executive overview.

Route:

``` text
/c/[conferenceId]/dashboard
```

These screens establish the initial ConfFlow visual language and should
be reused as the basis for subsequent screens.

------------------------------------------------------------------------

## 39. Do Not Over-Engineer

ConfFlow is being developed incrementally.

Do not:

-   Build Phase 2 functionality while implementing Phase 1 unless
    requested.
-   Implement optional AI features without explicit approval.
-   Add speculative integrations.
-   Introduce unnecessary state-management systems.
-   Create unnecessary abstractions.
-   Add dependencies without justification.
-   Build backend functionality in the frontend.
-   Rewrite unrelated parts of the application.

Prepare clean extension points, but implement only what is required.

------------------------------------------------------------------------

## 40. Avoid Unrelated Changes

When implementing a task:

-   Modify only necessary files.
-   Do not rewrite unrelated components.
-   Do not change the design system without reason.
-   Do not rename files unnecessarily.
-   Do not restructure the application without a real architectural
    need.

If a broad architectural problem is discovered, explain it before
performing a large refactor.

------------------------------------------------------------------------

## 41. Testing Awareness

The SRS requires:

-   Unit tests for business rules and permissions.
-   API integration tests.
-   End-to-end tests for critical participant and organizer paths.
-   Load testing for registration, bulk email, and peak check-in.
-   Offline/online synchronization testing.
-   Security testing.
-   User acceptance testing.

Frontend implementations should therefore be structured so critical
feature behavior can be tested.

Do not put all business behavior into untestable giant components.

------------------------------------------------------------------------

## 42. AI Agent Development Process

For every implementation task:

``` text
1. Read the task
        ↓
2. Identify the related SRS requirement
        ↓
3. Determine MVP vs later phase
        ↓
4. Find the relevant route
        ↓
5. Find the relevant feature
        ↓
6. Check existing reusable components
        ↓
7. Check existing hooks/services/types
        ↓
8. Implement the smallest clean solution
        ↓
9. Validate against the SRS
        ↓
10. Validate against the approved design
        ↓
11. Check TypeScript/build
        ↓
12. Report files changed and behavior implemented
```

If a request conflicts with the SRS, explicitly state the conflict
before implementation.

------------------------------------------------------------------------

## 43. Golden Rules

1.  The SRS is the source of truth for product requirements.
2.  Approved UI designs are the source of truth for visual
    implementation.
3.  `app/` is for routing and route-level composition.
4.  `features/` is for business functionality.
5.  `components/` is for reusable domain-agnostic UI.
6.  `lib/` is for shared infrastructure.
7.  Registration is an MVP feature and must have a clear feature
    boundary.
8.  Participants, groups, campaigns, templates, badges, scanner,
    attendance, dashboard, and reports are core MVP areas.
9.  Do not treat Phase 2/3/4 features as MVP.
10. Never hard-code conference IDs.
11. Do not put API calls directly in presentational components.
12. Do not put personal data into QR payloads unnecessarily.
13. Respect authentication, authorization, and auditability
    requirements.
14. Build mobile-friendly participant and scanning workflows.
15. Target WCAG 2.1 AA for primary workflows.
16. Reuse existing components before creating new ones.
17. Do not invent unsupported product functionality.
18. Do not over-engineer the MVP.
19. Avoid unrelated changes.
20. Keep the codebase simple, modular, testable, and maintainable.
