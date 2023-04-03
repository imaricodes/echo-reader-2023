import { Configuration, OpenAIApi } from 'openai';

export async function chatGPTData (sessionResult) {

    const getCueAndResponsStrings = (sessionResult) => {
        let responseSentence; //index 0
        let cueSentence //index 1
        let sentences = {}
         
          let cueSentenceArray = sessionResult.map((item, index) => {
            // console.log(index)
            // console.log(item)
            if (index ===0) {
              responseSentence = item.join(" ");
              sentences.responseSentence = responseSentence;
              // console.log('first sentence: ', firstSentence)
              // return firstSentence;
            } else if (index ===1) {
              cueSentence = item.join(" ");
              sentences.cueSentence = cueSentence;
            }
            else return
          });
         
         return sentences;
       };

    const cueAndResponseStrings = getCueAndResponsStrings(sessionResult);

    console.log("cueAndResponseStrings=",cueAndResponseStrings);








    const configuration = new Configuration({
        apiKey: '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',
      });

      const openai = new OpenAIApi(configuration);


      try {
        const response = await openai.createChatCompletion(
            {
                model: "gpt-3.5-turbo",
                messages: [{
                    "role": "user", 
                    "content": `Given, \"${cueAndResponseStrings.cueSentence}\", the student read \"${cueAndResponseStrings.responseSentence}\". List the reading errors if the student made any. `
                    }],
                temperature: 0,
                max_tokens: 46,
            },
            {
                timeout:3000
            }
        );
        // console.log(response.data);
        console.log("response.data.choices[0].message=",response.data.choices[0].message);
        return response.data.choices[0].message
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }


    
}