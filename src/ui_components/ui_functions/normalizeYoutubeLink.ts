function normalizeYoutubeLink(shareLink: string) {
  if (!shareLink.startsWith("https://youtu.be/")) {
    if (shareLink.startsWith(`https://www.youtube.com/`)) {
      return shareLink;
    }
    return null;
  }
  const videoId = shareLink.substring(17).split("?")[0];
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export default normalizeYoutubeLink;
