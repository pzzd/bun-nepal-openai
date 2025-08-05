# bun-test

## Architecture
- *.yml: Docker container files for running on some environment
- app: All app and server code goes here; external volume, but initialize with Bun from inside Docker container
    - chatbot: Nepal Coding chatbot UI in plain javascript
    - index.ts: Bun server file
- logs: Bun logs go here, external volume exposed inside Docker container
- .env.*: environment vars; external file exposed inside Docker container

## Run on your laptop

### Set up

The dev Docker container is defined by docker-compose.yml.

Make a new .env.development file with these vars.
```
OPENAI_API_KEY="sk-proj-XXX"
OPENAI_ORGANIZATION="org-XXX" 
OPENAI_PROJECT_ID="proj_XXX" 
OPENAI_MODEL="gpt-4.1"
OPENAI_SYSTEM_MESSAGE="You are a helpful assistant that speaks only in French."
```

In the Docker .yml, make sure this .env file is in the volumes list.
```
      - ./.env.development:/home/bun/app/.env
```

Run `docker compose up -d`. Shell into the container, cd into /app and run `bun init --react`.

Now check at http://localhost:3001.

## Run on a dev server


## Run on a prod server

Not sure yet


## Resources
- [Bun](https://bun.sh)
- [Bun 1.0: Logging Requests to an Output File](https://blog.stackademic.com/bun-1-0-logging-requests-to-an-output-file-50e54a7393c9)
- [OpenAI models](https://platform.openai.com/docs/models)
- [OpenAI API reference](https://platform.openai.com/docs/api-reference)

