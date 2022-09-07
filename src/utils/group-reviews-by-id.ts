import type {ReviewProps} from '../types'

export async function groupReviewsById(reviews: ReviewProps[]) {
  const object: any = {}

  return reviews.flat().reduce(function (r: any, element: any) {
    const {id} = element
    if (!object[id]) {
      object[id] = {
        id,
        organization: element.organization,
        data: [],
      }
      r.push(object[id])
    }

    object[id].data.push(element)
    return r
  }, [])
}
