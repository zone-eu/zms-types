import type { Buffer } from "node:buffer";
import type { EventEmitter } from "node:events";
import type { Socket } from "node:net";
import type { Readable, Writable } from "node:stream";
import type { SecureContext } from "node:tls";
import type {
  Collection as MongoDriverCollection,
  Db as MongoDriverDb,
  Document as MongoDocument,
  GridFSBucket as MongoDriverGridFSBucket,
  MongoClient as MongoDriverClient,
  UpdateFilter as MongoDriverUpdateFilter
} from "mongodb";
import type {
  Redis as IoredisClient,
  RedisOptions as IoredisClientOptions
} from "ioredis";
import type {
  HeaderLine,
  MimeNode,
  RewriterNode,
  StreamerNode
} from "@zone-eu/mailsplit/lib/types";

export type Headers = Exclude<MimeNode["headers"], false>;

export interface AnyRecord {
  [key: string]: unknown;
}

export type DoneCallback = (err?: Error | null) => void;
export type MaybePromise<T = void> = T | Promise<T>;
export type QueueCallback<T = void> = (
  err?: Error | null,
  result?: T
) => void;

export type MongoCollection<
  TSchema extends MongoDocument = MongoDocument
> = MongoDriverCollection<TSchema>;
export type MongoDatabase = MongoDriverDb;
export type MongoGridFSBucket = MongoDriverGridFSBucket;
export type MongoClient = MongoDriverClient;
export type RedisClient = IoredisClient;
export type RedisClientOptions = IoredisClientOptions;
export type MongoUpdateFilter<TSchema = MongoDocument> =
  MongoDriverUpdateFilter<TSchema>;

export type ConfigPrimitive = string | number | boolean | null | undefined;
export type ConfigFunction = (...args: unknown[]) => unknown;
export type ConfigValue =
  | ConfigPrimitive
  | ConfigObject
  | ConfigValue[]
  | ConfigFunction;

export interface ConfigObject {
  [key: string]: ConfigValue;
}

export type SmtpPasswordType = "asp" | "master" | (string & {});

export interface QueueConfig extends AnyRecord {
  connection: RedisClientOptions;
  prefix: string;
}

export interface DatabaseConnections extends AnyRecord {
  mongoclient?: MongoClient | false;
  database?: MongoDatabase | false;
  gridfs?: MongoDatabase | false;
  users?: MongoDatabase | false;
  senderDb?: MongoDatabase | false;
  redis?: RedisClient | false;
  redisConfig?: RedisClientOptions;
  queueConf?: QueueConfig;
}

export interface Logger extends AnyRecord {
  info(...args: unknown[]): void;
  error(...args: unknown[]): void;
  verbose(...args: unknown[]): void;
  debug?(...args: unknown[]): void;
  silly?(...args: unknown[]): void;
}

export interface GelfEmitter {
  emit(event: string, entry: AnyRecord): void;
}

export interface GelfMessage extends AnyRecord {
  short_message?: string;
  facility?: string;
  host?: string;
  timestamp?: number;
  _component?: string;
}

export interface RemoteLogEntry extends AnyRecord {
  id: unknown;
  seq?: unknown;
  action?: string;
}

export interface ParsedAddress {
  name?: string;
  address: string;
}

export interface ParsedAddressGroup {
  name: string;
  group: ParsedAddress[];
}

export type ParsedAddressEntry = ParsedAddress | ParsedAddressGroup;
export type AddressInput =
  | string
  | ParsedAddress
  | ParsedAddressGroup
  | AddressInput[];
export type NormalizedAddress = string | ParsedAddress;
export type NestedArray<T> = T | NestedArray<T>[];

export interface ValidatedAddressList {
  addresses: ParsedAddress[];
  set(...addresses: AddressInput[]): void;
}

export interface ParsedEnvelope {
  from: string | false;
  to: string[];
  cc: string[];
  bcc: string[];
  replyTo: string | false;
  sender: string | false;
}

export interface DkimEnvelopeInfo extends AnyRecord {
  hashAlgo?: string;
  bodyHash?: string;
  debug?: boolean;
}

