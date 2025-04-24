import { CardStatus } from './cardstatus';
interface FlashCard {
  getQuestion: () => string;
  getAnswer: () => string;

  /**
   * Checks whether the provided response matches the target. Ignores mismatches in capitalization and any extra leading or trailing whitespace.
   * @param response The user-provided response.
   * @return {@code true} if the definition matches the response.
   */
  checkSuccess: (response: string) => boolean;

  toString: () => string;

  equals: (otherCard: FlashCard) => boolean;
}

/**
 * Creates a new flashcard with a question and an answer.
 * @param question The question on the flashcard.
 * @param answer The answer to the question.
 * @returns A new FlashCard instance.
 */
function newFlashCard(question: string, answer: string): FlashCard {
  return {
    getQuestion: function (): string { return question; },
    getAnswer: function (): string { return answer; },
    checkSuccess: function (response: string): boolean {
      return answer.trim().toLowerCase() === response.trim().toLowerCase();
    },
    toString: function (): string {
      return `FlashCard[${question}, ${answer}]`;
    },
    equals: function (otherCard: FlashCard): boolean {
      return (
        otherCard.getAnswer() === answer && otherCard.getQuestion() === question
      );
    },
  };
}

function recentMistakesFirstSorter(cards: CardStatus[]): CardStatus[] {
  return cards.sort((a, b) => {
    const resultsA = a.getResults();
    const resultsB = b.getResults();

    // Sort based on the most recent result
    const recentA = resultsA[resultsA.length - 1]; // last result for card A
    const recentB = resultsB[resultsB.length - 1]; // last result for card B

    // If recent result is not available, fallback to 0 (indicating no attempts made yet)
    if (recentA === undefined) return 1;
    if (recentB === undefined) return -1;

    return recentB === false ? -1 : 1; // Prioritize incorrect answers
  });
}

export { FlashCard, newFlashCard, recentMistakesFirstSorter };