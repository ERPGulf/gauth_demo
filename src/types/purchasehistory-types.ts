export interface OneTimePurchaseItem {
  id: string;
  item_name: string;
  item_price: string;
  purchase_date: string;
}

export interface SubscriptionPurchaseItem {
  id: string;
  plan: string;
  quantity: number;
  purchase_date: string;
}

export interface PaymentHistory {
  invoice_id: string;
  invoice_date: string;
  invoice_amount: number;
  payment_id: string;
  payment_date: string;
  payment_amount: number;
  pdf_link: string;
}
