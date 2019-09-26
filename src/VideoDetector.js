export const videoDetector = url => {
  let youtubeLink = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
  let match = url.match(youtubeLink);
  return match;
};