export interface RspamdResponse extends AnyRecord {
  default?: RspamdDefaultResult;
  tests?: string[];
}

export interface RspamdDefaultResult extends AnyRecord {
  score?: string | number;
  required_score?: string | number;
  action?: string;
  is_spam?: boolean;
}

export interface VirusScanResult extends AnyRecord {
  clean: boolean;
  response?: string;
}

export interface EnvelopeAttachment {
  name?: string | false;
  type?: string | false;
  bytes: number;
  hash: string;
}

export type EnvelopeAddressList = string | string[];
export type EnvelopeHeaders = Headers | HeaderLine[];

export interface Envelope extends AnyRecord {
  id?: string;
  sessionId?: string;
  session?: EnvelopeSession;
  interface?: string;
  from?: string;
  to?: EnvelopeAddressList;
  origin?: string | false;
  originhost?: string | false;
  transhost?: string | false;
  transtype?: string;
  user?: string | false;
  userId?: string;
  passwordType?: SmtpPasswordType;
  time?: number | Date;
  tls?: string | AnyRecord;
  sendingZone?: string;
  deferDelivery?: number;
  date?: string;
  parsedEnvelope?: ParsedEnvelope;
  messageId?: string;
  headers?: EnvelopeHeaders;
  envelopeFromHeader?: boolean;
  dkim?: DkimEnvelopeInfo;
  bodySize?: number;
  parentId?: string;
  reason?: string;
  looped?: boolean;
  fbl?: string;
  spam?: RspamdResponse;
  ignoreSpamScore?: boolean;
  virus?: VirusScanResult;
  attachments?: EnvelopeAttachment[];
  sourceMd5?: string;
}

export interface EnvelopeSession extends AnyRecord {
  id?: string;
  interface?: string;
  envelopeId?: string;
  remoteAddress?: string;
  remotePort?: number;
  clientHostname?: string;
  hostNameAppearsAs?: string;
  transmissionType?: string;
  user?: string | false;
}

export interface MessageHeadersEnvelope extends Envelope {
  headers: Headers;
  dkim?: DkimEnvelopeInfo;
}

export interface MessageHookEnvelope extends Envelope {
  headers: Headers;
  dkim: DkimEnvelopeInfo;
}

export interface DeliveryEnvelope extends AnyRecord {
  from?: string;
  to?: EnvelopeAddressList;
}

export interface DeferredDeliveryInfo extends AnyRecord {
  first?: number;
  last?: number;
  next?: number;
  count?: number;
  response?: string;
  log?: unknown;
}

export interface MxAuthInfo extends AnyRecord {
  user?: string;
  pass?: string;
}

export type MxPort = number | string;

export interface MxRecord extends AnyRecord {
  priority: number;
  mx: boolean;
  exchange: string;
  A: string[];
  AAAA: string[];
}

export interface RouteMxData extends AnyRecord {
  mx?: MxRecord[];
  mxPort?: MxPort;
  mxAuth?: MxAuthInfo | false;
  mxSecure?: boolean;
  skipSRS?: boolean;
  skipSTS?: boolean;
}

export interface LocalAddressInfo extends AnyRecord {
  address?: string;
  name?: string;
}

export interface QueueDelivery extends Envelope {
  id: string;
  seq: string;
  recipient?: string;
  domain?: string;
  sendingZone?: string;
  queued?: Date;
  created?: Date;
  locked?: boolean;
  lockTime?: number;
  assigned?: string;
  _lock?: string;
  _deferred?: DeferredDeliveryInfo;
  envelope?: DeliveryEnvelope;
  updates?: MongoUpdateFilter | AnyRecord;
  headers?: EnvelopeHeaders;
  mx?: MxRecord[];
  mxPort?: MxPort;
  mxAuth?: MxAuthInfo | false;
  mxSecure?: boolean;
  http?: boolean;
  targetUrl?: string;
  skipSRS?: boolean;
  skipSTS?: boolean;
  forwardedFor?: string;
  dnsOptions?: AnyRecord;
  disabledAddresses?: string[];
  zoneAddress?: string | LocalAddressInfo;
  zoneAddressIPv4?: string | LocalAddressInfo;
  zoneAddressIPv6?: string | LocalAddressInfo;
}

