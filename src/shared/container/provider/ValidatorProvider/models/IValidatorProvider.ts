export default interface IValidatorProvider {
  isEmail(email: string): Promise<boolean>;
  required(item: string | number): Promise<boolean>;
}
