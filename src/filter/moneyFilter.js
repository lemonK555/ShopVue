//若money未被赋值，则给与默认值0
export function toMoney(money = 0){
	//toFixed把number四舍五入为指定小数位数的数字
    return money.toFixed(2)
}