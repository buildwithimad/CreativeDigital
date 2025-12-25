export default {
  name: "work",
  title: "Work",
  type: "document",
  fields: [
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
      subtitle: "description",
      media: "thumbnail",
    },
  },
}
