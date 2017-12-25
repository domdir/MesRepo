/*
 *created with ♥ by Gianluca Chiap
 */

import React from 'react';
/**
 * var logoPath = this.props.currentUser
 ? routesPath.HOME_PAGE_GROUP_ROUTE + routesPath.INDEX
 : routesPath.INDEX;
 var v1 = "navbar navbar-default navbar-fixed-top";
 var v2 = "collapse navbar-collapse";

 const route_group = FlowRouter.current().route.group;
 if (route_group) {
         if (route_group.name == routesName.INI_GROUP_NAME) {
            v1 = "navbar navbar-default navbar-fixed-top black";
            v2 = "collapse navbar-collapse black";

         }
      }
 */
export default class Footer extends React.Component {

   constructor( props ) {
      super( props );

      this.state = {};
   }

   render() {
      let className = "fixed_footer";
      if (FlowRouter.current().route.group) {
         if (FlowRouter.current().route.group.name == "iniGroup") {
            className += " black"
         }
      }
      return (
        <footer className={className}>
           <div className="content">
              <div className="row">

                 <div className="col-xs-6 col-sm-4 col-md-2">
                    <h5>C O P Y R I G H T</h5>
                    <ul>
                       <a href="http://www.polimi.it">
                          <li>Politecnico di Milano</li>
                       </a>
                       <a href="http://policloud.polimi.it/">
                          <li>Policloud</li>
                       </a>
                       <a href="http://recsys.deib.polimi.it/">
                          <li>RecSys@polimi</li>
                       </a>

                    </ul>
                 </div>
                 <div className="col-xs-6 col-sm-4 col-md-2">
                    <h5>S U P E R V I S O R</h5>
                    <ul>
                       <a href="http://www.deib.polimi.it/eng/people/details/159156">
                          <li>Cremonesi Paolo</li>
                       </a>
                       <a href="https://www.linkedin.com/in/mehdielahi">
                          <li>Mehdi Elahi</li>
                       </a>
                       <a href="http://ydeldjoo.me/">
                          <li>Yashar Deldjoo</li>
                       </a>
		       <li>Markus Schedl</li>
                       <li>Bogdan Ionescu</li>
                       <li>Mihai Gabriel Constantin</li>
                    </ul>
                 </div>
                 <div className="col-xs-6 col-sm-4 col-md-2">
                    <h5>D E V E L O P E R S</h5>
                    <ul>
                   	   <li>Anghileri Davide</li>
                       <li>Paladini Antonio </li>
                       <li>Donini Alessandro </li>
                       <li>Chiap Gianluca </li>
                       <li>Stefano Cereda</li>
                    </ul>
                 </div>
                 <div className="col-xs-6 col-sm-4 col-md-2">
                    <h5>P O W E R E D &nbsp; W I T H &nbsp; ♥ &nbsp; B Y </h5>
                    <ul>
                       <a href="https://www.meteor.com/">
                          <li>Meteor</li>
                       </a>
                       <a href="https://facebook.github.io/react/">
                          <li>React</li>
                       </a>
                    </ul>
                 </div>
                 <div className="col-xs-6 col-sm-4 col-md-2" id="vuoto">
                 </div>
                 <div className="col-xs-12 col-md-2">
                    <div className="footer-logo">
                       <a href=""><img id="logorec" src={'/images/MES_logo_white.png'} /></a>
                       <a href=""><span style={{fontFamily: "MESFont4"}}>MES  </span><span
                         style={{color: '#26C6DA'}}>  PROJECT</span></a>
                    </div>
                    <div className="polilogo">
                       <a href="http://www.polimi.it"><img id="polilogo" src={'/images/logopoli.png'} /></a>
                    </div>
                    <div className="jkulogo">
                        <a href="http://http://www.jku.at"><img id="jkulogo" src={'images/logojku.png'} /></a>
                    </div>
                    <div className="upblogo">
                        <a href="http://www.upb.ro"><img id="upblogo" src={'images/logoupb.png'} /></a>
                    </div>
                 </div>
              </div>

           </div>
        </footer>
      )
   }

};

