import React, { Component } from 'react';

class NewsWidget extends Component {
  
  render () {
    return (
      <div className="news-widget">
        <h4>Latest headlines:</h4>
        <a style={{"display": "block"}} href="https://www.theguardian.com/sport/2018/jan/22/roger-federer-novak-djokovic-hyeon-chung-tennys-sandgren-dominic-thiem-australian-open-tennis">
          Novak Djokovic crashes out to Hyeon Chung at Australian Open
        </a>
        <a style={{"display": "block"}} href="https://www.theguardian.com/football/blog/2018/jan/22/premier-league-10-talking-points-from-the-weekend-action">
          Premier League: 10 talking points from the weekend’s action
        </a>
        <a style={{"display": "block"}} href="https://www.theguardian.com/business/2018/jan/21/amazons-first-automated-store-opens-to-public-on-monday">
          Amazon's first checkout-free grocery store opens on Monday
        </a>
        <a style={{"display": "block"}} href="https://www.theguardian.com/business/2018/jan/21/cbi-chief-calls-for-urgent-jobs-first-brexit-transition-deal">
          CBI chief calls for urgent ‘jobs first’ Brexit transition deal
        </a>
        <a style={{"display": "block"}} href="https://www.theguardian.com/science/2018/jan/18/blood-test-could-use-dna-to-spot-early-stage-cancers-study-shows">
          Blood test could use DNA to spot eight of the most common cancers, study shows
        </a>
        <a style={{"display": "block"}} href="https://www.theguardian.com/technology/2018/jan/19/facebook-trustworthy-news-sources-mark-zuckerberg">
          Facebook to prioritize 'high quality', trustworthy news, Zuckerberg says
        </a>
        <a style={{"display": "block"}} href="https://www.theguardian.com/science/2018/jan/18/blood-test-could-use-dna-to-spot-early-stage-cancers-study-shows">
          Blood test could use DNA to spot eight of the most common cancers, study shows
        </a>
        <a style={{"display": "block"}} href="https://www.theguardian.com/technology/2018/jan/19/facebook-trustworthy-news-sources-mark-zuckerberg">
          Facebook to prioritize 'high quality', trustworthy news, Zuckerberg says
        </a>
      </div>
    )
  }

}

export default NewsWidget;