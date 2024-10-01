import React, { useState, useRef, useEffect } from 'react';
import './ImageUploaderWithPopup.css';

const ImageUploaderWithPopup = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addSniperScope(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
// Call this function when the component mounts
useEffect(() => {
  applyMediaQuery();
  window.addEventListener('resize', applyMediaQuery);
  return () => window.removeEventListener('resize', applyMediaQuery);
}, []);

  const addSniperScope = (imageSrc) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const scope = new Image();
      scope.src = '/images/tribute-maker.png';
      scope.onload = () => {
        // Set canvas size to match the scope image
        canvas.width = scope.width;
        canvas.height = scope.height;
  
        // Calculate scaling to fit the uploaded image within the transparent area
        const transparentAreaHeight = scope.height * 0.5; // Adjust this value as needed
        const scale = transparentAreaHeight / img.height;
  
        // Calculate position to center the uploaded image
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
  
        // Draw the uploaded image centered and scaled
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        // Draw the overlay image
        ctx.drawImage(scope, 0, 0);
  
        setSelectedImage(canvas.toDataURL());
        setShowPopup(true);
      };
    };
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const copyImage = (canvas) => {
    if (canvas) {
      canvas.toBlob((blob) => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {
          alert('Image copied to clipboard!');
        }).catch(err => {
          console.error('Error copying image: ', err);
        });
      });
    }
  };

  return (
    <div>
      <div style={styles.uploaderContainer}>
        {showPopup && (
          <ImagePopup
            image={selectedImage}
            onClose={() => setShowPopup(false)}
            onCopy={copyImage}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        /> 
        <button className="create-tribute-button button" onClick={handleButtonClick}>
          Submit Roastie
        </button>
      </div>
    </div>
  );
};

const ImagePopup = ({ image, onClose, onCopy }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = image;
    }
  }, [image]);

  return (
    <div style={styles.imagePopupOverlay}>
      <div style={styles.imagePopupContainer}>
        <span style={styles.imagePopupClose} onClick={onClose}>
          &times;
        </span>
        <div style={styles.imagePopupImageContainer}>
          <canvas
            ref={canvasRef}
            style={styles.imagePopupImage}
          />
        </div>
        <button style={styles.copyButton} onClick={() => onCopy(canvasRef.current)}>
          Copy Image
        </button>
      </div>
    </div>
  );
};


const styles = {
  
  uploaderContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-150%, -80%)',
    textAlign: 'center',
    zIndex: 1000, // Ensure it's above other elements
    borderRadius: '10px',
  },
  imagePopupOverlay: {
    borderRadius: '20px',
    marginBottom: '5vh',
    top: 0,
    left: 0,
    width: '200%',
    height: '150%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  imagePopupContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '20px',
    width: '80%',  // Adjust this value as needed
    maxWidth: '400px',  // Adjust this value to set a maximum width
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '50%',  // This centers vertically, adjust if needed
    marginTop: '-150px',  // Adjust this value to fine-tune vertical position
  },
  imagePopupImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '10px',
  },
  imagePopupImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  imagePopupClose: {
    alignSelf: 'flex-end',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#333',
    marginBottom: '10px',
  },
  imagePopupContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '20px',
    maxWidth: '90%',
    maxHeight: '90vh',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'auto',
  },
  imagePopupImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    maxWidth: '100%',
    maxHeight: 'calc(80vh - 100px)',
  },
  imagePopupImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  copyButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

const applyMediaQuery = () => {
  if (window.matchMedia('(max-width: 768px)').matches) {
    styles.uploaderContainer = {
      ...styles.uploaderContainer,
      width: '80%',
      padding: '15px',
    };
  }

  if (window.matchMedia('(max-width: 480px)').matches) {
    styles.uploaderContainer = {
margin: 'auto',
      transform: 'translate(-100%, -70%)',
      textAlign: 'center',
      zIndex: 1000, // Ensure it's above other elements
      borderRadius: '10px',
      padding: '10px',
    };
  }
};


export default ImageUploaderWithPopup;