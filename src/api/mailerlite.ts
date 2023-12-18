// SSR API Used at build time.
import MailerLite, { type GroupObject } from '@mailerlite/mailerlite-nodejs'

export const getMailerliteGroups = async () => {
  const mailerLiteApiKey = import.meta.env.MAILERLITE_KEY
  const mailerlite = new MailerLite({
    api_key: mailerLiteApiKey
  })
  let groups: GroupObject[] = []

  await mailerlite.groups
    .get({
      sort: 'name'
    })
    .then((response) => {
      groups = response.data.data
    })
    .catch((error) => {
      if (error.response) console.log(error.response.data)
    })

  return groups
}
