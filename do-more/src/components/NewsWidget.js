import React, { Component } from 'react';

class NewsWidget extends Component {
  
  render () {
    return (
      <div className="news-widget">
        <h4>Latest headlines:</h4>
        <a href="https://www.theguardian.com/sport/2018/jan/22/roger-federer-novak-djokovic-hyeon-chung-tennys-sandgren-dominic-thiem-australian-open-tennis">
          <p>Novak Djokovic crashes out to Hyeon Chung at Australian Open</p>
        </a>
        <a href="https://www.theguardian.com/football/blog/2018/jan/22/premier-league-10-talking-points-from-the-weekend-action">
          <p>Premier League: 10 talking points from the weekend’s action</p>
        </a>
        <a href="https://www.theguardian.com/business/2018/jan/21/amazons-first-automated-store-opens-to-public-on-monday">
          <p>Amazon's first checkout-free grocery store opens on Monday</p>
        </a>
        <a href="https://www.theguardian.com/business/2018/jan/21/cbi-chief-calls-for-urgent-jobs-first-brexit-transition-deal">
          <p>CBI chief calls for urgent ‘jobs first’ Brexit transition deal</p>
        </a>
        <a href="https://www.theguardian.com/science/2018/jan/18/blood-test-could-use-dna-to-spot-early-stage-cancers-study-shows">
          <p>Blood test could use DNA to spot eight of the most common cancers, study shows</p>
        </a>
      </div>
    )
  }

}

export default NewsWidget;