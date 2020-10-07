import { crypto } from 'bitcoinjs-lib'
import { fromPublicKey } from 'bip32'
import bippath from 'bip32-path'

function getParentPath (path) {
  const pathArray = bippath.fromString(path).toPathArray()
  pathArray.pop()
  return bippath.fromPathArray(pathArray).toString()
}

function compressPublicKey (pk) {
  const prefix = (pk[64] & 1) !== 0 ? 0x03 : 0x02
  const prefixBuffer = Buffer.alloc(1)
  prefixBuffer[0] = prefix
  return Buffer.concat([prefixBuffer, pk.slice(1, 1 + 32)])
}

function fingerprint (pk) {
  let pkh = crypto.sha256(pk)
  pkh = crypto.ripemd160(pkh)
  return ((pkh[0] << 24) | (pkh[1] << 16) | (pkh[2] << 8) | pkh[3]) >>> 0
}

function createXPUB (path, child, parent) {
  const pathArray = bippath.fromString(path).toPathArray()
  const pkChild = compressPublicKey(Buffer.from(child.publicKey, 'hex'))
  const pkParent = compressPublicKey(Buffer.from(parent.publicKey, 'hex'))
  const hdnode = fromPublicKey(pkChild, Buffer.from(child.chainCode, 'hex'))
  hdnode.parentFingerprint = fingerprint(pkParent)
  hdnode.index = pathArray[pathArray.length - 1]
  hdnode.depth = pathArray.length
  return hdnode.toBase58()
}

export default {
  getParentPath,
  compressPublicKey,
  fingerprint,
  createXPUB
}
