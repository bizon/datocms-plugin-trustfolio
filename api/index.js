import fetch from 'node-fetch'

const handler = async (request, response) => {
  try {
    const result = await fetch('https://trustfolio.co/api/profil/', {
      method: 'POST',
      headers: {
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
    response.status(500).send({error: 'Something went wrong...', message: error.message})
  }
}

export default handler
