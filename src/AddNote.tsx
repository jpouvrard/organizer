import Quill, { type Delta as QuillDelta } from "quill";
import { useRef, useState } from "react";

import Editor from "@/components/Editor";

const Delta = Quill.import("delta");

export default function AddNote() {
    const [lastChange, setLastChange] = useState<QuillDelta | null>(null);
    // Use a ref to access the quill instance directly
    const quillRef = useRef(null);

    return (
        <div className="mx-auto max-w-[700px]">
            <Editor
                ref={quillRef}
                readOnly={false}
                defaultValue={new Delta()
                    .insert("Hello ")
                    .insert("world", { bold: true })
                    .insert("!")
                    .insert("\n")
                    .insert("This is a ")
                    .insert("rich text editor", { italic: true })
                    .insert("\n")
                    .insert("You can type here")
                    .insert(" ")
                    .insert("content", { underline: true })
                    .insert("\n")}
                onTextChange={(delta: QuillDelta) => {
                    setLastChange(delta);
                }}
            />
        </div>
    );
}
