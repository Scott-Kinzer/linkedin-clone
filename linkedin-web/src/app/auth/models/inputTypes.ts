export enum InputTypes {
  FirstName = 'firstName',
  LastName = 'lastName',
  Email = 'email',
  Password = 'password',
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
