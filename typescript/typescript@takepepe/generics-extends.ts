interface StringValuBox<T extends string> {
  value: T
}

const hasNumber: StringValuBox<number> = { value: 10 }; // error
const hasString: StringValuBox<string> = { value: '10' };
