// sanity/schemas/work.js

export default {
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    /* ===========================
       TITLES
    =========================== */
    {
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "titleAr",
      title: "Title (Arabic)",
      type: "string",
      validation: Rule => Rule.required(),
    },

    /* ===========================
       CATEGORIES (Both EN & AR)
    =========================== */
    {
      name: "category",
      title: "Category (English)",
      type: "string",
      options: {
        list: [
          { title: "Web Development", value: "Web Development" },
          { title: "Mobile App", value: "Mobile App" },
          { title: "Branding", value: "Branding" },
          { title: "Social Media", value: "Social Media" },
          { title: "Digital Marketing", value: "Digital Marketing" },
          { title: "Visual Production", value: "Visual Production" },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: "categoryAr",
      title: "Category (Arabic)",
      type: "string",
      options: {
        list: [
          { title: "تطوير المواقع", value: "تطوير المواقع" },
          { title: "تطبيقات الجوال", value: "تطبيقات الجوال" },
          { title: "العلامة التجارية", value: "العلامة التجارية" },
          { title: "وسائل التواصل", value: "وسائل التواصل" },
          { title: "التسويق الرقمي", value: "التسويق الرقمي" },
          { title: "الإنتاج المرئي", value: "الإنتاج المرئي" },
        ],
      },
      validation: Rule => Rule.required(),
    },

    /* ===========================
       DESCRIPTIONS
    =========================== */
    {
      name: "description",
      title: "Description (English)",
      type: "text",
      validation: Rule => Rule.required(),
    },
    {
      name: "descriptionAr",
      title: "Description (Arabic)",
      type: "text",
      validation: Rule => Rule.required(),
    },

    /* ===========================
       IMAGES
    =========================== */
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category", // Shows the English category in the Studio list
      media: "thumbnail",
    },
  },
}