import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  const mailerLiteApiKey = import.meta.env.MAILERLITE_KEY

  return new Response(
    JSON.stringify({
      key: mailerLiteApiKey
    })
  )

  // import MailerLite from '@mailerlite/mailerlite-nodejs'
  // const mailerlite = new MailerLite({
  //   api_key: mailerLiteApiKey
  // })

  // console.log(mailerLiteApiKey)
  // const params = {
  //   limit: 25,
  //   page: 1,
  //   filter: {
  //     name: 'dummy'
  //   },
  //   sort: '-name'
  // }

  // mailerlite.groups
  //   .get(params)
  //   .then((response) => {
  //     console.log(response.data)
  //   })
  //   .catch((error) => {
  //     if (error.response) console.log(error.response.data)
  //   })
}
