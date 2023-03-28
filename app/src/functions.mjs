import fs from 'fs-extra'
import { randomBytes, randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'

export const privateKeyFile = '/var/datas/.private/._privateKey'

fs.ensureDirSync('/var/datas/.private')
fs.exists(privateKeyFile)
.then(exists => {
    if (!exists)
        fs.writeJson(privateKeyFile, {
            _id: randomUUID(),
            date: new Date().toISOString(),
            _hash: randomBytes(256).toString('hex')
        })
})
const exists = fs.existsSync(privateKeyFile)
if (!exists) throw new Error('private key missing')
const privateKey = fs.readJsonSync(privateKeyFile, { throws: false })
if (!privateKey) throw new Error('bad private key')
const { _hash } = privateKey
console.log(_hash)


export const sign = (obj) => {
    return new Promise((acc,rej) => {
        jwt.sign(obj, _hash, { algorithm: 'HS512' }, function(err, token) {
            if(err) rej({error:err})
            acc(token);
        })
    })
}