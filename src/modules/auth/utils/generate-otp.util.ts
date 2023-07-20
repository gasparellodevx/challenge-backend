import { OTP_LENGTH } from '../auth.constants';

export function generateOTP(length = OTP_LENGTH) {
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const NUMBERS = '0123456789';

  let otp = '';

  const pickRandom = (str: string) =>
    str.charAt(Math.floor(Math.random() * str.length));

  const shuffle = (str: string) =>
    str
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');

  while (otp.length < length) {
    const letter = pickRandom(LETTERS);
    const digit = pickRandom(NUMBERS);

    otp += `${letter}${digit}`;
  }

  return shuffle(otp.substring(0, length));
}
