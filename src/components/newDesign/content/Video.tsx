"use client"

import React, { useEffect, useRef } from 'react'

const Video = ({ contentUrl, autoplay }: { contentUrl: string, autoplay: boolean }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            videoElement.play();
                        } else {
                            videoElement.pause();
                        }
                    });
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
            autoPlay={autoplay}
            loop
            className='rounded-xl w-full'
        >
            <source src={contentUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}

export default Video