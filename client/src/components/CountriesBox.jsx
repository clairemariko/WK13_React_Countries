var CountrySelect = require('./CountrySelect');
var CountryInfo = require('./CountryInfo');
var RegionSelect = require('./RegionSelect');
var _ = require('lodash');


var React= require('react');

var CountriesBox = React.createClass({

//step 2 create an intial state and we dont have any data atm so it is an empty array. this is before the render
  getInitialState:function(){
    return {countries: [], selectedCountry: null, selectedRegion: null}
  },

//setting the state so it now the object country
  setSelectedCountry: function(country){
    this.setState({selectedCountry: country})
  },

  setSelectedRegion: function(region){
    this.setState({selectedRegion: region});
  },


//setting up step3, this will happen after a render
  componentDidMount:function(){
    var request = new XMLHttpRequest();
      request.open("GET", "https://restcountries.eu/rest/v1/all");
      request.onload=function(){
        var data = JSON.parse(request.responseText);
      //now we have the data we need to set the state, you can check this in the REACT tool.
        this.setState({countries: data, selectedCountry:data[0], selectedRegion:data[0].region});
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


  

//we care that a MAP RETURNS, remember always return, return! the uniq get rids of the duplicate. this.state.countries as you are doing it over all the countries! idiot!
   getRegions: function(){
    var regions = this.state.countries.map(function(country){
      return country.region;
    })
    return _.uniq(regions);
   },

   filteredCountries: function(){
    if(!this.state.selectedRegion){return this.state.countries}
      var filteredCountries = this.state.countries.filter(function(country){
        return country.region === this.state.selectedRegion;
      }.bind(this))
      return filteredCountries;
   },


//step 1 creating the components
  render:function(){
  // this.state.selectedCountry.borderingCountries = this.getBorderingCountries();
  var borderingCountries = this.getBorderingCountries();
    return (
      <div>
        <h4> Countries Box </h4>
        <RegionSelect regions={this.getRegions()} onSelectRegion={this.setSelectedRegion}/>
        <CountrySelect countries={this.filteredCountries()} onSelectCountry={this.setSelectedCountry}/>
        <CountryInfo country={this.state.selectedCountry} borderingCountries={borderingCountries}/>
      </div>
    )
   }
 })

module.exports = CountriesBox;