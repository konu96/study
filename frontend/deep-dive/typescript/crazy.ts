interface Crazy {
    new(): {
        hello: number
    };
}

class CrazyClass implements Crazy {
    constructor() {
        return {
            hello: 123
        };
    }
}

const crazy = new CrazyClass();

console.log(crazy);
