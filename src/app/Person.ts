export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  export const personValidationMessages = {
    firstName: [
      { type: 'required', message: 'First name is required' },
      { type: 'maxlength', message: 'First name cannot be more than 25 characters long' }
    ],
    lastName: [
      { type: 'required', message: 'Last name is required' },
      { type: 'maxlength', message: 'Last name cannot be more than 25 characters long' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email address' }
    ]
  };
  