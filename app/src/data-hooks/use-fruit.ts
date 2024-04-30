type HookResult = {
  fruit: Fruit[]
}

export const useFruit = (): HookResult => {
  const fruit = [
    { id: "1", name: "Lime" },
    { id: "2", name: "Tangerine" },
    { id: "3", name: "Apple" },
    { id: "4", name: "Mango" },
    { id: "5", name: "Plum" },
    { id: "6", name: "Pineapple" },
    { id: "7", name: "Kiwi" },
    { id: "8", name: "Pear" },
  ]

  return {
    fruit,
  }
}

type Fruit = {
  id: string
  name: string
}
