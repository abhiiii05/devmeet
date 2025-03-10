import {NextRequest, NextResponse} from "next/server";
import { supabase } from "../../../lib/supabaseClient";



export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        // Parse the request body
        const { title, date, time, attendees, link } = await request.json();

        // Update the meeting in Supabase
        const { data, error } = await supabase
            .from('meetings')
            .update({ title, date, time, attendees, link })
            .eq('id', id)
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        // Return the updated meeting data
        return NextResponse.json(data[0], { status: 200 });
    } catch (error) {
        console.error('Error updating meeting:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        // Delete the meeting from Supabase
        const { error } = await supabase
            .from('meetings')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        // Return a success message
        return NextResponse.json({ message: 'Meeting deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting meeting:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}