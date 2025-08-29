import '@testing-library/jest-dom'
import { expect, afterEach } from '@testing-library/react'
import { cleanup } from '@testing-library/react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Extend expect with jest-dom matchers
expect.extend({
  // Add any custom matchers here
})
