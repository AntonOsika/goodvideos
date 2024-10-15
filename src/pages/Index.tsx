import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
    } else {
      alert('Invalid YouTube URL');
    }
  };

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">YouTube Player</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="flex-grow"
          />
          <Button type="submit">Play</Button>
        </div>
      </form>
      {videoId && (
        <div className="w-full max-w-3xl aspect-video">
          <YouTube
            videoId={videoId}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Index;