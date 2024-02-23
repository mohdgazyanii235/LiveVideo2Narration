import React, { useRef, useEffect } from "react";

function LiveFeed() {
    const videoRef = useRef(null);

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const constraints = {
                video: true, // This is to request access to video only.
            };

            // Request access to webcam.
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }).catch((error) => {
                console.error('Error accessing the camera: ', error);
            });
        } else {
            console.error('Your browswer does not support user media');
        }

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return <video className="userFeed" ref={videoRef} autoPlay playsInline />
};

export default LiveFeed;