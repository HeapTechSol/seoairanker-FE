export const SchemaConstants = {
  firstName: {
    minCount: 3,
    maxCount: 100,
  },
  lastName: {
    minCount: 3,
    maxCount: 100,
  },
  password: {
    minCount: 8,
    maxCount: 100,
    invalidPassword: 'Password should contain one uppercase letter and one special character.',
  },
}