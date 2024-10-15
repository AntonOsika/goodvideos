import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const videos = [
    'dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up
    'jNQXAC9IVRw', // Me at the zoo (first YouTube video)
    'kJQP7kiw5Fk', // Luis Fonsi - Despacito ft. Daddy Yankee
    '9bZkp7q19f0', // PSY - GANGNAM STYLE
    'JGwWNGJdvx8', // Ed Sheeran - Shape of You
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setClickCount((prevCount) => prevCount + 1);
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
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 flex gap-2 ${
          isButtonVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Button onClick={handleNextVideo}>Next Video</Button>
        {clickCount >= 3 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Submit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-4">Intentionality</DialogTitle>
                <DialogDescription className="text-lg space-y-4">
                  <p>
                    We believe in human agency and intentionally consuming timeless and human-curated content. Not an algorithm that brainwashes and serves "quick to digest" videos.
                  </p>
                  <p>
                    If you think we missed a video, you can{' '}
                    <a 
                      href="https://github.com/AntonOsika/goodvideos/edit/main/src/pages/Index.tsx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      submit a pull request
                    </a>{' '}
                    to add it.
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Index;
