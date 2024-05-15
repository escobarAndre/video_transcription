import axios from 'axios'
import { startLoading, stopLoading, loadingMessage } from './loader';
import { getVideoIdUrl, loadVideo } from './youtube-api';
import { renderTranscription } from './render';

const form = document.querySelector('#form')

form?.addEventListener('submit', async (event: Event) => {
  event.preventDefault();
  
  try {
    loadingMessage('Iniciando a aplicação...');
    startLoading();

    const formData = new FormData(form as HTMLFormElement);
    const url: string = formData.get('url') as string;
    
    await loadVideo(url);

    loadingMessage('Baixando e convertendo o vídeo...');
    
    const { data } = await axios.get('http://localhost:3333/audio?videoId=' + getVideoIdUrl(url))

    renderTranscription(data);
  } catch (error) {
    console.error('[SUBMIT_ERROR]', error)
  } finally {
    stopLoading();
  }
})