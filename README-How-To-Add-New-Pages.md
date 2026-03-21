# How To Add New Pages To Your Site

This guide explains how to add new pages to your NutriStructure website for daily SEO content posting.

## 📁 The 4 Content Categories

Your site is organized into 4 categories. Each category has a specific purpose and template:

### 1. 🎯 Problem Pages
**Purpose:** Address specific weight loss problems and provide solutions

**File naming:** `problem-[topic].html` or `cheat-sheet-[topic].html`

**Examples:**
- `cheat-sheet-metabolism.html` (already exists)
- `cheat-sheet-hormones.html` (already exists)
- `problem-belly-fat.html` (new example)
- `problem-slow-metabolism.html` (new example)

**Template:** Use `TEMPLATE-problem-page.html`

**How to add to index.html:**
Open `index.html`, find the Problem Pages section, and add a new `<li>` item:
```html
<li><a href="problem-your-topic.html">Your Problem Title</a></li>
```

---

### 2. ⚖️ Comparison Pages
**Purpose:** Compare two or more products side-by-side

**File naming:** `compare-[product1]-vs-[product2].html`

**Examples:**
- `recommended-stack.html` (already exists)
- `compare-java-burn-vs-mitolyn.html` (new example)
- `compare-top-3-metabolism-boosters.html` (new example)

**Template:** Use `TEMPLATE-comparison-page.html`

**How to add to index.html:**
Open `index.html`, find the Comparisons section, and add a new `<li>` item:
```html
<li><a href="compare-product-a-vs-product-b.html">Product A vs Product B</a></li>
```

---

### 3. ⭐ Review Pages (Already Have Many)
**Purpose:** In-depth reviews of individual products

**File naming:** `[product-name]-review.html`

**Examples (already exist):**
- `java-burn-review.html`
- `mitolyn-review.html`
- `citrus-burn-review.html`
- `lanta-shake-review.html`
- `kito-review.html`
- `slimcrystal-review.html`

**Template:** Use any existing review page as reference (e.g., `java-burn-review.html`)

**How to add to index.html:**
Open `index.html`, find the Reviews section, and add a new `<li>` item:
```html
<li><a href="new-product-review.html">New Product Review</a></li>
```

---

### 4. 🏆 Best Of Pages
**Purpose:** Curated lists of top products by category

**File naming:** `best-[category]-[year].html`

**Examples:**
- `new-products.html` (already exists - "Best New Supplements 2026")
- `best-metabolism-boosters-2026.html` (new example)
- `best-fat-burners-for-women-2026.html` (new example)
- `top-10-weight-loss-pills-2026.html` (new example)

**Template:** Use `TEMPLATE-best-of-page.html`

**How to add to index.html:**
Open `index.html`, find the Best Of section, and add a new `<li>` item:
```html
<li><a href="best-your-category-2026.html">Best Your Category 2026</a></li>
```

---

## 📝 Step-by-Step: Adding a New Page

### Step 1: Choose Your Category
Decide which category fits your content:
- **Problem** → Targeting specific pain points
- **Comparison** → Comparing multiple options
- **Review** → Deep dive into one product
- **Best Of** → Ranking multiple products

### Step 2: Copy the Template
1. Find the appropriate template file
2. Make a copy and rename it following the naming convention
3. Open the file in your code editor

### Step 3: Replace TEMPLATE Content
Search for "TEMPLATE" in the file and replace with your content:
- `[Product Name]` → Actual product name
- `[Topic]` → Your topic
- `TEMPLATE: description` → Your actual description
- etc.

### Step 4: Update SEO Meta Tags
Change these in the `<head>` section:
```html
<meta name="description" content="Your unique description here">
<meta name="keywords" content="your, keywords, here">
<title>Your Page Title | NutriStructure</title>
```

### Step 5: Add Your Affiliate Links
Replace `#` in button links with your actual affiliate URLs:
```html
<a href="YOUR-AFFILIATE-LINK-HERE" class="btn-cta">Get It Now →</a>
```

### Step 6: Add to index.html
Open `index.html` and add your page to the appropriate category list in the Content Hub section.

### Step 7: Upload to Your Server
Upload the new HTML file to your web server along with the updated `index.html`.

---

## 🔗 Quick Reference: File Structure

```
Your Site/
├── index.html                    (Main page - update this when adding new pages)
├── calculator.html               (Fixed metabolic age calculator)
├── solutions.html                (Solutions page)
├── systems.html                  (Systems comparison)
├── faq.html                      (FAQ page)
├── metabolic-quiz.html           (Quiz page)
│
├── 📁 Problem Pages/
│   ├── cheat-sheet-metabolism.html
│   ├── cheat-sheet-hormones.html
│   ├── cheat-sheet-appetite.html
│   ├── cheat-sheet-energy.html
│   └── cheat-sheet-fat-burning.html
│
├── 📁 Review Pages/
│   ├── java-burn-review.html
│   ├── mitolyn-review.html
│   ├── citrus-burn-review.html
│   ├── lanta-shake-review.html
│   ├── kito-review.html
│   └── slimcrystal-review.html
│
├── 📁 Comparison Pages/
│   ├── recommended-stack.html
│   └── systems.html
│
├── 📁 Best Of Pages/
│   ├── new-products.html
│   └── customer-transformations.html
│
└── 📁 Templates (For Reference)/
    ├── TEMPLATE-problem-page.html
    ├── TEMPLATE-comparison-page.html
    ├── TEMPLATE-best-of-page.html
    └── README-How-To-Add-New-Pages.md (this file)
```

---

## 💡 Daily Posting Tips for SEO

1. **Post consistently** - Try to post at the same time each day
2. **Use keywords in:**
   - Page title
   - First paragraph
   - At least one H2 heading
   - Image alt text
   - Meta description

3. **Internal linking** - Link to your other pages within the content
4. **Update index.html** - Always add new pages to the Content Hub
5. **Share on social** - Post links to drive initial traffic

---

## ✅ Pre-Flight Checklist

Before uploading a new page, check:

- [ ] All "TEMPLATE" text replaced with actual content
- [ ] Page title is unique and descriptive
- [ ] Meta description is compelling (150-160 characters)
- [ ] Affiliate links are correct
- [ ] Images have alt text
- [ ] Links to index.html work
- [ ] Added to index.html Content Hub section
- [ ] No broken links

---

## 🆘 Need Help?

If something breaks:
1. Check that all HTML tags are properly closed
2. Verify CSS class names match
3. Make sure JavaScript files are uploaded
4. Test links before going live

---

Happy posting! 🚀
