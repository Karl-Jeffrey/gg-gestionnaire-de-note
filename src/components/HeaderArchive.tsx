import { getUser } from "@/lib/auth"
import { Lilita_One } from "next/font/google";
import UserButton from "./UserButton";
import NewNoteButton from "./NewNoteButton";
import HomeButton from "./homeButton";

const lilita =Lilita_One({ weight: "400", subsets: ["latin"]})


async function HeaderArchive() {
    const user = await getUser()
  return (
    <div className="bg-popover relative mt-2 flex h-20 w-full max-w-5xl items-center justify-between rounded-lg px-4">
        <UserButton user={user} />

        <h1 className={`text-secondary text-4xl sm:text-5xl ${lilita.className}`}>Archive</h1>
       <HomeButton/>
        
        <NewNoteButton/>
        </div>
  )
}

export default HeaderArchive