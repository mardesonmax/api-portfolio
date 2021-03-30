export default {
  jtw: {
    secret: process.env.SECRET_KEY || 'default',
    expiresIn: process.env.EXPIRED || '1d',
  },
};
