import { newMostMistakesFirstSorter } from '../src/ordering/prioritization/mostmistakes.js';
import { newRecentMistakesFirstSorter } from '../src/ordering/prioritization/recentmistakes.js';
import { CardStatus, newCardStatus } from '../src/cards/cardstatus.js';
import { newFlashCard, recentMistakesFirstSorter } from '../src/cards/flashcard.js';

const createMostMistakesFirstSorter = newMostMistakesFirstSorter;
const createRecentMistakesFirstSorter = newRecentMistakesFirstSorter;

describe('Test prioritization', () => {
  const flashCard1 = newFlashCard('Question1', 'Answer1');
  const flashCard2 = newFlashCard('Question2', 'Answer2');
  const flashCard3 = newFlashCard('Question3', 'Answer3');
  const flashCard4 = newFlashCard('Question4', 'Answer4');
  const flashCard5 = newFlashCard('Question5', 'Answer5');
  const flashCard6 = newFlashCard('Question6', 'Answer6');
  const flashCard7 = newFlashCard('Question7', 'Answer7');
  const flashCard8 = newFlashCard('Question8', 'Answer8');
  const cardStatus1 = newCardStatus(flashCard1);
  const cardStatus2 = newCardStatus(flashCard2);
  const cardStatus3 = newCardStatus(flashCard3);
  const cardStatus4 = newCardStatus(flashCard4);
  const cardStatus5 = newCardStatus(flashCard5);
  const cardStatus6 = newCardStatus(flashCard6);
  const cardStatus7 = newCardStatus(flashCard7);
  const cardStatus8 = newCardStatus(flashCard8);
  
  cardStatus1.recordResult(false);
  cardStatus1.recordResult(false);
  cardStatus1.recordResult(false);
  cardStatus2.recordResult(true);
  cardStatus2.recordResult(true);
  cardStatus2.recordResult(false);
  cardStatus3.recordResult(true);
  cardStatus3.recordResult(false);
  cardStatus3.recordResult(true);
  cardStatus4.recordResult(true);
  cardStatus4.recordResult(false);
  cardStatus4.recordResult(false);
  cardStatus5.recordResult(false);
  cardStatus5.recordResult(true);
  cardStatus5.recordResult(true);
  cardStatus6.recordResult(false);
  cardStatus6.recordResult(true);
  cardStatus6.recordResult(false);
  cardStatus7.recordResult(false);
  cardStatus7.recordResult(false);
  cardStatus7.recordResult(true);
  cardStatus8.recordResult(true);
  cardStatus8.recordResult(true);
  cardStatus8.recordResult(true);

  const cards: CardStatus[] = [cardStatus1, cardStatus2, cardStatus3, cardStatus4, cardStatus5, cardStatus6, cardStatus7, cardStatus8];

  test('Test newMostMistakesFirstSorter', () => {
    const cardsSorted: CardStatus[] = createMostMistakesFirstSorter().reorganize(cards);
    expect(cardsSorted[0]).toEqual(cardStatus1);
    expect(cardsSorted[1]).toEqual(cardStatus4);
    expect(cardsSorted[2]).toEqual(cardStatus6);
    expect(cardsSorted[3]).toEqual(cardStatus7);
    expect(cardsSorted[4]).toEqual(cardStatus2);
    expect(cardsSorted[5]).toEqual(cardStatus3);
    expect(cardsSorted[6]).toEqual(cardStatus5);
    expect(cardsSorted[7]).toEqual(cardStatus8);
  });

  test('Test newRecentMistakesFirstSorter', () => {
    const cardsSorted: CardStatus[] = createRecentMistakesFirstSorter().reorganize(cards);
    
    console.log('Sorted Cards:', cardsSorted.map(card => card.getResults()));
  
    expect(cardsSorted[0]).toEqual(cardStatus1);
    expect(cardsSorted[1]).toEqual(cardStatus2);
    expect(cardsSorted[2]).toEqual(cardStatus4);
    expect(cardsSorted[3]).toEqual(cardStatus6);
  
    expect([cardStatus3, cardStatus7]).toContain(cardsSorted[4]);
    expect([cardStatus3, cardStatus7]).toContain(cardsSorted[5]);
    expect(cardsSorted[4]).not.toEqual(cardsSorted[5]); 
  
    expect(cardsSorted[6]).toEqual(cardStatus5);
    expect(cardsSorted[7]).toEqual(cardStatus8);
  });
  

  /*test('Test recentMistakesFirstSorter with specific cards', () => {
    const cardStatus1: CardStatus = newCardStatus(newFlashCard('What is TypeScript?', 'A superset of JavaScript'));
    cardStatus1.recordResult(false);

    const cardStatus2: CardStatus = newCardStatus(newFlashCard('What is Node.js?', 'JavaScript runtime'));
    cardStatus2.recordResult(true);

    const cardStatus4: CardStatus = newCardStatus(newFlashCard('What is a closure?', 'A function inside another function'));
    cardStatus4.recordResult(false);

    const cardStatus6: CardStatus = newCardStatus(newFlashCard('What is async/await?', 'Syntactic sugar for promises'));
    cardStatus6.recordResult(false);

    const cards: CardStatus[] = [cardStatus1, cardStatus2, cardStatus4, cardStatus6];
    const sortedCards = recentMistakesFirstSorter(cards);

    expect(sortedCards[0]).toEqual(cardStatus1);
    expect(sortedCards[1]).toEqual(cardStatus4);
    expect(sortedCards[2]).toEqual(cardStatus6);
    expect(sortedCards[3]).toEqual(cardStatus2);
  });
  */

  /*test('Test FlashCard methods', () => {
    const flashCard = newFlashCard('What is JavaScript?', 'A programming language');
    expect(flashCard.getQuestion()).toEqual('What is JavaScript?');
    expect(flashCard.getAnswer()).toEqual('A programming language');
    expect(flashCard.checkSuccess(' A programming language ')).toBe(true);
    expect(flashCard.checkSuccess('a programming LANGUAGE')).toBe(true);
    expect(flashCard.checkSuccess('A different answer')).toBe(false);
    expect(flashCard.toString()).toEqual('FlashCard[What is JavaScript?, A programming language]');
    const anotherCard = newFlashCard('What is JavaScript?', 'A programming language');
    expect(flashCard.equals(anotherCard)).toBe(true);
    const differentCard = newFlashCard('What is TypeScript?', 'A superset of JavaScript');
    expect(flashCard.equals(differentCard)).toBe(false);
  });
  */

  /*test('Test CardStatus methods', () => {
    const cardStatus = newCardStatus(newFlashCard('What is React?', 'A JavaScript library'));
    expect(cardStatus.getResults()).toEqual([]);
    cardStatus.recordResult(true);
    expect(cardStatus.getResults()).toEqual([true]);
    cardStatus.recordResult(false);
    expect(cardStatus.getResults()).toEqual([true, false]);
    cardStatus.clearResults();
    expect(cardStatus.getResults()).toEqual([]);
  });
  */
});