# Dual-Mode SEO & Internal Linking System - Complete Guide

## Overview

Your blog system now supports **both automatic AND manual** SEO and internal linking, with granular control at multiple levels:

1. **Global Level**: Enable/disable automation site-wide
2. **Per-Post Level**: Control automation for individual posts
3. **Manual Overrides**: Provide custom values that can merge with or replace auto-generated ones

---

## Architecture

### Three-Level Control System

```
┌─────────────────────────────────────────────┐
│   GLOBAL CONFIG (Site-Wide)                │
│   - globalAutoSEO: true/false               │
│   - globalAutoInternalLinks: true/false     │
└─────────────┬───────────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────────┐
│   PER-POST FLAGS                            │
│   - autoSEO: true/false                     │
│   - autoInternalLinks: true/false           │
└─────────────┬───────────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────────┐
│   MANUAL DATA (Overrides/Fallbacks)        │
│   - manualSEO: { title, description, ... } │
│   - manualLinks: [ { keyword, url }, ... ] │
└─────────────────────────────────────────────┘
```

**Decision Logic:**
- **Effective Auto = Global AND Per-Post**
- If `globalAutoSEO = false`, no post uses auto SEO (regardless of per-post setting)
- If `globalAutoSEO = true` and `post.autoSEO = false`, that post uses manual only
- Manual values always override auto values when both exist

---

## Features

### ✅ What's New

1. **Global Kill Switch**
   - Turn off all automation site-wide with one toggle
   - Located in Admin → SEO Config

2. **Per-Post Automation Control**
   - Each blog post can enable/disable auto-SEO independently
   - Each blog post can enable/disable auto-links independently

3. **Manual SEO Fields**
   - Custom meta title, description, keywords
   - Custom OG image and canonical URL
   - Stored per-post in database

4. **Manual Internal Links**
   - Define custom keyword→URL mappings per post
   - Higher priority than global mappings
   - Merge with or replace global auto links

5. **Smart Merging**
   - When automation is ON: Manual overrides Auto
   - When automation is OFF: Manual only
   - Modular SEO component handles all merging logic

---

## Database Schema

### Blog Model (Updated)

```typescript
{
  // Basic fields
  title: string
  content: string
  excerpt: string
  author: string
  image: string
  featured: boolean

  // Automation flags (per-post)
  autoSEO: boolean = true
  autoInternalLinks: boolean = true

  // Auto-generated SEO (when autoSEO = true)
  slug: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]

  // Manual SEO overrides
  manualSEO: {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
    canonicalUrl?: string
  }

  // Manual internal links
  manualLinks: [{
    keyword: string
    url: string
    caseSensitive: boolean
    maxOccurrences: number
  }]

  // Processing results
  processedContent: string
  internalLinksApplied: string[]
}
```

### SEOConfig Model (New)

```typescript
{
  configKey: 'global' // Single global config

  // Global toggles
  globalAutoSEO: boolean = true
  globalAutoInternalLinks: boolean = true

  // Default settings
  maxInternalLinksPerPost: number = 5
  defaultMetaKeywordsCount: number = 10

  // Site-wide defaults
  siteName: string = 'CA CEILINGS Art'
  defaultOGImage: string
  twitterHandle: string
}
```

---

## API Endpoints

### SEO Configuration

```
GET /api/seo-config
- Returns global SEO configuration
- Auto-creates default config if none exists

PUT /api/seo-config
- Updates global configuration
- Body: { globalAutoSEO, globalAutoInternalLinks, ... }
```

### Blog Posts (Updated)

```
POST /api/blogs
- Accepts new fields: autoSEO, autoInternalLinks, manualSEO, manualLinks
- Auto-generates SEO if enabled
- Applies internal links based on flags
- Body (FormData):
  - title, content, excerpt, author, image, featured
  - autoSEO: 'true' | 'false'
  - autoInternalLinks: 'true' | 'false'
  - manualSEO: JSON string
  - manualLinks: JSON string

PUT /api/blogs/[id]
- Same as POST
- Preserves existing flags if not provided
- Re-generates SEO/links based on current settings
```

---

## Admin UI Components

### 1. SEO Config Manager (`/admin` → SEO Config)

**Purpose:** Control global automation settings

**Features:**
- Toggle `globalAutoSEO` and `globalAutoInternalLinks`
- Set max links per post
- Set default keyword count
- Configure site name, default OG image, Twitter handle

**Location:** `src/components/SEOConfigManager.tsx`

### 2. Link Mappings Manager (`/admin` → Internal Links)

**Purpose:** Manage global auto link mappings

**Features:**
- Add/edit/delete keyword→URL mappings
- Set priority, case sensitivity, max occurrences
- Toggle active/inactive per mapping

**Location:** `src/components/LinkMappingsManager.tsx`

### 3. Manual SEO Controls (In Blog Editor)

**Purpose:** Per-post SEO and link control

**Features:**
- Toggle auto-SEO and auto-links for this post
- Enter manual SEO: title, description, keywords, OG image, canonical URL
- Define manual internal links for this post only

**Location:** `src/components/ManualSEOControls.tsx`

