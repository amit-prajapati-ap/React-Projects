import {API_KEY} from './data'

export const fetchVideos = async({category, pages, setPages}) => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=IN&videoCategoryId=${category ? category : 0}&key=${API_KEY}`
    
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
}