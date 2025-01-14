function generatePassword(length: number): string {
  if (length < 4) {
    throw new Error(
      "Password length should be at least 4 to include all character types.",
    );
  }

  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+[]{}<>?",
  };

  const getRandomChar = (chars: string) =>
    chars[Math.floor(Math.random() * chars.length)];

  // Ensure at least one character from each set
  const initialPassword = [
    getRandomChar(charSets.uppercase),
    getRandomChar(charSets.lowercase),
    getRandomChar(charSets.numbers),
    getRandomChar(charSets.symbols),
  ];

  // Fill remaining password length with random characters from all sets
  const allChars = Object.values(charSets).join("");
  for (let i = initialPassword.length; i < length; i++) {
    initialPassword.push(getRandomChar(allChars));
  }

  // Shuffle to ensure randomness in character placement
  return initialPassword.sort(() => Math.random() - 0.5).join("");
}

export default generatePassword;
