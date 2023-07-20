import http from 'k6/http';
import { sleep } from 'k6';
import student from '../student/student.mjs';

const LIST_COURSES_URL = 'http://web:3000/courses';
const OTP_LOGIN_URL = 'http://web:3000/auth/login/otp';

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '4m', target: 1000 },
    { duration: '1m', target: 0 },
  ],
};

export const setup = () => {
  sleep(5);
  const { email, otp } = student;

  const res = http.post(
    OTP_LOGIN_URL,
    { email, otp },
    {
      tags: { name: 'login', scenario: 'otp' },
    },
  );

  const { access_token } = res.json();

  return { headers: { Authorization: `Bearer ${access_token}` } };
};

export default function (options) {
  http.get(LIST_COURSES_URL, {
    tags: { name: 'course', scenario: 'list' },
    headers: options.headers,
  });
}
