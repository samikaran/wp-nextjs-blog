export const GET_ALL_POSTS = `
  query GetAllPosts {
    posts(first: 100, where: { status: PUBLISH }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;
