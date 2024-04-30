type HookResult = {
  offices: Office[]
}

export const useOffices = (): HookResult => {
  const offices = [
    { id: "1", name: "Amsterdam" },
    { id: "2", name: "Berlin" },
    { id: "3", name: "Paris" },
    { id: "4", name: "London" },
  ]

  return {
    offices,
  }
}

type Office = {
  id: string
  name: string
}
