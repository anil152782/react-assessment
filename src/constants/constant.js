export const feedHeaderData = [
  {
    id: 1,
    key: "Commnets",
  },
  {
    id: 2,
    key: "Vote Count",
  },

  {
    id: 3,
    key: "Upvote",
  },

  {
    id: 4,
    key: "News Details",
  },
];

// calculate time since
const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 0 }
  ];
  
  export const  timeSince =(dateString)=> {
     let date = new Date(dateString)
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
  }

  // timeline chart axis for news
  export const axisOptions={
    hAxis: {
      title: 'ID',
    },
    vAxis: {
      title: 'Votes',
    },
    legend: {position: 'none'},
    pointsVisible: true	
  }