# How to Use Internal Links & SEO Config - Detailed Guide

## 📍 Overview

This guide shows you exactly how to use the **Internal Links** and **SEO Config** features in your admin panel. These are powerful tools that automatically enhance your blog posts with SEO and internal linking.

---

## 🔗 Part 1: Using Internal Links Manager

### What Are Internal Links?

Internal links automatically convert keywords in your blog posts into clickable links. For example, if you write "We offer acoustic panels for your office", the words "acoustic panels" will automatically become a link to `/acoustic-panels`.

### Step-by-Step: Setting Up Internal Links

#### Step 1: Access Internal Links Manager

1. Go to your admin panel: `/admin`
2. Log in with your admin credentials
3. In the left sidebar, click **"Internal Links"**

You'll see a page with:
- A list of existing link mappings (if any)
- A **"+ Add New Mapping"** button at the top

#### Step 2: Create Your First Link Mapping

1. Click the **"+ Add New Mapping"** button
2. A form will appear with these fields:

**Required Fields:**
- **Keyword**: The word or phrase to link (e.g., "acoustic panels")
- **URL**: Where it should link to (e.g., `/acoustic-panels`)

**Optional Fields:**
- **Priority**: Number (default: 0) - Higher numbers are applied first
- **Max Occurrences**: How many times to link this keyword per post (default: 1)
- **Case Sensitive**: Check if "Fitness" and "fitness" should be different
- **Active**: Check to enable this mapping (uncheck to disable without deleting)
- **Description**: Optional note for your reference

#### Step 3: Fill in the Form

**Example 1: Basic Link Mapping**

```
Keyword: acoustic panels
URL: /acoustic-panels
Priority: 10
Max Occurrences: 2
Case Sensitive: [unchecked]
Active: [checked]
Description: Links to acoustic panels service page
```

**Example 2: Service Page Link**

```
Keyword: stretch ceilings
URL: /stretch-ceilings
Priority: 10
Max Occurrences: 2
Case Sensitive: [unchecked]
Active: [checked]
Description: Links to stretch ceilings service page
```

**Example 3: Contact Link**

```
Keyword: contact us
URL: /contact
Priority: 5
Max Occurrences: 1
Case Sensitive: [unchecked]
Active: [checked]
Description: Links to contact page
```

#### Step 4: Save the Mapping

1. Click **"Create Mapping"** button
2. The mapping will appear in the list below
3. You'll see it shows:
   - The keyword → URL relationship
   - Priority and max occurrences
   - Active/Inactive status
   - Edit and Delete buttons

#### Step 5: Managing Existing Mappings

**View All Mappings:**
- All mappings are listed in cards
- Active mappings have white background
- Inactive mappings have gray background

**Edit a Mapping:**
1. Click the **"Edit"** button on any mapping card
2. The form will populate with existing values
3. Make your changes
4. Click **"Update Mapping"**

**Toggle Active/Inactive:**
1. Click the **"Active"** or **"Inactive"** button on a mapping
2. It will toggle immediately (no confirmation needed)
3. Inactive mappings won't be applied to new blog posts

**Delete a Mapping:**
1. Click the **"Delete"** button on a mapping
2. Confirm the deletion
3. The mapping will be removed permanently

### How Internal Links Work

**When you create or update a blog post:**

1. The system checks all **active** link mappings
2. It searches your blog content for each keyword
3. It converts matching keywords into links
4. It respects:
   - **Max Occurrences**: Won't link more than specified
   - **Priority**: Higher priority keywords are linked first
   - **Total Limit**: Maximum 5 links per post (configurable in SEO Config)

**Example:**

If you have these mappings:
- "acoustic panels" → `/acoustic-panels` (Priority: 10, Max: 2)
- "stretch ceilings" → `/stretch-ceilings` (Priority: 10, Max: 2)
- "contact us" → `/contact` (Priority: 5, Max: 1)

And you write a blog post containing:
> "We offer **acoustic panels** and **stretch ceilings** for your office. **Contact us** today!"

The system will automatically convert it to:
> "We offer [acoustic panels](/acoustic-panels) and [stretch ceilings](/stretch-ceilings) for your office. [Contact us](/contact) today!"

### Best Practices for Internal Links

✅ **Do:**
- Use 3-5 link mappings for your main services
- Set priority 10 for important services
- Set max occurrences to 1-2 (prevents over-linking)
- Use natural keywords that appear in your content
- Keep mappings active and relevant

❌ **Don't:**
- Create too many mappings (5-10 is ideal)
- Set max occurrences too high (looks spammy)
- Use keywords that don't appear in your content
- Link to external sites (use standard HTML for that)
- Create conflicting keywords (use priority to control)

---

## ⚙️ Part 2: Using SEO Config Manager

### What Is SEO Config?

SEO Config controls **global settings** for automatic SEO and internal linking across your entire site. It's like a master switch that affects all blog posts.

