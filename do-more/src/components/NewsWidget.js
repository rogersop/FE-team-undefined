import React, { Component } from 'react';
import '../index.css';
import NewsAPI from 'newsapi';

const newsapi = new NewsAPI(process.env.REACT_APP_NEWSAPIKEY);

class NewsWidget extends Component {
  
  
  state = {
    articles: [],
    settings: false,
    country: 'gb',
    category: ''
  }

  componentDidMount = () => {
    this.fetchArticles();
  }

  fetchArticles = () => {
    newsapi.v2.topHeadlines({
      language: 'en',
      category: this.state.category,
      country: this.state.country
    }).then(response => {
      this.setState({
        articles: response.articles
      })
    });
  }

  handleSettingsClick = () => {
    this.state.settings ? this.setState({settings: false}) : this.setState({settings: true});
    this.fetchArticles();
  }

  handleCategoryChange = (event) => {
    this.setState({
      category: event.target.value
    });
  }

  handleCountryChange = (event) => {
    console.log(event.target.value)
    this.setState({
      country: event.target.value
    });
  }

  dragstart_handler = (event) => {
    console.log('dragging')

    event.dataTransfer.setData("text/plain", event.target.id);

  }

  render () {
    const {articles, settings} = this.state
   
    return (
      <div className="news-widget notDroppable" draggable='true' onDragStart={this.dragstart_handler} id="newsWidget">
      {
        settings ?
        
        <div className="news-settings" id="newsWidget">
          <p>Filter settings</p>
          <p>by category:</p>
          <form className="category-selector">
            <label>
              <input 
              type="radio" name="category" value="business" 
              checked={this.state.category==='business'} 
              onChange={this.handleCategoryChange} />
              Business
            </label>
            <label>
              <input 
              type="radio" name="category" value="entertainment" 
              checked={this.state.category==='entertainment'} 
              onChange={this.handleCategoryChange} />
              Entertainment
            </label>
            <label>
              <input type="radio" name="category" value="general" 
              checked={this.state.category==='general'} 
              onChange={this.handleCategoryChange} />
              General
            </label>
            <label>
              <input type="radio" name="category" value="health" 
              checked={this.state.category==='health'} 
              onChange={this.handleCategoryChange} />
              Health
            </label>
            <label>
              <input type="radio" name="category" value="science" 
              checked={this.state.category==='science'} 
              onChange={this.handleCategoryChange} />
              Science
            </label>
            <label>
              <input type="radio" name="category" value="sports"  
              checked={this.state.category==='sports'} 
              onChange={this.handleCategoryChange} />
              Sports
            </label>
            <label>
              <input type="radio" name="category" value="technology" 
              checked={this.state.category==='technology'} 
              onChange={this.handleCategoryChange} />
              Technology
            </label>
          </form>
          <br/>
          <p> By country: </p>
          <form className="country-selector">
            <label>
              <input 
              type="radio" name="country" value="au" 
              checked={this.state.country==='au'} 
              onChange={this.handleCountryChange} />
              Australia
            </label>
            <label>
              <input 
              type="radio" name="country" value="ie" 
              checked={this.state.country==='ie'} 
              onChange={this.handleCountryChange} />
              Ireland
            </label>
            <label>
              <input type="radio" name="country" value="gb" 
              checked={this.state.country==='gb'} 
              onChange={this.handleCountryChange} />
              Great Britain
            </label>
            <label>
              <input type="radio" name="country" value="ca" 
              checked={this.state.country==='ca'} 
              onChange={this.handleCountryChange} />
             Canada
            </label>
            <label>
              <input type="radio" name="country" value="us" 
              checked={this.state.country==='us'} 
              onChange={this.handleCountryChange} />
              USA
            </label>
          </form>
          <button onClick={this.handleSettingsClick}>Save settings</button>
        </div> :
        
        <div className="news-articles" id="newsWidget"> 
          <h4>Latest headlines:</h4>
          <button onClick={this.handleSettingsClick}>Settings</button>
          {articles.map((article, i) => {
            return <div key={i}>
              <a className="article-block" href={article.url}>
                <div className="article-image-box"><img className="article-image" id="newsWidget" src={article.urlToImage} alt="news pic" /></div>
                <span className="article-title" id="newsWidget">{article.title}</span>
                <span className="article-source" id="newsWidget">{article.source.name}</span>
              </a>
            </div>
          })}
        </div>
      }
    </div>
    )
  }

}

export default NewsWidget;