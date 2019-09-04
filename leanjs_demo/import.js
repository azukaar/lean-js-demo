function dependency(dep) {
    // node js
    if(typeof require !== "undefined") {
        return Promise.resolve(require(dep))
    } else {
        return fetch(`/node_modules/${dep}/package.json`)
        .then(res => res.json())
        .then(res => {
            return import(`/node_modules/${dep}/${res['jsnext:main'] || res['module'] || res['main']}`);
        })
    }
}

// in Node JS use global.dependency = dependency

if(typeof module !== "undefined") {
    module.exports = dependency;
}