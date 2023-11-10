const createQuiz = [
  {
    questionText: "Are you at a gym or at home?",
    options: ["Home", "Gym", "Traveling"],
    match_api: ["home", "gym", "bodyweight"],
    type: "Location",
  },
  {
    questionText: "What is your fitness experience?",
    options: ["Novice", "Beginner", "Intermediate", "Advanced"],
    match_api: ["novice", "beginner", "intermediate", "advanced"],
    type: "Experience Level",
  },
  {
    questionText: "What do you want to work on?",
    options: ["General Fitness", "Balance", "Posture", "Strength"],
    match_api: ["general_fitness", "balance", "posture", "strength"],
    type: "Goal",
  },
  {
    questionText: "What type of workout do you want to create?",
    options: ["Upper Body", "Lower Body", "Full Body"],
    match_api: ["upperBodySplit", "lowerBodySplit", "fullBodySplit"],
    type: "Split",
  },
  {
    questionText: "Ready to achieve your fitness goals!?",
    options: ["Let's heckin' go!!", "I guess..."],
    match_api: ["Theresnoreasonforthis", "trash"],
    type: "Throw Away",
  },
];

export default createQuiz;
