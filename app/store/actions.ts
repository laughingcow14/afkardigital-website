"use server";

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  paymentMethod: "cod" | "cheque";
  items: OrderItem[];
  total: number;
}

export async function submitOrder(order: OrderDetails): Promise<{ success: boolean; orderRef: string }> {
  // Generate a short order reference
  const ref = "AFD-" + Date.now().toString(36).toUpperCase().slice(-6);

  // In production: send email to Info@afkardigital.com with order details.
  // Plug in Nodemailer / Resend / SendGrid here.
  // For now we log and return success so the UI flow works end-to-end.
  console.log("[Order received]", ref, JSON.stringify(order, null, 2));

  return { success: true, orderRef: ref };
}
