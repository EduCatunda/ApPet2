import * as Prismic from '@prismicio/client'
import * as PrismicNext from '@prismicio/next'
import Package from '../../package.json'

export function getPrismicClient(config?: any) {
    const client = Prismic.createClient(
        process.env.PRISMIC_ENDPOINT!,
        {
            accessToken: process.env.PRISMIC_ACCESS_TOKEN
        }
    )

    PrismicNext.enableAutoPreviews({
        client: client,
        previewData: config.previewData,
        req: config.req,
      })

    return client;
}