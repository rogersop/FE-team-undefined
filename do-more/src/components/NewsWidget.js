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
    this.setState({
      country: event.target.value
    });
  }


  render () {
    const {articles, settings} = this.state
   
    return (
      <div className="news-widget">
      {
        settings ?
        
        <div className="news-settings">
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
          <select className="country-selector">
            <option value="gb"
            selected={this.handleCountryChange}>
            Great Britain</option>
            <option value="ie"
            selected={this.handleCountryChange}>
            Ireland</option>
            <option value="us"
            selected={this.handleCountryChange}>
            United States of America</option>
            <option value="au"
            selected={this.handleCountryChange}>
            Australia</option>
            <option value="ru"
            selected={this.handleCountryChange}>
            Russia</option>
          </select>
          <button onClick={this.handleSettingsClick}>Save settings</button>
        </div> :
        
        <div className="news-articles">
          <h4>Latest headlines:</h4>
          <button onClick={this.handleSettingsClick}>Settings</button>
          {articles.map((article, i) => {
            return <div key={i}>
              <a className="article-block" href={article.url}>
                <div className="article-image-box"><img className="article-image" src={article.urlToImage} alt="news pic" /></div>
                <span className="article-title">{article.title}</span>
                <span className="article-source">{article.source.name}</span>
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