type SomeType = {
  message: string;
}

const showMessage= (obj: SomeType) => {
  console.log(obj.message);
}

showMessage({ message: 'Hello World' })
showMessage(new Error('error')) // これでもトランスパイルできる
