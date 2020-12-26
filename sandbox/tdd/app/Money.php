<?php

namespace App;

class Money implements Expression {
    public $amount;
    public $currency;

    public function __construct(int $amount, string $currency)
    {
        $this->amount = $amount;
        $this->currency = $currency;
    }

    public function times(int $multiplier)
    {
        return new Money($this->amount * $multiplier, $this->currency);
    }

    public function reduce(string $to): Money
    {
        return $this;
    }

    public static function dollar(int $amount): Money
    {
        return new Money($amount, 'USD');
    }

    public static function franc(int $amount): Money
    {
        return new Money($amount, 'CHF');
    }

    public function plus(Money $addend): Expression
    {
        return new Sum($this, $addend);
    }
}
