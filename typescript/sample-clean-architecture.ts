// ref: https://qiita.com/kotauchisunsun/items/ec6b4086abe670c478fe
import * as readline from 'readline';

class TaxEntity {
  private readonly taxRate: number = 0.08;

  public calculateTaxPrice(price: number): number {
    const p = this.taxRate + 1;

    return Math.round(price * p);
  }
}

class TaxCalculateUseCaseInputData {
  public readonly price: number;

  constructor(price: number) {
    this.price = price;
  }
}


class TaxCalculateUseCaseOutputData {
  public readonly price: number;

  constructor(price: number) {
    this.price = price;
  }
}

interface TaxCalculateUseCaseInterface {
  calculateTaxPrice(inputData: TaxCalculateUseCaseInputData): TaxCalculateUseCaseOutputData;
  }

class TaxCalculateUseCase implements TaxCalculateUseCaseInterface {
  public calculateTaxPrice(inputData: TaxCalculateUseCaseInputData): TaxCalculateUseCaseOutputData {
    const taxEntity = new TaxEntity();
    const price = inputData.price;
    const taxPrice = taxEntity.calculateTaxPrice(price);

    return new TaxCalculateUseCaseOutputData(taxPrice);
  }
}

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface ITaxCalculateView {
  display(outputData: TaxCalculateUseCaseOutputData): void;
}

class TaxCalculateView implements ITaxCalculateView {
  public display(outputData: TaxCalculateUseCaseOutputData): void {
    const taxPrice = outputData.price;
    console.log(`税込価格:${taxPrice}`);
  }
}

class TaxCalculateController {
  private readonly useCase: TaxCalculateUseCaseInterface;
  private readonly view: ITaxCalculateView;

  public constructor(useCase: TaxCalculateUseCaseInterface, view: ITaxCalculateView) {
    this.useCase = useCase;
    this.view = view;
  }

  public calcTaxPrice(priceText: string): void {
    const price = Number(priceText);
    const inputData = new TaxCalculateUseCaseInputData(price);
    const outputData = this.useCase.calculateTaxPrice(inputData);
    this.view.display(outputData);
  }
}

readLine.on('line', (input: string) => {
  const useCase = new TaxCalculateUseCase();
  const view = new TaxCalculateView();
  const controller = new TaxCalculateController(useCase, view);

  controller.calcTaxPrice(input);
})
