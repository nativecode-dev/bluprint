import * as scrubs from '@nofrills/scrubs'
import * as vcr from '@nofrills/vcr'

export const Logger: vcr.VCR = new vcr.VCR('nativecode:bluprint')
  .formatter((args: any[]): any[] => {
    return scrubs.scrub(args)
  })
  .use(vcr.Debug)
