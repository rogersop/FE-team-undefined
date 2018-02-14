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
    const category = event.target.className.slice(0, event.target.className.length - 11);
    this.setState({ category });
  }

  handleCountryChange = (event) => {
    const country = event.target.className.slice(0, event.target.className.length - 11);
    this.setState({ country });
  }

  


  dragstart_handler = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  render () {
    const {articles, settings} = this.state
   
    return (

        <div className="news-widget newsWidget" draggable='true' onDragStart={this.dragstart_handler} id='newsWidget'>
      {
        settings ?
        
        <div className="news-settings newsWidget">
          <h3 className="newsWidget">Filter Settings</h3>
          <button className="newsWidget" onClick={this.handleSettingsClick}>Save Settings</button>
          <div className="settings newsWidget">
          <form className="category-selector newsWidget">
          <h4 className="newsWidget">By Category:</h4>
        
          <div
              className="business newsWidget"
              name="category" value="business" 
              style= {{backgroundColor: this.state.category === "business" ? "rgba(0,0,0,0.0.3)" : undefined,
                color: this.state.category === "business" ? "rgba(255, 255, 255, 1)" : undefined}} 
              onClick={this.handleCategoryChange}>
              Business
            </div>

            <div
              className="entertainment newsWidget"
              name="category" value="entertainment" 
              style= {{backgroundColor: this.state.category === "entertainment" ? "rgba(0,0,0,0.0.3)" : undefined,
                color: this.state.category === "entertainment" ? "rgba(255, 255, 255, 1)" : undefined}} 
              onClick={this.handleCategoryChange}>
              Entertainment
            </div>

            <div
              className="general newsWidget"
              name="category" value="general" 
              style= {{backgroundColor: this.state.category === "general" ? "rgba(0,0,0,0.0.3)" : undefined,
                color: this.state.category === "general" ? "rgba(255, 255, 255, 1)" : undefined}} 
              onClick={this.handleCategoryChange}>
              General
            </div>

            <div
              className="health newsWidget"
              name="category" value="health" 
              style= {{backgroundColor: this.state.category === "health" ? "rgba(0,0,0,0.0.3)" : undefined,
                color: this.state.category === "health" ? "rgba(255, 255, 255, 1)" : undefined}} 
              onClick={this.handleCategoryChange}>
              Health
            </div>

            <div
              className="science newsWidget"
              name="category" value="science" 
              style= {{backgroundColor: this.state.category === "science" ? "rgba(0,0,0,0.0.3)" : undefined,
                color: this.state.category === "science" ? "rgba(255, 255, 255, 1)" : undefined}} 
              onClick={this.handleCategoryChange}>
              Science
            </div>

            <div
              className="sports newsWidget"
              name="category" value="sports" 
              style= {{backgroundColor: this.state.category === "sports" ? "rgba(0,0,0,0.0.3)" : undefined,
                color: this.state.category === "sports" ? "rgba(255, 255, 255, 1)" : undefined}} 
              onClick={this.handleCategoryChange}>
              Sports
            </div>

            <div
              className="technology newsWidget"
              name="category" value="technology" 
              style= {{backgroundColor: this.state.category === "technology" ? "rgba(0,0,0,0.0.3)" : undefined,
                color: this.state.category === "technology" ? "rgba(255, 255, 255, 1)" : undefined}} 
              onClick={this.handleCategoryChange}>
              Technology
            </div>
            
          </form>
          <form className="country-selector newsWidget">
          <h4 className="newsWidget"> By Country: </h4>
          <div
          className="au newsWidget"
          name="country" value="au" 
          style= {{backgroundColor: this.state.country === "au" ? "rgba(0,0,0,0.0.3)" : undefined,
            color: this.state.country === "au" ? "rgba(255, 255, 255, 1)" : undefined}} 
          onClick={this.handleCountryChange}>
          Australia
        </div>

        <div
          className="ie newsWidget"
          name="country" value="ie" 
          style= {{backgroundColor: this.state.country === "ie" ? "rgba(0,0,0,0.0.3)" : undefined,
            color: this.state.country === "ie" ? "rgba(255, 255, 255, 1)" : undefined}} 
          onClick={this.handleCountryChange}>
          Ireland
        </div>

        <div
          className="gb newsWidget"
          name="country" value="gb" 
          style= {{backgroundColor: this.state.country === "gb" ? "rgba(0,0,0,0.0.3)" : undefined,
            color: this.state.country === "gb" ? "rgba(255, 255, 255, 1)" : undefined}} 
          onClick={this.handleCountryChange}>
          Great Britain
        </div>

        <div
          className="ca newsWidget"
          name="country" value="ca" 
          style= {{backgroundColor: this.state.country === "ca" ? "rgba(0,0,0,0.0.3)" : undefined,
            color: this.state.country === "ca" ? "rgba(255, 255, 255, 1)" : undefined}} 
          onClick={this.handleCountryChange}>
          Canada
        </div>

        <div
          className="us newsWidget"
          name="country" value="us" 
          style= {{backgroundColor: this.state.country === "us" ? "rgba(0,0,0,0.0.3)" : undefined,
            color: this.state.country === "us" ? "rgba(255, 255, 255, 1)" : undefined}} 
          onClick={this.handleCountryChange}>
          USA
        </div>

        
        
          </form>
          </div>
        </div> :
        
        <div className="news-articles newsWidget">
          <h3 className="newsWidget">{"// LATEST HEADLINES"}</h3>
          <button onClick={this.handleSettingsClick}>Settings</button>
          {articles.map((article, i) => {
            return <div className="newsWidget" key={i}>
              <a className="article-block newsWidget" href={article.url}>
                <div className="article-image-box newsWidget"><img className="article-image newsWidget" src={article.urlToImage ? article.urlToImage : "http://mariafresa.net/data_gallery/blog-news-new-orleans-times-picayune-newspaper-going-digital-gaQZWo-clipart.jpg"} alt="News" /></div>
                <span className="article-title newsWidget">{article.title}</span>
                <span className="article-source newsWidget" >{article.source.name}</span>
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