import fetch from 'node-fetch'

const handler = async (request, response) => {
  const {endpoint} = request.query

  if (endpoint === null || endpoint === '') {
    const out = {
      error: 'Missing endpoint parameter!',
    }

    response.status(400).json(out)
    return
  }

  if (!Number.isNaN(Number.parseInt(endpoint, 10)) || typeof endpoint !== 'string') {
    const out = {
      error: 'Endpoint parameter must be a string!',
    }

    response.status(400).json(out)
    return
  }

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        apikey: request.headers.apikey,
      },
      body: JSON.stringify({
        query: request.body.query,
        variables: request.body.variables,
      }),
    }).then((response) => response.json())

    response.status(200).send(result)
  } catch (error) {
    const out = {
      error: 'Something went wrong...',
      message: error.message,
    }

    response.status(500).json(out)
  }
}

export default handler
