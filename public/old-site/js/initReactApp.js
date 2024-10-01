import React from 'react';
import ReactDOM from 'react-dom';
import ImageUploaderWithPopup from './ImageUploaderWithPopup.js';

document.addEventListener('DOMContentLoaded', function() {
  const rootElement = document.getElementById('react-root');
  const showUploaderButton = document.getElementById('show-uploader-button');

  if (showUploaderButton) {
    showUploaderButton.addEventListener('click', function() {
      if (rootElement) {
        ReactDOM.render(
          React.createElement(ImageUploaderWithPopup),
          rootElement
        );
      }
    });
  }
});