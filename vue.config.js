module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3050',
        changeOrigin: true,
      },
    },
  },
};