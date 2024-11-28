export class Payment {
  private id: string | null
  private orderId: string
  private amount: number
  private status: PaymentStatus
  private qrCode: string
  private createdAt: Date

  constructor(
    orderId: string,
    amount: number,
    qrCode: string,
    status: PaymentStatus = PaymentStatus.PENDING,
    createdAt: Date = new Date()
  ) {
    this.id = null
    this.orderId = orderId
    this.amount = amount
    this.qrCode = qrCode
    this.status = status
    this.createdAt = createdAt
  }

  public getId(): string | null {
    return this.id
  }

  public getOrderId(): string {
    return this.orderId
  }

  public getAmount(): number {
    return this.amount
  }

  public getStatus(): PaymentStatus {
    return this.status
  }

  public getQrCode(): string {
    return this.qrCode
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public setStatus(status: PaymentStatus): void {
    this.status = status
  }

  public setId(id: string): void {
    this.id = id
  }
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}
