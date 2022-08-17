import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 8
  } 
  static propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string


};
capitalizeFirstLetter=(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    console.log("Constructor in news Component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsPanda`
  }
   
  async componentDidMount() {
    this.props.setProgress(10);
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bde7fd5d22424b37a87d4318b7f8386f&page=1&pagesize=${this.props.pageSize}`;
      this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(35);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles,
      totalresults: parsedData.totalresults,
      loading:false
    });
    this.props.setProgress(100);
  }
  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bde7fd5d22424b37a87d4318b7f8386f&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading:false
      });
    }
  };
  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
   
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bde7fd5d22424b37a87d4318b7f8386f&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
      this.setState({page:this.state.page+1})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
     
    });

  };
  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bde7fd5d22424b37a87d4318b7f8386f&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    });
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{margin: '30px 0px', marginTop :'90px'}}>NewsPanda -  Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1> 
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-4  ">
        <div className="row my-6">
          
          {this.state.articles.map((element) => {
            return (
              <div className="col md-3" key={element.url}>
                {!this.state.loading &&<Newsitem
                  title={element.title ? element.title.slice(0, 35) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />}
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between ">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
