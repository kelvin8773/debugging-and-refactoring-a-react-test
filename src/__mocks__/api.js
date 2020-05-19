import mockPosts from './mockPosts.json';

console.log('import mock api');

export default {
  getPosts: () => Promise.resolve(mockPosts),
};