export interface QueueRouting extends AnyRecord {
  recipient: string;
  deliveryZone: string;
  mxData?: RouteMxData;
}

export interface QueueStatus extends AnyRecord {
  delivered?: boolean;
  ip?: string;
  mx?: string;
  response?: string;
}

export interface QueueReleaseData extends AnyRecord {
  req?: unknown;
  id?: string;
  seq?: string;
  status?: QueueStatus;
  updates?: AnyRecord;
  response?: string;
  log?: unknown;
}

export interface QueueDelayedOptions extends AnyRecord {
  first: number;
  prev: number;
  last: number;
}

export interface QueueShiftOptions extends AnyRecord {
  domain?: string;
  toDomainOnly?: boolean;
  lockOwner?: string | false;
  getDomainConfig?: (domain: string, key: string) => unknown;
}

export interface QueueInfo extends AnyRecord {
  meta: Envelope | AnyRecord | false;
  messages: AnyRecord[];
}

export interface QueueCountResult {
  entries: Array<{ key: string; value: number }>;
  rows: number;
}

export interface QueueListEntry {
  id: string;
  zone: string;
  recipient: string;
  created: string;
  queued: string;
  deferred: number;
}

export interface MessageInfo extends AnyRecord {
  "message-id": string;
  from: string;
  to: string;
  src?: string;
  subject?: string;
  auth?: string;
  body?: number;
  md5?: string;
  tests?: string;
  score?: string;
  keys(): MessageInfoFields;
  format(): string;
}

export interface MessageInfoFields extends AnyRecord {
  "message-id"?: string;
  from?: string;
  to?: string;
  src?: string;
  subject?: string;
  auth?: string;
  body?: number;
  md5?: string;
  tests?: string;
  score?: string;
}

export interface SmtpAddress extends AnyRecord {
  address: string;
  args?: Record<string, string | number | boolean>;
}

export interface SmtpEnvelope extends AnyRecord {
  mailFrom?: SmtpAddress | false | null;
  rcptTo?: SmtpAddress[];
}

export interface SmtpSession extends AnyRecord {
  id: string;
  interface?: string;
  envelopeId?: string;
  envelope: SmtpEnvelope;
  remoteAddress: string;
  remotePort?: number;
  clientHostname?: string;
  hostNameAppearsAs?: string;
  transmissionType?: string;
  user?: string | false;
  sendingZone?: string;
  tlsOptions?: string | AnyRecord;
}

export interface SmtpAuth extends AnyRecord {
  username: string;
  password?: string;
  method: string;
  passwordType?: SmtpPasswordType;
}

export interface SniData extends AnyRecord {
  secureContext?:
    | SecureContext
    | {
        context?: SecureContext;
      }
    | false
    | null;
}

export interface ApiSession extends AnyRecord {
  remoteAddress?: string;
  transmissionType: string;
  user?: string | false;
}

export interface MailDrop extends AnyRecord {
  add(
    envelope: Envelope,
    source: string | Buffer | Readable,
    callback: (err?: Error | null, message?: string) => void
  ): void;
}

export interface SmtpInterface extends AnyRecord {
  interface?: string;
  options: AnyRecord;
  closing?: boolean;
  server?: unknown;
  maildrop?: MailDrop;
  close(callback?: DoneCallback): void;
}

export interface SendingZone extends AnyRecord {
  name: string;
  port?: number;
  secure?: boolean;
  auth?: MxAuthInfo;
  ignoreTLS?: boolean;
  preferIPv6?: boolean;
  connectionCache?: {
    ttl?: number;
    reuseCount?: number;
  };
}

export interface BounceDelivery extends QueueDelivery {
  headers: Headers;
  envelope?: DeliveryEnvelope;
  arrivalDate?: string | number | Date;
  name?: string;
  response?: string;
  category?: string;
  req?: unknown;
}

