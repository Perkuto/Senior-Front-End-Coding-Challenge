import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Body extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [""]
    }
  }
  renderTile(photoUrl, index) {
    return <Tile key={index} photoUrl={photoUrl} />;
  }

  searchComplete(results){
    //console.log("search finished", this.state)
    this.setState({results: results})
  }
  render() {
    return (
      <div>
        <Search searchComplete={this.searchComplete.bind(this)}/>
        {this.state.results.map(( (url,index) => this.renderTile(url, index)))}


      </div>
    );
  }
}

class Tile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {url:""}
  }
  componentDidMount(){
    //console.log("Tile mounted")
  }

  render() {
    return (
        <img alt="aa" src={this.props.photoUrl}></img>
    );
  }
}
class Search extends React.Component {
  thresholdMs =  1000
  constructor(props) {
    super(props)
    this.state ={
      currentlySearching: false,
      nextSearchQueued: false,
      nextSearchId: undefined,
      lastSearch: Date.now()
    }
  }

  safeToSearch(){
    return !this.state.currentlySearching && Date.now()-this.state.lastSearch > this.thresholdMs;
  }

  handleSearchTextModified(event)
  {
    let keywords = event.target.value
    if(!this.safeToSearch())
    {
      if(!this.state.nextSearchQueued)
      {
        console.log("Not safe to search, no search queued")
        let cronId = setTimeout(search.bind(this),this.thresholdMs)
        this.setState(Object.assign(this.state, {nextSearchQueued: true, nextSearchId:cronId}))
      }
      else {
        console.log("Not safe to search, but a search is queued")
        clearTimeout(this.state.nextSearchId)
        let cronId = setTimeout(search.bind(this),this.thresholdMs)
        this.setState(Object.assign(this.state, {nextSearchQueued: true, nextSearchId:cronId}))
      }
    }
    else if(this.safeToSearch()){
      console.log(" safe to search")
      search.bind(this)()
    }
    function search(){
      this.setState(Object.assign(this.state, {currentlySearching: true, nextSearchQueued:false}))

      //console.log(keywords)
      this.fetchPictureByKeywords(keywords)
      .then(res => res.json())
        .then((results) =>{
            this.props.searchComplete(results)
            //console.log("fetch completed", keywords)
          })
          .catch((error)=>console.error(error))
          .finally(()=>{
            this.setState(Object.assign(this.state,{currentlySearching: false}))
          })

          this.setState(Object.assign(this.state, {  lastSearch: Date.now()}))
    }


  }
  fetchPictureByKeywords(keywords)
  {
    return fetch("http://localhost:3001?keywords="+keywords)
  }
  componentDidMount(){
    //console.log("Search mounted")
    this.fetchPictureByKeywords()
  }
  render() {
    return (
      <div className="">
        <input type="text" onChange={(event)=> this.handleSearchTextModified(event)}  ></input>

      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Body />,
  document.getElementById('root')
);
