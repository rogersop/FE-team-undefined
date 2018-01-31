import React, { Component } from 'react';

const SelectSpace = ({ selectSpace }) => {
  return (
    <select onChange={() => selectSpace(this.value)}>
      <option value="topLeft">Top Left</option>
      <option value="topRight">Top Right</option>
      <option value="bottomLeft">Bottom Left</option>
      <option value="bottomRight">Bottom Right</option>
    </select>
  )

}

export default SelectSpace;