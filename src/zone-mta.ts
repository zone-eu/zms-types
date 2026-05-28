import type {
  ApiSession,
  BounceDelivery,
  DoneCallback,
  Envelope,
  HookAction,
  HookHandler,
  MailDrop,
  MailQueue,
  MaybePromise,
  MessageHeadersEnvelope,
  MessageInfo,
  QueueDelayedOptions,
  QueueReleaseData,
  QueueRouting,
  SenderConnectOptions,
  SenderConnection,
  SenderDelivery,
  SenderDeliveryError,
  SenderDeliveryInfo,
  SendingZone,
  SharedHookArgumentMap,
  SharedPluginTools,
  SmtpAddress,
  SmtpAuth,
  SmtpInterface,
  SmtpResponseError,
  SmtpSession,
  SniData
} from "./common";

export interface ZoneMtaHookArgumentMap extends SharedHookArgumentMap {
  "api:mail": [envelope: Envelope, session: ApiSession];
  "message:headers": [
    envelope: MessageHeadersEnvelope,
    messageInfo: MessageInfo
  ];
  "queue:bounce": [bounce: BounceDelivery, maildrop: MailDrop];
  "queue:delayed": [
    bounce: BounceDelivery,
    maildrop: MailDrop,
    options: QueueDelayedOptions
  ];
  "queue:release": [zone: SendingZone, data: QueueReleaseData];
  "queue:route": [envelope: Envelope, routing: QueueRouting];
  "smtp:init": [server: SmtpInterface];
  "smtp:sni": [servername: string, data: SniData];
  "smtp:connect": [session: SmtpSession];
  "smtp:auth": [auth: SmtpAuth, session: SmtpSession];
  "smtp:mail_from": [address: SmtpAddress, session: SmtpSession];
  "smtp:rcpt_to": [address: SmtpAddress, session: SmtpSession];
  "smtp:data": [envelope: Envelope, session: SmtpSession];
  "sender:fetch": [delivery: SenderDelivery];
  "sender:headers": [
    delivery: SenderDelivery,
    connection: SenderConnection
  ];
  "sender:connecting": [delivery: SenderDelivery];
  "sender:connect": [
    delivery: SenderDelivery,
    options: SenderConnectOptions
  ];
  "sender:connected": [
    delivery: SenderDelivery,
    connection: SenderConnection,
    options: SenderConnectOptions,
    secure: boolean
  ];
  "sender:connection": [
    delivery: SenderDelivery,
    connection: SenderConnection
  ];
  "sender:delivered": [
    delivery: SenderDelivery,
    info: SenderDeliveryInfo
  ];
  "sender:tlserror": [
    delivery: SenderDelivery,
    options: SenderConnectOptions,
    err: SenderDeliveryError
  ];
  "sender:responseError": [
    delivery: SenderDelivery,
    connection: SenderConnection | false,
    err: SenderDeliveryError
  ];
}

export type ZoneMtaHookName = keyof ZoneMtaHookArgumentMap;
export type ZoneMtaHookHandler<Name extends ZoneMtaHookName> = HookHandler<
  ZoneMtaHookArgumentMap[Name]
>;

export interface ZoneMtaHookRegistrar {
  addHook<Name extends ZoneMtaHookName>(
    name: Name,
    action: ZoneMtaHookHandler<Name>
  ): void;
  addHook<Args extends readonly unknown[]>(
    name: string,
    action: HookAction<Args>
  ): void;
}

export interface ZoneMtaHookRunner {
  runHooks<Name extends ZoneMtaHookName>(
    name: Name,
    args: ZoneMtaHookArgumentMap[Name],
    done: DoneCallback
  ): void;
  runHooks<Name extends ZoneMtaHookName>(
    name: Name,
    args: ZoneMtaHookArgumentMap[Name]
  ): Promise<void>;
}

export interface ZoneMtaPluginTools
  extends Omit<SharedPluginTools, "addHook">,
    ZoneMtaHookRegistrar {
  getQueue(): MailQueue | false;
  drop(
    envelope: Envelope | string,
    description?: string,
    messageInfo?: MessageInfo | string,
    responseText?: string
  ): Error;
  reject(
    envelope: Envelope | string,
    description?: string,
    messageInfo?: MessageInfo | string,
    responseText?: string
  ): SmtpResponseError;
  addAPI(
    method: string,
    path: string,
    callback: (...args: unknown[]) => unknown
  ): void;
}

export interface ZoneMtaPluginModule {
  title?: string;
  init(plugin: ZoneMtaPluginTools, done: DoneCallback): MaybePromise;
}

export type ZoneMtaMessageStoreHookHandler =
  ZoneMtaHookHandler<"message:store">;
export type ZoneMtaMessageQueueHookHandler =
  ZoneMtaHookHandler<"message:queue">;
