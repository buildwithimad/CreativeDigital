// sanity/schemas/service.js
export default {
  name: 'service',
  title: 'Services',
  type: 'document',

  fields: [
    /* ===========================
       BASIC INFO
    =========================== */

    {
      name: 'title',
      title: 'Title (English)',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'titleAr',
      title: 'Title (Arabic)',
      type: 'string',
      validation: Rule => Rule.required(),
    },

    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },

    {
      name: 'excerpt',
      title: 'Short Summary (English)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    },
    {
      name: 'excerptAr',
      title: 'Short Summary (Arabic)',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    },

    {
      name: 'mainImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },

    /* ===========================
       PAGE CONTENT (BLOG-LIKE)
    =========================== */

    {
      name: 'content',
      title: 'Service Content (English)',
      type: 'array',
      of: [
        { type: 'block' }, // rich text
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },

    {
      name: 'contentAr',
      title: 'Service Content (Arabic)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },

    /* ===========================
       SEO (COLLAPSIBLE)
    =========================== */

    {
      name: 'seo',
      title: 'SEO (Search Engine Optimization)',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        /* --- ENGLISH SEO --- */
        {
          name: 'title',
          title: 'Meta Title (English)',
          type: 'string',
          description: 'Recommended: 50–60 characters',
          validation: Rule =>
            Rule.required()
              .max(60)
              .warning('Google may truncate this title'),
        },
        {
          name: 'description',
          title: 'Meta Description (English)',
          type: 'text',
          rows: 2,
          description: 'Recommended: 140–160 characters',
          validation: Rule =>
            Rule.required()
              .max(160)
              .warning('Google may truncate this description'),
        },

        /* --- ARABIC SEO --- */
        {
          name: 'titleAr',
          title: 'Meta Title (Arabic)',
          type: 'string',
          description: 'يفضل 50–60 حرف',
          validation: Rule =>
            Rule.required()
              .max(60)
              .warning('قد يتم اقتطاع العنوان في جوجل'),
        },
        {
          name: 'descriptionAr',
          title: 'Meta Description (Arabic)',
          type: 'text',
          rows: 2,
          description: 'يفضل 140–160 حرف',
          validation: Rule =>
            Rule.required()
              .max(160)
              .warning('قد يتم اقتطاع الوصف في جوجل'),
        },

        /* --- SOCIAL SHARING --- */
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: { hotspot: true },
          description: '1200×630 recommended (social sharing)',
        },
      ],
    },
  ],

  /* ===========================
     SANITY PREVIEW
  =========================== */

  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'mainImage',
    },
  },
};
