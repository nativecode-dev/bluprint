import * as logging from '@nofrills/lincoln'
import * as scrubs from '@nofrills/scrubs'

const options: logging.Options = {
  namespace: 'nativecode:bluprint',
}

export const Logger: logging.Lincoln = new logging.Lincoln(options)
