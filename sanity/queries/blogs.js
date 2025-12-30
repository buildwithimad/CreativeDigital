import { groq } from 'next-sanity';

// 1. Query for the Blog Listing Page
export const BLOGS_LIST_QUERY = groq`
  *[_type == "blogs"] | order(publishedAt desc) {
    _id,
    title,
    titleAr,
    "slug": slug.current,
    publishedAt,
    category,
    categoryAr,
    introduction,
    introductionAr,
    mainImage {
      alt,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    }
  }
`;

// 2. Query for the Single Blog Detail Page
export const BLOG_DETAIL_QUERY = groq`
  *[_type == "blogs" && slug.current == $slug][0] {
    _id,
    title,
    titleAr,
    "slug": slug.current,
    publishedAt,
    category,
    categoryAr,
    introduction,
    introductionAr,
    mainImage {
      alt,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    },
    // IMPORTANT: Fetch the Portable Text content arrays
    content,
    contentAr,
    // SEO Settings
    seo {
      metaTitle,
      metaDescription,
      metaTitleAr,
      metaDescriptionAr
    }
  }
`;

// 3. Navigation Query (Lightweight)
export const BLOG_NAV_QUERY = groq`
  *[_type == "blogs"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    titleAr
  }
`;