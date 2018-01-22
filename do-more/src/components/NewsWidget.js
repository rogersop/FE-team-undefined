import React, { Component } from 'react';
import '../index.css';

class NewsWidget extends Component {
  
  render () {
    return (
      <div className="news-widget">
        <h4>Latest headlines:</h4>
        <a className="article-block" href="https://www.theguardian.com/sport/2018/jan/22/roger-federer-novak-djokovic-hyeon-chung-tennys-sandgren-dominic-thiem-australian-open-tennis">
          <img className="article-image" src="http://images.boats.com/resize/1/6/27/6500627_20171020071454151_1_LARGE.jpg?w=300&h=300" alt="boat" />
          <span className="article-title">Novak Djokovic crashes out to Hyeon Chung at Australian Open</span>
          <span className="article-source">The Guardian</span>
        </a>
        <a className="article-block" href="https://www.theguardian.com/football/blog/2018/jan/22/premier-league-10-talking-points-from-the-weekend-action">
          <img className="article-image" src="http://images.boats.com/resize/1/6/27/6500627_20171020071454151_1_LARGE.jpg?w=300&h=300" alt="boat" />
          <span className="article-title">Premier League: 10 talking points from the weekend’s action</span>
          <span className="article-source">The Guardian</span>
        </a>
        <a className="article-block" href="https://www.theguardian.com/business/2018/jan/21/amazons-first-automated-store-opens-to-public-on-monday">
          <img className="article-image" src="http://images.boats.com/resize/1/6/27/6500627_20171020071454151_1_LARGE.jpg?w=300&h=300" alt="boat" />
          <span className="article-title">Amazon's first checkout-free grocery store opens on Monday</span>
          <span className="article-source">The Guardian</span>
        </a>
        <a className="article-block" href="https://www.theguardian.com/business/2018/jan/21/cbi-chief-calls-for-urgent-jobs-first-brexit-transition-deal">
          <img className="article-image" src="http://images.boats.com/resize/1/6/27/6500627_20171020071454151_1_LARGE.jpg?w=300&h=300" alt="boat" />
          <span className="article-title">CBI chief calls for urgent ‘jobs first’ Brexit transition deal</span>
          <span className="article-source">The Guardian</span>
        </a>
        <a className="article-block" href="https://www.theguardian.com/science/2018/jan/18/blood-test-could-use-dna-to-spot-early-stage-cancers-study-shows">
          <img className="article-image" src="http://images.boats.com/resize/1/6/27/6500627_20171020071454151_1_LARGE.jpg?w=300&h=300" alt="boat" />
          <span className="article-title">Blood test could use DNA to spot eight of the most common cancers, study shows</span>
          <span className="article-source">The Guardian</span>
        </a>
      </div>
    )
  }

}

export default NewsWidget;