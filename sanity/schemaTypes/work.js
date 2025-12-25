export default {
  name: "work",
  title: "work",
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
      options: { hotspot: true }, // allows selecting a focal point
      validation: Rule => Rule.required(),
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],
};
