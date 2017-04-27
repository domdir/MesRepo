
import React, {Component} from 'react'
import Select from 'react-select'






export default class SelectTest extends Component {
	constructor(params) {
     super(params) 
     
     this.state = {
		 options: [],
		 selected: []
    }
     }
  
  render() {
    return (
    	<Select
        options={ this.state.options }
        multi
        clearable={ false }
        openOnFocus
        onChange={ this.onChange.bind(this) }
        value={ this.state.selected }
        placeholder="Search options..." />
    );
  }
  
  componentDidMount() {
  	this.onChange([
      this.state.options[5],
      this.state.options[7]
    ]);
  }
  componentWillMount(){
	  var optionsTemp=[];
    for (var i=0; i<10; i++) {
    	optionsTemp.push({label:'optionwithreallylonglabelofawesome '+i, value:'option'+i});
    }
	this.setState({
		options: optionsTemp
	    });
  }
  
  onChange(selectedOptions)  {
    this.setState({ selected: selectedOptions })
  }
};



