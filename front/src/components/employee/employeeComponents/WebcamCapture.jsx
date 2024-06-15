// WebcamCapture.js
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({ onCapture }) => {
  const [imageCount, setImageCount] = useState(0);
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImages([...capturedImages, imageSrc]);
    setImageCount(imageCount + 1);
    if (capturedImages.length + 1 === 5) {
      onCapture([...capturedImages, imageSrc]);
    }
  };

  const reset = () => {
    setImageCount(0);
    setCapturedImages([]);
  }

  return (
      <div>
        <div className="my-3">
        <h4>Register Face</h4>
        <p>
          Please follow these instructions to capture your face images:
        </p>
        <ul>
          <li>Position your face within the frame.</li>
          <li>Ensure you are in a well-lit area to avoid shadows.</li>
          <li>Avoid having multiple faces in the frame.</li>
          <li>Click the "Capture photo" button to take your picture.</li>
          <li>You need to take 5 pictures. Once a picture is taken, it cannot be retaken.</li>
          <li>These images will be used to mark your attendance.</li>
        </ul>
        </div>
        <div className="d-flex justify-content-center my-4">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
          />

        </div>
        <div className="d-flex">
        <button type='button' className='btn btn-primary me-4' onClick={capture} disabled={imageCount == 5}>Capture photo</button>
        <button type='button' className='btn btn-primary' onClick={reset} >Reset</button>
        </div>
        <div className='d-flex justify-content-evenly my-5'>
          {capturedImages.map((img, index) => (
            <img key={index} src={img} width={135} height={100} alt={`Capture ${index}`} />
          ))}
        </div>
      </div>
  );
};

export default WebcamCapture;
