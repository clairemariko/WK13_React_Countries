var React = require('react');

var CountryBorder = React.createClass({

  render: function(){
    var countryListItems = this.props.borders.map(function(border){
      return <li key={ border }> { border } </li>
    })
    return(
      <div>
        <h4>country borders</h4>
        <ul>
        {countryListItems}
        </ul>
      </div>
      )
    }
  })

module.exports = CountryBorder