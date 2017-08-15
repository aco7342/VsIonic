export interface Ihls {
    isSupported();
    version();
    loadSource(url : string);                     
    attachMedia(media : HTMLMediaElement );                       
    detachMedia();
    startLoad(startPosition : number);
    stopLoad();    
}
