import React from 'react';

export const Root = props => (
  <div
    style={{
      display: 'flex'
    }} {...props}/>
);

export const Sidebar = props => (
  <div
    style={{
      width: '25vw',
      background: '#d3d3d3'
    }} {...props}/>
);

export const Body = props => (
  <div
    style={{
      width: '75vw'
    }} {...props}/>
);

export const SidebarItem = props => (
  <div
    style={{
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      padding: '10px'
    }} {...props}/>
);
