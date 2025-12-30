import { groq } from 'next-sanity';

/* ===============================
   SERVICES LIST (Services Page)
   /services
================================ */

export const SERVICES_LIST_QUERY = groq`
  *[_type == "service"] | order(_createdAt desc) {
    _id,
    title,
    titleAr,
    "slug": slug.current,
    excerpt,
    excerptAr,
    mainImage{
      asset->{
        _id,
        url
      }
    },
    seo {
      title,
      titleAr
    }
  }
`;


export const SERVICE_DETAIL_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    titleAr,
    excerpt,
    excerptAr,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      }
    },
    content,
    contentAr,
    seo {
      title,
      description,
      titleAr,
      descriptionAr,
      ogImage {
        asset->{
          url
        }
      }
    }
  }
`;




export const SERVICES_NAV_QUERY = groq`
  *[_type == "service"] | order(_createdAt desc) {
    _id,
    title,
    titleAr,
    "slug": slug.current
  }
`;
