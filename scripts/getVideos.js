const { getChannelVideos } = require("usetube");
const fs = require("fs");

const getVideos = async () => {
  const videos = await getChannelVideos("UCQ_RmjT0te7n5RLlG381T5A");

  const videosData = videos.map((video) => ({
    name: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    image: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
  }));

  fs.writeFileSync("src/app/consts/videos.json", JSON.stringify(videosData));
};

getVideos();