**Usage:** Import and include in BlogsManager form

---

## Modular Components

### 1. SEO Component (`src/components/SEO.tsx`)

**Purpose:** Render all SEO meta tags

**Props:**
```typescript
interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  imageUrl?: string
  url?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  siteName?: string
  twitterHandle?: string
  canonicalUrl?: string
  noIndex?: boolean
  noFollow?: boolean
}
```

**Usage:**
```tsx
import { SEO } from '@/components/SEO';

<SEO
  title="My Blog Post"
  description="A great post"
  keywords={['blog', 'seo']}
  imageUrl="/image.jpg"
  url="/blog/my-post"
/>
```

**Merging Helper:**
```typescript
mergeSEOData(
  autoSEOData: Partial<SEOProps>,
  manualSEOData: Partial<SEOProps>,
  useAuto: boolean
): SEOProps
```

### 2. Internal Links Generator (`src/lib/generateInternalLinks.ts`)

**Purpose:** Generate internal links with auto+manual merge

**Function:**
```typescript
generateInternalLinks({
  content: string,
  autoLinks: LinkMapping[],      // From database
  manualLinks: ManualLinkMapping[], // From post
  useAutoLinks: boolean,
  maxLinksPerPost: number
}): InternalLinkResult
```

**Features:**
- Merges manual and auto links
- Manual links get higher priority
- Avoids duplicate keywords
- Respects max links per post

---

## Usage Examples

### Example 1: Fully Automatic (Default)

**Global Config:**
```
globalAutoSEO = true
globalAutoInternalLinks = true
```

**Post Settings:**
```
autoSEO = true
autoInternalLinks = true
manualSEO = {}
manualLinks = []
```

**Result:**
- SEO auto-generated from content
- Internal links from global mappings only
- No manual overrides

### Example 2: Manual SEO, Auto Links

**Global Config:**
```
globalAutoSEO = true (ignored for this post)
globalAutoInternalLinks = true
```

**Post Settings:**
```
autoSEO = false
autoInternalLinks = true
manualSEO = {
  title: "Custom SEO Title",
  description: "My custom description",
  keywords: ["custom", "seo"]
}
manualLinks = []
```

**Result:**
- SEO from manual fields only
- Internal links from global mappings
- Auto-SEO disabled for this post

### Example 3: Auto + Manual Merge

**Global Config:**
```
globalAutoSEO = true
globalAutoInternalLinks = true
```

**Post Settings:**
```
autoSEO = true
autoInternalLinks = true
manualSEO = {
  title: "Custom Title",
  // description left empty - will use auto-generated
}
manualLinks = [
  { keyword: "special offer", url: "/promotions", maxOccurrences: 2 }
]
```

**Result:**
- **Meta Title:** "Custom Title" (manual override)
- **Meta Description:** Auto-generated (manual not provided)
- **Keywords:** Auto-extracted
- **Internal Links:** Manual "special offer" + global mappings (merged)

### Example 4: Global Kill Switch

**Global Config:**
```
globalAutoSEO = false
globalAutoInternalLinks = false
```

**Post Settings:**
```
autoSEO = true (ignored - global overrides)
autoInternalLinks = true (ignored - global overrides)
manualSEO = {
  title: "Manual Title",
  description: "Manual description"
}
manualLinks = []
```

**Result:**
- **ALL automation disabled site-wide**
- Only manual SEO used
- No automatic links applied
- Per-post flags are ignored when global is false

---

## Integration with Existing BlogsManager

To integrate manual controls into your blog editor, update `BlogsManager.tsx`:

```tsx
import { ManualSEOControls } from './ManualSEOControls';

// In your component state:
const [seoSettings, setSeoSettings] = useState({
  autoSEO: true,
  autoInternalLinks: true,
  manualSEO: { title: '', description: '', keywords: [], ogImage: '', canonicalUrl: '' },
  manualLinks: []
});

// In your form:
<ManualSEOControls
  autoSEO={seoSettings.autoSEO}
  autoInternalLinks={seoSettings.autoInternalLinks}
  manualSEO={seoSettings.manualSEO}
  manualLinks={seoSettings.manualLinks}
  onAutoSEOChange={(v) => setSeoSettings({ ...seoSettings, autoSEO: v })}
  onAutoInternalLinksChange={(v) => setSeoSettings({ ...seoSettings, autoInternalLinks: v })}
  onManualSEOChange={(seo) => setSeoSettings({ ...seoSettings, manualSEO: seo })}
  onManualLinksChange={(links) => setSeoSettings({ ...seoSettings, manualLinks: links })}
/>

// When submitting:
formDataToSend.append('autoSEO', seoSettings.autoSEO.toString());
formDataToSend.append('autoInternalLinks', seoSettings.autoInternalLinks.toString());
formDataToSend.append('manualSEO', JSON.stringify(seoSettings.manualSEO));
formDataToSend.append('manualLinks', JSON.stringify(seoSettings.manualLinks));
```

---

## Configuration Workflows

### Workflow 1: Disable All Automation

**Use Case:** SEO engineer wants full manual control

