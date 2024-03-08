import 'dotenv/config'
import axios from 'axios'
import { FilterQuery } from '../declarations/fillout'

export const getFormData = async (formId: string, query?: FilterQuery) => {
  const queryString = query
    ? Object.entries(query)
        .filter(([_, value]) => value !== undefined)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&')
    : ''

  const url = `${
    process.env.FILLOUT_ENDPOINT
  }/v1/api/forms/${formId}/submissions${queryString ? `?${queryString}` : ''}`

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.FILLOUT_KEY}` },
    })

    return response.data
  } catch (error) {
    console.error(error)
    return error
  }
}
// ;(async () => {
//   await getFormData('cLZojxk94ous', {})
// })()
