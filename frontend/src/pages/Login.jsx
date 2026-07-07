import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export default function Login() {
  return (
    <div className="flex justify-center">
      <SignIn routing="path" path="/login" signUpUrl="/register" />
    </div>
  );
}
