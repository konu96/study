# 概要

[Retrospective Antipattern](www.amazon.co.jp/dp/013682336X) のメモ

## Chapter 1 Wheel of Fortune

事例
```
前提: Start-Stop-Continue フレームワークを使って、レトロスペクティブをしている(*1)


1. Start に「もっとペアプログラミングを増やしたい」が貼られた
2. 毎日 3 時間のペアプログラミングの時間をカレンダーに入れた
3. 次のスプリントで、予定通りの時間ペアプログラミングがされなかった
```

なぜ起こったのか
```
ファシリテーターは、レトロスペクティブの時間が作業時間を圧迫するのがメンバーは嫌だと思っている. そのため、メンバーを思って可能な限り手短にレトロスペクティブを終わらせようとする
```

## Chapter 2 Prime Directive Ignorance

## Chapter 3 In The Soup

### 事例
```
前提: ドット投票で振り返りをしている(*2)

1. 振り返りの度に、同じ Problem が議題に上がっている。
2. ドット投票すると、毎回それが選ばれるので議論をする。
3. ただ、チームメンバーだけで解決できない Problem を永遠に話している
    1. 権限やスキル不足
```

### 症状

「いつも同じことを議論している」「どのコーヒーを買うべきかではなく、本当に重要なことに取り組みたいと思う(直訳)」と言う声を聞く

### 解決方法

1. Problem を集めて、二つの円を書く(下図参照)
2. 内側の円にはチームで解決できる Problem、外側の円にはチーム内で解決できないけど周りに働きかけることで解決できる Problem を置く
3. The "Soup" には、チームの影響が及ばないことを置く

「影響の輪」と「関心の輪」みたいなもの

