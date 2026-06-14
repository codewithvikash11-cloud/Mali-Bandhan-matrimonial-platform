# Rajasthan Mali Bandhan Matrimony
## Appwrite Backend Architecture & Collection Schema Specification

This document provides a comprehensive, production-ready specification of the Appwrite database schemas, storage buckets, indexes, security parameters, and migration strategies for the **Rajasthan Mali Bandhan Matrimony** portal. 

---

## 1. Project Analysis & Form Mapping

### Form & State Discovery
1. **Standard Matrimonial Registry (The Step-by-Step Wizard)**:
   - Evaluated `/src/components/Wizard.tsx` form states consisting of a 9-step registry mapping comprehensive household, educational, traditional lineage, and lifestyle attributes of Mali Samaj candidates.
2. **Access & Security Safeguards**:
   - Specific traditional constraints have been mapped including gotra exclusion (checking overlapping father, mother, paternal grandmother, and maternal grandmother gotras).
   - Profile verification (including Aadhaar PAN uploading and live selfie comparison).
   - Flexible privacy switches to respect family preferences before displaying details.

---

## 2. Core Appwrite Architecture

```
                                +---------------------------+
                                |    Appwrite Authentication |
                                +-------------+-------------+
                                              |
                                              | (id -> userId link)
                                              v
                                +-------------+-------------+
                                |    profiles Collection    |
                                +-------------+-------------+
                                              |
        +-------------------------------------+-------------------------------------+
        |                                     |                                     |
        v                                     v                                     v
+-------+-------+                      +------+------+                      +-------+-------+
|   Interests   |                      | Notifications|                      |    Payments   |
+-------+-------+                      +------+------+                      +-------+-------+
        |                                     |                                     |
        | (Future Chat)                       v                                     v
        v                             +-------+-------+                     +-------+-------+
+-------+-------+                     |Success Stories|                     |   Membership  |
| Conversations |                     +---------------+                     |     Plans     |
+-------+-------+                                                           +---------------+
        |
        v
+-------+-------+
|   Messages    |
+---------------+
```

---

## 3. Database Collection Schema & Fields

### Core Database ID: `mali_matrimony_db`

### Collection 1: `profiles`
* **Collection ID**: `profiles`
* **Purpose**: Serves as the primary candidate profiles repository. Maps every wizard field, including the newly introduced fine-grained visibilities.

