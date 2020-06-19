import axios from "axios";
// get all feeds
export function fetchFeedsData(selectedPage) {
  return axios
    .get(`/api/v1/search?page=${selectedPage}`)
    .then(response => {
      return response.data;
    });
}
