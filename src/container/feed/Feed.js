import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import FeedHeader from "../../components/feed/Header";
import upvoteIcon from "../../assests/images/grayarrow.gif";
import { fetchFeedsData } from "../../actions/feed";
import {timeSince} from '../../constants/constant';
import TimeLineChart from '../chart/Timeline';
const FeedContainer = () => {
  const [loader, setLoader] = useState(false);
  const [feedsData, setFeedsData] = useState([]);
  const [selectedPage, setSelectedPage] = useState(0);
  // load more feeds
  const loadMoreFeeds = () => {
    setSelectedPage((prevState) => prevState + 1);
  };

  // hide feed
  const hideFeed = (selectedFeed) => {
    let hiddenFeeds = JSON.parse(localStorage.getItem("hiddenFeeds")) || [];
    hiddenFeeds.push(selectedFeed.objectID);
    localStorage.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds));
    let updatedFeedData = feedsData;
    updatedFeedData = updatedFeedData.filter(
      (feed) => feed.objectID !== selectedFeed.objectID
    );
    setFeedsData(updatedFeedData);
  };

  // upvote feed
  const upvote = (selectedFeed) => {
    if (selectedFeed.upvoted) {
      return;
    }
    let upvotedFeeds = JSON.parse(localStorage.getItem("upvotedFeeds")) || [];
    upvotedFeeds.push(selectedFeed.objectID);
    localStorage.setItem("upvotedFeeds", JSON.stringify(upvotedFeeds));
    let updatedFeedData = feedsData;
    updatedFeedData = updatedFeedData.map((feed) => {
      return {
        ...feed,
        upvoted: upvotedFeeds.indexOf(feed.objectID) < 0 ? false : true,
      };
    });
    setFeedsData(updatedFeedData);
  };

  //fetch feeds from api
  const fetchFeedsHandler = () => {
    setLoader(true);
    fetchFeedsData(selectedPage)
      .then((res) => {
        let hiddenFeeds = JSON.parse(localStorage.getItem("hiddenFeeds"));
        let upvotedFeeds = JSON.parse(localStorage.getItem("upvotedFeeds"));
        let filterdRes = res.hits;
        if (hiddenFeeds.length > 0 && filterdRes.length > 0) {
          filterdRes = res.hits.filter(function (e) {
            return this.indexOf(e.objectID) < 0;
          }, hiddenFeeds);
        }
        if (upvotedFeeds.length > 0 && filterdRes.length > 0) {
          filterdRes = filterdRes.map(function (feed) {
            return {
              ...feed,
              upvoted: this.indexOf(feed.objectID) < 0 ? false : true,
            };
          }, upvotedFeeds);
        }
        setLoader(false);
        setFeedsData(filterdRes);
      })
      .catch((err) => {
        setLoader(false);
        setFeedsData([]);
      });
  };

  //get domain name
  const getDomainName = (url) => {
    return url ? `(${new URL(url).hostname})` : "";
  };

  // on did mount
  useEffect(() => {
    let storedHiddenItems = JSON.parse(localStorage.getItem("hiddenFeeds"));
    let storedUpvoteItems = JSON.parse(localStorage.getItem("upvotedFeeds"));
    let hiddenFeeds = storedHiddenItems ? storedHiddenItems : [];
    let upvotedFeeds = storedUpvoteItems ? storedUpvoteItems : [];
    localStorage.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds));
    localStorage.setItem("upvotedFeeds", JSON.stringify(upvotedFeeds));
  }, []);

  // get feeds data
  useEffect(() => {
    fetchFeedsHandler();
  }, [selectedPage]);

  return (
    <React.Fragment>
    {!loader && feedsData.length ===0 && <p>Please clear local storage and reload!</p>}
    
      {loader && <div data-testid="loader" className="loader"></div>}
      {!loader && feedsData.length >0 && <React.Fragment>
      <table>
        <FeedHeader/>
        <tbody className={styles.feedListing}>
          {feedsData.length > 0 &&
            feedsData.map((feed, index) => (
              <tr key={feed.objectID}>
                <td>
                  <span className={styles.comentCount}>
                    {feed.num_comments ? feed.num_comments : 0}
                  </span>
                </td>
                <td
                  className={[
                    styles.upvoteCount,
                    feed.upvoted ? styles.upvoted : "",
                  ].join(" ")}
                >
                  {feed.points
                    ? feed.upvoted
                      ? feed.points + 1
                      : feed.points
                    : feed.upvoted
                    ? 1
                    : 0}
                </td>
                <td>
                <button  onClick={() => upvote(feed)}>
                  <img
                    className={styles.upvoteIcon}
                    src={upvoteIcon}
                    alt="upvote"
                  />
                  </button>
                </td>
                <td>
                  {" "}
                  <span className={styles.feedTitle}> {feed.title}</span>
                  <span className={styles.feedDomain}>
                    {" "}
                    {getDomainName(feed.url)}{" "}
                  </span>
                  by
                  <span className={styles.feedAuthor}> {feed.author}</span>
                  <span className={styles.feedCreatedTime}>
                  {timeSince(feed.created_at)}
                </span>
                  <button
                    onClick={() => hideFeed(feed)}
                    className={["cursorPointer", styles.hideFeed].join(" ")}
                  >
                    [hide]
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <TimeLineChart chartData={feedsData}/>
     </React.Fragment>}
    </React.Fragment>
  );
};

export default FeedContainer;
