# Internal Links & SEO Config - Quick Reference Card

## 🔗 Internal Links Manager

### Location
**Admin Panel → Internal Links**

### Form Fields Explained

| Field | What It Does | Example | Recommended Value |
|-------|--------------|---------|-------------------|
| **Keyword** | Word/phrase to automatically link | `acoustic panels` | Your service names |
| **URL** | Where the link goes | `/acoustic-panels` | Your page URLs |
| **Priority** | Higher = applied first | `10` | 10 for important, 5 for others |
| **Max Occurrences** | How many times to link per post | `2` | 1-2 (prevents spam) |
| **Case Sensitive** | Match exact case | `unchecked` | Usually leave unchecked |
| **Active** | Enable/disable this mapping | `checked` | Check to enable |
| **Description** | Your notes (optional) | `Links to service page` | For your reference |

### Quick Setup Example

```
1. Click "+ Add New Mapping"

2. Fill in:
   Keyword: acoustic panels
   URL: /acoustic-panels
   Priority: 10
   Max Occurrences: 2
   Active: ✅

3. Click "Create Mapping"

4. Repeat for other services
```

### What Happens

**Before:**
> "We offer acoustic panels for your office."

**After (automatically):**
> "We offer [acoustic panels](/acoustic-panels) for your office."

---

## ⚙️ SEO Config Manager

### Location
**Admin Panel → SEO Config**

### Settings Explained

#### Global Automation Controls

| Setting | What It Does | Recommended |
|---------|--------------|-------------|
| **Enable Auto-SEO Globally** | Turn on/off automatic SEO for ALL posts | ✅ ON |
| **Enable Auto Internal Links Globally** | Turn on/off automatic linking for ALL posts | ✅ ON |

**⚠️ Important:** When OFF, these override per-post settings!

#### Default Settings

| Setting | What It Does | Default | Recommended |
|---------|--------------|---------|-------------|
| **Max Internal Links Per Post** | Maximum total links in one post | `5` | Keep at 5 |
| **Default Meta Keywords Count** | How many keywords to extract | `10` | Keep at 10 |

#### Site-wide SEO Defaults

| Setting | What It Does | Example | Required? |
|---------|--------------|---------|-----------|
| **Site Name** | Your site name for social sharing | `CA CEILINGS Art` | ✅ Yes |
| **Default OG Image URL** | Fallback image for social sharing | `/images/logo.png` | ❌ Optional |
| **Twitter Handle** | Your Twitter username | `@caceilingsart` | ❌ Optional |

### Quick Setup Example

```
1. Go to Admin → SEO Config

2. Set Global Automation:
   ✅ Enable Auto-SEO Globally: ON
   ✅ Enable Auto Internal Links Globally: ON

3. Set Defaults:
   Max Internal Links Per Post: 5
   Default Meta Keywords Count: 10

4. Set Site Info:
   Site Name: CA CEILINGS Art
   Default OG Image: /images/logo.png
   Twitter Handle: @caceilingsart

5. Click "Save Configuration"
```

---

## 🎯 Common Scenarios

### Scenario 1: First Time Setup

**Step 1: Create Link Mappings**
```
Admin → Internal Links → + Add New Mapping

Mapping 1:
- Keyword: acoustic panels
- URL: /acoustic-panels
- Priority: 10
- Max: 2

Mapping 2:
- Keyword: stretch ceilings
- URL: /stretch-ceilings
- Priority: 10
- Max: 2
```

**Step 2: Configure SEO**
```
Admin → SEO Config

✅ Enable Auto-SEO Globally: ON
✅ Enable Auto Internal Links Globally: ON
Max Links: 5
Site Name: CA CEILINGS Art

Click: Save Configuration
```

**Step 3: Create Blog Post**
```
Admin → Blogs → + Add New Blog
Write content mentioning "acoustic panels"
Save
```

**Result:** Keywords automatically become links!

---

### Scenario 2: Disable Automation Temporarily

**When:** You want to manually control SEO for all posts

**How:**
```
Admin → SEO Config

❌ Enable Auto-SEO Globally: OFF
❌ Enable Auto Internal Links Globally: OFF

Click: Save Configuration
```

**Result:** All posts now use manual SEO only (if you have manual fields set up)

---

### Scenario 3: Add a New Service Link

**When:** You launch a new service and want it linked automatically

**How:**
```
Admin → Internal Links → + Add New Mapping

Keyword: new service name
URL: /new-service-page
Priority: 10
Max Occurrences: 2
Active: ✅

Click: Create Mapping
```

**Result:** New blog posts mentioning "new service name" will automatically link to `/new-service-page`

---

### Scenario 4: Fix Over-Linking

**When:** A keyword appears too many times as a link

**How:**
```
Admin → Internal Links

Find the mapping → Click "Edit"

Change: Max Occurrences from 3 to 1

Click: Update Mapping
```

**Result:** Keyword will only link once per post

---

## ⚡ Quick Actions

### Enable/Disable a Link Mapping
```
Internal Links → Click "Active" or "Inactive" button
(No confirmation needed - toggles immediately)
```

### Edit a Link Mapping
```
Internal Links → Click "Edit" → Make changes → "Update Mapping"
```

### Delete a Link Mapping
```
Internal Links → Click "Delete" → Confirm
```

### Save SEO Config
```
SEO Config → Make changes → "Save Configuration"
(Always click Save after making changes!)
```

---

## 🐛 Quick Troubleshooting

| Problem | Quick Fix |
|---------|-----------|
| Links not appearing | Check: Mapping is Active? Global auto-links is ON? |
| Too many links | Reduce "Max Occurrences" in mapping |
| SEO tags missing | Check: Global auto-SEO is ON? |
| Config not saving | Click "Save Configuration" button |
| Wrong URL linked | Edit mapping → Fix URL → Update |

---

## 📋 Checklist

### Initial Setup
- [ ] Create 3-5 link mappings in Internal Links
- [ ] Set priority 10 for important services
- [ ] Set max occurrences to 1-2
- [ ] Enable global automation in SEO Config
- [ ] Set site name in SEO Config
- [ ] Save all configurations

### Regular Maintenance
- [ ] Review link mappings monthly
- [ ] Update URLs if pages change
- [ ] Test links on new blog posts
- [ ] Keep global automation enabled
- [ ] Update site name if rebranding

---

## 💡 Pro Tips

1. **Start Simple**: Create 3-5 mappings first, add more later
2. **Use Priority**: Important services = 10, others = 5
3. **Limit Links**: Max 1-2 occurrences prevents spam
4. **Keep Active**: Only active mappings are applied
5. **Test First**: Create a test blog post to see how links work
6. **Save Always**: Click "Save Configuration" after changes
7. **Natural Keywords**: Use words that appear naturally in content

---

## 🎓 Remember

**Internal Links = WHAT to link**
- Defines keywords and their URLs
- Applied automatically when keywords appear in content

**SEO Config = IF and HOW MANY to link**
- Controls whether automation runs
- Sets limits and defaults
- Affects ALL blog posts

**Together = Automatic SEO Power!**
- Set up once, works forever
- No manual work needed for each post
- Just write content and save!

---

**Full Guide:** See `USING_INTERNAL_LINKS_AND_SEO_CONFIG.md` for detailed instructions.


