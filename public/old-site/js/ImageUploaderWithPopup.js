import React, { useState, useRef } from 'react';

const ImageUploaderWithPopup = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null);

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

  //Alright i know this says Sniperscope but this is the part where you change the overlay image that you're combining with the uploaded image
  const addSniperScope = (imageSrc) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const scope = new Image();
      scope.src = '/tribute-maker.png'; //heres where you change that bit.
      scope.onload = () => {
        canvas.width = scope.width;
        canvas.height = scope.height;

        //heres where you adjust the size of whatev
        const screenX = 50;
        const screenY = 50;
        const screenWidth = 900;
        const screenHeight = 900;

        ctx.drawImage(img, screenX, screenY, screenWidth, screenHeight);
        ctx.drawImage(scope, 0, 0);

        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('', scope.width / 2, scope.height - 30);
        
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

  return (
    <div>
      <div style={styles.uploaderContainer}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        /> 
         {/* so this is the button here, change as needed */}
        <button className="create-tribute-button" onClick={handleButtonClick}>
          Create
        </button>
      </div>
      {/* This is the bit that popsup to display the changed image after upload etc */}
      {showPopup && (
        <ImagePopup image={selectedImage} onClose={closePopup} />
      )}
    </div>
  );
};

const ImagePopup = ({ image, onClose }) => {
  return (
    <div style={styles.imagePopupOverlay}>
      <div style={styles.imagePopupContainer}>
        <span style={styles.imagePopupClose} onClick={onClose}>
          &times;
        </span>
        <div style={styles.imagePopupImageContainer}>
          <img
            src={image}
            alt="Uploaded"
            style={styles.imagePopupImage}
          />
        </div>
      </div>
    </div>
  );
};


//fk me yeah this is all the styles that will def need to be changed up to suit your needs
const styles = {
  uploaderContainer: {
    textAlign: 'center',
    overflowY: 'visible',
    maxHeight: '100vh',
    position: 'absolute',
    top: '64vh',
  },
  imagePopupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  imagePopupContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imagePopupClose: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    borderRadius: '50px',
    padding: '10px',
    borderColor: '#333',
    backgroundColor: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    cursor: 'pointer',
    border: 'none',
  },
  imagePopupImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePopupImage: {
    maxWidth: '80%',
    objectFit: 'contain',
  },
};

//just import this to your main file and call it with <ImageUploaderWithPopup /> in the return area. 
export default ImageUploaderWithPopup;