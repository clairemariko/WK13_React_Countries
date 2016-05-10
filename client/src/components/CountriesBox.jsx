var CountrySelect = require('./CountrySelect');
var CountryInfo = require('./CountryInfo');


var React= require('react');

var CountriesBox = React.createClass({

//step 2 create an intial state and we dont have any data atm so it is an empty array. this is before the render
  getInitialState:function(){
    return {countries: [], selectedCountry: null}
  },

//setting the state so it now the object country
  setSelectedCountry: function(country){
    this.setState({selectedCountry: country})
  },

  //setting border countries
  getBorderCountry: function(country){

  }

//setting up step3, this will happen after a render
  componentDidMount:function(){
    var request = new XMLHttpRequest();
    request.open("GET", "https://restcountries.eu/rest/v1/all");
    request.onload=function(){
      var data = JSON.parse(request.responseText);
      //now we have the data we need to set the state, you can check this in the REACT tool.
      this.setState({countries: data});
      //we need to bind it as this is in a call back and it will lose this
    }.bind(this)
    request.send();
  },

//step 1 creating the components
  render:function(){
    return (
      <div>
        <h4> Countries Box </h4>
        <CountrySelect countries={this.state.countries} onSelectCountry={this.setSelectedCountry}> </CountrySelect>
        <CountryInfo country={this.state.selectedCountry}> </CountryInfo>
        
        <CountryBorders borders={this.state.countries} getBorderCountry={this.setBorderCountry}> </CountryBorders>

      </div>
    )
  }
})

module.exports = CountriesBox;