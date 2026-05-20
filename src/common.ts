import type { Buffer } from "node:buffer";
import type { EventEmitter } from "node:events";
import type { Socket } from "node:net";
import type { Readable, Writable } from "node:stream";
import type { SecureContext } from "node:tls";
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

export interface MongoCollectionLike extends AnyRecord {
  collectionName?: string;
  namespace?: string;
  aggregate(...args: unknown[]): unknown;
  bulkWrite(...args: unknown[]): unknown;
  countDocuments(...args: unknown[]): unknown;
  createIndex(...args: unknown[]): unknown;
  deleteMany(...args: unknown[]): unknown;
  deleteOne(...args: unknown[]): unknown;
  distinct(...args: unknown[]): unknown;
  drop(...args: unknown[]): unknown;
  find(...args: unknown[]): unknown;
  findOne(...args: unknown[]): unknown;
  findOneAndDelete(...args: unknown[]): unknown;
  findOneAndReplace(...args: unknown[]): unknown;
  findOneAndUpdate(...args: unknown[]): unknown;
  indexes(...args: unknown[]): unknown;
  insertMany(...args: unknown[]): unknown;
  insertOne(...args: unknown[]): unknown;
  rename(...args: unknown[]): unknown;
  replaceOne(...args: unknown[]): unknown;
  updateMany(...args: unknown[]): unknown;
  updateOne(...args: unknown[]): unknown;
  watch(...args: unknown[]): unknown;
}

export interface MongoDbLike extends AnyRecord {
  databaseName?: string;
  namespace?: string;
  options?: AnyRecord;
  admin(...args: unknown[]): unknown;
  aggregate(...args: unknown[]): unknown;
  collection(...args: unknown[]): MongoCollectionLike;
  collections(...args: unknown[]): unknown;
  command(...args: unknown[]): unknown;
  createCollection(...args: unknown[]): unknown;
  createIndex(...args: unknown[]): unknown;
  db(...args: unknown[]): MongoDbLike;
  dropCollection(...args: unknown[]): unknown;
  dropDatabase(...args: unknown[]): unknown;
  indexInformation(...args: unknown[]): unknown;
  listCollections(...args: unknown[]): unknown;
  profilingLevel(...args: unknown[]): unknown;
  removeUser(...args: unknown[]): unknown;
  renameCollection(...args: unknown[]): unknown;
  runCursorCommand(...args: unknown[]): unknown;
  setProfilingLevel(...args: unknown[]): unknown;
  stats(...args: unknown[]): unknown;
  watch(...args: unknown[]): unknown;
}

export interface MongoGridFSBucketLike extends AnyRecord {
  openDownloadStream(...args: unknown[]): Readable;
  openDownloadStreamByName(...args: unknown[]): Readable;
  openUploadStream(...args: unknown[]): Writable;
  openUploadStreamWithId(...args: unknown[]): Writable;
  delete(...args: unknown[]): unknown;
  drop(...args: unknown[]): unknown;
  find(...args: unknown[]): unknown;
  rename(...args: unknown[]): unknown;
}

export interface MongoClientLike extends AnyRecord {
  db(...args: unknown[]): MongoDbLike;
  close(...args: unknown[]): unknown;
  connect(...args: unknown[]): unknown;
}

