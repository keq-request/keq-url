import { KeqMiddleware } from 'keq'
import { URL } from 'whatwg-url'


export function setBaseUrl(base: string): KeqMiddleware {
  const url = new URL(base)

  return async (ctx, next) => {
    ctx.request.url.host = url.host
    ctx.request.url.protocol = url.protocol
    ctx.request.url.port = url.port
    ctx.request.url.pathname = `${url.pathname.replace(/\/$/, '')}/${ctx.request.url.pathname.replace(/^\//, '')}`

    await next()
  }
}

export function setOrigin(origin: string): KeqMiddleware {
  const url = new URL(origin)

  return async (ctx, next) => {
    ctx.request.url.host = url.host
    ctx.request.url.protocol = url.protocol
    ctx.request.url.port = url.port

    await next()
  }
}

export function setHost(host: string): KeqMiddleware {
  return async (ctx, next) => {
    ctx.request.url.host = host
    await next()
  }
}
