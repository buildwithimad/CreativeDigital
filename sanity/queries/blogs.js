// sanity/queries/blog.js
import { groq } from 'next-sanity';

/* ---------------- BLOG LIST (FOR BLOGS PAGE) ---------------- */
export const BLOGS_LIST_QUERY = groq`
  *[_type == "blogs"] | order(publishedAt desc) {
    _id,
    title,
    titleAr,
    "slug": slug.current,
    introduction,
    introductionAr,
    category,
    publishedAt,
    images[0]{
      asset->{
        _id,
        url
      }
    }
  }
`;

/* ---------------- SINGLE BLOG BY SLUG ---------------- */
export const BLOG_BY_SLUG_QUERY = groq`
  *[_type == "blogs" && slug.current == $slug][0]{
    _id,
    title,
    titleAr,
    "slug": slug.current,
    category,
    publishedAt,
    introduction,
    introductionAr,
    sections,
    sectionsAr,
    conclusion,
    conclusionAr,
    images[]{
      asset->{
        _id,
        url
      }
    }
  }
`;

/* ---------------- BLOG NAVIGATION (PREV / NEXT) ---------------- */
export const BLOG_NAV_QUERY = groq`
  *[_type == "blogs"] | order(publishedAt desc) {
    _id,
    title,
    titleAr,
    "slug": slug.current,
    publishedAt
  }
`;
