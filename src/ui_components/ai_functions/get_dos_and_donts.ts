import OpenAI from "openai";
import envConfig from "src/envConfig";
const openai = new OpenAI({
  apiKey: envConfig.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function getDosAndDonts(
  designSystemComponentName: string,
  documentationTitle: string
) {
  const response = await getData(designSystemComponentName, documentationTitle);
  if (response) {
    return JSON.parse(response);
  } else {
    console.log("No response");
  }
}
async function getData(
  designSystemComponentName: string,
  documentationTitle: string
) {
  const prompt = `
  You are a helpful assistant that helps users to create a documentation for their design system.
  You will be given a name of a design system component which is ${designSystemComponentName} and a title of the documentation which is ${documentationTitle}. Use info from Material UI and Carbon design system as a reference.
  Try to understand the component and provide a list of dos and donts for the component.
  Return the list as json that contains 5 do properties and 5 dont properties. Don't be verbose, no additional text,don't put it inside of markdown code block, just return stringified JSON`;

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
