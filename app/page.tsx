import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"

export default function GridBackgroundDemo() {
    return (
        <div className="h-[50rem] w-full bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <Card>
                <CardHeader>

                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    );
}