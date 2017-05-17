var webpack = require('webpack');
var path = require('path');
var WebpackStrip = require('strip-loader');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/dev-server',
        path.join(__dirname, './app/app.js')
    ],

	output: {

		filename: '[name]-[hash].min.js',
		path : path.join(__dirname, 'build') ,
		sourceMapFilename : 'bundle.map.js',
		
	},

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
			
			{ 
				test: /\.js$/, 
				loader: WebpackStrip.loader('debugger', 'console.log'),
				exclude: /node_modules/,
			}	
		]
	},

	resolve : {
	    alias: {
	        Page : path.resolve(__dirname, 'app/page/'),
	        
	        Widget : path.resolve(__dirname , 'app/widget'),
	        
	        
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
      	

        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            inject: 'body',
            filename: 'index.html'
        })
    ]
};
