// Avoid typing "GSI1PK" everywhere because I'll definitely mess it up.
export enum Keys {
  pk = "pk",
  sk = "sk",
  GSI1PK = "GSI1PK",
  GSI1SK = "GSI1SK",
}

export interface KeyPrimary {
  readonly pk: string;
  readonly sk: string;
}

export interface KeyGSI1 {
  readonly GSI1PK: string;
  readonly GSI1SK: string;
}
