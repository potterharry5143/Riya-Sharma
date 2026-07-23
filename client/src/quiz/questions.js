// Quiz questions
// Each question has:
//   id        : unique identifier
//   question  : the question text
//   options   : array of 4 answer strings
//   correct   : index of the correct answer (0-based)
//   emoji     : decorative emoji for the question card

const questions = [
  {
    id: 1,
    question: "Riya's favorite OTT show is: 📺",
    options: ['Splitsvilla', 'Lock Upp', 'Both equally', 'None of these'],
    correct: 2,
    emoji: '📺',
  },
  {
    id: 2,
    question: "Riya's favorite hobby is: 🎨",
    options: ['Cooking', 'Aman ki fielding set karna', 'Dancing', 'Painting'],
    correct: 1,
    emoji: '🎨',
  },
  {
    id: 3,
    question: 'Which dish is Riya expert at cooking? 🍳',
    options: ['Baingan ka bharta and pyaaz ke paratha', 'Pasta', 'Egg Omelette', 'Sandwiches'],
    correct: 0,
    emoji: '🍳',
  },
  {
    id: 4,
    question: 'Riya loves more: ❤️',
    options: ['Her brother and sister', 'Her mother', 'His father ( papa paglu )', 'Her friends'],
    correct: 2,
    emoji: '❤️',
  },
  {
    id: 5,
    question: 'Riya hates: 😠',
    options: ['K.R. Mangalam', 'Her old hostel roommate (Riddhi)', 'Both of these', 'None of these'],
    correct: 2,
    emoji: '😠',
  },
  {
    id: 6,
    question: "Riya's favorite dish is: 🍽️",
    options: ['Kaddu', 'Paneer', 'Biryani', 'Chole bhature'],
    correct: 0,
    emoji: '🍽️',
  },
  {
    id: 7,
    question: 'Riya looks more beautiful when she wears: 👗',
    options: ['Saree', 'Suit', 'Lehenga', 'Both saree and lehenga'],
    correct: 3,
    emoji: '👗',
  },
  {
    id: 8,
    question: "Riya's favorite chocolates are: 🍫",
    options: ['Dairy Milk Oreo Silk', 'Amul Chocolate', 'KitKat', 'Dark Fantasy Choco Fills'],
    correct: 0,
    emoji: '🍫',
  },
  {
    id: 9,
    question: "Riya's favorite drink is: 🧋",
    options: ['Cold coffee', 'Juice', 'Tea', 'Smoothie'],
    correct: 0,
    emoji: '🧋',
  },
  {
    id: 10,
    question: "Riya's favorite street food is: 🥟",
    options: ['Momos', 'Spring rolls', 'Noodles', 'Golgappe'],
    correct: 0,
    emoji: '🥟',
  },
];

export default questions;
