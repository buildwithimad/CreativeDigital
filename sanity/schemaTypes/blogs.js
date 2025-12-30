// sanity/schemas/blogs.js

export default {
  name: "blogs",
  title: "Blogs",
  type: "document",
  // 1. Organize fields into Tabs for a cleaner UI
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "seo",
      title: "SEO & Metadata",
    },
  ],
  fields: [
    /* ===========================
       BASIC INFO (Content Tab)
    =========================== */
    {
      name: "title",
      title: "Title (English)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "titleAr",
      title: "Title (Arabic)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },

    /* ===========================
       CATEGORIES (EN & AR)
    =========================== */
    {
      name: "category",
      title: "Category (English)",
      type: "string",
      group: "content",
      options: {
        list: [
          // Web & Development
          { title: "Web Development", value: "Web Development" },
          { title: "Website Design & Development", value: "Website Design & Development" },
          { title: "UI/UX Design", value: "UI/UX Design" },
          { title: "E-commerce", value: "E-commerce" },
          
          // Marketing
          { title: "Digital Marketing", value: "Digital Marketing" },
          { title: "Social Media", value: "Social Media" },
          { title: "SEO", value: "SEO" },
          
          // Tech
          { title: "Artificial Intelligence", value: "Artificial Intelligence" },
          { title: "Cybersecurity", value: "Cybersecurity" },
          { title: "Data Analytics", value: "Data Analytics" },

          // Creative
          { title: "Visual Production", value: "Visual Production" },
          { title: "Creative Content", value: "Creative Content" },
          
          { title: "Other", value: "Other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "categoryAr",
      title: "Category (Arabic)",
      type: "string",
      group: "content",
      options: {
        list: [
          // Web & Development
          { title: "تطوير الويب", value: "تطوير الويب" },
          { title: "تصميم وتطوير المواقع", value: "تصميم وتطوير المواقع" },
          { title: "تصميم واجهة المستخدم", value: "تصميم واجهة المستخدم" },
          { title: "التجارة الإلكترونية", value: "التجارة الإلكترونية" },

          // Marketing
          { title: "التسويق الرقمي", value: "التسويق الرقمي" },
          { title: "وسائل التواصل الاجتماعي", value: "وسائل التواصل الاجتماعي" },
          { title: "تحسين محركات البحث (SEO)", value: "تحسين محركات البحث" },

          // Tech
          { title: "الذكاء الاصطناعي", value: "الذكاء الاصطناعي" },
          { title: "الأمن السيبراني", value: "الأمن السيبراني" },
          { title: "تحليل البيانات", value: "تحليل البيانات" },

          // Creative
          { title: "الإنتاج المرئي", value: "الإنتاج المرئي" },
          { title: "المحتوى الإبداعي", value: "المحتوى الإبداعي" },

          { title: "أخرى", value: "أخرى" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },

    /* ===========================
       VISUALS & SUMMARIES
    =========================== */
    {
      name: "mainImage",
      title: "Main Image / Thumbnail",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        }
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "introduction",
      title: "Short Introduction / Excerpt (English)",
      type: "text",
      rows: 3,
      group: "content",
      description: "A short summary shown on the blog listing page.",
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: "introductionAr",
      title: "Short Introduction / Excerpt (Arabic)",
      type: "text",
      rows: 3,
      group: "content",
      description: "ملخص قصير يظهر في صفحة قائمة المقالات.",
      validation: (Rule) => Rule.required().max(200),
    },

    /* ===========================
       RICH CONTENT (Block Editor)
    =========================== */
    {
      name: "content",
      title: "Body Content (English)",
      type: "array",
      group: "content",
      of: [
        { type: "block" }, // Standard text, H1-H6, lists, bold, etc.
        { 
          type: "image",   // Allows inserting images between paragraphs
          options: { hotspot: true } 
        } 
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "contentAr",
      title: "Body Content (Arabic)",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        { 
          type: "image",
          options: { hotspot: true } 
        }
      ],
      validation: (Rule) => Rule.required(),
    },

    /* ===========================
       SEO & METADATA (Hidden in SEO Tab)
    =========================== */
    {
      name: "seo",
      title: "SEO Settings",
      type: "object",
      group: "seo",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title (English)",
          type: "string",
          description: "Ideal length is 50–60 characters.",
          validation: (Rule) => Rule.max(60).warning("Longer titles may be truncated by Google"),
        },
        {
          name: "metaDescription",
          title: "Meta Description (English)",
          type: "text",
          rows: 3,
          description: "Ideal length is 150–160 characters.",
          validation: (Rule) => Rule.max(160).warning("Longer descriptions may be truncated by Google"),
        },
        {
          name: "metaTitleAr",
          title: "Meta Title (Arabic)",
          type: "string",
          description: "الطول المثالي 50-60 حرف.",
        },
        {
          name: "metaDescriptionAr",
          title: "Meta Description (Arabic)",
          type: "text",
          rows: 3,
          description: "الطول المثالي 150-160 حرف.",
        },
      ],
    },
  ],

  /* ===========================
     PREVIEW CONFIG
  =========================== */
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `Category: ${subtitle}`,
        media,
      };
    },
  },
};