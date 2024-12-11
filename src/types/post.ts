export interface Author {
  id: string;
  name: string;
  avatar?: {
    url: string;
  };
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface Comment {
  id: string;
  content: string;
  date: string;
  author: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  categories: {
    nodes: Category[];
  };
  tags: {
    nodes: Tag[];
  };
  author: {
    node: Author;
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  commentCount: number;
  comments: {
    nodes: Comment[];
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}
