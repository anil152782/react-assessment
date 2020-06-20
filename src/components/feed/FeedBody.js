import React from "react";
import styles from "./FeedBody.module.css";
import upvoteIcon from "../../assests/images/grayarrow.gif";
import {timeSince} from '../../constants/constant';
export default function FeedsBody({feedsData, upvote, hideFeed}) {
     //get domain name
  const getDomainName = (url) => {
    return url ? `(${new URL(url).hostname})` : "";
  };
  return (
    <tbody className={styles.feedListing}>
  
      {feedsData.map((feed, index) => (
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
  );
}
