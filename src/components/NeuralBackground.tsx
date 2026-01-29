/**
 * Neural Network Background Animation
 * A subtle, hi-tech animated background with floating nodes and connections
 * Renders on canvas for performance
 */

"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    pulsePhase: number;
}

interface NeuralBackgroundProps {
    nodeCount?: number;
    connectionDistance?: number;
    nodeColor?: string;
    lineColor?: string;
}

export default function NeuralBackground({
    nodeCount = 40,
    connectionDistance = 150,
    nodeColor = "26, 35, 126",
    lineColor = "26, 35, 126",
}: NeuralBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const animationRef = useRef<number>(0);

    const initNodes = useCallback(
        (width: number, height: number) => {
            const nodes: Node[] = [];
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.3 + 0.1,
                    pulsePhase: Math.random() * Math.PI * 2,
                });
            }
            return nodes;
        },
        [nodeCount]
    );

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const nodes = nodesRef.current;
        const time = Date.now() * 0.001;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw nodes
        nodes.forEach((node, i) => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            // Keep in bounds
            node.x = Math.max(0, Math.min(width, node.x));
            node.y = Math.max(0, Math.min(height, node.y));

            // Pulse effect
            const pulse = Math.sin(time * 0.5 + node.pulsePhase) * 0.3 + 0.7;

            // Draw connections to nearby nodes
            for (let j = i + 1; j < nodes.length; j++) {
                const other = nodes[j];
                const dx = other.x - node.x;
                const dy = other.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.15 * pulse;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${nodeColor}, ${node.opacity * pulse})`;
            ctx.fill();
        });

        animationRef.current = requestAnimationFrame(animate);
    }, [connectionDistance, nodeColor, lineColor]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            nodesRef.current = initNodes(canvas.width, canvas.height);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        // Start animation
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initNodes, animate]);

    return (
        <div className="neural-bg" aria-hidden="true">
            <canvas ref={canvasRef} className="neural-canvas" />
            {/* CSS fallback nodes for non-JS environments */}
            <div className="neural-nodes">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="neural-node" />
                ))}
            </div>
            <div className="neural-grid" />
        </div>
    );
}
