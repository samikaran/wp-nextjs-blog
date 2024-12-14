export const GET_TAG_WITH_POSTS = `
  query GetTagWithPosts($slug: ID!, $first: Int, $after: String) {
    tag(id: $slug, idType: SLUG) {
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
