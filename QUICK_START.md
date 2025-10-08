# Quick Start Guide - Dual-Mode SEO & Internal Linking

## 🚀 Get Started in 5 Minutes

### Step 1: Access Global Configuration

1. Navigate to `/admin` and log in
2. Click **"SEO Config"** in the sidebar
3. Review the default settings:
   - ✅ Global Auto-SEO: **ON**
   - ✅ Global Auto Internal Links: **ON**
   - Max Links Per Post: **5**
   - Default Keywords Count: **10**

**Default behavior:** Everything works automatically (same as before)

---

### Step 2: (Optional) Add Global Link Mappings

1. In Admin sidebar, click **"Internal Links"**
2. Click **"+ Add New Mapping"**
3. Example mappings:

```
Keyword: "acoustic panels"
URL: /acoustic-panels
Priority: 10
Max Occurrences: 2

Keyword: "stretch ceilings"
URL: /stretch-ceilings
Priority: 10
Max Occurrences: 2

Keyword: "contact us"
URL: /contact
Priority: 5
Max Occurrences: 1
```

4. Click **"Create Mapping"**

---

### Step 3: Create a Blog Post (Automatic Mode)

1. Go to Admin → **Blogs**
2. Create a new post with:
   - Title: "Why Acoustic Panels Improve Sound Quality"
   - Content: "Acoustic panels are essential for... Learn more about stretch ceilings... contact us today."
   - Excerpt, Image, Author

3. **Don't change any automation settings** (leave defaults)

4. Click **Save**

**What happens automatically:**
- ✅ SEO-friendly slug created: `why-acoustic-panels-improve-sound-quality`
- ✅ Meta title generated (50-60 chars)
- ✅ Meta description from excerpt
- ✅ Keywords extracted from content
- ✅ Internal links applied: "acoustic panels" → `/acoustic-panels`, etc.

---

### Step 4: (Optional) Create a Post with Manual SEO

For an important landing page that needs custom SEO:

1. Create new blog post
2. **Uncheck "Auto-generate SEO"** (new checkbox in form)
3. Fill in manual SEO fields:
   - Meta Title: "Expert Acoustic Panel Installation | CA Ceilings"
   - Meta Description: "Transform your space with professional acoustic panel installation..."
   - Keywords: ["acoustic panels", "soundproofing", "professional installation"]

4. Click **Save**

**Result:** This post uses your custom SEO instead of auto-generated.

---

### Step 5: (Optional) Add Post-Specific Internal Link

For a promotional post:

1. Edit an existing blog post
2. **Leave "Auto Internal Links" checked**
3. In "Manual Internal Links" section, click **"+ Add Link"**
4. Add:
   - Keyword: "summer sale"
   - URL: /promotions/summer-2025
   - Max Occurrences: 2

5. Click **Save**

**Result:** Post will have global auto links + your custom "summer sale" link.

---

## Common Use Cases

### Use Case 1: "I want everything automatic"

**Configuration:**
```
✅ Global Auto-SEO: ON
✅ Global Auto-Links: ON
```

**Per-Post:**
- Use defaults (don't change anything)

**Result:** Fully automatic (like the original system)

---

### Use Case 2: "I want manual control for everything"

**Configuration:**
```
❌ Global Auto-SEO: OFF
❌ Global Auto-Links: OFF
```

**Per-Post:**
- Fill in all manual SEO fields
- Add manual internal links

**Result:** Complete manual control

---

### Use Case 3: "Most posts auto, important ones manual"

**Configuration:**
```
✅ Global Auto-SEO: ON
✅ Global Auto-Links: ON
```

**For most posts:**
- Use defaults (automatic)

**For important posts:**
- Uncheck "Auto-generate SEO"
- Fill manual SEO fields

**Result:** Hybrid approach

---

## Quick Reference

### Admin Panel Locations

| Feature | Location |
|---------|----------|
| Global SEO Settings | Admin → **SEO Config** |
| Global Link Mappings | Admin → **Internal Links** |
| Per-Post SEO Control | Blog Editor (when editing) |
| Per-Post Link Control | Blog Editor (when editing) |

### Automation Flags

| Flag | Location | Effect |
|------|----------|--------|
| `globalAutoSEO` | SEO Config page | Enables/disables auto-SEO site-wide |
| `globalAutoInternalLinks` | SEO Config page | Enables/disables auto-links site-wide |
| `autoSEO` | Per blog post | Enables/disables auto-SEO for this post |
| `autoInternalLinks` | Per blog post | Enables/disables auto-links for this post |

### Decision Logic

```
Effective Auto-SEO = globalAutoSEO AND post.autoSEO

If BOTH are true → Auto-generated SEO
If EITHER is false → Manual SEO only
```

---

## Viewing Results

### Check SEO Tags

1. Visit your blog post: `/blog/your-post-slug`
2. Right-click → **View Page Source**
3. Look in `<head>` for:

```html
<title>Your Meta Title</title>
<meta name="description" content="Your meta description" />
<meta name="keywords" content="keyword1, keyword2" />
<meta property="og:title" content="Your Meta Title" />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta name="twitter:card" content="summary_large_image" />
```

### Check Internal Links

1. View your blog post
2. Look for linked keywords in the content
3. Inspect HTML: Links have class `internal-link`

```html
<a href="/acoustic-panels" class="internal-link">acoustic panels</a>
```

---

## Testing Your Setup

### Test 1: Fully Automatic

1. Go to SEO Config
2. Ensure both global toggles are **ON**
3. Create a blog post (don't change defaults)
4. View the post
5. **Expected:** Meta tags auto-generated, links applied

### Test 2: Fully Manual

1. Go to SEO Config
2. Turn both global toggles **OFF**
3. Create a blog post with manual SEO fields filled
4. View the post
5. **Expected:** Only your manual SEO shows, no auto links

### Test 3: Hybrid

1. Global toggles: **ON**
2. Create Post A: Leave defaults (auto)
3. Create Post B: Uncheck auto-SEO, fill manual
4. View both posts
5. **Expected:** Post A has auto SEO, Post B has manual

---

## Troubleshooting

### Problem: "No SEO tags"

**Solutions:**
1. Check global toggle is ON
2. Check per-post flag is ON (or fill manual SEO)
3. Clear browser cache
4. Check browser source code

### Problem: "No internal links"

**Solutions:**
1. Ensure global toggle is ON
2. Add link mappings in "Internal Links" section
3. Verify keywords exist in content
4. Check `processedContent` in database

### Problem: "Manual SEO not working"

**Solutions:**
1. Verify you saved the post after entering manual SEO
2. Check database for `manualSEO` field
3. Ensure BlogDetailPage is using SEO component

---

## Next Steps

1. **Read DUAL_MODE_SEO_GUIDE.md** for complete documentation
2. **Integrate ManualSEOControls** into your BlogsManager (if not done)
3. **Create test posts** with different configurations
4. **Monitor performance** and adjust settings as needed

---

## Quick Tips

✅ **Start with automation enabled** - It's the easiest approach
✅ **Use manual for landing pages** - Better control for important content
✅ **Don't over-link** - Keep max 3-5 internal links per post
✅ **Test social sharing** - Share a post on Facebook/Twitter to see OG tags
✅ **Keep keywords relevant** - Auto-extraction works best with focused content

---

## Support

- **Full Guide:** See `DUAL_MODE_SEO_GUIDE.md`
- **Implementation Details:** See `IMPLEMENTATION_SUMMARY.md`
- **Code Examples:** Check comments in `src/components/SEO.tsx`

---

**Happy Blogging! 🎉**
