import React, { useState, useEffect } from "react";
import FeedHeader from "../../components/feed/Header";
import FeedsBody from "../../components/feed/FeedBody"
import { fetchFeedsData } from "../../actions/feed";
import {pagination} from '../../constants/constant';
import TimeLineChart from '../chart/Timeline';
import Pagination from '../../components/pagination/Pagination';
const FeedContainer = () => {
  const [loader, setLoader] = useState(false);
  const [feedsData, setFeedsData] = useState([]);
  const [selectedPage,setSelectedPage] = useState(0);

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


  // onPagination
  const onPagination=(key)=>{
    if(key === pagination.next.key){
      setSelectedPage(selectedPage +1)
    }
    else{
      setSelectedPage((selectedPage)=>selectedPage === 0 ? 0 : selectedPage -1)
    }
  }


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

 
  // on did mount
  useEffect(() => {
    let storedHiddenItems = JSON.parse(localStorage.getItem("hiddenFeeds"));
    let storedUpvoteItems = JSON.parse(localStorage.getItem("upvotedFeeds"));
    let hiddenFeeds = storedHiddenItems ? storedHiddenItems : [];
    let upvotedFeeds = storedUpvoteItems ? storedUpvoteItems : [];
    localStorage.setItem("hiddenFeeds", JSON.stringify(hiddenFeeds));
    localStorage.setItem("upvotedFeeds", JSON.stringify(upvotedFeeds));
  }, []);

  // get feeds data on mount and pagination
  useEffect(() => {
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
  }, [selectedPage]);

  return (
    <React.Fragment>
    {!loader && feedsData.length ===0 && <p>Please clear local storage and reload!</p>}
    
      {loader && <div data-testid="loader" className="loader"></div>}
      {!loader && feedsData.length >0 && <React.Fragment>
      <table>
        <FeedHeader/>
        {feedsData.length > 0 && <FeedsBody upvote={upvote} hideFeed={hideFeed} feedsData={feedsData} />}
      </table>
      <Pagination pagination={onPagination}/>
      <TimeLineChart chartData={feedsData}/>
     </React.Fragment>}
    </React.Fragment>
  );
};

export default FeedContainer;
