import { getInitialData } from './App'

describe('getInitialData function', () => {
  it('should return data just once', async () => {
    const dataHolder = getInitialData({ obj: 'obj data' })

    expect(dataHolder()).toEqual({ obj: 'obj data' })
    expect(dataHolder()).toBeNull()
    expect(dataHolder()).toBeNull()
  })
})
