var React= require('react');

var CountrySelect = React.createClass({

  getInitialState:function(){
    return { selectedIndex: null };
  },

  handleChange:function(e){
    e.preventDefault();
    var newIndex = e.target.value;
    this.setState( {selectedIndex: newIndex} );
    this.props.onSelectCountry(this.props.countries[newIndex]);

  },
  


  render:function(){
    var option = this.props.countries.map(function(country, index){
        return <option value={index} key={index}> {country.name} </option>;
      });
        return (
          <div>
            <h4> Country Select </h4>
            <select value={this.state.selectedIndex} onChange={this.handleChange}>

              {option}
            </select>
          </div>
         )
        }
      })

  

module.exports = CountrySelect;