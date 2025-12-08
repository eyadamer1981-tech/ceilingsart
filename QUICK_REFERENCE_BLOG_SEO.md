# Blog SEO Features - Quick Reference

## 🎯 Where to Find Everything

### Admin Panel Navigation (`/admin`)

```
Admin Dashboard
├── 📝 Blogs
│   └── Create/Edit blog posts (SEO happens automatically!)
│
├── 🔗 Internal Links
│   └── Set up keyword → URL mappings for automatic linking
│
└── ⚙️ SEO Config
    └── Control global SEO automation settings
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Set Up Link Mappings (5 minutes)

1. Go to **Admin** → **Internal Links**
2. Click **"+ Add New Mapping"**
3. Add these common mappings:

| Keyword | URL | Priority |
|---------|-----|----------|
| acoustic panels | /acoustic-panels | 10 |
| stretch ceilings | /stretch-ceilings | 10 |
| our work | /our-work | 5 |
| contact us | /contact | 5 |

4. Click **"Create Mapping"** for each

### Step 2: Configure Global SEO (2 minutes)

1. Go to **Admin** → **SEO Config**
2. Ensure both toggles are ON:
   - ✅ Enable Auto-SEO Globally
   - ✅ Enable Auto Internal Links Globally
3. Set **Site Name**: "CA CEILINGS Art"
4. Click **"Save Configuration"**

### Step 3: Create Your First Blog Post (10 minutes)

1. Go to **Admin** → **Blogs**
2. Click **"+ Add New Blog"**
3. Fill in:
   - Title
   - Content (mention your services naturally!)
   - Excerpt
   - Author
   - Upload image
4. Click **"Save"**

**That's it!** SEO and internal links are automatically applied.

---

## ✨ What Happens Automatically

When you save a blog post:

✅ **SEO-Friendly URL**: `your-blog-title` (auto-generated)  
✅ **Meta Title**: Optimized for search engines  
✅ **Meta Description**: From your excerpt  
✅ **Keywords**: Extracted from content  
✅ **Internal Links**: Keywords become clickable links  
✅ **Social Sharing**: Open Graph & Twitter Cards ready  

---

## 📍 Key Locations

| Feature | Location | URL |
|---------|----------|-----|
| Create Blog | Admin → Blogs | `/admin` (click Blogs) |
| View Blogs | Public Page | `/blog` |
| View Single Post | Public Page | `/blog/[slug]` |
| Manage Links | Admin → Internal Links | `/admin` (click Internal Links) |
| SEO Settings | Admin → SEO Config | `/admin` (click SEO Config) |

---

## 🔧 Common Tasks

### Add a New Internal Link Mapping

1. Admin → Internal Links
2. "+ Add New Mapping"
3. Fill: Keyword, URL, Priority (10 for important), Max Occurrences (1-2)
4. Save

### Disable Auto-SEO for All Posts

1. Admin → SEO Config
2. Uncheck "Enable Auto-SEO Globally"
3. Save

### Check Which Links Were Applied

1. View the blog post on the public site
2. Scroll to bottom - see "Related Topics in This Post"
3. Or check the blog post in database: `internalLinksApplied` field

---

## 💡 Pro Tips

1. **Write naturally** - Mention services in your content, links happen automatically
2. **Use excerpts** - They become meta descriptions
3. **Upload good images** - They appear in social shares
4. **Set priorities** - Important services get priority 10
5. **Don't over-link** - System limits to 5 links per post automatically

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| No links in post | Check Internal Links has active mappings |
| No SEO tags | Check SEO Config has auto-SEO enabled |
| Slug error | System auto-fixes by adding numbers |
| Link not working | Check URL in mapping is correct |

---

## 📚 Full Documentation

- **HOW_TO_USE_BLOG_SEO.md** - Complete step-by-step guide
- **BLOG_SEO_GUIDE.md** - Technical details
- **DUAL_MODE_SEO_GUIDE.md** - Advanced manual controls

---

**Remember**: Most of the time, you just write content and save. SEO happens automatically! 🎉





