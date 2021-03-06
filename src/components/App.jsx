import React, { Component } from 'react';

import OutputForm from './OutputForm.jsx';
import Homer from '../assets/Homer.png';
import style from '../styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      firstView: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeView = this.changeView.bind(this);
    window.ActivatePlacesSearch = this.activatePlacesSearch.bind(this);
  }
  activatePlacesSearch() {
    let input = document.getElementById('Search');
    let autocomplete = new google.maps.places.Autocomplete(input);
  }

  componentDidMount() {
    const ApiKey = 'AIzaSyBNyF3ksrwtdU5-_hbC-m6PBbZJm78_MgI';
    const script = document.createElement('script');
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${ApiKey}` +
      '&libraries=places&callback=window.ActivatePlacesSearch';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  changeView(e) {
    e.preventDefault();
    this.setState({
      firstView: !this.state.firstView,
      value: ''
    });
  }

  handleSubmit(event) {
    console.log(`A name was submitted: ${this.state.value}`);
    this.setState({ firstView: false });
    event.preventDefault();
  }

  render() {
    const { firstView, value } = this.state;
    return (
      <div id="App">
        {firstView ? (
          <div className="inputForm">
            <form onSubmit={this.handleSubmit}>
              <h1>Let me help you with weather info</h1>
              <input
                placeholder="Enter your location"
                id="Search"
                type="text"
                value={value}
                onChange={this.handleChange}
              />
            </form>
            <img src={Homer} alt="Homer Simpson" />
          </div>
        ) : (
          <div className="outputForm">
            <OutputForm city={value} changer={this.changeView} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
