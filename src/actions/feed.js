import axios from "axios";
const hitsPerPage=10;
// get all feeds
export function fetchFeedsData(selectedPage) {
  return axios
    .get(`/api/v1/search?page=${selectedPage}&&hitsPerPage=${hitsPerPage}`)
    .then(response => {
      return response.data;
    });
}
