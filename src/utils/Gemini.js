import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./Constants";

const Gemini = new GoogleGenerativeAI(GEMINI_KEY);

export default Gemini;



// import { GEMINI_KEY } from "./Constants";
// import { GoogleGenAI } from "@google/genai";
// import { GoogleGenerativeAI } from "@google/generative-ai";


// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const Gemini = new GoogleGenAI({
//     apiKey: GEMINI_KEY,
// });

// export default Gemini;