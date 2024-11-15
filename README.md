# CommUnity

Empowering Local Voices for Urban Transformation
---
## VIDEO DEMO 
![Video Title](https://img.youtube.com/vi/Uzjh4iJJjo4/0.jpg)

[Watch our demo on YouTube](https://youtu.be/Uzjh4iJJjo4)


---

## Introduction

**CommUnity** is a platform designed to empower local communities by enabling residents to influence the changes they wish to see in their neighborhoods. By leveraging collective input and AI-driven synthesis, CommUnity bridges the gap between citizens and officials, fostering impactful dialogue and urban improvements.

## Problem Statement

In many cities, residents feel disconnected from the decision-making processes that affect their environment. Current channels for community input are often inaccessible or ineffective, leaving residents' voices unheard.

## Our Solution

CommUnity addresses these issues by providing a centralized platform where:

- **Residents submit ideas and concerns** about their communities.
- **Community members upvote** these submissions, highlighting priority issues.
- **AI synthesizes feedback**, creating persuasive arguments based on popular opinions.
- **Automated emails** are sent to relevant officials, prompting dialogue.
- **Ongoing conversations** allow residents to continue contributing insights and updates.

## Key Features

- **User-Friendly Interface**: Accessible design for intuitive navigation and participation.
- **Dynamic Voting System**: Allows residents to upvote posts, prioritizing pressing concerns.
- **AI-Powered Argument Synthesis**: Uses GPT API to combine community opinions into a cohesive statement.
- **Automated Email Dispatch**: Plans to implement SendGrid API to send synthesized arguments to officials.
- **Response Management**: Tracks and displays responses from officials, promoting transparency.
- **Continuous Engagement**: Provides an ongoing platform for community-official interaction.

## Technical Implementation


### Frontend

- **Technologies**: HTML, CSS, JavaScript
- **Features**:
  - Responsive design compatible with various devices.
  - Real-time feedback and validation for user input.
  - Interactive elements for seamless community engagement.

### Backend

- **Platform**: Firebase
- **Services Used**:
  - **Authentication**: Secure user registration and login.
  - **Firestore Database**: Stores user submissions, votes, and messages.
  - **Cloud Functions**: Custom Flask API hosted on AWS Lambda to allow for stable interaction and use of Open AI API

### AI Integration

- **API Used**: OpenAI GPT API
- **Functionality**:
  - Collects and processes community inputs.
  - Synthesizes opinions into coherent, persuasive arguments.
  - Reflects community priorities through weighted input analysis.

### Email Handling

- **Planned Service**: SendGrid API
- **Capabilities**:
  - Will enable sending formatted emails to officials.
  - Ensures deliverability by adhering to email standards.

## Accomplishments That We're Proud Of

- **Successful GPT API Integration**: Our use of the GPT API to synthesize community opinions into coherent arguments marked a milestone in our project, enabling impactful communication.
- **Interactive Frontend**: Built an intuitive, interactive user interface with responsive design, real-time feedback, and visual appeal that enhances user experience.
- **Real-Time Community Engagement**: Leveraged Firebase to support instant updates, keeping users informed and fostering an active community environment.

## What We Learned

- **Firebase and Cloud Functionality**: We deepened our understanding of Firebase for authentication, database management, and backend logic.
- **AWS Lambda and API Deployment**: This project required us to deploy the GPT API on AWS Lambda, a challenging first for our team that taught us invaluable lessons about serverless architecture.
- **Collaborative Debugging**: Encountered complex frontend-backend integration issues that we resolved through patience, collaboration, and persistent debugging efforts.

## Challenges Faced

- **Connecting Frontend and Backend**:
  - *Challenge*: Encountered multiple errors in connecting frontend and backend components.
  - *Solution*: Persisted through debugging sessions, used Firebase documentation, and implemented rigorous testing.

- **Firebase Setup**:
  - *Challenge*: Initial setup of Firebase services, including authentication and Firestore.
  - *Solution*: Consulted documentation and adjusted configurations as necessary.

- **AWS Lambda Deployment for GPT Integration**:
  - *Challenge*: First-time deployment of GPT API on AWS Lambda, with unforeseen issues.
  - *Solution*: Resolved issues through patience, extensive debugging, and careful API documentation review.

## What's Next for CommUnity

- **SendGrid API Integration**: Implement automated email dispatch to notify officials about pressing community issues.
- **Mobile App Development**: Develop native apps for iOS and Android for easier access.
- **Advanced Analytics**: Provide insights to users on the impact of their submissions.
- **Localization**: Expand language support to reach diverse communities.
- **Social Media Integration**: Allow users to share posts on social platforms to increase visibility.

## Conclusion

CommUnity aims to transform urban development by amplifying the voices of residents. Through meaningful and direct communication with officials, we hope to make community-driven improvements a reality.

## Team

- **Sammy Tran**: Frontend Developer
- **Quinn Tran**: Frontend Developer
- **Jacob Kriss**: Backend Developer / AI Integrator
- **Jordan Ye**: Full Stack Developer
---

