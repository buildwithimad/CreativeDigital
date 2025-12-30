// sanity/queries/work.js
import { groq } from "next-sanity";

export const WORK_QUERY = groq`
  *[_type == "work"] | order(_createdAt desc) {
    _id,
    title,
    titleAr,
    category,
    categoryAr,
    description,
    descriptionAr,
    thumbnail {
      asset->{
        _id,
        url
      }
    },
    gallery[] {
      asset->{
        _id,
        url
      }
    }
  }
`;