"use client";

import React, { useEffect, useRef } from 'react';
import {
    EditorView,
    keymap,
    highlightSpecialChars,
    drawSelection,
    highlightActiveLine,
    lineNumbers
} from '@codemirror/view';
import { defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching } from '@codemirror/language';
import { tomorrow } from 'thememirror'

import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';

import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { closeBrackets } from '@codemirror/autocomplete';
import { EditorState, Compartment } from '@codemirror/state';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language: string;
}

function getLanguageExtension(language: string) {
    switch (language) {
        case 'JavaScript':
            return javascript();
        case 'Java':
            return java();
        case 'C++':
            return cpp();
        case 'Python':
            return python();
        default:
            return [];
    }
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language }) => {
    const languageCompartment = useRef(new Compartment());
    const editorViewRef = useRef<EditorView | null>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!editorContainerRef.current) return;

        const startState = EditorState.create({
            doc: value,
            extensions: [
                syntaxHighlighting(defaultHighlightStyle),
                drawSelection(),
                highlightActiveLine(),
                indentOnInput(),
                keymap.of([indentWithTab, ...defaultKeymap]),
                closeBrackets(),
                languageCompartment.current.of(getLanguageExtension(language)),
                EditorState.tabSize.of(3),
                EditorView.lineWrapping,
                EditorView.updateListener.of(update => {
                    onChange(update.state.doc.toString());
                }),
                bracketMatching(),
                highlightSpecialChars(),
                lineNumbers(),
                tomorrow
            ],
        });

        const editorView = new EditorView({
            state: startState,
            parent: editorContainerRef.current,
        });

        editorViewRef.current = editorView;

        return () => {
            editorView.destroy();
        };
    }, []);

    useEffect(() => {
        const editorView = editorViewRef.current;
        if (editorView) {
            const currentValue = editorView.state.doc.toString();
            if (value !== currentValue) {
                editorView.dispatch({
                    changes: {
                        from: 0,
                        to: currentValue.length,
                        insert: value,
                    },
                });
            }
        }
    }, [value]);

    useEffect(() => {
        const editorView = editorViewRef.current;
        if (editorView) {
            editorView.dispatch({
                effects: languageCompartment.current.reconfigure(getLanguageExtension(language)),
            });
        }
    }, [language]);


    return <div className="h-full w-full" ref={editorContainerRef}></div>
};

export default CodeEditor;