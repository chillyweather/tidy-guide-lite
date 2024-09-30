import OpenAI from "openai";
import envConfig from "src/envConfig";
const openai = new OpenAI({
  apiKey: envConfig.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getTextSectionRequest(
  designSystemComponentName: string,
  documentationTitle: string,
  inputText: string,
  inputTitle: string
) {
  const response = await getData(
    designSystemComponentName,
    documentationTitle,
    inputText,
    inputTitle
  );
  if (response) {
    return response;
  } else {
    console.log("No response");
  }
}
async function getData(
  designSystemComponentName: string,
  documentationTitle: string,
  inputText: string,
  inputTitle: string
) {
  const prompt = `You are helping to generate documentation for a design system component. The component we are documenting is called ${designSystemComponentName} and the documentation title is ${documentationTitle}. 

If the inputTitle is "Paragraph" and the inputText is empty, return component description text. 

Otherwise, use the input provided as follows:
1. Input Title: ${inputTitle}
2. Input Text: ${inputText}

Process the inputText and return a response that can be used in the documentation of this component.
Return only the main response text in plain format. Do not include any titles, subtitles, or markdown markup in the response.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  return completion.choices[0].message.content;
}
