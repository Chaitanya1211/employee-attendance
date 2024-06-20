const { parentPort, workerData } = require("worker_threads");
const faceapi = require("face-api.js");
const { Canvas, Image } = require('canvas');
const canvas = require("canvas")
const dir = "E:/attendance/server";
// load model function
async function LoadModels() {
    // Load the models
    console.log("loading model");
    await faceapi.nets.faceRecognitionNet.loadFromDisk(dir + "/faceApiModel");
    await faceapi.nets.faceLandmark68Net.loadFromDisk(dir + "/faceApiModel");
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(dir + "/faceApiModel");
}

const processImage = async (image) => {
    await LoadModels();
    const img = await canvas.loadImage(image);
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    if (!detections) {
        throw new Error("Face not detected")
    }
    const faceDescriptor = detections.descriptor;
    return Array.from(faceDescriptor);
}

processImage(workerData.image)
.then((result) => parentPort.postMessage({ descriptor: result }))
.catch((error) => parentPort.postMessage({ error: error.message }))