export interface RedisLike extends AnyRecord {
  options?: RedisOptionsLike;
  status?: string;
  stream?: unknown;
  connector?: unknown;
  commandQueue?: unknown;
  offlineQueue?: unknown;
  condition?: unknown;
  isCluster?: boolean;
  connect(...args: unknown[]): unknown;
  disconnect(...args: unknown[]): unknown;
  duplicate(...args: unknown[]): RedisLike;
  defineCommand(...args: unknown[]): unknown;
  pipeline(...args: unknown[]): unknown;
  multi(...args: unknown[]): unknown;
  quit(...args: unknown[]): unknown;
  get(...args: unknown[]): unknown;
  set(...args: unknown[]): unknown;
  del(...args: unknown[]): unknown;
  exists(...args: unknown[]): unknown;
  expire(...args: unknown[]): unknown;
  hget(...args: unknown[]): unknown;
  hgetall(...args: unknown[]): unknown;
  hset(...args: unknown[]): unknown;
  hdel(...args: unknown[]): unknown;
  hmset(...args: unknown[]): unknown;
  incr(...args: unknown[]): unknown;
  eval(...args: unknown[]): unknown;
  publish(...args: unknown[]): unknown;
  subscribe(...args: unknown[]): unknown;
  unsubscribe(...args: unknown[]): unknown;
  on(...args: unknown[]): unknown;
  once(...args: unknown[]): unknown;
}

export interface RedisOptionsLike extends AnyRecord {
  host?: string;
  port?: number;
  path?: string;
  username?: string;
  password?: string;
  db?: number;
  keyPrefix?: string;
  tls?: AnyRecord;
  family?: number;
  connectTimeout?: number;
  commandTimeout?: number;
  enableOfflineQueue?: boolean;
  enableReadyCheck?: boolean;
  lazyConnect?: boolean;
  maxRetriesPerRequest?: number | null;
  retryStrategy?: (times: number) => number | void | null;
  connectionName?: string;
  sentinels?: Array<AnyRecord & { host?: string; port?: number }>;
}

export type Db = MongoDbLike;
export type GridFSBucket = MongoGridFSBucketLike;
export type Redis = RedisLike;
export type RedisOptions = RedisOptionsLike;
export type UpdateFilterLike<TSchema extends AnyRecord = AnyRecord> =
  AnyRecord & Partial<TSchema>;
export type UpdateFilter<TSchema extends AnyRecord = AnyRecord> =
  UpdateFilterLike<TSchema>;

export interface QueueConfig extends AnyRecord {
  connection: RedisOptionsLike;
  prefix: string;
}

export interface DatabaseConnections extends AnyRecord {
  mongoclient?: MongoClientLike | false;
  database?: MongoDbLike | false;
  gridfs?: MongoDbLike | false;
  users?: MongoDbLike | false;
  senderDb?: MongoDbLike | false;
  redis?: RedisLike | false;
  redisConfig?: RedisOptionsLike;
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
  interface?: string;
  from?: string;
  to?: EnvelopeAddressList;
  origin?: string | false;
  originhost?: string | false;
  transhost?: string | false;
  transtype?: string;
  user?: string | false;
  userId?: string;
  passwordType?: string;
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

export interface RouteMxData extends AnyRecord {
  mx?: string;
  mxPort?: number;
  mxAuth?: MxAuthInfo;
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
  updates?: UpdateFilterLike | AnyRecord;
  headers?: EnvelopeHeaders;
  mx?: string;
  mxPort?: number;
  mxAuth?: MxAuthInfo;
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

export interface MessageInfoFields extends AnyRecord {}

export interface MessageInfo extends AnyRecord {
  keys?(): MessageInfoFields;
  format?(): string;
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

export interface MailDropLike extends AnyRecord {
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
  maildrop?: MailDropLike;
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
  logger: Logger;
  db: DatabaseConnections;
  config: AnyRecord | true;
  redis?: RedisLike | false;
  mongodb?: MongoDbLike | false;
  gelf?: GelfEmitter;
  validateAddress(headers: Headers, key: string): ValidatedAddressList;
  remotelog(id: unknown, seq: unknown, action: string, data?: AnyRecord): void;
  loggelf(message: string | GelfMessage): void;
}

export interface MailQueueLike extends AnyRecord {
  options: AnyRecord;
  instanceId?: string;
  mongodb?: MongoDbLike | false;
  gridstore?: MongoGridFSBucketLike | false;
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
    update: UpdateFilterLike<QueueDelivery> | AnyRecord,
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
