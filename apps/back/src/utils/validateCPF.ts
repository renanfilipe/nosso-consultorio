import formatStringToOnlyNumbers from './formatStringToOnlyNumbers'

const getValidationDigit = (value: number): number => {
  const remainder = (value * 10) % 11;

  return remainder === 10 ? 0 : remainder;
};

const sumDigits = (values: number[]): number => {
  let counter = 1;

  return values.reduceRight((acc, item) => {
    counter += 1;

    return acc + item * counter;
  }, 0);
};

const validateCPF = (rawCpf: string): boolean => {
  const cpf = formatStringToOnlyNumbers(rawCpf);

  const isCPFWithSameDigit = /^(\d)\1{10}$/.test(cpf);
  if (cpf === '' || isCPFWithSameDigit || cpf.length !== 11) {
    return false;
  }

  const firstNineDigits = cpf.slice(0, 9).split('').map(Number);
  const [firstValidationDigit, secondValidationDigit] = cpf
    .slice(9)
    .split('')
    .map(Number);

  const firstNineDigitsSum = sumDigits(firstNineDigits);
  const validateFirstDigit = getValidationDigit(firstNineDigitsSum);

  const firstTenDigitsSum = sumDigits([
    ...firstNineDigits,
    firstValidationDigit,
  ]);
  const validateSecondDigit = getValidationDigit(firstTenDigitsSum);

  return (
    firstValidationDigit === validateFirstDigit &&
    secondValidationDigit === validateSecondDigit
  );
};

export default validateCPF;
