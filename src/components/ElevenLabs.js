async function fetchSpeech(text) {

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${process.env.REACT_APP_VOICE_ID}`;

    const model_id = "eleven_monolingual_v1";
    const voice_settings = {
        "stability": 0.5,
        "similarity_boost": 0.5,
    }

    const data = { text, model_id, voice_settings };

    fetch(url, {
        method: 'POST',
        headers: {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": `${process.env.REACT_APP_ELEVENLABS_API_KEY}`,
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        response.blob();
      }) // Convert the response to a blob
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob); // Convert blob to base64
        reader.onloadend = function() {
            const base64data = reader.result;
        console.log(base64data); // Print the base64 string to console
        }
      })
      .catch(error => console.error('Error:', error));

}

export default fetchSpeech;