| Attribute Name | Type | Key Configurations & Allowed Values | Required | Default |
|---|---|---|---|---|
| `$id` | String | System default (matched to Appwrite User ID) | Yes | - |
| `name` | String | Full candidate name | Yes | - |
| `gender` | Enum | `['Male', 'Female']` | Yes | - |
| `age` | Integer | Min: 18, Max: 100 | Yes | - |
| `dob` | String | Format: `YYYY-MM-DD` | Yes | - |
| `mobile` | String | Contact phone (with country code prefix) | Yes | - |
| `email` | Email | Contact electronic mail | Yes | - |
| `gotra` | String | Candidate's paternal gotra | Yes | - |
| `ownGotra` | String | Same as gotra (candidate's paternal line) | No | - |
| `motherGotra` | String | Mother's paternal gotra | No | - |
| `dadiGotra` | String | Father's mother's gotra | No | - |
| `naniGotra` | String | Mother's mother's gotra | No | - |
| `district` | String | Native or current resident Rajasthan district | Yes | - |
| `tehsil` | String | Native tehsil | Yes | - |
| `village` | String | Native Samaj village name | Yes | - |
| `education` | String | Candidate highest degree attained | Yes | - |
| `college` | String | Institute / College attended | No | - |
| `occupation` | String | Professional designation | Yes | - |
| `company` | String | Active company or business name | No | - |
| `income` | String | Annual Income bracket (e.g., `₹5-8 Lakh`) | Yes | - |
| `fatherName` | String | Paternal head’s full name | Yes | - |
| `motherName` | String | Maternal parent’s full name | Yes | - |
| `familyType` | Enum | `['Joint', 'Nuclear']` | Yes | - |
| `brothers` | String | Status count and descriptions | No | - |
| `sisters` | String | Status count and descriptions | No | - |
| `maritalStatus` | Enum | `['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce']` | Yes | - |
| `divorceStatus` | String | Legal details (if applicable) | No | - |
| `divorceYear` | String | Year of legal decree (if applicable) | No | - |
| `childrenDetails`| String | Children details / custody (if applicable) | No | - |
| `preferredAge` | String | Desired partner age range (e.g., `23 - 26`) | Yes | - |
| `preferredDistrict`| String| Desired partner districts (comma-separated)| Yes | - |
| `preferredEducation`| String| Desired partner educational limits | Yes | - |
| `preferredProfession`| String| Desired partner profession/sector details | Yes | - |
| `photo` | URL | Primary display portrait location URL | Yes | - |
| `gallery` | String List| Secondary image gallery paths (max 8 items) | No | `[]` |
| `selfie` | URL | Live camera selfie verification portrait | No | - |
| `govId` | URL | Government ID verification photo (Aadhaar/PAN) | No | - |
| `verified` | Boolean | True if ID + Selfie comparison passes | Yes | `false` |
| `premium` | Boolean | True if user has an active premium package | Yes | `false` |
| `managedBy` | Enum | `['Self', 'Father', 'Mother', 'Brother', 'Sister', 'Relative']` | Yes | - |
| `profileCompletion`| Integer| Calculation from 0 to 100 percentage | Yes | `0` |
| `profileStrengthScore`| Integer| Completion strength indicator | Yes | `0` |
| `lastActive` | String | Datetime ISO string of last online active sign | No | - |
| `isOnline` | Boolean | Online state visibility | No | `false` |
| `isBlocked` | Boolean | Administrative safety block | Yes | `false` |
| `isReported` | Boolean | Reported profiling flag | Yes | `false` |
| `familyContactTiming`| String| Ideal hours for father-level discussions | No | - |
| `agricultureLandDetails`| String| Land area description in Bighas | No | - |
| `hasAgricultureLand`| Boolean| Traditional land ownership status flag | No | `false` |
| `familyBusinessInfo`| String| Family business overview details | No | - |
| `currentCity` | String | Current residential metropolitan city | No | - |
| `fatherOccupation`| String| Job status of the father | No | - |
| `motherOccupation`| String| Job status of the mother | No | - |
| `familyStatus` | Enum | `['Middle Class', 'Upper Middle', 'Royal/Rich', 'Conservative High Traditional']` | Yes | - |
| `ownHouse` | Enum | `['Yes', 'No', 'Rented']` | Yes | - |
| `occupationCategory`| String| Sector categories (e.g., `IT & Software`) | Yes | - |
| `workType` | Enum | `['Private', 'Government', 'Business', 'Self Employed', 'None']` | Yes | - |
| `smokingStatus` | Enum | `['No', 'Yes', 'Occasionally']` | Yes | `No` |
| `drinkingStatus` | Enum | `['No', 'Yes', 'Occasionally']` | Yes | `No` |
| `tobaccoStatus` | Enum | `['No', 'Yes', 'Occasionally']` | Yes | `No` |
| `dietPreference` | Enum | `['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan']` | Yes | `Vegetarian` |
| `fitnessLevel` | Enum | `['Normal', 'Athletic', 'Gym Goer', 'Yoga Practitioner', 'Active']` | Yes | `Normal` |
| `nature` | String | Qualitative characteristics overview | No | - |
| `hobbies` | String List| Selection tags (e.g., Cooking, Music) | No | `[]` |
| `interests` | String List| Custom interest indicators | No | `[]` |
| `familyContactPerson`| String| Designated spokesperson (e.g., Uncle, Brother) | Yes | - |
| `familyWhatsApp` | String | WhatsApp number (with country code) | Yes | - |
| `bestTimeToContact`| String| Designated duration window | No | - |
| `photoVisibility` | Enum | `['public', 'verified_only', 'accepted_interest_only']` | Yes | `public` |
| `mobileVisibility` | Enum | `['public', 'verified_only', 'accepted_interest_only']` | Yes | `verified_only` |
| `whatsappVisibility`| Enum | `['public', 'verified_only', 'accepted_interest_only']` | Yes | `accepted_interest_only` |

---

### Collection 2: `membership_plans`
* **Collection ID**: `membership_plans`
* **Purpose**: Houses premium plan definitions. Zero demo references, purely adhering to the requested models.

| Attribute Name | Type | Value / Constraint | Required |
|---|---|---|---|
| `planId` | String | Unique string identifier | Yes |
| `name` | Enum | `['Free', 'Silver', 'Gold']` | Yes |
| `price` | Integer | Price in Rupees (Ex: `0`, `299`, `699`) | Yes |
| `validity` | String | Description of cycle (Ex: `Life Validity`, `30 Days`, `90 Days`) | Yes |
| `badgeLabel` | String | Name of badge (Ex: `Silver Member`, `Gold Premium Member`) | Yes |
| `features` | String List| Array of core feature capabilities allowed | Yes |

---

### Collection 3: `districts`
* **Collection ID**: `districts`
* **Purpose**: Directory of sovereign Rajasthan districts for normalized searches.

| Attribute Name | Type | Format | Required |
|---|---|---|---|
| `distId` | String | Ex: `jodhpur`, `jaipur`, `pali` | Yes |
| `name` | String | Ex: `Jodhpur`, `Jaipur`, `Pali`, `Bikaner` | Yes |

---

### Collection 4: `tehsils`
* **Collection ID**: `tehsils`
* **Purpose**: Normalized tehsil list grouped by district relationships.

| Attribute Name | Type | Format | Required |
|---|---|---|---|
| `tehsilId` | String | Ex: `luni`, `sojat`, `sanganer` | Yes |
| `name` | String | Ex: `Luni`, `Sojat`, `Sanganer` | Yes |
| `districtId` | String | Relative parent `distId` reference | Yes |

---

### Collection 5: `villages`
* **Collection ID**: `villages`
* **Purpose**: Directory of native Samaj origins.

| Attribute Name | Type | Format | Required |
|---|---|---|---|
| `villageId` | String | Unique identifier | Yes |
| `name` | String | Ex: `Salawas`, `Mogra`, `Khejarli` | Yes |
| `tehsilId` | String | Relative parent `tehsilId` reference | Yes |

---

### Collection 6: `gotras`
* **Collection ID**: `gotras`
* **Purpose**: List of verified traditional Mali Samaj gotras.

| Attribute Name | Type | Format | Required |
|---|---|---|---|
| `gotraId` | String | Unique lowercase gotra key | Yes |
| `name` | String | Capitalized name (Ex: `Gehlot`, `Sankhla`, `Tak`, `Deora`) | Yes |

---

### Collection 7: `interests`
* **Collection ID**: `interests`
* **Purpose**: Matrimonial connection proposals dispatched between Samaj households.

| Attribute Name | Type | Key Configurations & Allowed Values | Required | Default |
|---|---|---|---|---|
| `senderId` | String | `profiles` ID of initiator | Yes | - |
| `receiverId` | String | `profiles` ID of recipient target | Yes | - |
| `status` | Enum | `['pending', 'accepted', 'rejected', 'withdrawn']` | Yes | `pending` |
| `updatedAt` | String | ISO Date string representing action status shift | Yes | - |

---

### Collection 8: `conversations` (Future Ready)
* **Collection ID**: `conversations`
* **Purpose**: Chat session threads between parents/candidates.

| Attribute Name | Type | Format | Required |
|---|---|---|---|
| `participantA` | String | Profile ID of applicant A | Yes |
| `participantB` | String | Profile ID of applicant B | Yes |
| `createdAt` | String | ISO Datetime | Yes |
| `lastMessageTime`| String | ISO Datetime | Yes |

---

### Collection 9: `messages` (Future Ready)
* **Collection ID**: `messages`
* **Purpose**: Chat messaging logs stored directly under active threads.

| Attribute Name | Type | Format | Required |
|---|---|---|---|
| `conversationId` | String | Associated `conversations` ID | Yes |
| `senderId` | String | Profile ID of sender | Yes |
| `recipientId` | String | Profile ID of receiver | Yes |
| `content` | String | Secure text content of message (max 3000 chars) | Yes |
| `createdAt` | String | ISO Datetime | Yes |
| `isRead` | Boolean | True if read by opponent participant | Yes |

---

### Collection 10: `payment_history`
* **Collection ID**: `payment_history`
* **Purpose**: Transaction logging for audits.

| Attribute Name | Type | Key / Allowed Values | Required | Default |
|---|---|---|---|---|
| `userId` | String | User ID who made payment | Yes | - |
| `planName` | String | Ex: `Silver Plan`, `Gold Plan` | Yes | - |
| `price` | String | Price string (Ex: `₹299`, `₹699`) | Yes | - |
| `date` | String | Date string (Format: `YYYY-MM-DD`) | Yes | - |
| `paymentId` | String | Transaction identifier | Yes | - |
| `status` | Enum | `['Success', 'Failed', 'Pending']` | Yes | `Pending` |

---

### Collection 11: `notifications`
* **Collection ID**: `notifications`
* **Purpose**: In-app push notifications for connections and profiles.

| Attribute Name | Type | Keys / Allowed values | Required | Default |
|---|---|---|---|---|
| `userId` | String | Recipient user ID | Yes | - |
| `type` | Enum | `['interest', 'view', 'membership', 'verification', 'system']` | Yes | `system` |
| `title` | String | Bold header label text | Yes | - |
| `description` | String | Details description | Yes | - |
| `time` | String | Format Ex: `Just now`, `2 hours ago` | Yes | - |
| `unread` | Boolean | Read state tracker | Yes | `true` |

---

### Collection 12: `success_stories`
* **Collection ID**: `success_stories`
* **Purpose**: Verified community marriage blogs.

| Attribute Name | Type | Required |
|---|---|---|
| `coupleName` | String | Yes |
| `gotras` | String | Yes |
| `location` | String | Yes |
| `weddingDate` | String | Yes |
| `story` | String | Yes |
| `photo` | URL | Yes |

---

## 4. Appwrite Storage Buckets Architecture

Security and privacy dictate structured storage buckets with access levels:

### Bucket 1: `profile-photos`
* **Bucket ID**: `profile-photos`
* **Purpose**: Main display candidate profiles.
* **Authorized Permissions**:
  - Read: `all` or `users` (Controlled conditionally at frontend level according to profile visibility options).
  - Write: `users` (Any authenticated user can write to their own bucket folder).
* **Allowed Extensions**: `['jpg', 'jpeg', 'png', 'webp']`
* **Maximum Size**: 5MB

### Bucket 2: `verification-docs`
* **Bucket ID**: `verification-docs`
* **Purpose**: Sensitive documents (Aadhaar, PAN government cards, live verification selfies).
* **Authorized Permissions**:
  - Read: `Only administrative workers` or Owner (Strictly confidential).
  - Write: `users` (Uploading documents during signup wizard step 8).
* **Allowed Extensions**: `['pdf', 'jpg', 'jpeg', 'png']`
* **Maximum Size**: 10MB
* **Security Encryption**: Server-side AES encryption enabled.

---

## 5. Security & Permission Rules

Appwrite security uses precise role indicators on each collection:

| Collection | Create Permission | Read Permission | Update Permission | Delete Permission |
|---|---|---|---|---|
| `profiles` | `member` | `member` | `user:owner` | `user:owner` |
| `membership_plans`| `none` (Admin only) | `any` | `none` | `none` |
| `districts` | `none` (Admin only) | `any` | `none` | `none` |
| `tehsils` | `none` (Admin only) | `any` | `none` | `none` |
| `villages` | `none` (Admin only) | `any` | `none` | `none` |
| `gotras` | `none` (Admin only) | `any` | `none` | `none` |
| `interests` | `member` | `user:sender`, `user:receiver` | `user:sender`, `user:receiver` | `user:sender` |
| `conversations` | `member` | `user:participantA`, `user:participantB` | `user:participantA`, `user:participantB` | `none` |
| `messages` | `member` | `user:sender`, `user:receiver` | `user:receiver` (mark read) | `none` |
| `payment_history` | `member` | `user:owner` | `none` | `none` |
| `notifications` | `system` / `member` | `user:owner` | `user:owner` (mark read) | `user:owner` |
| `success_stories` | `member` | `any` | `user:owner` | `none` |

---

## 6. Datastore Indexes Strategy

Optimal performance is achieved through the following single and composite indexes:

### `profiles` Collection
1. **Gotra Index**: Key `gotra` (Type: Key) - Rapid matching filtering.
2. **Gender & Marital Status Composite**: Keys `gender`, `maritalStatus` (Type: Key) - Base matrimonial filters.
3. **District & Verified Composite**: Keys `district`, `verified` (Type: Key) - Regional matching search prioritization.
4. **Active State Mask**: Keys `isBlocked`, `isReported` (Type: Key) - Pre-filters out banned registrations on browsing lists.

### `interests` Collection
1. **Sender ID Index**: Key `senderId` (Type: Key) - Retrieve active outgoing requests.
2. **Receiver ID Index**: Key `receiverId` (Type: Key) - Pull inbound proposals.
3. **Double Participant Composite**: Keys `senderId`, `receiverId` (Type: Key) (Unique) - Prevents duplicate proposals.

### `messages` Collection
1. **Thread Index**: Key `conversationId`, `createdAt` (Type: Key) - Fast order retrieval for conversation views.

---

## 7. Environment Setup

Required environment keys mapped in `.env.example`:

```env
# Appwrite Matrimony API Coordinates
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=66701...
VITE_APPWRITE_DATABASE_ID=mali_matrimony_db
```

---

## 8. Migration and Integration Plan

### Phase 1: Local Development Stub Instantiation
- Initialize configuration client inside `/src/lib/appwrite.ts`.
- Set up a custom developer sandbox in the Appwrite Cloud console.
- Configure collections and security settings dynamically helper scripts or manual UI mapping.

### Phase 2: Samaj Master Data Seeding
- Seed master lookup databases (`gotras`, `districts`, `tehsils`, `villages`, and `membership_plans`) containing actual Mali traditional lines and Rajasthan administrative points. 
- Eliminate all local mock profiles from current views. Render beautiful Empty State dashboards which redirect users to transition state elements cleanly.

### Phase 3: Auth & Lifecycle Connection
- Standardize email OTP password login sequences.
- Hook Wizard submission handler to dispatch create request over `profiles` collection and trigger document uploading inside the `verification-docs` and `profile-photos` storage buckets.

### Phase 4: Dynamic Querying Integration
- Connect homepage dashboards, filters, shortlists, sent/received interest states, and push notifications to real-time events.
