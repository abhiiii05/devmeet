import { NextResponse } from "next/server";
import { supabase } from "../../lib/supabaseClient";
import {from} from "stylis";

//Fetch request ( GET ) : getting all the meeting details
export async function GET(){
    try{
        const {data, error} = await supabase.from("meetings").select("*");
        console.log(data);
        if (error){
            return NextResponse.json({error: error.message}, {status : 400});
        }

        return NextResponse.json( data || [], { status: 200 });

    }
    catch(error){
        return NextResponse.json({error:"Internal Server Error"}, {status : 500});
    }

}

// export async function POST(request:Request, response:Response){
//     try {
//         const { title, date, time, attendees, link } = await request.json();
//         const { data, error } = await supabase
//             .from("meetings")
//             .insert([{ title, date, time, attendees, link, isStarred: false }])
//             .select();
//
//         if (error){
//             return NextResponse.json({error: error.message}, {status : 400});
//         }
//     }
// }