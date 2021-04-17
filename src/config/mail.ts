interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'mardeson@maxpb7.tk',
      name: 'Mardeson da MAXPB7',
    },
  },
} as IMailConfig;
