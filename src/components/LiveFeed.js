import React, { useRef, useEffect } from "react";
import fetchNarration from "./OpenAi";
import fetchSpeech from "./ElevenLabs";


function LiveFeed({ onCapture }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(document.createElement("canvas")); // Create a canvas element
    const interval = 100000;

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const constraints = {
                video: true,
            };

            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }).catch((error) => {
                console.error('Error accessing the camera: ', error);
            });

            const takeSnapshot = () => {
                if (videoRef.current) {
                    const video = videoRef.current;
                    const canvas = canvasRef.current;
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    const context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    const imageData = canvas.toDataURL('image/png');
                    // console.log(imageData);
                    // onCapture(imageData);
                    fetchNarration(imageData).then(narration => {
                        onCapture(narration);
                        fetchSpeech(narration);
                    });
                    
                }
            };

            // Set interval to take snapshot every 20 seconds
            const intervalId = setInterval(takeSnapshot, interval);

            return () => {
                clearInterval(intervalId);
                if (videoRef.current && videoRef.current.srcObject) {
                    const tracks = videoRef.current.srcObject.getTracks();
                    tracks.forEach(track => track.stop());
                }
            };
        } else {
            console.error('Your browser does not support user media');
        }
    }, [onCapture]);

    return <video className="userFeed" ref={videoRef} autoPlay playsInline />;
}

export default LiveFeed;
