/*
 *created with ♥ by Gianluca Chiap
 */

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import  NavBarElement  from './NavBarElement.jsx'
import  NavBarLogo  from './NavBarLogo.jsx';
import { routesPath, routesParam, routesName } from '/client/router/router.js'
import { FlowRouter } from 'meteor/kadira:flow-router';
import Avatar from '/client/ui/components/avatar/Avatar.jsx'
import AvatarNavbar from '/client/ui/components/avatar/AvatarNavbar.jsx'

class NavBar extends React.Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   renderNavElement() {
      const navElementList = [];
      const currentRoute = FlowRouter.current();
      if (!this.props.currentUser) {

         if (currentRoute.route.path == routesPath.INDEX) {

            navElementList.push({
               nav_elementName: "Login",
               nav_elementLink: routesPath.LOGIN_ROUTE
            }, {
               nav_elementName: "Sign Up",
               nav_elementLink: routesPath.SIGN_UP_ROUTE
            });
         } else {
            if (currentRoute.route.group.name == routesName.AUTH_BASE_ROUTE_NAME) {

               let auth_case = currentRoute.params.auth_case;
               switch (auth_case) {
                  case routesParam.LOGIN:

                     navElementList.push({
                        nav_elementName: "Sign Up",
                        nav_elementLink: routesPath.SIGN_UP_ROUTE
                     });
                     break;
                  case routesParam.SIGN_UP:

                     navElementList.push({
                        nav_elementName: "Login",
                        nav_elementLink: routesPath.LOGIN_ROUTE
                     });
                     break;
                  default:

                     break;
               }
            }
         }
      } else {

         /* navElementList.push({
          nav_elementName: "Trailers",
          nav_elementLink: "/trailers"
          });
          */

         navElementList.push({
            nav_elementName: "Movies4You",
            nav_elementLink: "/rec4u"
         });

         navElementList.push({
            nav_elementName: "Explore",
            nav_elementLink: "/explore"
         });

         navElementList.push({
            nav_elementName: this.props.currentUser.user_name,
            nav_elementLink: routesPath.PROFILE_GROUP_ROUTE + routesPath.INDEX
         });


         if (currentRoute.route.group) {
            if (currentRoute.route.group.name == routesName.INI_GROUP_NAME) {

               navElementList.splice(0, navElementList.length);
               navElementList.push({nav_elementName: "Logout", nav_elementLink: routesPath.LOGOUT_ROUTE});

            }
         }
      }

      return navElementList.map((navElem, i) => {

         return (
           <NavBarElement key={i} to={navElem.nav_elementLink} name={navElem.nav_elementName} />)
      })
   };

   render() {


      var logoPath = routesPath.INDEX;
      var v1 = "navbar navbar-default navbar-fixed-top";
      var v2 = "collapse navbar-collapse";

      const route_group = FlowRouter.current().route.group;
      if (route_group) {
         if (route_group.name == routesName.INI_GROUP_NAME) {
            v1 = "navbar navbar-default navbar-fixed-top black";
            v2 = "collapse navbar-collapse black";

         }
      }
      let avatar = null;
      if (!FlowRouter.current().route.path == "/ini/:ini_step") {

         if (this.props.isReady) {
            if (this.props.currentUser) {
               if (this.props.currentUser.avatar_id) {

                  avatar = <AvatarNavbar
                    img_src={"/avatar_img/"+this.props.currentUser.avatar_id+".png"} />
               }
            }
         }

      }
      return (
        <nav className={v1}>
           <div className="container">
              <NavBarLogo to={logoPath} />

              <div className={v2} id="bs-example-navbar-collapse-1">
                 <ul className="nav navbar-nav navbar-right">
                    {this.props.isReady ? this.renderNavElement() : null}

                    {avatar}
                 </ul>
              </div>
           </div>
        </nav>
      )
   }
}

export default createContainer(() => {

   const handleUser = Meteor.subscribe("pub_myself");
   let currentUser = null;
   let isReady = false;
   if (handleUser.ready()) {
      isReady = true;
      currentUser = Meteor.user();

   }
   FlowRouter.watchPathChange();
   return {
      currentUser,
      isReady
   };
}, NavBar);