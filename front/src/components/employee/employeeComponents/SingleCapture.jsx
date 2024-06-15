// WebcamCapture.js
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const SingleCapture = ({ onCapture }) => {
    const [imageCount, setImageCount] = useState(0);
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState("");

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        setImageCount(imageCount + 1);
        onCapture(imageSrc);
    };

    const reset = () => {
        setImageCount(0);
        setCapturedImage("");
    }

    return (
        <div>
            <div className="d-flex justify-content-center my-4">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={320}
                    height={240}
                />

            </div>
            <div className="d-flex justify-content-center">
                <button type='button' className='btn btn-primary me-4' onClick={capture} disabled={imageCount == 1}>Capture photo</button>
                <button type='button' className='btn btn-primary' onClick={reset} >Reset</button>
            </div>
            <div className='d-flex justify-content-evenly mt-4 mb-0'>
                {capturedImage && <>
                    <img src={capturedImage} width={135} height={100} />
                </>}
            </div>
        </div>
    );
};

export default SingleCapture;
