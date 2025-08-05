import { serve } from "bun";
import chatbot from "./chatbot/index.html";
import BunLogger from "./logger.js";
import OpenAI from "openai";

const logger = BunLogger;

const server = serve({
  port: 3000,
//   fetch(req) {
//     return new Response("Bun!");
//   },

  routes: {
    // Serve index.html for all unmatched routes.
     "/*": chatbot,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      }
    },

    "/api/ask-nobody": {
        async POST(req) {
          console.log("Incoming call to /api/ask-nobody");
          const body = await req.json();
          const modelReply = "This is a mock response.";
          logger.log(`{ "userMessage": "${body.userMessage}", "model": "nobody", "modelReply": "${modelReply}" }`);

          return Response.json({
            message: modelReply,
            error: null
          });
        }
    },

    "/api/ask-openai": {
      async POST(req) {
        console.log("Incoming call to /api/ask-openai");

        const body = await req.json();
        const userMessage = body.userMessage;
        //const userMessage = "Write a one-sentence bedtime story about a unicorn.";
        var modelReply;

        const openai = new OpenAI({
          apiKey: Bun.env.OPENAI_API_KEY,
          organization: Bun.env.OPENAI_ORGANIZATION,
          projectId: Bun.env.OPENAI_PROJECT_ID,
        });

        const client = new OpenAI();
        try {
          const response = await client.responses.create({
              model: Bun.env.OPENAI_MODEL, // see https://platform.openai.com/docs/models
              input: [
                {"role": "system", "content": Bun.env.OPENAI_SYSTEM_MESSAGE},
                {"role": "user", "content": userMessage},
              ]
          });
          console.log(response.output_text);
          modelReply = response.output_text
        } catch (error) {
          console.error("Error calling OpenAI API:", error);
          modelReply = `Error: ${error}`;
        }



        logger.log(`{ "userMessage": "${userMessage}", "model": "openai", "modelReply": "${modelReply}" }`);

        return Response.json({
          message: modelReply,
          error: null
        });
      }
      
    },
  },




  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },

});

console.log(`Listening on http://localhost:${server.port} ...`);