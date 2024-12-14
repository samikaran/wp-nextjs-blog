export const GET_CATEGORY_WITH_POSTS = `
  query GetCategoryWithPosts($slug: ID!, $first: Int, $after: String) {
    category(id: $slug, idType: SLUG) {
      id
      name
      slug
      posts(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          categories {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;
