import loadModule from './loadModule';

const requireMine = moduleName => {
    console.log(`RequireMine invoked for module: ${moduleName}`);

    const id = requireMine.resolve(moduleName);
    if (requireMine.cache[id]) {
        return requireMine.cache[id].exports;
    }

    const module = {
        exports: {},
        id,
    };

    requireMine.cache[id] = module;
    loadModule(id, module, requireMine);

    return module.exports;
};

requireMine.cache = {};
requireMine.resolve = moduleName => {
    // TODO: implement
};
