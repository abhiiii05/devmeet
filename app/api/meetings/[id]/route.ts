import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { title, date, time, attendees, link } = await request.json();

        const { data, error } = await supabase
            .from("meetings")
            .update({ title, date, time, attendees, link })
            .eq("id", id)
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data[0], { status: 200 });
    } catch (error) {
        console.error("Error deleting meeting:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const { error } = await supabase
            .from("meetings")
            .delete()
            .eq("id", id);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ message: "Meeting deleted successfully" }, { status: 200 });
    }
    catch (error) {
        console.error("Error deleting meeting:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}