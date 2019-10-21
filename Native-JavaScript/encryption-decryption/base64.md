###### abse64
````js
/**
 * @function decode encode base64 string
 * @constructor Base64Function
 * @example
 *      import Base64 from '@/Common-JS-Library/encryption-and-decryption/base64.js'
 *      let exampleStr = 'hello world'
 *      exampleStr = Base64.encode(exampleStr) // aGVsbG8gd29ybGQ=
 *      exampleStr = Base64.decode(exampleStr) // hello world
 */
function Base64Function () {
    let base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    let utf8Encode = function (string) {
        let utftext = ''
        let c
        string = string.toString().replace(/\r\n/g, 'n')
        for (let n = 0, len = string.length; n < len; n++) {
            c = string.charCodeAt(n)
            if (c < 128) {
                utftext += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192)
                utftext += String.fromCharCode((c & 63) | 128)
            } else {
                utftext += String.fromCharCode((c >> 12) | 224)
                utftext += String.fromCharCode(((c >> 6) & 63) | 128)
                utftext += String.fromCharCode((c & 63) | 128)
            }
        }
        return utftext
    }
    let utf8Decode = function (utftext) {
        let string = ''
        let i = 0
        let len = utftext.length
        let c1 = 0
        let c2 = 0
        let c3 = 0
        while (i < len) {
            c1 = utftext.charCodeAt(i++)
            if (c1 < 128) {
                string += String.fromCharCode(c1)
            } else if ((c1 > 191) && (c1 < 224)) {
                c2 = utftext.charCodeAt(i++)
                string += String.fromCharCode(((c1 & 31) << 6) | (c2 & 63))
            } else {
                c2 = utftext.charCodeAt(i++)
                c3 = utftext.charCodeAt(i++)
                string += String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
            }
        }
        return string
    }
    this.encode = function (input) {
        let output = ''
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4, len
        let i = 0
        input = utf8Encode(input)
        len = input.length
        while (i < len) {
            chr1 = input.charCodeAt(i++)
            chr2 = input.charCodeAt(i++)
            chr3 = input.charCodeAt(i++)
            enc1 = chr1 >> 2
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
            enc4 = chr3 & 63
            if (isNaN(chr2)) {
                enc3 = enc4 = 64
            } else if (isNaN(chr3)) {
                enc4 = 64
            }
            output += base64EncodeChars.charAt(enc1) + base64EncodeChars.charAt(enc2) + base64EncodeChars.charAt(enc3) + base64EncodeChars.charAt(enc4)
        }
        return output
    }
    this.decode = function (input) {
        let output = ''
        let chr1, chr2, chr3
        let enc1, enc2, enc3, enc4
        let i = 0
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
        while (i < input.length) {
            enc1 = base64EncodeChars.indexOf(input.charAt(i++))
            enc2 = base64EncodeChars.indexOf(input.charAt(i++))
            enc3 = base64EncodeChars.indexOf(input.charAt(i++))
            enc4 = base64EncodeChars.indexOf(input.charAt(i++))
            chr1 = (enc1 << 2) | (enc2 >> 4)
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
            chr3 = ((enc3 & 3) << 6) | enc4
            output += String.fromCharCode(chr1)
            if (enc3 !== 64) output += String.fromCharCode(chr2)
            if (enc4 !== 64) output += String.fromCharCode(chr3)
        }
        return utf8Decode(output)
    }
}

const Base64 = new Base64Function()
export default {encode: Base64.encode, decode: Base64.decode}
````