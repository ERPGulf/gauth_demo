export interface PricingDetails {
  item_group: string;
  item_name: string;
  item_description: string;
  last_purchase_rate: number;
  lead_time_days: number;
  max_discount: number;
  min_order_qty: number;
  modified: string;
  modified_by: string;
  name: string;
  naming_series: string;
  no_of_months: number;
  no_of_months_exp: number;
  opening_stock: number;
  over_billing_allowance: number;
  over_delivery_receipt_allowance: number;
  options: Option[];
}

export interface Option {
  option_name: string;
  option_description: string;
  option_price_monthly: number;
  option_price_yearly: number;
  enable: number;
  included: number;
}
