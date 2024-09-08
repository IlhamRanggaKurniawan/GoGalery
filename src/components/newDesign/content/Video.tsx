"use client"

import React, { useEffect, useRef } from 'react'

const Video = ({ contentUrl }: { contentUrl: string }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const observer = new IntersectionObserver(
                async (entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting) {
                            try {
                                await videoElement.play();
                            } catch (err) {
                                console.error("Failed to play the video:", err);
                            }
                        } else {
                            videoElement.pause();
                        }
                    }
                },
                {
                    threshold: 0.5,
                }
            );

            observer.observe(videoElement);

            return () => {
                observer.unobserve(videoElement);
            };
        }
    }, [contentUrl]);

    return (
        <video
            ref={videoRef}
            width={1000}
            height={1000}
            loop
            className='rounded-xl w-full max-h-[600px] bg-black'
        >
            <source src={contentUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}

export default Video;