export interface SenderDelivery extends QueueDelivery {
  headers: Headers;
  envelope: DeliveryEnvelope;
  dkim?: DkimEnvelopeInfo;
  dnsOptions: AnyRecord;
  bodySize?: number;
  messageId?: string;
  connectionKey?: string;
  status?: QueueStatus;
  isSuppressed?: boolean;
  logger?: boolean;
  useLMTP?: boolean;
  localAddress?: string;
  mxHostname?: string;
}

export interface SenderConnectOptions extends AnyRecord {
  host?: string;
  port?: number;
  localAddress?: string;
  localHostname?: string;
  localAddressIPv4?: string;
  localHostnameIPv4?: string;
  localAddressIPv6?: string;
  localHostnameIPv6?: string;
  servername?: string;
  secure?: boolean;
  socket?: Socket;
  domain?: string;
}

export interface SenderConnection extends AnyRecord {
  id?: string;
  secure?: boolean;
  options: SenderConnectOptions;
  lastServerResponse?: string;
  targetUrl?: string;
  usageCount?: number;
  close(): void;
  login(authData: MxAuthInfo, next: DoneCallback): void;
}

export interface SenderDeliveryInfo extends AnyRecord {
  accepted?: string[];
  rejected?: string[];
  response?: string;
  protocol?: string;
  httpUrl?: string;
  httpResponse?: number | string;
}

export interface SenderDeliveryError extends Error, AnyRecord {
  response?: string;
  responseCode?: number;
  category?: string;
  temporary?: boolean;
  code?: string;
  protocol?: string;
  httpUrl?: string;
  httpResponse?: number | string;
  netConnected?: boolean;
}

export interface SmtpResponseError extends Error {
  responseCode?: number;
  category?: string;
  code?: string;
}

export interface Hook {
  title?: string;
  name: string;
  action: HookAction<readonly unknown[]>;
}

export type HookAction<Args extends readonly unknown[] = readonly unknown[]> = (
  ...args: [...Args, DoneCallback]
) => MaybePromise;
export type HookHandler<Args extends readonly unknown[]> = HookAction<Args>;

export type RewriteFilterFunc = (
  envelope: Envelope,
  node: MimeNode
) => boolean;
export type RewriteEventHandler = (
  envelope: Envelope,
  node: RewriterNode["node"],
  decoder: RewriterNode["decoder"],
  encoder: RewriterNode["encoder"]
) => void;
export type StreamFilterFunc = (
  envelope: Envelope,
  node: MimeNode
) => boolean;
export type StreamEventHandler = (
  envelope: Envelope,
  node: StreamerNode["node"],
  decoder: StreamerNode["decoder"],
  done: StreamerNode["done"]
) => void;
export type AnalyzerEventHandler = (
  envelope: Envelope,
  source: Readable,
  output: Writable
) => void;

export interface RemoteLogOptions extends AnyRecord {
  protocol: "udp4" | "udp6";
  port: number;
  host?: string;
}

export interface GelfOptions extends AnyRecord {
  enabled?: boolean;
  options?: AnyRecord;
  component?: string;
  hostname?: string;
}

export interface LogOptions extends AnyRecord {
  gelf?: GelfOptions;
  remote?: RemoteLogOptions;
}

export interface PluginConfigObject extends ConfigObject {
  enabled?: boolean | string | Array<boolean | string>;
  ordering?: number;
  path?: string;
}

export type PluginConfig = true | PluginConfigObject;

export interface PluginDefinition extends AnyRecord {
  key: string;
  path: string;
  ordering: number;
  config: PluginConfig;
  title?: string;
  module?: PluginModule;
  db?: DatabaseConnections;
  logger?: Logger;
  log?: LogOptions;
}

export interface PluginModule<TPlugin = SharedPluginTools> {
  title?: string;
  init(plugin: TPlugin, done: DoneCallback): MaybePromise;
}

export interface SharedHookArgumentMap {
  "log:entry": [entry: RemoteLogEntry];
  "message:store": [envelope: MessageHookEnvelope, body: Readable];
  "message:queue": [envelope: MessageHookEnvelope, messageInfo: MessageInfo];
}

