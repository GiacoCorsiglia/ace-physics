export interface SendEmailOptions {
  readonly toAddresses: string[];
  readonly fromAddress: string;
  readonly fromName: string;
  readonly subject: string;
  readonly htmlBody: string;
  readonly textBody: string;
}

export interface EmailProvider {
  send(options: SendEmailOptions): Promise<void>;
}
