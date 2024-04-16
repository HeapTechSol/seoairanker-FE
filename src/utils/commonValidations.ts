export const CommonValidations = {
  requiredMessage: (name: string) => `${name} is required`,
  minCount: 3,
  minCountMessage: (name: string, count: number) =>
    `${name} should contain atleast ${count} characters`,
  maxCount: 100,
  maxCountMessage: (name: string, count: number) =>
    `${name} should contain atmost ${count} characters`,
  invalidEmail: "Invalid Email",
  onlyAlphabets: (name: string) =>
    `Invalid ${name} (Only Alphabets are allowed)`,
};
