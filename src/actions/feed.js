import axios from "axios";
const hitsPerPage=10;
// get all feeds
export async function fetchFeedsData(selectedPage) {
  const res = await axios.get(`/api/v1/search?page=${selectedPage}&&hitsPerPage=${hitsPerPage}`);
  return res.data;
}
