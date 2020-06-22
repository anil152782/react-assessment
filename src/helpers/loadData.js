import 'isomorphic-fetch';
const hitsPerPage = 10;
export default (selectedPage) => {
  return fetch(`https://hn.algolia.com/api/v1/search?page=${selectedPage}&&hitsPerPage=${hitsPerPage}`)
    .then(res => {
      return res.json();
    })
    .then(result => {
      // only keep 10 first results
      return result;
    });
};
