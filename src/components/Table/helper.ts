export const rowSelectionHandler = (
  alreadySelectedKeys: string[],
  newSelectedKey: string | string[],
) => {
  if (Array.isArray(newSelectedKey)) {
    if (alreadySelectedKeys.length == newSelectedKey.length) return [];
    return newSelectedKey;
  }
  if (alreadySelectedKeys.includes(newSelectedKey))
    return alreadySelectedKeys.filter((item) => item != newSelectedKey);
  return [...alreadySelectedKeys, newSelectedKey];
};

const previousSortOrder: Record<string, number> = {};

export const orderMapper = (sortKey: string) => {
  if (previousSortOrder[sortKey]) {
    if (previousSortOrder[sortKey] === 1) previousSortOrder[sortKey] = 2;
    else if (previousSortOrder[sortKey] === 2) previousSortOrder[sortKey] = 0;
  } else {
    previousSortOrder[sortKey] = 1;
  }
  const orderStore: Record<number, string | null> = {
    0: null,
    1: "desc",
    2: "asc",
  };
  const order = orderStore[previousSortOrder[sortKey]];
  return order;
};
