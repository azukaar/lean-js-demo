function $int(i) {
    if (i !== null && i !== undefined) return int(i)
    else return true
}

function $string(i) {
    if (i !== null && i !== undefined) return string(i)
    else return true
}

function int(i) {
    if (typeof i !== 'number') {
        return false;
    } else if (i !== parseInt(i)) {
        return false;
    }
    return true;
}

function string(i) {
    return typeof i === 'string';
}

function any(a) {
    return true;
}

function filterError(e) {
    if(e.stack) {
        const stack = e.stack.split('\n');
        e.stack = stack.filter((s) =>
            !s.match(/^\s+at Object.typingobjectres/) &&
            !s.match(/^\s+at typed \(/) &&
            !s.match(/^\s+at Array.typingobjectres/)
        ).join('\n')
    }
    return e;
}

function type(name, _custom) {
    if(_custom && {}.toString.call(_custom) === '[object Function]') {
        const typingobjectres = _custom
        typingobjectres._name = name;
        return typingobjectres;
    } else {
        function typingobjectres(value) {
            const custom = _custom;

            if (typeof value !== 'object') {
                return new Error('JSON type: ' + value + ' should be an object');
            }

            for (c in custom) {
                const checking = custom[c](value[c]);
                if(!checking) {
                    if(typeof value[c] === "undefined") {
                        return new Error('JSON Type: Missing attribute ' + c + ' of type ' + (custom[c]._name || custom[c].name));
                    } else {
                        return new Error('JSON Type: Attribute ' + c + ' (with value ' + JSON.stringify(value[c]) + ') should be of type ' + (custom[c]._name || custom[c].name) + ' instead of ' + typeof value[c]);
                    }
                } else if (typeof checking === 'object' && checking.name === 'Error') {
                    const type_error = checking;
                    throw filterError(type_error);
                }
            }
    
            return value;
        }
        typingobjectres._name = name;
        return typingobjectres
    }
}

function typed() {
    const args = Array.from(arguments);

    if(NODE_ENV !== 'production') {
        for(let a = 0; a < args.length ; a+=2) {
            const checking = args[a](args[a + 1]);
            if(!checking) {
                var type_error = new Error('Type: Variable at position ' + a / 2 + ' (with value ' + JSON.stringify(args[a + 1]) + ') should be of type ' + (args[a]._name || args[a].name)+ ' instead of ' + typeof args[a + 1]);
                throw filterError(type_error);
            } else if (typeof checking === 'object' && checking.name === 'Error') {
                const type_error = checking;
                throw filterError(type_error);
            }
        }    
    }

    if(args.length == 2) 
        return args[1]
    else {
        const res = [];
        for(let a = 0; a < args.length ; a+=2) {
            res.push(a+1);
        }
        return res;
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        $int,
        $string,
        int,
        string,
        any,
        typed,
        type
    }
} else {
    // export {
    //     $int,
    //     $string,
    //     int,
    //     string,
    //     any,
    //     type
    // }
}
