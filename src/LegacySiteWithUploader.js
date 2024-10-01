import React from 'react';
import ImageUploaderWithPopup from './ImageUploaderWithPopup';

const LegacySiteWithUploader = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <iframe
        src="/old-site/index.html"
        title="Legacy Website"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
   <div style={{
        position: 'absolute',
        // Adjust these values to move the button
        top: '80%',  // Change this value to move up/down
        left: '53.5%', // Change this value to move left/right
        transform: 'translate(-50%, -50%)', // This centers the button on its position
        zIndex: 1000,
      }}>
        <ImageUploaderWithPopup />
      </div>
    </div>
  );
};

export default LegacySiteWithUploader;