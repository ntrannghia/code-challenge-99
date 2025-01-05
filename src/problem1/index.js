var isPositiveNumber = function(input) {
    return typeof input === 'number' && input > 0;
}

var sum_to_n_a = function(n) {
    // your code here
    if (!isPositiveNumber(n)) {
        return n;
    }
    // using The arithmetic series summation formula 
    return (n * (n + 1)) / 2;
};

var sum_to_n_b = function(n) {
    // your code here
    if (!isPositiveNumber(n)) {
        return n;
    }
    var sum = 0;
    Array.from({ length: n }, (_, i) => i + 1).forEach(num => {
        sum += num;
    });
    return sum;
};

var sum_to_n_c = function(n) {
    // your code here
    if (!isPositiveNumber(n)) {
        return n;
    }
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i; // O(n)
    }
    return sum;
};