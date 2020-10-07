function encode (str) {
  try {
    return encodeURIComponent(window.btoa(str || ''))
  } catch (err) {
    return ''
  }
}

function decode (str) {
  try {
    return window.atob(decodeURIComponent(str || ''))
  } catch (err) {
    return ''
  }
}

export default {
  encode,
  decode
}
