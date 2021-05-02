<style>
	.option{
		color:gray;
		font-style:italic;
	}
	.hero{
		color:lightgreen;
	}
	.magic{
		color:mediumblue;
		font-style:italic;
	}
	.mechanism{
		font-style:italic;
	}
	.type{
		color:Turquoise;
	}
</style>

21.4.25
1. <code>init upd.md</code>
2. <code>init intro.md</code>

21.4.28
1. <code>delete intro.md</code>
2. <code>bug fix:</code> two player shares the same deck with the <span class="option">reflexing deck</span> option on

21.5.1
1. <code>bug fix:</code> the buff of the <span class="hero">knight's</span> skill and the exhaustion count is equivalent
2. <code>card modify:</code> <span class="magic">cloing</span> creature won't trigger <span class="mechanism">appear</span>
3. <code>card modify:</code> <span class="magic">to_sheep</span> won't trigger <span class="mechanism">death</span>

21.5.2
1. <code>new <span class='type'>Hero</span>:</code>Summoner
	+ <code>attr:</code> $\scriptsize (0+0)/30$
	+ <code>skill:</code>
		+ <code>cost:</code> $\scriptsize 2$
		+ <code>effect:</code>summon a random <span class="type">Summon</span>
2. <code>new type:</code>
	+ <code>name:</code><span class='type'>Summon</span>
	+ <code>parent type:</code><span class="type">Creature</span>
	+ <code>description:</code>a group of <span class='type'>Creature</span> that can only be summoned by <span class='hero'>Summoner</span>
3. <code>new <span class='type'>Summon</span>:</code>
	+ <code>name:</code>标准型召唤兽
	+ <code>attr:</code>$\scriptsize 2/(2+0)/2 $
	+ <code>special effect:</code>null
4. <code>new <span class='type'>Summon</span>:</code>
	+ <code>name:</code>攻击型召唤兽
	+ <code>attr:</code>$\scriptsize 2/(3+0)/1 $
	+ <code>special effect:</code><span class='mechanism'>Charge</span>
5. <code>new <span class='type'>Summon</span>:</code>
	+ <code>name:</code>防御型召唤兽
	+ <code>attr:</code>$\scriptsize 2/(1+0)/3 $
	+ <code>special effect:</code><span class='mechanism'>Taunt</span>
6. <code>beautify upd.md</code>
7. <code>new <span class='type'>Summon</span>:</code>
	+ <code>name:</code>法术型召唤兽
	+ <code>attr:</code>$\scriptsize 2/(0+1)/1 $
	+ <code>special effect:</code><span class='mechanism'>Ms+1</span>