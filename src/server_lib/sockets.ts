const sockets = {}

export function storeSocket(ipaddr: string, socket: any) {
  sockets[ipaddr] = socket
}

export function getSocket(ipaddr: string) {
  return sockets[ipaddr]
}

export function rmvSocket(ipaddr: string) {
  sockets[ipaddr] = undefined
}
