import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  // const mailerLiteApiKey = process.env.MAILERLITE_KEY

  return new Response(
    JSON.stringify({
      mode: import.meta.env.MODE,
      env: import.meta.env.SSR ? 'ssr' : 'not ssr',
      mailerlite: import.meta.env.MAILERLITE_KEY
        ? import.meta.env.MAILERLITE_KEY
        : 'nothing with meta.env',
      mailerliteProcess: process.env.MAILERLITE_KEY
        ? process.env.MAILERLITE_KEY
        : 'nothing with process'
    })
  )
}

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
// }

// export const GET: APIRoute = () => {
//   const myKey = import.meta.env.MY_KEY

//   return new Response(
//     JSON.stringify({
//       key: myKey
//     })
//   )
// }
