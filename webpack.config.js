var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/dev-server',
        
        path.join(__dirname, './app/app.js')
    ],

	output: {

		filename : 'bundle.js',
		path : path.join(__dirname, 'build') ,
		sourceMapFilename : 'bundle.map.js',
		
	},
	devtool: "source-map",

	module: {

		loaders:[
			{ 
				test: /\.css$/, 
				loader: 'style-loader!css-loader' 
			},
			{
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader?strictMath&noIeCompat"
			},
			
			{ 
				test: /\.(png|jpg)$/,    
				loader: "url-loader?limit=10000" 
			},
			
			
		]
	},

	resolve : {
	    alias: {
	        Page : path.resolve(__dirname, 'app/page/'),
	        Widget : path.resolve(__dirname , 'app/widget'),
	        Config : path.resolve(__dirname , 'app/config'),
	    }
	},
	
	externals: {
	    
	    "jquery": "jQuery"
	    
	},

	devServer: {
        hot: true,
        inline: true
    },

    plugins: [
    	new webpack.NoErrorsPlugin(), 
      	new webpack.HotModuleReplacementPlugin(),
      	
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            inject: 'body',
            filename: 'index.html'
        })
    ]
};
