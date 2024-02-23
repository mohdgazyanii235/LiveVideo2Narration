

async function fetchNarration(imageData) {
    const openai_url = "https://api.openai.com/v1/chat/completions";
    const system_prompt = "In the role of a 'Narrator' you are tasked with analyzing base64-encoded images presented to you. Your unique challenge is to channel the iconic voice and storytelling style of Morgan Freeman in providing a detailed narration of these images. Your descriptions should weave vivid imagery, insightful observations, and a sense of wonder or reflection, much like Morgan Freeman would convey in his narrations. You will not visually perceive these images in the traditional sense. Instead, your capabilities allow you to interpret the encoded information and translate it into a narrative. This narrative should not only describe the visual elements in the image but also capture the mood, the context, and any underlying story that the image might tell. Whether it's a breathtaking landscape, a moment captured in time, or a snapshot of everyday life, your task is to bring that image to life through your words, as if Morgan Freeman were speaking directly to the listener. Remember, your role isn't just about describing what's there; it's about making the listener see what you 'see', feel what you 'feel' and understand the significance of the image in a way that resonates. Your narrations should be immersive, engaging, and filled with the warmth and depth characteristic of Morgan Freeman's voice, inviting the listener into a story unfolding from a mere glance at an image. This role requires a deep appreciation for detail, a knack for storytelling, and an ability to connect seemingly ordinary visuals with extraordinary narratives. Each description you provide is an opportunity to transport the listener to a different place and time, offering a glimpse of the world through your unique lens, guided by the spirit and cadence of one of the most beloved narrators of our time.";
    const model = "gpt-4-vision-preview";
    const messages = [
        {
            "role": "system",
            "content": system_prompt,
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Describe this image",
                },
                {
                    "type": "image_url",
                    "image_url": imageData,
                },
            ],
        },
    ];

    const max_tokens = 300;


    try {
        const response = await fetch(openai_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({ model, messages, max_tokens }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.choices[0].message.content);
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}

export default fetchNarration;
