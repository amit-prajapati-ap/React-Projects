import {API_KEY} from './data'

export const fetchVideos = async({category, pages}) => {
    let url;
    if(pages) {
        url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&pageToken=${pages}&maxResults=10&regionCode=IN&videoCategoryId=${category ? category : 0}&key=${API_KEY}`
    }
    else {
        url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&pageToken=&maxResults=10&regionCode=IN&videoCategoryId=${category ? category : 0}&key=${API_KEY}`
    }
    
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
}