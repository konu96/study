const reverse = <T>(items: T[]): T[] =>{
    return items.reverse();
};

const numbers = [1, 2, 3];
console.log(reverse(numbers));

const strings = ['1', '2', '3'];
console.log(reverse(strings));
