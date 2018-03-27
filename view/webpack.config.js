const path = require('path');
const projectRootPath = __dirname;

module.exports = {
    context: projectRootPath,
    entry: './src/App.tsx',
    output: {
        path: path.resolve('../public'),
        publicPath: 'resources',
        filename: 'bundle.js'
    },
    devtool: '#source-map',
    resolve: {
	extensions: ['*', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx'],
	modules: [
	    path.resolve('./src'),
	    path.resolve('../node_modules')
	]
    },
    module: {
        loaders: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
    }
}
