import { expect, jest, test } from '@jest/globals'
import { setBaseUrl, setOrigin, setHost } from './index.js'
import { KeqContext } from 'keq'


function createKeqContext(): KeqContext {
  return {
    options: {},
    global: {},
    request: {
      __url__: new URL('http://test.com/test'),
      url: new URL('http://test.com/test'),
      method: 'get',
      headers: new Headers(),
      routeParams: {},
      body: {},
    },

    __output: undefined,
    get output() {
      return this.__output
    },
  } as any as KeqContext
}

test('setBaseUrl', async () => {
  const ctx = createKeqContext()
  const next = jest.fn(() => {})

  setBaseUrl('https://example.com/api')(ctx, next)

  expect(ctx.request.url.href).toBe('https://example.com/api/test')
  expect(next).toBeCalledTimes(1)
})

test('setOrigin', async () => {
  const ctx = createKeqContext()
  const next = jest.fn(() => undefined)

  setOrigin('https://example.com/api')(ctx, next)

  expect(ctx.request.url.href).toBe('https://example.com/test')
  expect(next).toBeCalledTimes(1)
})

test('setHost', async () => {
  const ctx = createKeqContext()
  const next = jest.fn(() => undefined)

  setHost('example.com')(ctx, next)

  expect(ctx.request.url.href).toBe('http://example.com/test')
  expect(next).toBeCalledTimes(1)
})
