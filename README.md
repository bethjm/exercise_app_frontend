# Strength Side Kick

Strength side kick is an app for people who want high quality personal training without the high cost of a personal trainer. This app has been an idea in my head for the last 5 years, well before I thought software engineering was in my future. TLDR; Users can log into the app and take a 4 question quiz to get a customized workout plan that matches their needs.


## Access

- Web version: [Strength Sidekick](https://strengthsidekick.netlify.app/)
- Back End: [Back End](https://github.com/bethjm/exercise_app_backend)
- Video Walk Through: [Video Walk Through] (https://www.loom.com/share/5293069034964ab19fcfabaf2758ea25)

## How it works
-**Step ONE** The quiz asks about the experience level, what their goals are (Stability, push up, Balance, etc), what their preferred split is, and where they’re working out (home, gym, on the go). 

-**Step TWO**The algorithm that I created accesses the API that I created to generate a workout that matches their criteria. Users are able to save the workout to access it later. In the saved workouts they will find that there are reps generated for them based on their goals, cues for them to pay attention to, and a video to watch demonstrating the workout.

-**Step THREE**When users start their workout they are given a prompt to answer about their sleep, motivation, and fatigue levels. This plots the points on a. Graph which they can pull up later to help draw corrections between the 3 factors.

## Technology Stack

- **Back End:** The Back End is built with Django and PostgreSQL. The API categorizes exercises by category, subcategory, goals, and more. These data points enable the algorithm to select the most suitable exercises for users.

- **Front End:** The Front End is built using ReactNative and is deployed on the web for easy access. Workouts are stored using AsyncStorage as a cost-saving measure. Future plans may involve saving data to a dedicated database for trend tracking and additional user data points.

***Note:*** My personal education background is in biomechanics and post physical therapy training. The exercises that users get are not your run of the mill deadlift and lunges. The exercises are programmed to help improve mobility, joint pain, breathing, and functional strength.

