// // import React from "react";
// import * as React from "react"
//
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/app/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
//
//
// export default function GridBackgroundDemo() {
//     return (
//         <div className="h-[50rem] w-full bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
//             {/* Radial gradient for the container to give a faded look */}
//             <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
//             <Card className="w-[350px]">
//                 <CardHeader>
//                     <CardTitle>User Login </CardTitle>
//                     {/*<CardDescription>Deploy your new project in one-click.</CardDescription>*/}
//                 </CardHeader>
//                 <CardContent>
//                     <form>
//                         <div className="grid w-full items-center gap-4">
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="name">Name</Label>
//                                 <Input id="name" placeholder="Email" />
//                             </div>
//                             <div className="flex flex-col space-y-1.5">
//                                 <Label htmlFor="framework">Password</Label>
//                                 <Input id="name" placeholder="Password" />
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                     <Button variant="outline">Login</Button>
//                     <Button>Sign Up</Button>
//                 </CardFooter>
//             </Card>
//         </div>
//     );
// }
import React from "react";
import { login, signup } from './actions'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    return (
        <div
            className="h-[50rem] w-full dark:bg-black bg-black  dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div
                className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <Card className="w-[350px]">
        <CardHeader>
            <CardTitle>User Login </CardTitle>
            {/*<CardDescription>Deploy your new project in one-click.</CardDescription>*/}
        </CardHeader>
        <CardContent>
            <form>
                <Label htmlFor="email">Email:</Label>
                <Input id="email" name="email" type="email" required/>
                <Label htmlFor="password">Password:</Label>
                <Input id="password" name="password" type="password" required/>
                <div className="py-4">
                    <Button formAction={login} variant="outline" className=" w-full bg-blue-500 text-white font-bold">Log
                        in</Button>
                </div>

                <div className="py-1">
                    <Button formAction={login} variant="outline" className=" w-full bg-blue-500 text-white font-bold">Sign Up
                    </Button>
                </div>

            </form>
        </CardContent>

        <CardFooter className="flex justify-between">
            {/*<Button formAction={login} variant="outline">Login</Button>*/}
            {/*<Button>Sign Up</Button>*/}
                </CardFooter>
            </Card>
        </div>
    )
}