export const GET_ALL_POSTS = `
  query GetAllPosts($first: Int, $after: String, $search: String) {
    posts(
      first: $first,
      after: $after,
      where: { 
        status: PUBLISH,
        search: $search
      }
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
        content
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
        author {
          node {
            id
            name
            avatar {
              url
            }
            description
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        commentCount
        comments(first: 100) {
          nodes {
            id
            content
            date
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
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
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          id
          name
          description
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
      tags {
        nodes {
          id
          name
          slug
        }
      }
      comments {
        nodes {
          id
          content
          date
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = `
  query GetCategories {
    categories {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

export const GET_TAGS = `
  query GetTags {
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

export const ADD_COMMENT = `
  mutation AddComment($postId: ID!, $content: String!, $authorName: String!, $authorEmail: String!) {
    createComment(
      input: {
        commentOn: $postId
        content: $content
        author: $authorName
        authorEmail: $authorEmail
      }
    ) {
      success
      comment {
        id
        content
        date
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;
