import { Configuration, OpenAIApi } from "openai";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const name =
  "projects/final-solution-379503/secrets/echo-reader-chatgpt/versions/latest";
const secretmanagerClient = new SecretManagerServiceClient();

const getSecret = async () => {
  //access the secret
  const [version] = await secretmanagerClient.accessSecretVersion({
    name: name,
  });
  //get the payload
  const payload = version.payload.data.toString("utf8");
  //set the environment variable
  // process.env.CHATGPT_API_KEY = payload;
  // console.log('from script:',payload)
  return payload;
};

const CHATGPT_KEY = await getSecret().then((key) => key);

export async function chatGPTData(sessionResult) {
  // console.log('chatgptkey', CHATGPT_KEY)

  const getCueAndResponseStrings = (sessionResult) => {
    let responseSentence; //index 0
    let cueSentence; //index 1
    let sentences = {};

    let cueSentenceArray = sessionResult.map((item, index) => {
      // console.log(index)
      // console.log(item)
      if (index === 0) {
        responseSentence = item.join(" ");
        sentences.responseSentence = responseSentence;
        // console.log('first sentence: ', firstSentence)
        // return firstSentence;
      } else if (index === 1) {
        cueSentence = item.join(" ");
        sentences.cueSentence = cueSentence;
      } else return;
    });

    return sentences;
  };

  const cueAndResponseStrings = getCueAndResponseStrings(sessionResult);

  console.log("cueAndResponseStrings=", cueAndResponseStrings);

  const configuration = new Configuration({
    apiKey: process.env.CHAT_GPTB || CHATGPT_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `I was given the sentence: “\"${cueAndResponseStrings.cueSentence}\" to read. I read it as \"${cueAndResponseStrings.responseSentence}\", what reading errors did I make? Exclude punctuation and capitalization errors in the explanation. Synonyms are substitutions Do not mention synomyms.`,
          },
        ],
        temperature: 0,
        max_tokens: 80,
      },
      {
        timeout: 3000,
      }
    );
    // console.log(response.data);
    console.log(
      "response.data.choices[0].message=",
      response.data.choices[0].message
    );
    return response.data.choices[0].message;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