export type SharedHookName = keyof SharedHookArgumentMap;
export type SharedHookHandler<Name extends SharedHookName> = HookHandler<
  SharedHookArgumentMap[Name]
>;

export interface SharedHookRegistrar {
  addHook<Name extends SharedHookName>(
    name: Name,
    action: SharedHookHandler<Name>
  ): void;
  addHook<Args extends readonly unknown[]>(
    name: string,
    action: HookAction<Args>
  ): void;
}

export interface SharedStreamHookRegistrar {
  addRewriteHook(
    filterFunc: RewriteFilterFunc,
    eventHandler: RewriteEventHandler
  ): void;
  addStreamHook(
    filterFunc: StreamFilterFunc,
    eventHandler: StreamEventHandler
  ): void;
  addAnalyzerHook(eventHandler: AnalyzerEventHandler): void;
}

export interface SharedPluginTools
  extends SharedHookRegistrar,
    SharedStreamHookRegistrar {
  options: PluginDefinition;
  logger: Logger;
  db: DatabaseConnections;
  config: PluginConfig;
  redis?: RedisClient | false;
  mongodb?: MongoDatabase | false;
  gelf?: GelfEmitter;
  validateAddress(headers: Headers, key: string): ValidatedAddressList;
  remotelog(id: unknown, seq: unknown, action: string, data?: AnyRecord): void;
  loggelf(message: string | GelfMessage): void;
}

export interface MailQueue extends AnyRecord {
  options: AnyRecord;
  instanceId?: string;
  mongodb?: MongoDatabase | false;
  gridstore?: MongoGridFSBucket | false;
  closing?: boolean;
  store(
    id: string | false | null | undefined,
    stream: Readable,
    callback: QueueCallback<string>
  ): void;
  setMeta(id: string, data: Envelope | AnyRecord, callback: DoneCallback): void;
  getMeta(id: string, callback: QueueCallback<Envelope | AnyRecord | false>): void;
  retrieve(id: string): Readable;
  push(
    id: string,
    envelope: Envelope,
    callback: QueueCallback<string>
  ): EventEmitter | NodeJS.Immediate | void;
  shift(
    zone: string,
    options: QueueShiftOptions,
    callback: QueueCallback<QueueDelivery | false>
  ): void;
  shift(zone: string, callback: QueueCallback<QueueDelivery | false>): void;
  remove(
    id: string,
    seq: string | false | null | undefined,
    callback: DoneCallback
  ): void;
  update(
    id: string,
    seq: string | false | null | undefined,
    update: MongoUpdateFilter<QueueDelivery> | AnyRecord,
    callback: QueueCallback<number>
  ): void;
  getDelivery(
    id: string | number,
    seq: string,
    callback: QueueCallback<QueueDelivery | false>
  ): void;
  releaseDelivery(
    delivery: QueueDelivery,
    callback: QueueCallback<boolean>
  ): void;
  releaseDeliveryAsync?(delivery: QueueDelivery): Promise<boolean>;
  deferDelivery(
    delivery: QueueDelivery,
    ttl: number,
    responseData: AnyRecord,
    callback: QueueCallback<boolean>
  ): void;
  getInfo(id: string, callback: QueueCallback<QueueInfo | false>): void;
  removeMessage(id: string, callback: QueueCallback<boolean>): void;
  clearGarbage?(): Promise<void>;
  checkGarbage?(): void;
  queueCounterUpdate?(): void;
  startPeriodicCheck?(): void;
  stopPeriodicCheck?(): void;
  listQueued?(
    zone: string,
    type: "queued" | "deferred",
    sort: AnyRecord | false | null | undefined,
    start: number | false | null | undefined,
    maxItems: number,
    callback: QueueCallback<QueueListEntry[]>
  ): void;
  count?(
    zones: string | string[],
    type: "queued" | "deferred",
    callback: QueueCallback<QueueCountResult>
  ): void;
  stop?(): void;
  init?(callback: QueueCallback<boolean>): void;
  generateId?(callback: QueueCallback<string>): void;
}
