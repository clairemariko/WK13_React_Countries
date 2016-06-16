var React = require('react');

var RegionSelect = React.createClass({


  getInitialState:function(){
    return { selectedIndex: null };
  },

  handleChange:function(e){
    e.preventDefault();
    var newIndex = e.target.value;
    this.setState( {selectedIndex: newIndex} );
    //add this part after you hook it up in the render
    this.props.onSelectRegion(this.props.regions[newIndex]);
    
  },

  render:function(){
    var options = this.props.regions.map(function(region, index){
      return <option value={index} key={index}>{region}</option>;
    })
    return(
        <select value={this.state.selectedIndex} onChange={this.handleChange}>
          {options}
        </select>
       )
     }
   })

module.exports = RegionSelect