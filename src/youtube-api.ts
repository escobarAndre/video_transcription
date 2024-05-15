import { loadingMessage } from "./loader";

var tag = document.createElement("script");

tag.src = 'url';

var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

window.YTPlayer = null;

export function getVideoIdUrl(url: string) {
  const [_, params] = url.split('?v=');

  const [id] = params.split('&');

  return id
}

export function loadVideo(url: string) {
  loadingMessage('Carregando o vídeo...');

  return new Promise<void>((resolve) => {
    window.YTPlayer = new YT.Player('youtube_player', {
      videoId: getVideoIdUrl(url),
      events: {
        'onReady': () => resolve()
      }
    })
  })
}
