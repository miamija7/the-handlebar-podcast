const appleId = '1629208237';
const loadPodcastByAppleId = async (id) => {
    try {
        const res = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.log("ERROR:", e);
    }
}


