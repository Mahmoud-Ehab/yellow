export type Contact = {
  username: string;
  ipaddr: string;
}

export type Message = {
  content: string;
  sender_ip: string;
  pending: boolean;
}

export type Config = {
  protocol: "http" | "https";
  host_ip: string;
  server_port: number;
  app_port: number;
}

export type ActionReturn = {
  err?: string;
  res: object | Array<any> | boolean;
}
