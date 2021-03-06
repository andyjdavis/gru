import { gru } from '../'
import { consoleLogger } from 'typescript-log'

interface Args {
    test: number
    test2: string[]
}
gru<Args>({
    logger: consoleLogger('debug'),
    lifetime: 0,
    workers: 2,
    master: () =>
        new Promise(resolve => setTimeout(resolve, 500)).then<Args>(() => {
            // eslint-disable-next-line no-console
            console.log('master output')

            return { test: 1, test2: ['val'] }
        }),
    start: ({ masterArgs }) => {
        // eslint-disable-next-line no-console
        console.log('worker received', masterArgs)
        process.exit()
    },
})
