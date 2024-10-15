import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Button } from "@/components/ui/button";

const Index = () => {
  const videos = [
    
     // To submit a video:
     // Copy one line, put the last part of the youtube URL between the ' ', and update the title after the //

    'dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up
    'jNQXAC9IVRw', // Me at the zoo (first YouTube video)
    'kJQP7kiw5Fk', // Luis Fonsi - Despacito ft. Daddy Yankee
    '9bZkp7q19f0', // PSY - GANGNAM STYLE
    'JGwWNGJdvx8', // Ed Sheeran - Shape of You
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handleMouseMove = () => {
    setIsButtonVisible(true);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => setIsButtonVisible(false), 3000);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div className="absolute inset-0">
        <YouTube
          videoId={videos[currentVideoIndex]}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
            },
          }}
          className="w-full h-full"
        />
      </div>
      <div 
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
          isButtonVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Button onClick={handleNextVideo}>Next Video</Button>
      </div>
    </div>
  );
};

export default Index;
