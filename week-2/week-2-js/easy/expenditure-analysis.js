/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let totalSpends = [];
  for (let i = 0; i < transactions.length; i++) {
    const category = transactions[i].category;
    const spent = transactions[i].price;

    const oldCategory = totalSpends.find((item) => item.category === category);
    if (oldCategory) {
      oldCategory.totalSpent += spent;
    } else {
      totalSpends.push({ category: category, totalSpent: spent });
    }
  }
  return totalSpends;
}

module.exports = calculateTotalSpentByCategory;
