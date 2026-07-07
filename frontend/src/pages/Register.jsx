import React from 'react';
import { SignUp } from '@clerk/clerk-react';

export default function Register() {
  return (
    <div className="flex justify-center">
      <SignUp routing="path" path="/register" signInUrl="/login" />
    </div>
  );
}
