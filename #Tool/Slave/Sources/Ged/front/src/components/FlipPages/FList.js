import React from 'react';


const FList = ({ children }) => children;

export const Item = ({ children }) => (
  <div style={{flexDirection: 'row', marginBottom: 5}}>
    <div style={{width: 10, fontSize: 10,}}>•</div>
    <div style={{flex: 1, fontSize: 10,}}>{children}</div>
  </div>
);

export default FList;
