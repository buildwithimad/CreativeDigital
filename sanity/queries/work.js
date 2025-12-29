// sanity/queries/work.js
export const WORK_QUERY = `
  *[_type == "work"] | order(_createdAt desc) {
    _id,
    title,
    titleAr,
    description,
    descriptionAr,
    thumbnail,
    gallery
  }
`
 