![](https://storage.googleapis.com/zenn-user-upload/nk0jw3ui912whkozwumilhrm4k4o)

メリット
1. チームで現実的な観点の解決策を考える

他の「影響の輪」に意識を向ける方法
1. 外側の円に投票できるドットを厳しくする
2. 外側の円に内側より価値の低い Problem を意図的に置く
    1. `paradoxical intervention` と呼ぶ
    2. `reverse psychology` という考え方に基づく
    3. 明らかに価値が無いことが分かるから、内側の円に意識を向ける
    

## Chapter 4 Overtime

#### 事例

```
興味ある話題が突然出てきたために、レトロスペクティブが延長する。ただ、それに興味無いチームメンバーが会議から出て行ってしまう。
```

#### 症状

振り返りが延びて、時間が追加されている

#### 解決方法

アジェンダを用意して、どれぐらいの時間を使うか決めておく。
それでも、頻繁に振り返りが延長する場合は時間をあらかじめ延ばしておく。

また、話したいけど時間が無いと言う場合はパーキングロットにいれて、あとで時間を作る。

## Chapter 5 Small Talk(世間話)

事例
```
世間話をしていて、振り返りを始められない
```

### 症状

- 振り返りの隅で世間話をしている
- ファシリテーターの許可なく話すことができない

#### 解決方法

`ground rules` を決める。(ワーキングアラウンドと同じ意味だと思う)

## Chapter 6 Unfruitful Democracy

事例
```
1. 振り返りでは民主主義のプロセスで進み、大多数が問題と思っていることについて話す。そのため、少数派の課題が無視される
2. 少数派は違う話を始めたり、同じ問題だけど異なる側面の話を初めてしまう
```

### 症状

- 少数派が勝手に話すので、ファシリテーターの進行が難しくなる
- 誰かが議論の要旨を聞いてくる
   - 勝手におしゃべりしていたけど、突然面白そうな話題が聞こえたから

https://uxdaystokyo.com/articles/glossary/six-thinking-hats/


## Chapter 7 Nothing to Talk About

事例
```
レトロスペクティブで問題が上がってこない。チームがレトロスペクティブの意味が分からなくなって、他の作業や MTG をしてしまう。
```

### 症状

- レトロスペクティブ必要ないよね
- 特に話す事ないね
と言う声がチームから上がってくる

#### 解決方法

悪いことを改善するのではなく、良いことをさらに良くするのを提案する。`positive retrospective` や `team radar retrospective(*3)` をやる。
筆者が作った `futurespective` も良い。

`futurespective` is what?

- 振り返りのように過去ではなく、未来に着目する
- 一週間 or 一ヶ月 or 一年 など、適したタイムラインを設定する
- そのタイムラインで、良い・悪いことが起こりそうなイベントを配置する
- 未来のことなので分からないけど、チームメンバーが希望していること・心配していることを共有
- それぞれのイベントについて原因や背景を議論する

`The Ship` と言う方法もある。目標があって、そこに到達するために「必要なこと」「継続すること」「障害になること」を議論するイメージ

## Chapter 8 Political Vote

事例
```

```

### 症状

#### 解決方法

## Chapter 9 Team, Really?

他のチームと掛け持ちしているメンバーがいる。
コンテキストスイッチを減らすために、連続した日チームの仕事する。会議は参加したいのだけ、参加する。
また、質問したいことがあっても他のチームなので質問できるのが一週間後とかになる。病気や有給を使っていたら、もっと遅くなってしまう。
```

> The picture that is drawn by gathering data from the whole team is invaluable in understanding, or in other words, inspecting, how the work is done in the team. 
> The experiments that are decided on—the changes made to the way the team works together or with the technology—are also important outcomes of a retrospective because these experiments are the way the team adapts to the situation at hand. 
> When a member of the team or someone who works closely with the team is absent from the retrospective, the actions decided on may not be acceptable for all. 
> Perhaps the decisions even cause problems, such as with the architecture, the UI, or the tests, that the missing team member could have foreseen. 
> This inspecting and adapting is the heart of agile development.

> Last but not least, I have often heard people say that a retrospective feels like group therapy for the team and that it is where they start sharing and feeling like part of a team. 
> People who do not attend the retrospectives consequently might feel less like part of the team. 

良いことを言っている

### 症状

朝会でストーリーを実装している人がいなかったり、意見を聞くべき人が欠席している

#### 解決方法
朝会はコアチームや問題を解決することができる人全員が参加するべき。では、この全員が誰なのかどのように知るのか?




## Chapter 10 Do It Yourself

事例
```

```

### 症状

#### 解決方法


## Chapter 11 Death by Postponement

事例
```

```

### 症状

#### 解決方法


## Chapter 12 Get It Over With

事例
```

```

### 症状

#### 解決方法


## Chapter 13 Disregard for Preparation

事例
```

```

### 症状

#### 解決方法


## Chapter 14 Suffocating

事例
```

```

### 症状

#### 解決方法


## Chapter 15 Curios Manager

事例
```

```

### 症状

#### 解決方法


## Chapter 16 Peek-A-Boo

事例
```

```

### 症状

#### 解決方法


## Chapter 17 Disillusioned Facilitator

事例
```

```

### 症状

#### 解決方法


## Chapter 18 Loudmouth

事例
```

```

### 症状

#### 解決方法


## Chapter 19 Silent One

事例
```

```

### 症状

#### 解決方法


## Chapter 20 Negative One

事例
```

```

### 症状

#### 解決方法


## Chapter 21 Nagative Team

事例
```

```

### 症状

#### 解決方法


## Chapter 22 Lack of Trust

事例
```

```

### 症状

#### 解決方法


## Chapter 23 Different Cultures

事例
```

```

### 症状

#### 解決方法


## Chapter 24 Dead Silence

事例
```

```

### 症状

#### 解決方法

## 補足

1. http://hrtechwine.com/start-stop-continue/
2. ドット投票のことを、dotmocracy とも言う。
3. https://www.slideshare.net/TakaoOyobe/ss-49800818