import crypto from 'crypto'

const accessKey = crypto.randomBytes(32).toString('hex')
const refreshKey = crypto.randomBytes(32).toString('hex')

console.table({ accessKey, refreshKey })