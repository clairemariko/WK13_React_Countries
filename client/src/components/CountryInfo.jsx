var React= require('react');
var CountryBorders = require('./CountryBorders')

var CountryInfo = React.createClass({



  render:function(){
      if(!this.props.country){return<h4> Please select a country </h4>}
    return  (
      <div>
      <h4>Country: {this.props.country.name}</h4>
      <h5>Capital: {this.props.country.captial}</h5>
      <h5>Population: {this.props.country.population}</h5>
      <h5>Currencies: {this.props.country.currencies}</h5>
      <h5>Languages: {this.props.country.languages}</h5>
      <h5>Translations: {this.props.country.translations.de}</h5>

      <CountryBorders borders= {this.props.country.borders}/>
      </div>
      )  
    }
  })

module.exports = CountryInfo;