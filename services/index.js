import { request, gql } from 'graphql-request'
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
  
export const getPosts = async () => {
  
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            title
            slug
            id
            createdAt
            author {
              id
              name
              bio
              createdAt
              photo {
                url
              }
            }
            featuredPost
            excerpt
            featuredImage {
              url
            }
            categories {
              id
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getRecentPosts = async() => {
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC
        last: 3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    }
  `;
  
  const result = await request(graphqlAPI, query);
  return result.posts;
}

export const getSimilarPosts = async (categories, slug) => {
  console.log(categories);
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]){
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories }}}
        last: 3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, {slug, categories});
  return result.posts;
}

export const getCategories = async() => {
  const query = gql`
    query GetCategories{
      categories{
        name
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories;
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!){
      post(where: {slug: $slug}){
        author{
          name
          bio
          id
          photo{
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage{
          url
        }
        categories{
          name
          slug
        }
        content{
          raw
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, {slug});
  return result.post;
}

export const submitComment = async(obj) => {
  const result = await fetch('/api/comments', {
    method: ' POST',
    body: JSON.stringify(obj),
  });
}