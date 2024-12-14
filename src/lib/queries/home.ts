export const GET_ALL_POSTS = `
  query GetAllPosts($first: Int, $after: String) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH }
    ) {
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
`;

export const GET_SIDEBAR_DATA = `
  query GetSidebarData {
    categories {
      nodes {
        id
        name
        slug
        count
      }
    }
    tags {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;
