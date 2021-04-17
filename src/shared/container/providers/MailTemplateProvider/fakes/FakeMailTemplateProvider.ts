import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  async parse(): Promise<string> {
    return 'Fake Template';
  }
}

export default FakeMailTemplateProvider;
