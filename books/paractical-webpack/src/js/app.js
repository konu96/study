import $ from 'jquery';
import add from './modules/add.js';
import tax from './modules/tax.js';

const item1Price = 400;
const item2Price = 600;
const totalPrice = add(item1Price, item2Price);

const salesTax = 1.08;
const priceIncludeTax = tax(totalPrice, salesTax);

$('body').text(priceIncludeTax);
