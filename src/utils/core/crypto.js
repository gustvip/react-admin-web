import sha512 from 'crypto-js/sha512'
import md5 from 'crypto-js/md5'

class Crypto {
  md5 (info) {
    return md5(info).toString()
  }
  
  sha512 (info) {
    return sha512(info).toString()
  }
}

export default new Crypto()