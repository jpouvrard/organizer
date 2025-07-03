import Quill from "quill";
import type { Delta as QuillDelta, Range as QuillRange } from "quill";
import { useEffect, useLayoutEffect, useRef } from "react";

import "quill/dist/quill.snow.css";

type editorPropsType = {
    readOnly?: boolean;
    defaultValue?: QuillDelta | null;
    onTextChange?: (delta: QuillDelta, oldDelta: QuillDelta, source: string) => void;
    onSelectionChange?: (range: QuillRange | null, oldRange: QuillRange | null, source: string) => void;
    ref: React.RefObject<Quill | null>;
};

// Editor is an uncontrolled React component
const Editor = ({ readOnly, defaultValue, onTextChange, onSelectionChange, ref }: editorPropsType) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
        onTextChangeRef.current = onTextChange;
        onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
        ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const editorContainer = container.appendChild(container.ownerDocument.createElement("div"));
        const quill = new Quill(editorContainer, {
            theme: "snow",
        });

        ref.current = quill;

        if (defaultValueRef.current) {
            quill.setContents(defaultValueRef.current);
        }

        quill.on(Quill.events.TEXT_CHANGE, (...args) => {
            onTextChangeRef.current?.(...args);
        });

        quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
            onSelectionChangeRef.current?.(...args);
        });

        return () => {
            ref.current = null;
            container.innerHTML = "";
        };
    }, [ref]);

    return <div ref={containerRef} />;
};

Editor.displayName = "Editor";

export default Editor;
