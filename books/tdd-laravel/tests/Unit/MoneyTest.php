<?php

namespace Tests\Unit;

use App\Money;
use App\Bank;
use App\Sum;
use Tests\TestCase;

class MoneyTest extends TestCase
{
    /**
     * @dataProvider provideMultiplication
     */
    public function testMultiplication($dollar, $multiplier, $expected)
    {
        $actual = $dollar->times($multiplier);

        $this->assertEquals($expected, $actual);
    }

    public function provideMultiplication()
    {
        return [
            'dollar: exptected is 10' => [new Money(5, 'USD'), 2, new Money(10, 'USD')],
            'franc: exptected is 10' => [new Money(5, 'CHF'), 2, new Money(10, 'CHF')],
        ];
    }

    public function testSimpleAddition()
    {
        $five = Money::dollar(5);
        $result = $five->plus($five);
        $bank = new Bank();
        $reduced = $bank->reduce($result, 'USD');

        $this->assertEquals(Money::dollar(10), $reduced);
    }

    public function testPlusReturnsSum()
    {
        $five = Money::dollar(5);
        $result = $five->plus($five);

        $this->assertEquals($five, $result->augend);
        $this->assertEquals($five, $result->addend);
    }

    public function testReduceSum()
    {
        $sum = new Sum(Money::dollar(3), Money::dollar(4));
        $bank = new Bank();
        $actual = $bank->reduce($sum, 'USD');

        $this->assertEquals(Money::dollar(7), $actual);
    }
}
