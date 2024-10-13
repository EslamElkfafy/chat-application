import React from 'react';
import ReactDOM from 'react-dom';

const PortalPrivateModal = ({ children, containerId }: {children: any, containerId: any}) => {
  const container = document.getElementById(containerId);

  // Check if the container exists in the DOM
  if (!container) {
    console.error(`Container with id "${containerId}" not found in the DOM.`);
    return null;
  }

  return ReactDOM.createPortal(children, container);
};

export default PortalPrivateModal;
