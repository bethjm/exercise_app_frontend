<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StrengthSidekick App</title>
</head>

<body>

  <h1>StrengthSidekick App</h1>

  <p>StrengthSidekick is a fitness application that leverages an algorithm rooted in biomechanics to generate tailor-made workouts based on individual goals, experience levels, and available equipment. The app mimics the expertise of a personal trainer to create workouts that prioritize both effectiveness and efficiency.</p>

  <h4>Click <a href="https://github.com/bethjm/exercise_app_backend">HERE</a> for the back end repo</h4>

  <h2>Technologies Used</h2>

  <ul>
    <li>React Native</li>
    <li>@react-navigation/native</li>
    <li>@react-navigation/native-stack</li>
    <li>AsyncStorage</li>
    <li>React Hooks</li>
  </ul>

  <h2>Features</h2>

  <h3>Workout Generation</h3>

  <p>The app utilizes a sophisticated algorithm to generate workouts based on the user's preferred split (Full Body, Upper Body, or Lower Body), fitness goals, experience level, and available equipment. The generated workouts include a warm-up routine and a set of exercises tailored to the user's preferences.</p>

  <h3>Customizable Warm-up</h3>

  <p>StrengthSidekick includes a customizable warm-up routine that adapts to the user's fitness level and goals. The warm-up exercises are generated dynamically to ensure an effective and personalized warm-up session.</p>

  <h3>Save and View Workouts</h3>

  <p>Users can save their generated workouts with a custom name for future reference. The app stores these workouts using AsyncStorage, allowing users to view and revisit their saved workouts at any time.</p>

  <h3>Note-taking Feature</h3>

  <p>The app includes a note-taking feature that allows users to jot down important information, reflections, or additional details related to their fitness journey. Notes are stored locally using AsyncStorage.</p>

  <h2>How to Run</h2>

  <ol>
    <li>Clone the repository.</li>
    <li>Install dependencies using <code>npm install</code>.</li>
    <li>Run the app using <code>npm start</code> or <code>expo start</code>.</li>
  </ol>

  <p>Note: Ensure you have Node.js and Expo CLI installed on your machine before running the app.</p>

  <p>Feel free to explore and enhance the app to suit your fitness needs! If you have any questions or suggestions, please don't hesitate to reach out.</p>

  <p>Happy exercising! 🏋️‍♂️💪</p>

</body>

</html>
