type User = {
  name: string,
  age: number,
  isMarried: boolean
}

export const GetUser = (name: string): User => {
  return {
    name,
    age: 24,
    isMarried: false
  };
}
