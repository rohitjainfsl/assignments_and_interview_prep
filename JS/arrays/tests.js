import assert from 'node:assert/strict';
import {
  applyDiscountToCategory, buildRestockList, calculateOrderTotal, customers,
  findOrderById, getOrdersForCustomer, getTopSellingProducts, orders, products,
  rankCustomersBySpend, summarizeSalesByRegion
} from './solution.js';

const originalProducts = structuredClone(products);
const originalOrders = structuredClone(orders);

assert.deepEqual(getOrdersForCustomer(orders, 'c-101').map(({ id }) => id), ['o-1001']);
assert.equal(findOrderById(orders, 'o-1002').region, 'South');
assert.equal(findOrderById(orders, 'missing'), undefined);
assert.equal(calculateOrderTotal(orders[1]), 26.25);

assert.deepEqual(buildRestockList(products), [
  { id: 'p-5', name: 'Wholegrain Pasta', shortage: 6 },
  { id: 'p-3', name: 'Olive Oil', shortage: 5 },
  { id: 'p-1', name: 'Arabica Coffee', shortage: 6 },
  { id: 'p-4', name: 'Sparkling Water', shortage: 0 }
].sort((a, b) => b.shortage - a.shortage || a.name.localeCompare(b.name)));

const discounted = applyDiscountToCategory(products, 'Pantry', 20);
assert.equal(discounted.find((product) => product.id === 'p-3').price, 12);
assert.equal(discounted.find((product) => product.id === 'p-1').price, 12.5);
assert.notEqual(discounted[0], products[0]);

assert.deepEqual(getTopSellingProducts(orders, 3), [
  { productId: 'p-5', name: 'Wholegrain Pasta', quantitySold: 5 },
  { productId: 'p-1', name: 'Arabica Coffee', quantitySold: 3 },
  { productId: 'p-2', name: 'Brown Rice', quantitySold: 1 }
]);
assert.deepEqual(summarizeSalesByRegion(orders), { North: 49.25, South: 26.25 });
assert.deepEqual(rankCustomersBySpend(orders, customers), [
  { id: 'c-101', name: 'Aisha Khan', lifetimeSpend: 29.25 },
  { id: 'c-102', name: 'Ben Carter', lifetimeSpend: 26.25 },
  { id: 'c-103', name: 'Chloe Martin', lifetimeSpend: 20 },
  { id: 'c-104', name: 'Diego Silva', lifetimeSpend: 0 }
]);

assert.deepEqual(products, originalProducts, 'Product input was mutated');
assert.deepEqual(orders, originalOrders, 'Order input was mutated');
console.log('All assignment checks passed.');
