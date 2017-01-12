/*
 *created with ♥ by Gianluca Chiap
 */

import React, { Component } from 'react';


export default class ExplanationRec extends Component {

   componentDidMount(){

   }

   nextStep() {
      this.props.onNext();
   }

   render() {
      return (
        <div>
           <div>
              <div className='jumbotron'>
                 <h1 className="text-center">T H E &nbsp; N E X T &nbsp; M O V I E S<br />A R E &nbsp;F O R &nbsp; Y O U</h1>
                 <br />
                 <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                       <div className="dropdown">
                          <button className="btn btn-default dropdown-toggle dropdownMenu1" type="button"
                                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                             <ul>?</ul>
                          </button>
                          <ul className="dropdown-menu" id="dropdown-menu1" aria-labelledby="dropdownMenu1">
                             <li>
                                <a>
                                   Now we will show you 5 movies that we think may interest you.
                                   If you want rate it, click on the thumbnail of the movies and rate.
                                </a>
                             </li>
                          </ul>
                       </div>
                    </div>
                 </div>
                 <br />
                 <br />
                 <br />
                 <button className="btn btn-default btn_circle row button_ini"
                         onClick={this.nextStep.bind(this)}>S T A R T
                 </button>
              </div>
           </div>
        </div>
      )
   }
}