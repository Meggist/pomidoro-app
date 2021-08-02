const isProd = process.env.NODE_ENV === 'production';
let plug = [];
if (isProd)
{ plug = [require('autoprefixer')]; }
module.exports = { plugins: plug }
