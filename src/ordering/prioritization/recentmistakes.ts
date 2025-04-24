import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  return {
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      return [...cards].sort((a, b) => {
        const resultsA = a.getResults();
        const resultsB = b.getResults();

        const lastIncorrectIndexA = resultsA.map((res, i) => ({ res, i })).filter(r => r.res === false).map(r => r.i).pop() ?? -1;
        const lastIncorrectIndexB = resultsB.map((res, i) => ({ res, i })).filter(r => r.res === false).map(r => r.i).pop() ?? -1;

        return lastIncorrectIndexB - lastIncorrectIndexA;
      });
    }
  }
};

export { newRecentMistakesFirstSorter };
