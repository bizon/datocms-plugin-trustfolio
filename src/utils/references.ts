export async function fetchTrustfolioData(
  variables: Record<string, unknown>,
  corsProxy: string,
  apiToken: string,
) {
  const result = await fetch('/api?endpoint=https://trustfolio.co/api/profil/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apiKey: apiToken,
    },
    body: JSON.stringify({
      query: `
      query profileByLang($lang: String, $slug: ID!) {
          profile(slug: $slug, lang: $lang) {
            references {
              sourceLang,
              id
              state
              testimony
              qualities {
                label
              }
              organization {
                name
                about
                areas
                picture {
                  m
                }
              }
              person {
                name
                jobTitle
                picture {
                  m
                }
              }
              meta {
                social {
                  url
                }
              }
              video {
                id
              }
            }
          }
      }
      `,
      variables,
    }),
  }).then(async (response) => response.json())

  if (result.errors) {
    console.log(result.errors)
    throw new Error('Failed to fetch trustfolio api')
  }

  return result.data.profile.references
}
