export default (string) => { 
    //Take input search terms and convert into flickr friendly keyword format
    const words = string.split(" "); 
    const keywords = words.join('+');
    return keywords;
}