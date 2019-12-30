import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Wall from './components/Wall';
import './styles/styles.scss'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keywords: '',
      total: 0,
      listPhotos: []
    }
  }
  addKeyword(words)  {
    this.setState({ keywords: words });
  }
  addPhotos(words,total, photos)  {
      this.setState({
          keywords: words,
          total: total,
          listPhotos: photos
      })
  }
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' render={() => <Wall />} />
          <Route exact path='/#/:keyword' render={routeProps => <Wall {...routeProps}/>} />
        </Switch>
      </div>
      )}
  }