// sanity/schematypes/service.js

export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: Rule => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // allows selecting focal point
      },
    },
  ],
};
