import axios from "axios";
console.log('import real api');

async function getPosts() {
  const url = "https://www.reddit.com/r/reactjs/top.json?t=year&limit=100";
  const response = await axios.get(url);
  return response.data.data.children.map(({ data }) => ({
    id: data.id,
    author: data.author,
    createdAt: data.created_utc * 1000,
    title: data.title,
    score: data.score,
  }));
}

export default {
  getPosts,
};
