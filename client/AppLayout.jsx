/*
 *created with ♥ by Gianluca Chiap
 */

import React  from 'react';
import NavBar from './ui/components/navbar/NavBar.jsx';
import Footer from './ui/components/footer/Footer.jsx';

export default AppLayout = ({main_content})=> {
  return (
    <div id="s_main_wrapper">
      <NavBar />
      <main>
          {main_content()}
         <Footer/>
      </main>
    </div>
  )
};
