import envConfig from "src/envConfig";

export async function setVideoDataElements(link: string, callback: any) {
  const source = link.split("watch?v=")[1];
  const videoDetails = await getVideoDetails(source, envConfig.YOUTUBE_API);
  if (videoDetails) {
    const newVideoData = {
      element: "video",
      name: videoDetails.title,
      video: videoDetails.videoId,
      thumbnail: videoDetails.thumbnail,
    };
    callback(newVideoData);
  }
}

export async function getVideoDetails(videoId: string, apiKey: string) {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { title, thumbnails } = data.items[0].snippet;
    return {
      title,
      thumbnail: thumbnails.standard.url,
      videoId: `https:\/\/www.youtube.com/embed/${videoId}`,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
