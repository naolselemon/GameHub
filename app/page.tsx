import { SignedIn, UserButton } from '@clerk/nextjs';
export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col gap-y-4 ">
      <h1>Dashboard</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
