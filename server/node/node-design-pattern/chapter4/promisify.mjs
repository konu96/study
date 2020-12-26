export default callbackBasedAPI => {
    return () => {
        // ref: https://qiita.com/LightSpeedC/items/5cf07f94b051d0a8d4f1#large_blue_circleslice%E3%82%92%E5%91%BC%E3%82%93%E3%81%A7array%E3%81%AB%E5%A4%89%E6%8F%9B%E3%81%99%E3%82%8B
        const args = [].slice.call(arguments);
        return new Promise((resolve, reject) => {
            args.push((error, result) => {
                if (error) {
                    return reject(error);
                }

                if (arguments.length <= 2) {
                    return resolve(result);
                }

                // [].slice.call([1, 2, 3, 4], 1) => [2, 3, 4]
                resolve([].slice.call(arguments, 1));
            });
            callbackBasedAPI.apply(null, args);
        });
    };
}
