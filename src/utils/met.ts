
import BigNumber from 'bignumber.js';

const $number = (val = 1) => {
    return new BigNumber(val);
};
const $shiftedBy = (data, acc) => {
    if(!data) return 0
    acc = Number(acc)
    return $number(data).shiftedBy(acc);
};
const $getRate = (item) => {
    const pl = $number(item.totalBorrow).plus(item.totalSupply);
    const val = $number(item.totalBorrow).dividedBy(pl).multipliedBy(100);
    return val.toFixed(2);
};
const $toFixed = (data, acc) => {
    return $number(data).toFixed(acc);
};
const $sort = (dataArray, sortColumn, isDesc) => {
    return dataArray.sort((pre, next) => {
        // console.log(pre);
        return isDesc ? (next[sortColumn] - pre[sortColumn]) : (pre[sortColumn] - next[sortColumn]);
    });
};

//  1:  x>y;    -1:	x<y;        0: x==y
const $comparedTo = (x, y) => {
    x = new BigNumber(x || 0);
    y = new BigNumber(y || 0);
    return x.comparedTo(y);
};

// input val filter
const $filterNumber = (e) => {
    function clearNoNum(val) {
        // 先把非数字的都替换掉，除了数字和.
        val = val.replace(/[^\d.]/g, '');

        // 保证只有出现一个.而没有多个.
        val = val.replace(/\.{2,}/g, '.');

        // 必须保证第一个为数字而不是.
        val = val.replace(/^\./g, '');

        // 保证.只出现一次，而不能出现两次以上
        val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');

        return val
    }
    e.target.value = clearNoNum(e.target.value);
}

const install = Vue => {
    if ((<any> install).installed) return;// 如果已经注册过了，就跳过
    (<any> install).installed = true;
    Object.defineProperties(Vue.prototype, {
        $number: {
            get() {
                return $number;
            }
        },
        $toFixed: {
            get() {
                return $toFixed;
            }
        },
        $shiftedBy: {
            get() {
                return $shiftedBy;
            }
        },
        $getRate: {
            get() {
                return $getRate;
            }
        },
        $api: {
            get() {
                return '';
            }
        },
        $sort: {
            get() {
                return $sort;
            }
        },
        $comparedTo: {
            get() {
                return $comparedTo;
            }
        },
        $filterNumber: {
            get() {
                return $filterNumber;
            }
        }
    });

};

export default install;
