let correctSound: HTMLAudioElement | null = null
let incorrectSound: HTMLAudioElement | null = null
let completeSound: HTMLAudioElement | null = null

export function playSound(type: "correct" | "incorrect" | "complete") {
  if (typeof window === "undefined") return

  if (!correctSound) {
    correctSound = new Audio("/sounds/correct.mp3")
  }
  if (!incorrectSound) {
    incorrectSound = new Audio("/sounds/incorrect.mp3")
  }
  if (!completeSound) {
    completeSound = new Audio("/sounds/complete.mp3")
  }

  const sound = type === "correct" 
    ? correctSound 
    : type === "incorrect" 
      ? incorrectSound 
      : completeSound

  if (sound) {
    sound.currentTime = 0
    sound.play().catch(() => {
      // Ignore errors from browsers blocking autoplay
    })
  }
} 