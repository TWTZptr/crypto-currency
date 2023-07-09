export const computePrize = (
  prizes: Prizes,
  requestedPrizes: string[],
): string[] | null => {
  const prizeDistribution = computePrizeDistribution(prizes, requestedPrizes);

  if (!requestedPrizes.length) {
    return [];
  }

  if (prizeDistribution.length) {
    return prizeDistribution;
  }

  return null;
};

const computePrizeDistribution = (
  availablePrizes: Prizes,
  requestedPrizes: string[],
  currentPool: string[] = [],
): string[] => {
  if (currentPool.length >= requestedPrizes.length) {
    return currentPool;
  }

  const prizesToSearch: string[] =
    requestedPrizes[currentPool.length].split('/');

  for (const prizeToSearch of prizesToSearch) {
    if (!availablePrizes[prizeToSearch]) {
      // Требуемого токена не осталось
      continue;
    }

    // В рамках задачи иммутабельность входящих параметров не нужна, можем мутировать их
    // Пробуем добавить монету в пул для выдачи, убрав её из пула доступных
    availablePrizes[prizeToSearch]--;
    currentPool.push(prizeToSearch);

    const res: string[] = computePrizeDistribution(
      availablePrizes,
      requestedPrizes,
      currentPool,
    );

    if (res.length) {
      // Если ответом является [], то ответ невозможно найти с данным пулом, иначе был найден ответ
      return res;
    }

    // Ответ не был найден - перед продолжением поиска необходимо вернуть назад монету в пул доступных и убрать из пула выданных
    availablePrizes[prizeToSearch]++;
    currentPool.pop();
  }

  return [];
};

type Prizes = {
  [k: string]: number;
};
