import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Stick-It! | Verify Your Email',
}

export default function VerifyPage() {
  return (
    <main className="flex justify-center items-center h-screen my-0">
      <div className="w-1/2">
        <h1 className="uppercase text-2xl mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 font-bold w-fit mx-auto">Thanks for registering!</h1>
        <h1 className="uppercase text-2xl mb-4 px-2 py-1 -skew-x-6 border-2 border-light-four bg-light-three/50 font-bold w-fit mx-auto">Before logging in, you need to verify your email address.</h1>
      </div>
    </main>
  )
}