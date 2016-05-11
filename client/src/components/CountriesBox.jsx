var CountrySelect = require('./CountrySelect');
var CountryInfo = require('./CountryInfo');
var _ = require('lodash');


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

  //setting border countries. I want to map over current country and bring back it bordering countires and get the alpha codes. then by mapping over Countries if the aplha code from the bordering countries match a country then bring back that countries information. Make sure to bind(this) as I presume by having to map twice it will lose what this is. Also I could use => which is like writting 'function' and also means you dont have to use bind(this)


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


  getCountryByCode: function(code){
    return _.find(this.state.countries, function(country){ 
      return country.alpha3Code === code
     })
    },


  getBorderingCountries: function(){
    if(!this.state.selectedCountry){return [];}
    var borderingCountries = this.state.selectedCountry.borders.map(function(code){
      return this.getCountryByCode(code);
     }.bind(this))
    return borderingCountries;
   },



//step 1 creating the components
  render:function(){
  // this.state.selectedCountry.borderingCountries = this.getBorderingCountries();
  var borderingCountries = this.getBorderingCountries();
    return (
      <div>
        <h4> Countries Box </h4>
        <CountrySelect countries={this.state.countries} onSelectCountry={this.setSelectedCountry}></CountrySelect>
        <CountryInfo country={this.state.selectedCountry} borderingCountries={borderingCountries}></CountryInfo>

      </div>
    )
  }
})

module.exports = CountriesBox;