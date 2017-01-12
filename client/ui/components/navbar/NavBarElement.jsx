
 /*
*created with ♥ by Gianluca Chiap
*/

import React from 'react';

export default NavBarElement = ({to,name})=> {
  return (
    <li>
      <a href={to}>{name}</a>
    </li>
  )
};