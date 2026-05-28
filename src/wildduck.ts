import type { ObjectId as MongoObjectId } from "mongodb";
import type { AnyRecord, MxAuthInfo, MxPort, MxRecord } from "./common";

export type UserDataId = MongoObjectId | string;
export type UserMetadata = string | AnyRecord;

export type UserAuthenticatorAttachment =
  | "platform"
  | "cross-platform"
  | (string & {});

export interface UserWebAuthnCredential extends AnyRecord {
  id: string;
  rawId: string;
  description: string;
  authenticatorAttachment: UserAuthenticatorAttachment;
}

export interface UserWebAuthnData extends AnyRecord {
  credentials: UserWebAuthnCredential[];
}

export interface UserLastLogin extends AnyRecord {
  time: Date | false | null;
  authEvent: UserDataId | false | null;
  ip: string | false | null;
}

export interface UserTarget extends AnyRecord {
  id?: UserDataId;
  type: "mail" | "relay" | "http" | (string & {});
  value: string;
  recipient?: string | string[];
}

export interface UserRelayData extends AnyRecord {
  mx?: MxRecord[];
  mxPort?: MxPort;
  mxAuth?: MxAuthInfo | false;
  mxSecure?: boolean;
  url?: string;
}

export interface UserMtaRelay extends AnyRecord {
  id?: UserDataId;
  type?: "relay" | (string & {});
  value: string | UserRelayData;
}

export interface UserTemporaryPassword extends AnyRecord {
  password: string;
  created: Date;
  validAfter?: Date;
}

export interface UserData extends AnyRecord {
  _id: UserDataId;
  username: string;
  unameview: string;
  name: string | null | undefined;
  password: string;
  enabled2fa: string[];
  seed: string;
  pendingSeed: string;
  pendingSeedChanged: boolean;
  webauthn: UserWebAuthnData;
  authVersion: number;
  address: string;
  language: string | null | undefined;
  storageUsed: number;
  quota: number;
  recipients: number;
  forwards: number;
  filters: number;
  imapMaxUpload: number;
  imapMaxDownload: number;
  pop3MaxDownload: number;
  pop3MaxMessages: number;
  imapMaxConnections: number;
  receivedMax: number;
  targets: Array<UserTarget | string>;
  autoreply: boolean;
  uploadSentMessages: boolean;
  pubKey: string;
  encryptMessages: boolean;
  encryptForwarded: boolean;
  spamLevel: number;
  retention: number;
  disabledScopes: string[];
  lastLogin: UserLastLogin;
  metaData: UserMetadata;
  internalData: UserMetadata;
  activated: boolean;
  disabled: boolean;
  suspended: boolean;
  featureFlags: AnyRecord;
  created: Date;
  smimeCerts?: string[];
  smimeCipher?: string;
  smimeKeyTransport?: string;
  require2faEnabled?: boolean;
  tags?: string[];
  tagsview?: string[];
  fromWhitelist?: string[];
  mtaRelay?: UserMtaRelay | string | false;
  tempPassword?: UserTemporaryPassword;
  lastPwnedCheck?: Date;
  passwordPwned?: boolean;
  requirePasswordChange?: boolean;
  protocol?: string;
}
