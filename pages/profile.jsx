import React from "react";
import ProfileM from "../components/ProfileM";

export default function Profile() {
  const name = 'John Doe';
  const age = 25;
  const email = 'johndoe@example.com';

  return (
    <>
      <div className='flex items-center'>
        <ProfileM model={"/models/profile.glb"} size={1.2} />
      </div>
    </>
  );
}


