# JavaScript Array Methods — 90-Minute Practical Assignment

## Scenario

You are helping an online grocery delivery service turn its raw order data into useful operations and sales reports. Complete the functions in `starter.js` using JavaScript array methods. Do not change the data structures or function names.

## Learning goals

Use `map`, `filter`, `find`, `reduce`, `sort`, and method chaining to transform real-world data without mutating the supplied arrays.

## Rules

- Work in `starter.js` only.
- Use array methods; do not use `for`, `while`, or `for...of` loops.
- Do not mutate an input array or its objects. In particular, copy before sorting.
- Return values—do not log them from your functions.
- Run `node tests.js` as you work.

## Data model

- An **order** has an `id`, `customerId`, `region`, `status`, and `items`.
- Each item has a `productId`, `name`, `category`, `unitPrice`, and `quantity`.
- A **product** has current stock and a `reorderLevel`.

## Tasks and suggested timing

### Part 1 — Order lookup and totals (20 minutes)

1. `getOrdersForCustomer(orders, customerId)`  
   Return the customer's orders whose status is not `cancelled`.
2. `findOrderById(orders, orderId)`  
   Return the matching order, or `undefined` when it does not exist.
3. `calculateOrderTotal(order)`  
   Return the sum of `unitPrice * quantity` for every item, rounded to two decimal places.

### Part 2 — Inventory operations (25 minutes)

4. `buildRestockList(products)`  
   Return products where `stock <= reorderLevel`, shaped as `{ id, name, shortage }`, where `shortage` is `reorderLevel - stock`. Sort largest shortage first; break ties alphabetically by name.
5. `applyDiscountToCategory(products, category, percent)`  
   Return a new product list. Only products in the category have their `price` reduced by `percent`; round changed prices to two decimal places. The input products must remain unchanged.

### Part 3 — Business reporting (35 minutes)

6. `getTopSellingProducts(orders, limit)`  
   Ignore cancelled orders. Combine quantities sold by product, then return up to `limit` entries shaped as `{ productId, name, quantitySold }`, sorted by quantity descending and then name ascending.
7. `summarizeSalesByRegion(orders)`  
   Ignore cancelled orders. Return an object whose keys are regions and whose values are their sales totals, rounded to two decimals.
8. `rankCustomersBySpend(orders, customers)`  
   Ignore cancelled orders. Return every customer as `{ id, name, lifetimeSpend }`, including customers with no orders. Sort by spend descending and then name ascending.

### Part 4 — Reflection (10 minutes)

In a short comment at the bottom of `starter.js`, answer:

1. Why is `reduce` a good fit for sales totals?
2. Where did you need to copy an array before sorting, and why?
3. Which task would become harder if the data were mutated in place?

## Submission checklist

- [ ] All eight functions implemented
- [ ] No loops used
- [ ] Input data was not mutated
- [ ] `node tests.js` passes
- [ ] Reflection completed

`solution.js` is the instructor reference implementation; do not open it until you have attempted the tasks.
