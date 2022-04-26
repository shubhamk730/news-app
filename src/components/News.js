import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(30);
    this.setState({
      ...this.state,
      loading: true,
    });
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&apiKey=40b5c56bdd1a433190a6e7f7c0ffe286&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);

    let result = await data.json();
    this.props.setProgress(50);
    this.setState({
      ...this.state,
      articles: result.articles,
      loading: false,
      totalResults: result.totalResults,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({
      ...this.state,
      page: this.state.page + 1,
    });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&apiKey=YOUR_KEY&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);

    let result = await data.json();
    this.setState({
      ...this.state,
      articles: this.state.articles.concat(result.articles),
      loading: false,
      totalResults: result.totalResults,
    });
  };

  render() {
    return (
      <>
        <h2 className="text-center">
          NewsMonkey - Top {this.props.category} headlines
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={
                        element.title
                          ? element.title.slice(0, 20)
                          : "Unavailable"
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 90)
                          : "Unavailable"
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
