// JavaScript Array Methods assignment starter file.
// Complete every function without using loops or mutating its inputs.

export const customers = [
  { id: 'c-101', name: 'Aisha Khan' },
  { id: 'c-102', name: 'Ben Carter' },
  { id: 'c-103', name: 'Chloe Martin' },
  { id: 'c-104', name: 'Diego Silva' }
];

export const products = [
  { id: 'p-1', name: 'Arabica Coffee', category: 'Beverages', price: 12.5, stock: 4, reorderLevel: 10 },
  { id: 'p-2', name: 'Brown Rice', category: 'Pantry', price: 4.25, stock: 16, reorderLevel: 8 },
  { id: 'p-3', name: 'Olive Oil', category: 'Pantry', price: 15, stock: 3, reorderLevel: 8 },
  { id: 'p-4', name: 'Sparkling Water', category: 'Beverages', price: 2.5, stock: 10, reorderLevel: 10 },
  { id: 'p-5', name: 'Wholegrain Pasta', category: 'Pantry', price: 3.75, stock: 6, reorderLevel: 12 }
];

export const orders = [
  { id: 'o-1001', customerId: 'c-101', region: 'North', status: 'completed', items: [
    { productId: 'p-1', name: 'Arabica Coffee', category: 'Beverages', unitPrice: 12.5, quantity: 2 },
    { productId: 'p-2', name: 'Brown Rice', category: 'Pantry', unitPrice: 4.25, quantity: 1 }
  ] },
  { id: 'o-1002', customerId: 'c-102', region: 'South', status: 'completed', items: [
    { productId: 'p-3', name: 'Olive Oil', category: 'Pantry', unitPrice: 15, quantity: 1 },
    { productId: 'p-5', name: 'Wholegrain Pasta', category: 'Pantry', unitPrice: 3.75, quantity: 3 }
  ] },
  { id: 'o-1003', customerId: 'c-101', region: 'North', status: 'cancelled', items: [
    { productId: 'p-4', name: 'Sparkling Water', category: 'Beverages', unitPrice: 2.5, quantity: 12 }
  ] },
  { id: 'o-1004', customerId: 'c-103', region: 'North', status: 'completed', items: [
    { productId: 'p-1', name: 'Arabica Coffee', category: 'Beverages', unitPrice: 12.5, quantity: 1 },
    { productId: 'p-5', name: 'Wholegrain Pasta', category: 'Pantry', unitPrice: 3.75, quantity: 2 }
  ] }
];

export function getOrdersForCustomer(orders, customerId) {
  return orders.filter(element => {
    return element.customerId === customerId &&
           element.status !== "cancelled";
  });
}
export function findOrderById(orders, orderId) {
  return orders.find(order => order.id === orderId);
}
export function calculateOrderTotal(order) {
  const prices = order.items.map(item => {
    return item.unitPrice * item.quantity;
  });

  const total = prices.reduce((sum, price) => {
    return sum + price;
  }, 0);
 
  return Number(total.toFixed(2));
}
export function buildRestockList(products) { 
  products.filter(products => products.stock <= products.reorderLevel).map(product => {
      return {
        id: product.id,
        name: product.name,
        shortage: product.reorderLevel - product.stock
      };
    })
 }
export function applyDiscountToCategory(products, category, percent) { throw new Error('Not implemented'); }
export function getTopSellingProducts(orders, limit) { throw new Error('Not implemented'); }
export function summarizeSalesByRegion(orders) { 
  orders
    .filter(order => order.status !== "cancelled")
    .forEach(order => {
      const orderTotal = order.items.reduce((sum, item) => {
        return sum + item.unitPrice * item.quantity;
      }, 0);
     });
    }
export function rankCustomersBySpend(orders, customers) { throw new Error('Not implemented'); }

// Reflection:
// 1. combining many values into one final value
// 2. to make a copy of a array is important as it would not change the acctual array.
// 3. 5 question