1. Go to Admin → SEO Config
2. Uncheck "Enable Auto-SEO Globally"
3. Uncheck "Enable Auto Internal Links Globally"
4. Save

**Result:** All blog posts now use only manual SEO and manual links, regardless of per-post settings.

### Workflow 2: Hybrid Mode (Most Posts Auto, Some Manual)

**Use Case:** Most posts use automation, but important landing pages need custom SEO

1. Keep Global Config with automation enabled
2. When creating/editing specific posts:
   - Uncheck "Auto-generate SEO" for that post
   - Fill in manual SEO fields
3. Save post

**Result:** Most posts auto-generate SEO, but specific posts use custom values.

### Workflow 3: Add Custom Links to One Post

**Use Case:** One blog post needs a special internal link that isn't in global mappings

1. Edit the post
2. Keep "Auto Internal Links" checked
3. Click "Add Link" in Manual Internal Links section
4. Add: keyword = "limited offer", url = "/sale"
5. Save

**Result:** Post will have global auto links + this custom link (merged).

---

## Best Practices

### ✅ Do:

1. **Start with automation enabled** - Let the system handle most posts
2. **Use manual overrides for important pages** - Landing pages, cornerstone content
3. **Test both modes** - Create test posts with different configurations
4. **Keep global settings consistent** - Don't toggle global flags frequently
5. **Use manual links sparingly** - For post-specific promotions or unique cross-links

### ❌ Don't:

1. **Don't disable global automation unless necessary** - Lose efficiency
2. **Don't over-use manual links** - Can become maintenance nightmare
3. **Don't forget to fill manual fields** - If auto is off and manual is empty, you'll have no SEO
4. **Don't mix terminology** - "Auto" = automatic, "Manual" = custom

---

## Troubleshooting

### Problem: "No SEO tags on my blog post"

**Check:**
1. Is `globalAutoSEO` enabled?
2. Is `post.autoSEO` enabled?
3. Are manual SEO fields filled in?
4. Check browser source - meta tags should be in `<head>`

### Problem: "Manual SEO not showing"

**Check:**
1. Did you save the post after entering manual SEO?
2. Is the data in the database? (Check MongoDB)
3. Is the BlogDetailPage using the SEO component correctly?

### Problem: "No internal links applied"

**Check:**
1. Is `globalAutoInternalLinks` enabled?
2. Are there active link mappings in the database?
3. Do the keywords actually exist in the blog content?
4. Check `processedContent` field - links should be there as `<a>` tags

### Problem: "Global toggle doesn't work"

**Solution:**
- Clear browser cache
- Restart Next.js dev server
- Check database - SEOConfig document should exist
- Check API logs for errors

---

## Technical Implementation Details

### How Merging Works (Code)

```typescript
// In BlogDetailPage.tsx
const autoSEOData = {
  title: blog.metaTitle,
  description: blog.metaDescription,
  keywords: blog.metaKeywords
};

const manualSEOData = {
  title: blog.manualSEO?.title,
  description: blog.manualSEO?.description,
  keywords: blog.manualSEO?.keywords
};

const finalSEO = mergeSEOData(
  autoSEOData,
  manualSEOData,
  blog.autoSEO // If false, only manual used
);

// Result: Manual values override auto when provided
```

### How Link Merging Works

```typescript
// In generateInternalLinks.ts
const manualMappings = manualLinks.map((link, index) => ({
  ...link,
  priority: 1000 + index // Higher than any auto link
}));

const combinedMappings = useAutoLinks
  ? [...manualMappings, ...autoLinks] // Merge
  : manualMappings; // Manual only

// System processes high-priority (manual) first
```

---

## Files Reference

### New Files Created

```
src/components/SEO.tsx                      - Modular SEO component
src/components/ManualSEOControls.tsx        - Per-post manual controls UI
src/components/SEOConfigManager.tsx         - Global config admin UI
src/lib/generateInternalLinks.ts            - Link merging logic
src/pages/api/seo-config/index.ts           - Global config API
DUAL_MODE_SEO_GUIDE.md                      - This guide
```

### Modified Files

```
src/lib/models.ts                           - Added SEOConfig model, updated Blog schema
src/pages/api/blogs/index.ts                - Support auto/manual modes
src/pages/api/blogs/[id].ts                 - Support auto/manual modes
src/components/BlogDetailPage.tsx           - Use SEO component with merging
src/components/AdminDashboard.tsx           - Added SEOConfigManager route
src/components/AdminSidebar.tsx             - Added SEO Config menu item
```

---

## Summary

Your blog system now offers **maximum flexibility**:

- **SEO Engineers** can disable automation and control everything manually
- **Content Creators** can rely on automatic SEO for most posts
- **Hybrid Approach** works seamlessly - mix auto and manual as needed
- **Global Control** allows instant site-wide changes
- **Per-Post Granularity** enables fine-tuned control

The system intelligently merges automatic and manual data, giving you the best of both worlds! 🚀

---

**Need Help?**
- Check the API logs in dev tools
- Review the database structure in MongoDB
- Test with a new blog post using different flag combinations
- Refer to code comments in modular components
