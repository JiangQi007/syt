export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface PayData {
  codeUrl: string;
  orderId: number;
  totalFee: number;
  resultCode: string;
}

export interface PayResData extends ResponseData {
  data: PayData;
}
