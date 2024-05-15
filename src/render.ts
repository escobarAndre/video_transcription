type Timestamp = [number, number];
type Text = string;
interface Chunk {
  timestamp: Timestamp;
  text: Text;
}

function getMinutes(timestamp: [number, number]) {
  let date = new Date();
  date.setTime(timestamp[0] * 1000);

  return date.toISOString().slice(14, 19);
}

window.seek = (event: Event) => {
  const seekTo = event.currentTarget?.dataset?.seekTo;
  window.YTPlayer.seekTo(seekTo);
  window.YTPlayer.playVideo();
};

function groupedText(text: string, timestamp: [number, number]) {
  const words = text.split(" ");
  const groups = [];

  for (let index = 0; index < words.length; index++) {
    if (index % 3 === 0) {
      const group = words.slice(index, index + 3).join(" ");
      groups.push(group);
    }
  }

  return groups
    .map((group, index) => {
      const [initialTime, finalTime] = timestamp;
      const seekTo =
        index === 0
          ? initialTime
          : (finalTime - initialTime) / groups.length - index + initialTime;

      return `<span onclick="seek(event)" data-seek-to="${seekTo}">${group} </span>`;
    })
    .join("");
}

const renderChunk = ({
  timestamp,
  text,
}: {
  timestamp: Timestamp;
  text: Text;
}) => `<div class="chunk flex">
<time class="flex">${getMinutes(timestamp)}</time>
<p>
  ${groupedText(text, timestamp)}
</p>
</div>`;

export function renderTranscription({ chunks }: { chunks: Chunk[] }) {
  const formattedTranscription = chunks.map(renderChunk).join("");

  const element = document.querySelector(".transcription .content");

  element && (element.innerHTML = formattedTranscription);
}
