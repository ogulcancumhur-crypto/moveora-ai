import OpenAI from "openai";

export default async function handler(req,res){

 const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
 });

 const {lifestyle} = req.body;

 const ai = await openai.responses.create({
  model:"gpt-4.1-mini",
  input:`Give smart travel ideas for: ${lifestyle}`
 });

 res.status(200).json({reply: ai.output_text});
}
