const upperSnakeCaseToSentenceCase = (inputString) => {
  // Replace underscores with spaces
  const stringWithSpaces = inputString.toLowerCase().replace(/_/g, " ");

  // Split the string into words
  const words = stringWithSpaces.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back together with spaces
  const sentenceCaseString = capitalizedWords.join(" ");

  return sentenceCaseString;
};

export default upperSnakeCaseToSentenceCase;
