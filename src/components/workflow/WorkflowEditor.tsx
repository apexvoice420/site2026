"use client";

import { useCallback, useState } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { saveWorkflow } from "@/app/actions/workflows";

const initialNodesDefault: any[] = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start Call' }, type: 'input' },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'Say Welcome Message' } },
];
const initialEdgesDefault: any[] = [{ id: 'e1-2', source: '1', target: '2' }];

export function WorkflowEditor({ workflowId, initialData }: { workflowId: string, initialData?: any }) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialData?.nodes || initialNodesDefault);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialData?.edges || initialEdgesDefault);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const handleSave = async () => {
        console.log("Saving workflow...", { nodes, edges });
        const result = await saveWorkflow(workflowId, { nodes, edges });
        if (result.success) {
            alert("Workflow saved!");
        }
    };

    return (
        <div className="h-[calc(100vh-200px)] border rounded-lg overflow-hidden bg-slate-50 relative">
            <div className="absolute top-4 right-4 z-10">
                <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Save Workflow
                </Button>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
