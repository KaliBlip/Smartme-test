import type { Question } from "./types"

// Mock data for academic quizzes
const mockQuestions: Record<string, Question[]> = {
  "jhs-mathematics": [
    {
      question: "What is the value of x in the equation 2x + 5 = 15?",
      options: ["3", "5", "7", "10"],
      correctAnswer: "5",
    },
    {
      question: "What is the area of a rectangle with length 8 cm and width 4 cm?",
      options: ["12 cm²", "16 cm²", "24 cm²", "32 cm²"],
      correctAnswer: "32 cm²",
    },
    {
      question: "If a triangle has angles measuring 30° and 60°, what is the measure of the third angle?",
      options: ["30°", "60°", "90°", "120°"],
      correctAnswer: "90°",
    },
    {
      question: "What is the perimeter of a square with sides of length 7 cm?",
      options: ["14 cm", "21 cm", "28 cm", "49 cm"],
      correctAnswer: "28 cm",
    },
    {
      question: "Which of the following is not a prime number?",
      options: ["11", "13", "15", "17"],
      correctAnswer: "15",
    },
  ],
  "jhs-science": [
    {
      question: "Which of the following is NOT a state of matter?",
      options: ["Solid", "Liquid", "Gas", "Energy"],
      correctAnswer: "Energy",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "NaCl"],
      correctAnswer: "H2O",
    },
    {
      question: "Which of the following is an example of a physical change?",
      options: ["Rusting of iron", "Burning of paper", "Freezing water", "Digesting food"],
      correctAnswer: "Freezing water",
    },
    {
      question: "What is the main function of the respiratory system?",
      options: ["To pump blood", "To digest food", "To exchange gases", "To filter waste"],
      correctAnswer: "To exchange gases",
    },
    {
      question: "What is the closest planet to the sun?",
      options: ["Venus", "Earth", "Mars", "Mercury"],
      correctAnswer: "Mercury",
    },
  ],
  "jhs-english": [
    {
      question: "Which of the following is a proper noun?",
      options: ["Car", "Tree", "Paris", "Book"],
      correctAnswer: "Paris",
    },
    {
      question: "Which sentence uses correct punctuation?",
      options: [
        "The movie was great I loved it.",
        "The movie was great, I loved it.",
        "The movie was great; I loved it.",
        "The movie was great: I loved it.",
      ],
      correctAnswer: "The movie was great; I loved it.",
    },
    {
      question: "Which word is an adverb in the sentence: 'She sang beautifully at the concert.'?",
      options: ["She", "sang", "beautifully", "concert"],
      correctAnswer: "beautifully",
    },
    {
      question: "What is the past tense of 'swim'?",
      options: ["Swimmed", "Swam", "Swimming", "Swum"],
      correctAnswer: "Swam",
    },
    {
      question: "Which of these is a compound sentence?",
      options: [
        "The cat slept on the couch.",
        "I ate dinner and watched TV.",
        "After finishing homework, I went to bed.",
        "Running quickly, the boy caught the bus.",
      ],
      correctAnswer: "I ate dinner and watched TV.",
    },
  ],
  "jhs-social-studies": [
    {
      question: "What are the four cardinal directions?",
      options: [
        "Up, down, left, right",
        "North, south, east, west",
        "Front, back, left, right",
        "Vertical, horizontal, diagonal, curved",
      ],
      correctAnswer: "North, south, east, west",
    },
    {
      question: "Which of these is NOT a branch of government in most democracies?",
      options: ["Executive", "Legislative", "Judicial", "Corporate"],
      correctAnswer: "Corporate",
    },
    {
      question: "What is a renewable resource?",
      options: ["Coal", "Natural gas", "Solar energy", "Oil"],
      correctAnswer: "Solar energy",
    },
    {
      question: "Which continent is the largest by land area?",
      options: ["North America", "Africa", "Europe", "Asia"],
      correctAnswer: "Asia",
    },
    {
      question: "What do we call a person who studies history?",
      options: ["Geologist", "Archaeologist", "Historian", "Anthropologist"],
      correctAnswer: "Historian",
    },
  ],
  "shs-mathematics": [
    {
      question: "What is the derivative of f(x) = 3x² + 2x - 5?",
      options: ["f'(x) = 3x + 2", "f'(x) = 6x + 2", "f'(x) = 6x² + 2", "f'(x) = 6x - 5"],
      correctAnswer: "f'(x) = 6x + 2",
    },
    {
      question: "What is the solution to the equation log₂(x) = 3?",
      options: ["x = 3", "x = 6", "x = 8", "x = 16"],
      correctAnswer: "x = 8",
    },
    {
      question: "In a right triangle, if one angle is 30°, what is the other acute angle?",
      options: ["30°", "45°", "60°", "90°"],
      correctAnswer: "60°",
    },
    {
      question: "What is the value of sin(90°)?",
      options: ["0", "1", "-1", "Undefined"],
      correctAnswer: "1",
    },
    {
      question: "What is the domain of the function f(x) = 1/(x-2)?",
      options: ["All real numbers", "All real numbers except x = 0", "All real numbers except x = 2", "All positive numbers"],
      correctAnswer: "All real numbers except x = 2",
    },
  ],
  "shs-science": [
    {
      question: "What is Newton's Second Law of Motion?",
      options: [
        "F = ma",
        "For every action, there is an equal and opposite reaction",
        "An object at rest stays at rest",
        "Energy cannot be created or destroyed",
      ],
      correctAnswer: "F = ma",
    },
    {
      question: "Which of the following is the correct formula for photosynthesis?",
      options: [
        "6CO2 + 6H2O → C6H12O6 + 6O2",
        "C6H12O6 + 6O2 → 6CO2 + 6H2O",
        "6CO2 + 12H2O → C6H12O6 + 6O2 + 6H2O",
        "C6H12O6 → 6CO2 + 6H2O",
      ],
      correctAnswer: "6CO2 + 6H2O → C6H12O6 + 6O2",
    },
    {
      question: "What is the pH of a neutral solution?",
      options: ["0", "7", "10", "14"],
      correctAnswer: "7",
    },
    {
      question: "Which of the following is NOT a type of chemical bond?",
      options: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Gravitational bond"],
      correctAnswer: "Gravitational bond",
    },
    {
      question: "What is the atomic number of carbon?",
      options: ["2", "6", "12", "14"],
      correctAnswer: "6",
    },
  ],
  "shs-english": [
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
      correctAnswer: "William Shakespeare",
    },
    {
      question: "Which literary device involves comparing two unlike things using 'like' or 'as'?",
      options: ["Metaphor", "Simile", "Personification", "Alliteration"],
      correctAnswer: "Simile",
    },
    {
      question: "What is the main conflict type in 'The Great Gatsby'?",
      options: [
        "Man vs. Man",
        "Man vs. Nature",
        "Man vs. Society",
        "Man vs. Self",
      ],
      correctAnswer: "Man vs. Society",
    },
    {
      question: "What is the term for a word that is opposite in meaning to another word?",
      options: ["Synonym", "Antonym", "Homonym", "Acronym"],
      correctAnswer: "Antonym",
    },
    {
      question: "Which of these is an example of irony?",
      options: [
        "A fire station burning down",
        "Rain falling during a funeral",
        "A student failing an exam",
        "A car getting a flat tire",
      ],
      correctAnswer: "A fire station burning down",
    },
  ],
  "shs-history": [
    {
      question: "In which year did World War II end?",
      options: ["1943", "1945", "1947", "1950"],
      correctAnswer: "1945",
    },
    {
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
      correctAnswer: "George Washington",
    },
    {
      question: "What event marked the beginning of World War I?",
      options: [
        "The invasion of Poland",
        "The assassination of Archduke Franz Ferdinand",
        "The bombing of Pearl Harbor",
        "The Russian Revolution",
      ],
      correctAnswer: "The assassination of Archduke Franz Ferdinand",
    },
    {
      question: "Which empire was ruled by Genghis Khan?",
      options: ["Ottoman Empire", "Mongol Empire", "Roman Empire", "Byzantine Empire"],
      correctAnswer: "Mongol Empire",
    },
    {
      question: "The Renaissance period began in which country?",
      options: ["France", "England", "Italy", "Germany"],
      correctAnswer: "Italy",
    },
  ],
  "shs-languages": [
    {
      question: "Which language has the most native speakers in the world?",
      options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
      correctAnswer: "Mandarin Chinese",
    },
    {
      question: "What is the most common verb tense in French?",
      options: ["Present", "Past", "Future", "Conditional"],
      correctAnswer: "Present",
    },
    {
      question: "Which language uses the Cyrillic alphabet?",
      options: ["Greek", "Arabic", "Russian", "Hebrew"],
      correctAnswer: "Russian",
    },
    {
      question: "In Spanish, which of the following is feminine?",
      options: ["El libro (book)", "El coche (car)", "La mesa (table)", "El sol (sun)"],
      correctAnswer: "La mesa (table)",
    },
    {
      question: "What is the meaning of 'Guten Tag' in German?",
      options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
      correctAnswer: "Good afternoon",
    },
  ],
  "shs-arts": [
    {
      question: "Who painted 'Starry Night'?",
      options: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh", "Leonardo da Vinci"],
      correctAnswer: "Vincent van Gogh",
    },
    {
      question: "Which of these is a Renaissance artist?",
      options: ["Andy Warhol", "Salvador Dalí", "Michelangelo", "Jackson Pollock"],
      correctAnswer: "Michelangelo",
    },
    {
      question: "What art movement is characterized by dream-like scenes and illogical juxtapositions?",
      options: ["Impressionism", "Cubism", "Surrealism", "Pop Art"],
      correctAnswer: "Surrealism",
    },
    {
      question: "In music, what does 'fortissimo' mean?",
      options: ["Very soft", "Moderately loud", "Very loud", "Gradually getting louder"],
      correctAnswer: "Very loud",
    },
    {
      question: "Which musical instrument is known as the 'King of Instruments'?",
      options: ["Piano", "Violin", "Organ", "Trumpet"],
      correctAnswer: "Organ",
    },
  ],
}

// Function to generate questions
export async function generateQuestions(category: string, difficulty: string, count: number): Promise<Question[]> {
  try {
    // In a production app, this would fetch from a database or API based on subject
    const availableQuestions = mockQuestions[category] || mockQuestions["jhs-mathematics"]

    // Shuffle and return the requested number of questions
    return shuffleArray(availableQuestions).slice(0, count)
  } catch (error) {
    console.error("Error generating questions:", error)
    // Fallback to mock data
    const availableQuestions = mockQuestions[category] || mockQuestions["jhs-mathematics"]
    return shuffleArray(availableQuestions).slice(0, count)
  }
}

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

