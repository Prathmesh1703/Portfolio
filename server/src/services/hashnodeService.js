// ──────────────────────────────────────────────────────────
// Hashnode Service — Fetches & formats blog posts via GraphQL
// Scalable version (fetches across all publications)
// ──────────────────────────────────────────────────────────

const fetch = require("node-fetch");

const HASHNODE_GQL = "https://gql.hashnode.com/";

/**
 * GraphQL query to pull latest blog posts for a Hashnode user.
 * This fetches posts across ALL publications owned by the user.
 */
const BLOGS_QUERY = `
  query GetUserBlogs($username: String!, $pageSize: Int!) {
    user(username: $username) {
      posts(pageSize: $pageSize, page: 1) {
        edges {
          node {
            title
            brief
            slug
            url
            publishedAt
            readTimeInMinutes
            coverImage {
              url
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetches the latest blog posts for a Hashnode user.
 *
 * @param {string} username - Hashnode username
 * @param {number} count - Number of posts to fetch
 *
 * Returns a clean array of blog objects ready for frontend consumption.
 */
async function fetchHashnodeBlogs(username, count = 20) {
  const response = await fetch(HASHNODE_GQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: BLOGS_QUERY,
      variables: {
        username,
        pageSize: count,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Hashnode API ${response.status}: ${text}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(`Hashnode GraphQL error: ${JSON.stringify(errors)}`);
  }

  // If user or posts don't exist
  if (!data?.user?.posts?.edges) {
    return [];
  }

  const blogs = data.user.posts.edges.map(({ node }) => ({
    title: node.title,
    description: node.brief,
    slug: node.slug,
    cover: node.coverImage?.url || null,
    readTime: node.readTimeInMinutes,
    date: node.publishedAt,
    url: node.url, // Directly use Hashnode-provided URL
  }));

  return blogs;
}

module.exports = { fetchHashnodeBlogs };