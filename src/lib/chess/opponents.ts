export interface ChessOpponent {
  id: string
  name: string
  emoji: string
  title: string
  description: string
  skillLevel: number  // Stockfish 0-20
  depth: number       // search depth
  rating: number      // approximate Elo
  ageRange: string    // recommended age
  personality: string // for messages
  winMessage: string
  loseMessage: string
  drawMessage: string
}

export const opponents: ChessOpponent[] = [
  {
    id: 'peanut',
    name: 'Peanut',
    emoji: '🐣',
    title: 'The Tiny Chick',
    description: 'Just learning the pieces! Peanut is your perfect first opponent.',
    skillLevel: 0,
    depth: 1,
    rating: 300,
    ageRange: '5–7',
    personality: 'sweet and clumsy',
    winMessage: "Yay, you beat me! 🎉 I'm still learning — wanna play again?",
    loseMessage: "Oops, I got lucky! You almost had me — try one more time!",
    drawMessage: "Whoa, we tied! That means you're getting really good! 🌟",
  },
  {
    id: 'bolt',
    name: 'Bolt',
    emoji: '🤖',
    title: 'The Friendly Robot',
    description: 'A cheerful robot who loves chess. Fast but makes some silly mistakes!',
    skillLevel: 3,
    depth: 3,
    rating: 600,
    ageRange: '7–9',
    personality: 'enthusiastic and encouraging',
    winMessage: "BEEP BOOP! You outsmarted me! 🤖 Great moves, champion!",
    loseMessage: "Good game! My circuits got lucky. I bet you'll win next time! ⚡",
    drawMessage: "A draw! We're evenly matched — my sensors say you're improving! 📈",
  },
  {
    id: 'sly',
    name: 'Sly',
    emoji: '🦊',
    title: 'The Clever Fox',
    description: 'Tricky but fair — Sly will keep you on your toes!',
    skillLevel: 6,
    depth: 5,
    rating: 900,
    ageRange: '9–11',
    personality: 'playful and witty',
    winMessage: "Well played! You saw through all my tricks! 🦊✨ Impressive!",
    loseMessage: "Hehe, I was extra sneaky today! But you're getting sharper — keep it up!",
    drawMessage: "A draw with the fox? That takes real skill! We should play again! 🎯",
  },
  {
    id: 'captain-castle',
    name: 'Captain Castle',
    emoji: '🏰',
    title: 'The Fortress Defender',
    description: "Defends like a fortress. You'll need a strong plan to break through!",
    skillLevel: 10,
    depth: 8,
    rating: 1200,
    ageRange: '11–13',
    personality: 'steady and respectful',
    winMessage: "You breached my defenses! 🏰 That was a brilliant attack — well done!",
    loseMessage: "My walls held this time. Great effort though — study your openings and come back stronger!",
    drawMessage: "A draw against the Captain! You're becoming a real strategist! 🛡️",
  },
  {
    id: 'knight-rider',
    name: 'Knight Rider',
    emoji: '⚔️',
    title: 'The Relentless Attacker',
    description: 'Attacks from every angle. Stay alert and defend wisely!',
    skillLevel: 14,
    depth: 12,
    rating: 1500,
    ageRange: '13–15',
    personality: 'fierce but respectful',
    winMessage: "Incredible! You survived my onslaught and fought back! ⚔️ True warrior spirit!",
    loseMessage: "A tough battle! You defended well — with a little more practice, you'll beat me!",
    drawMessage: "A draw against Knight Rider? You're fearless! Respect! 🗡️",
  },
  {
    id: 'grandmaster',
    name: 'The Grandmaster',
    emoji: '👑',
    title: 'The Chess Master',
    description: 'Nearly unbeatable. Only the bravest challengers dare face The Grandmaster!',
    skillLevel: 18,
    depth: 16,
    rating: 1800,
    ageRange: '15–17',
    personality: 'wise and encouraging',
    winMessage: "Remarkable! You defeated The Grandmaster! 👑🏆 You have true talent!",
    loseMessage: "A valiant effort! Very few can challenge me this well. Keep studying and you'll prevail!",
    drawMessage: "A draw with The Grandmaster! That's a badge of honor — you're one of the best! 🌟",
  },
]

export function getOpponentById(id: string): ChessOpponent | undefined {
  return opponents.find((o) => o.id === id)
}
