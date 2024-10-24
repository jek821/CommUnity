# CommUnity

**CommUnity** empowers local communities to voice their desires for change. Residents can share ideas and concerns, which are ranked based on upvotes, ensuring that higher-ranked views carry more weight in the AI-driven synthesis of collective opinions. The app identifies the appropriate officials to contact based on the issue at hand and crafts informed correspondence to facilitate meaningful dialogue. Each response is treated as part of an ongoing conversation, allowing community members to continuously shape the discourse with their insights and statements.

## Hackathon Proof of Concept Plan

### Objective
To demonstrate the functionality of CommUnity by simulating the process of gathering community opinions and synthesizing them into a cohesive argument.

### Steps

- **Idea Submission**: One team member posts a community issue or idea within the app.
- **Voting Mechanism**: Implement a simple upvote system that allows team members to express support for the idea. The idea must receive enough upvotes to move forward.
- **Opinion Input**: Team members input varied opinions on the idea, each receiving different amounts of upvotes to simulate diverse community perspectives.
- **Opinion Synthesis**: Use the GPT API to synthesize the collected opinions into a single, cohesive argument, highlighting how higher-ranked views are weighted more heavily.
- **Test Email Correspondence**: Configure the app to send the synthesized argument to a test email address to demonstrate how the email is formatted and prepared for sending.
- **Response Handling**: Simulate receiving a response to the email and show how the app manages and displays the response, allowing for continued dialogue.
- **Demonstration**: Present the entire process live, showcasing each step from idea submission to response handling.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase, (https://firebase.google.com/docs/reference/js)
- **AI Integration**: GPT API for opinion synthesis, (https://platform.openai.com/docs/api-reference/introduction) 
- **Email Handling**: SendGrid, (https://sendgrid.com/en-us/solutions/email-api)