### Step-by-Step: Configuring SEO Settings

#### Step 1: Access SEO Config Manager

1. Go to your admin panel: `/admin`
2. In the left sidebar, click **"SEO Config"**

You'll see a configuration page with three main sections:
1. **Global Automation Controls** (toggles)
2. **Default Settings** (numbers)
3. **Site-wide SEO Defaults** (text fields)

#### Step 2: Configure Global Automation Controls

These are the master switches for your entire site:

**Enable Auto-SEO Globally:**
- ✅ **Checked**: All blog posts will automatically generate SEO metadata
- ❌ **Unchecked**: No automatic SEO (only manual SEO will be used)

**Enable Auto Internal Links Globally:**
- ✅ **Checked**: All blog posts will automatically apply internal links
- ❌ **Unchecked**: No automatic internal links (only manual links will be used)

**Important:** When these are unchecked, they override per-post settings. Even if a blog post has auto-SEO enabled, it won't work if the global toggle is off.

**Recommendation:** Keep both checked (✅) unless you have a specific reason to disable them.

#### Step 3: Configure Default Settings

**Max Internal Links Per Post:**
- **Default**: 5
- **Range**: 1-20
- **What it does**: Limits how many total internal links can be added to a single blog post
- **Recommendation**: Keep at 5 (prevents over-linking)

**Default Meta Keywords Count:**
- **Default**: 10
- **Range**: 1-20
- **What it does**: How many keywords to extract from blog content
- **Recommendation**: Keep at 10 (good balance)

#### Step 4: Configure Site-wide SEO Defaults

**Site Name:**
- **Default**: "CA CEILINGS Art"
- **What it does**: Used in Open Graph tags for social sharing
- **Example**: When someone shares your blog on Facebook, it shows "CA CEILINGS Art" as the site name
- **How to set**: Enter your company/site name

**Default OG Image URL:**
- **Default**: (empty)
- **What it does**: Fallback image for social sharing when a blog post doesn't have an image
- **Format**: Use a relative path like `/images/default-og-image.jpg` or full URL
- **Example**: `/images/logo.png`
- **Optional**: Leave empty if you always upload images for blog posts

**Twitter Handle:**
- **Default**: (empty)
- **What it does**: Your Twitter username for Twitter Card tags
- **Format**: Include the @ symbol
- **Example**: `@caceilingsart`
- **Optional**: Leave empty if you don't use Twitter

#### Step 5: Save Your Configuration

1. Review all your settings
2. Click the **"Save Configuration"** button at the bottom
3. You'll see a success message: "Configuration saved successfully!"
4. Changes apply immediately to all new blog posts

### Understanding the Settings

**Global Automation Controls:**

```
┌─────────────────────────────────────────┐
│  Global Auto-SEO: ON                   │
│  Global Auto Links: ON                 │
└─────────────────────────────────────────┘
              ↓
    All blog posts use automation
```

```
┌─────────────────────────────────────────┐
│  Global Auto-SEO: OFF                   │
│  Global Auto Links: OFF                 │
└─────────────────────────────────────────┘
              ↓
    All blog posts use manual only
    (per-post settings ignored)
```

**How Settings Work Together:**

| Global Auto-SEO | Global Auto Links | Result |
|----------------|-------------------|---------|
| ✅ ON | ✅ ON | Full automation for all posts |
| ✅ ON | ❌ OFF | SEO auto, links manual only |
| ❌ OFF | ✅ ON | SEO manual only, links auto |
| ❌ OFF | ❌ OFF | Everything manual only |

### Best Practices for SEO Config

✅ **Do:**
- Keep global automation enabled (unless you need manual control)
- Set site name to your actual business name
- Use a default OG image if you have a company logo
- Keep max links at 5 (prevents over-linking)
- Save configuration after making changes

❌ **Don't:**
- Disable global automation unless necessary (loses efficiency)
- Change settings frequently (affects all posts)
- Set max links too high (looks spammy)
- Leave site name empty (hurts social sharing)

---

## 🎯 Complete Workflow Example

Here's a complete example of setting up both features:

### Initial Setup (One-Time)

**1. Set Up Internal Links:**
```
Go to: Admin → Internal Links

Create these mappings:
- "acoustic panels" → /acoustic-panels (Priority: 10, Max: 2)
- "stretch ceilings" → /stretch-ceilings (Priority: 10, Max: 2)
- "our work" → /our-work (Priority: 5, Max: 1)
- "contact us" → /contact (Priority: 5, Max: 1)
```

**2. Configure SEO Settings:**
```
Go to: Admin → SEO Config

Global Automation:
✅ Enable Auto-SEO Globally: ON
✅ Enable Auto Internal Links Globally: ON

Default Settings:
Max Internal Links Per Post: 5
Default Meta Keywords Count: 10

Site-wide SEO:
Site Name: CA CEILINGS Art
Default OG Image: /images/logo.png
Twitter Handle: @caceilingsart

Click: Save Configuration
```

