const { getChannelVideos } = require("usetube");
const fs = require("fs");

const SPACE_CAST_CHANNEL_ID = "UCQ_RmjT0te7n5RLlG381T5A";

/**
 * Gets Space Cast videos from YouTube channel
 * and saves them to videos.json file.
 *
 * This is only run on the postinstall script, making sure that
 * the videos.json file is always up to date on deploy.
 *
 * This is done because it takes a while to get the videos.
 */
const getVideos = async () => {
  const videos = await getChannelVideos(SPACE_CAST_CHANNEL_ID);

  const videosData = videos
    .filter((video) => video.title.includes("Space Cast"))
    .map((video) => ({
      name: video.title,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      image: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    }));

  fs.writeFileSync("src/consts/videos.json", JSON.stringify(videosData));
};

// Properly handle the async function
void getVideos();
