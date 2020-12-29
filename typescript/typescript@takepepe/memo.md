# 概要

## TypeScript 型推論入門

```typescript
let name = 'Taro';
let age = 30;

// 上の型推論の結果
let name: string
let age: number
```

```typescript
const name = 'Taro';
const age = 30;

// 上の型推論の結果
const name: 'Taro'
const age : 30;
```

`const` の場合、型ではなく値が推論結果になる。これを、`Literal Types` と言う。
ただオブジェクト型の場合、プロパティは再代入可能なので `Literal Types` にはならない。

```typescript
const user = {
    name: 'Taro',
    age: 30,
    gender: 'male',
};

// 上の型推論の結果
const user: {
    name: string
    age: number
    gender: string
};
```

**関数の戻り値型推論**

```typescript
export default () => {
    const date =new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const label = `${hour}:${minute}:${second}`;
    
    return { date, label };
};

// 上の型推論の結果
export default (): {
    date: Date,
    label: string
};
```

**型定義と推論の使い分け**
`Primitive` 型は抽象度が高いので、 `Literal Types` で抽象度を下げる。

```typescript
interface User {
    name: string
    age: number
    gender: 'male' | 'female' | 'other'
}

export type Gender = 'male' | 'female' | 'other';
interface User {
    name: string
    age: number
    gender: Gender
}
```

**Annotation と Assertion の盲点**
型推論と Annotation では、 Annotation 優先されるので次のケースでは実行時エラーとなる。(実装上でエラーと分かるにも関わらず)

```typescript
const getName = (): any => {
    return false;
};

const myName = getName();
const userName: string = getName() ;

userName.split(','); // run-time error
```

**構造的部分型の Union Types 推論**
 
 ```typescript
type User = {
    name: string; age: number; id: string;
} | {
    name: string; age: number; gender: string;    
};

const user = {} as User;

// 上の型推論の結果
const user : {
    name: string; age: number;
}
```

**組み込み Type Guard**

```typescript
const immutableValue1 : number | string | boolean = 'value';
let immutableValue2 : number | string | boolean = 'value';
let immutableValu3 : number | string | boolean;
immutableValu3 = 'value';

// 上の型推論の結果
const immutalbeValue1: string
let immutalbeValue2: string
const immutalbeValue3: number | string | boolean
```

独自定義 Type Guard ユースケースやメリットが分からない.
