function unauthorized() {
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'www-authenticate': 'basic',
    },
  })
}

export function handler(request: Request) {
  try {
    const authorization = request.headers.get('authorization')

    if (!authorization) {
      return unauthorized()
    }

    const base64Credentials = authorization.split('Basic ')[1]

    if (!base64Credentials) {
      return unauthorized()
    }

    const [username, password] = atob(base64Credentials).split(':')

    const credentialsConfig = Deno.env.get('BASIC_AUTH_CREDENTIALS')

    // Continue without authentication if no config is found
    if (!credentialsConfig) {
      return undefined
    }

    const allowedCombinations = credentialsConfig
      .split(' ')
      .map((credentials) => credentials.split(':'))

    const isAuthorized = allowedCombinations.some(
      ([allowedUsername, allowedPassword]) =>
        allowedUsername === username && allowedPassword === password,
    )

    if (!isAuthorized) {
      return unauthorized()
    }
  } catch (error) {
    console.error('[netlify-basic-auth-edge-function] error', error)

    return new Response('Bad Gateway', {
      status: 502,
    })
  }
}
