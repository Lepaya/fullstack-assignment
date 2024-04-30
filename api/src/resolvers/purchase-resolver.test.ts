import { FruitRepositoryInterface } from "../repositories/fruit-repository-interface"
import { LocationRepositoryInterface } from "../repositories/location-repository-interface"
import { purchaseResolver } from "./purchase-resolver"

describe("purchaseResolver", () => {
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
    const response = await purchaseResolver({
      fruitRepository,
      locationRepository,
      params: {},
    })

    expect(response).toEqual({
      errors: [
        {
          status: "400",
          title: "Bad Request",
          detail: `Body params "fruitId", "locationId" and "amount" are required`,
        },
      ],
    })
  })

  it("does not allow an amount less than 1", async () => {
    const response = await purchaseResolver({
      fruitRepository,
      locationRepository,
      params: {
        fruitId: "1",
        locationId: "1",
        amount: 0,
      },
    })

    expect(response).toEqual({
      errors: [
        {
          status: "400",
          title: "Bad Request",
          detail: `Amount must be at least 1`,
        },
      ],
    })
  })

  it("throws an error when the fruit cannot be found", async () => {
    const response = await purchaseResolver({
      fruitRepository,
      locationRepository,
      params: {
        fruitId: "non-existing-id",
        locationId: "1",
        amount: 1,
      },
    })

    expect(fruitRepository.getById).toHaveBeenCalledWith("non-existing-id")
    expect(response).toEqual({
      errors: [
        {
          status: "404",
          title: "Not Found",
          detail: 'Fruit with id "non-existing-id" not found',
        },
      ],
    })
  })

  it("throws an error when the location cannot be found", async () => {
    fruitRepository.getById = jest.fn().mockResolvedValue({ id: "123" })

    const response = await purchaseResolver({
      fruitRepository,
      locationRepository,
      params: {
        fruitId: "1",
        locationId: "non-existing-id",
        amount: 1,
      },
    })

    expect(locationRepository.getById).toHaveBeenCalledWith("non-existing-id")
    expect(response).toEqual({
      errors: [
        {
          status: "404",
          title: "Not Found",
          detail: 'Location with id "non-existing-id" not found',
        },
      ],
    })
  })

  it("throws an error when the total calories exceeds 1000kcal", async () => {
    fruitRepository.getById = jest
      .fn()
      .mockResolvedValue({ id: "123", calories: 500 })
    locationRepository.getById = jest.fn().mockResolvedValue({ id: "1" })

    const response = await purchaseResolver({
      fruitRepository,
      locationRepository,
      params: {
        fruitId: "123",
        locationId: "1",
        amount: 999999,
      },
    })

    expect(response).toEqual({
      errors: [
        {
          status: "400",
          title: "Bad Request",
          detail:
            "Total calories cannot exceed 1000000. Max amount of this fruit is 2000.",
        },
      ],
    })
  })

  it("should persist the purchase", async () => {
    const now = new Date().getTime()
    fruitRepository.getById = jest
      .fn()
      .mockResolvedValue({ id: "123", calories: 500 })
    locationRepository.getById = jest.fn().mockResolvedValue({ id: "1" })
    locationRepository.addLedgerEntry = jest.fn().mockResolvedValue({
      fruitId: "123",
      locationId: "1",
      amount: 2,
      time: new Date().getTime(),
    })

    const response = await purchaseResolver({
      fruitRepository,
      locationRepository,
      params: {
        fruitId: "123",
        locationId: "1",
        amount: 2,
      },
    })

    if ("errors" in response) {
      throw new Error(`Test failed with errors: ${response.errors}`)
    }

    expect(locationRepository.addLedgerEntry).toHaveBeenCalledWith({
      fruitId: "123",
      locationId: "1",
      amount: 2,
    })
    expect(response.data).toEqual({
      fruitId: "123",
      locationId: "1",
      amount: 2,
      time: expect.any(Number),
    })
    expect(response.data?.time).toBeGreaterThanOrEqual(now)
  })
})
