import { DialogDemo } from "./Page/FormRegister";
import { UsersCard } from "./Page/SeeUsers";

export function Home() {
  return <>
  <div>
  <h1 className="p-4">Welcome</h1>
  <p>This is my test how import APIs</p>
  <p>Use no moderation</p>
  </div>
  <div>
    <DialogDemo/>
    <UsersCard/>
  </div>


  </>
}