### Creating a Blog Post (After Setup)

**1. Create Blog Post:**
```
Go to: Admin → Blogs → + Add New Blog

Title: "5 Benefits of Acoustic Panels for Your Office"
Content: "We offer acoustic panels that reduce noise... 
          Our stretch ceilings complement the design...
          Contact us for more information."
Excerpt: "Discover how acoustic panels can transform..."
Author: Your Name
Upload Image: office-acoustic-panels.jpg
Featured: [checked]

Click: Save
```

**2. What Happens Automatically:**
- ✅ SEO-friendly URL: `/blog/5-benefits-of-acoustic-panels-for-your-office`
- ✅ Meta title: "5 Benefits of Acoustic Panels for Your Office"
- ✅ Meta description: From your excerpt
- ✅ Keywords: ["acoustic", "panels", "office", "benefits", ...]
- ✅ "acoustic panels" → becomes link to `/acoustic-panels`
- ✅ "stretch ceilings" → becomes link to `/stretch-ceilings`
- ✅ "contact us" → becomes link to `/contact`
- ✅ Social sharing tags ready

**3. View the Result:**
- Go to `/blog` to see your post
- Click on it to view the full article
- Notice the keywords are now clickable links
- Check page source (Ctrl+U) to see SEO meta tags

---

## 🔍 Troubleshooting

### Internal Links Not Working

**Problem:** Keywords in blog posts aren't becoming links

**Solutions:**
1. Check Internal Links manager - are mappings marked as "Active"?
2. Check SEO Config - is "Enable Auto Internal Links Globally" ON?
3. Verify keywords exist in your blog content (exact match)
4. Check if you've reached max links per post (5 by default)
5. Verify the URL in the mapping is correct (e.g., `/acoustic-panels` not `acoustic-panels`)

### SEO Tags Not Appearing

**Problem:** Blog posts don't have SEO meta tags

**Solutions:**
1. Check SEO Config - is "Enable Auto-SEO Globally" ON?
2. View page source (Ctrl+U) - meta tags should be in `<head>`
3. Check browser console for errors
4. Verify the blog post was saved successfully
5. Clear browser cache and reload

### Links Appearing Too Many Times

**Problem:** Same keyword is linked multiple times in one post

**Solutions:**
1. Go to Internal Links manager
2. Edit the mapping
3. Reduce "Max Occurrences" to 1 or 2
4. Update the blog post (links will regenerate)

### Configuration Not Saving

**Problem:** SEO Config changes don't persist

**Solutions:**
1. Check browser console for errors
2. Verify you clicked "Save Configuration" button
3. Check network tab - should see PUT request to `/api/seo-config`
4. Refresh the page - settings should reload
5. Check MongoDB connection

---

## 📊 Quick Reference

### Internal Links Manager
- **Location**: Admin → Internal Links
- **Purpose**: Create keyword → URL mappings
- **Key Settings**: Priority, Max Occurrences, Active
- **Best Practice**: 5-10 mappings, priority 10 for important services

### SEO Config Manager
- **Location**: Admin → SEO Config
- **Purpose**: Control global automation settings
- **Key Settings**: Global toggles, Max links, Site name
- **Best Practice**: Keep automation ON, set site defaults

### How They Work Together

```
Internal Links Manager
    ↓ (creates mappings)
SEO Config Manager
    ↓ (enables automation)
Blog Post Creation
    ↓ (applies automatically)
SEO + Internal Links Applied!
```

---

## 💡 Pro Tips

1. **Start with 3-5 link mappings** - Add more as needed
2. **Test with one blog post first** - See how links appear
3. **Use priority wisely** - Important services get priority 10
4. **Keep global automation ON** - Unless you need manual control
5. **Set site name and OG image** - Improves social sharing
6. **Review links regularly** - Make sure they're still relevant
7. **Don't over-link** - 3-5 links per post is optimal
8. **Use natural keywords** - Words that appear naturally in content

---

## 🎓 Summary

**Internal Links:**
- Create keyword → URL mappings
- Automatically converts keywords to links in blog posts
- Control with priority and max occurrences
- Manage in Admin → Internal Links

**SEO Config:**
- Master control for all blog posts
- Enable/disable automation site-wide
- Set defaults for links and keywords
- Configure site-wide SEO settings
- Manage in Admin → SEO Config

**Together:**
- Internal Links defines WHAT to link
- SEO Config controls IF and HOW MANY links
- Both work automatically when you create blog posts

---

**Need More Help?**
- Check `HOW_TO_USE_BLOG_SEO.md` for general blog usage
- Check `BLOG_SEO_GUIDE.md` for technical details
- Check `DUAL_MODE_SEO_GUIDE.md` for advanced manual controls


