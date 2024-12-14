export const GET_POST_COMMENTS = `
  query GetPostComments($id: ID!) {
    post(id: $id, idType: ID) {
      databaseId
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

export const CREATE_COMMENT = `
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
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
