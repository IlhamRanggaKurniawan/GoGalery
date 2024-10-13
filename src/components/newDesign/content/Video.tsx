"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeOff, Play } from "lucide-react";

const Video = ({ contentUrl }: { contentUrl: string }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPaused, setIsPaused] = useState(true); // State untuk pause/play

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    const toggleMute = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVideoClick = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            if (videoElement.paused) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            videoElement.muted = isMuted;

            // Event listeners untuk play dan pause
            const handlePlay = () => setIsPaused(false);
            const handlePause = () => setIsPaused(true);

            videoElement.addEventListener("play", handlePlay);
            videoElement.addEventListener("pause", handlePause);

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

            const handleVisibilityChange = () => {
                if (document.hidden) {
                    videoElement.pause();
                } else if (videoElement) {
                    videoElement.play();
                }
            };

            document.addEventListener("visibilitychange", handleVisibilityChange);

            return () => {
                observer.unobserve(videoElement);
                document.removeEventListener("visibilitychange", handleVisibilityChange);
                videoElement.removeEventListener("play", handlePlay);
                videoElement.removeEventListener("pause", handlePause);
            };
        }
    }, [contentUrl, isMuted]);

    return (
        <div className="relative">
            <video
                ref={videoRef}
                width={1000}
                height={1000}
                loop
                onClick={handleVideoClick}
                onContextMenu={handleContextMenu}
                className="rounded-xl w-full max-h-[600px] bg-black cursor-pointer"
            >
                <source src={contentUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {isPaused && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer rounded-xl"
                    onClick={handleVideoClick}
                >
                    <Play className="text-white w-16 h-16 opacity-75 hover:opacity-100 transition-opacity duration-200" fill="white"/>
                </div>
            )}

            <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 bg-gray-700 opacity-60 text-white p-1 rounded-full focus:outline-none"
            >
                {isMuted ? (
                    <VolumeOff size={25} />
                ) : (
                    <Volume2 size={25} />
                )}
            </button>
        </div>
    );
};

export default Video;
