import { statsResolver } from "./stats-resolver"
import { LocationRepositoryInterface } from "../repositories/location-repository-interface"
import { FruitRepositoryInterface } from "../repositories/fruit-repository-interface"

describe("statsResolver", () => {
  let fruitRepository: FruitRepositoryInterface
  let locationRepository: LocationRepositoryInterface

  beforeEach(() => {
    locationRepository = {
      addLedgerEntry: jest.fn(),
      getById: jest.fn(),
    }

    fruitRepository = {
      getById: jest.fn(),
      getMostEatenFruit: jest.fn(),
      getAverageAmountConsumed: jest.fn(),
    }
  })

  it("returns an error if one of the params is missing", async () => {
    const response = await statsResolver({
      fruitRepository,
      locationRepository,
      params: {},
    })

    expect(response).toEqual({
      errors: [
        {
          status: "400",
          title: "Bad Request",
          detail: `Query params "locationId" and "year" are required`,
        },
      ],
    })
  })

  it("returns an error if the location does not exist", async () => {
    const response = await statsResolver({
      params: {
        locationId: "non-existing-id",
        year: "2021",
      },
      fruitRepository,
      locationRepository,
    })

    expect(locationRepository.getById).toHaveBeenCalledWith("non-existing-id")
    expect(response.errors).toEqual([
      {
        status: "404",
        title: "Not Found",
        detail: `Location with id "non-existing-id" not found`,
      },
    ])
  })

  it("returns defaults when no data is found for the location/year", async () => {
    locationRepository.getById = jest.fn().mockResolvedValue({
      id: "123",
      name: "Berlin",
      employees: 10,
    })

    fruitRepository.getAverageAmountConsumed = jest
      .fn()
      .mockResolvedValue({ amount: 0 })

    fruitRepository.getMostEatenFruit = jest.fn().mockResolvedValue(null)

    const response = await statsResolver({
      locationRepository,
      fruitRepository,
      params: {
        locationId: "123",
        year: "2021",
      },
    })

    expect(fruitRepository.getAverageAmountConsumed).toHaveBeenCalledWith({
      locationId: "123",
      year: "2021",
    })
    expect(fruitRepository.getMostEatenFruit).toHaveBeenCalledWith({
      locationId: "123",
      year: "2021",
    })
    expect(response.data).toEqual({
      locationId: "123",
      year: "2021",
      mostEatenFruit: null,
      averageEatenPerPerson: {
        amount: 0,
      },
    })
  })

  it("returns the calculated stats", async () => {
    locationRepository.getById = jest.fn().mockResolvedValue({
      id: "123",
      name: "Berlin",
      employees: 10,
    })

    fruitRepository.getAverageAmountConsumed = jest.fn().mockResolvedValue({
      amount: 10,
    })

    fruitRepository.getMostEatenFruit = jest.fn().mockResolvedValue({
      id: "1",
      name: "Apple",
      amount: 100,
    })

    const response = await statsResolver({
      locationRepository,
      fruitRepository,
      params: {
        locationId: "123",
        year: "2021",
      },
    })

    expect(fruitRepository.getAverageAmountConsumed).toHaveBeenCalledWith({
      locationId: "123",
      year: "2021",
    })
    expect(fruitRepository.getMostEatenFruit).toHaveBeenCalledWith({
      locationId: "123",
      year: "2021",
    })
    expect(response.data).toEqual({
      locationId: "123",
      year: "2021",
      averageEatenPerPerson: {
        amount: 10,
      },
      mostEatenFruit: {
        id: "1",
        name: "Apple",
        amount: 100,
      },
    })
  })
})
