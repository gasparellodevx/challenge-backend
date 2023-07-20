import http from 'k6/http';
import { sleep } from 'k6';
import student from '../student/student.mjs';

const LOGIN_URL = 'http://web:3000/auth/login';
const OTP_LOGIN_URL = 'http://web:3000/auth/login/otp';

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '4m', target: 1000 },
    { duration: '1m', target: 0 },
  ],
};

export const setup = () => sleep(5);

export default function () {
  const { email, otp } = student;

  http.post(
    LOGIN_URL,
    { email },
    {
      tags: { name: 'login', scenario: 'email' },
    },
  );
  sleep(2);
  http.post(
    OTP_LOGIN_URL,
    { email, otp },
    {
      tags: { name: 'login', scenario: 'otp' },
    },
  );
}
