export function  imgUrl(x) {
  let baseUrl = 'http://img.cdn.hljcxiaoxiong.com/'
  return baseUrl + x
}

export function formatMoney(x) {
  let s = (x/100).toFixed(2)
  if(s=='NaN'){
    return x
  }else {
    return s;
  }
}

