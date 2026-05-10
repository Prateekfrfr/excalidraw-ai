import { Stage, Layer, Rect } from 'react-konva';
import useStore from '../store';
import React, { useRef, useEffect } from 'react';
import ShapeRenderer from './ShapeRenderer';
import MultiplayerCursors from './MultiplayerCursors';

function Canvas() {
    const { shapes, tool, color,strokeWidth, canvasBackground, selectedShape, setSelectedShape, updateShapes ,setTool,cursors, stagePos, setStagePos, fillStyle, setPropertyPanelVisible} = useStore();
    const isDrawing = useRef(false);
    const stageRef = useRef(null);
    useEffect(() => {
    document.documentElement.style.setProperty('--canvas-bg', canvasBackground);
    }, [canvasBackground]);
        useEffect(() => {
        const handleExport = () => {
            const uri = stageRef.current.toDataURL();
            const link = document.createElement("a");
            link.download = "excalidraw-masterpiece.png";
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        window.addEventListener("export-canvas", handleExport);
        return () => window.removeEventListener("export-canvas", handleExport);
    }, []);

        useEffect(() => {
        const handleImageUpload = (e) => {
            const base64Src = e.detail;
            const currentStore = useStore.getState();
            const newShape = {
                id: Date.now().toString(),
                type: "image",
                x: window.innerWidth / 2 - 100,
                y: window.innerHeight / 2 - 100,
                src: base64Src,
            };
            currentStore.updateShapes([...currentStore.shapes, newShape]);
            currentStore.setTool("select");
        };

        window.addEventListener("upload-image", handleImageUpload);
        return () => window.removeEventListener("upload-image", handleImageUpload);
    }, []);



    const handleMouseDown = (e) => {
        if (e.target === e.target.getStage()) {
            setPropertyPanelVisible(false);
            setSelectedShape(null);
        } else if (tool !== "select" && tool !== "hand" && tool !== "eraser") {
            setPropertyPanelVisible(false);
        }
        if (tool === "select" || tool === "eraser" || tool === "hand") return;
        const stage = e.target.getStage();
        const pointerPosition = stage.getPointerPosition();
        const pos = {
            x: (pointerPosition.x - stage.x()) / stage.scaleX(),
            y: (pointerPosition.y - stage.y()) / stage.scaleY()
        };
        if (tool === "text") {
            const textValue = prompt("What do you want to type?");
            if (textValue) {
                const newShape = {
                    id: Date.now().toString(),
                    type: "text",
                    x: pos.x,
                    y: pos.y,
                    text: textValue,
                    fill: color,
                };
                updateShapes([...shapes, newShape]);
            }
            setTool("select");
            return;
        }

        isDrawing.current = true;
        const newShape = {
            id: Date.now().toString(),
            type: tool,
            x: tool === "pen" ? 0 : pos.x,
            y: tool === "pen" ? 0 : pos.y,
            width: 0,
            height: 0,
            points: [pos.x, pos.y],
            fill: tool === "pen" || tool === "line" || tool === "arrow" ? "transparent" : (fillStyle === "solid" ? color : fillStyle === "translucent" ? color + "33" : "transparent"),
            stroke: color,
         strokeWidth: strokeWidth,
        };

        updateShapes([...shapes, newShape]);
    };

    const handleMouseMove = (e) => {
        const stage = e.target.getStage();
        const pointerPosition = stage.getPointerPosition();
        const point = {
            x: (pointerPosition.x - stage.x()) / stage.scaleX(),
            y: (pointerPosition.y - stage.y()) / stage.scaleY()
        };

        useStore.getState().updateCursorPosition(point.x, point.y);
        if (!isDrawing.current || tool === "select") return;
        let lastShape = { ...shapes[shapes.length - 1] };

        if (lastShape.type === "pen") {
            lastShape.points = lastShape.points.concat([point.x, point.y]);
        } else {
            lastShape.width = point.x - lastShape.x;
            lastShape.height = point.y - lastShape.y;
        }
        const updatedShapes = shapes.slice(0, shapes.length - 1).concat(lastShape);
        
        updateShapes(updatedShapes);
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    return (
        <Stage
            ref={stageRef}
            x={stagePos?.x || 0}
            y={stagePos?.y || 0}
            draggable={tool === "hand"}
            onDragEnd={(e) => {
                if (e.target === e.target.getStage()) {
                    setStagePos({ x: e.target.x(), y: e.target.y() });
                }
            }}
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            // Cut it off if they drag out of bounds
            onMouseLeave={handleMouseUp}
            style={{ cursor: tool === "hand" ? "grab" : tool === "select" ? "default" : "crosshair" }}
        >
            <Layer>
                <Rect
                    x={-50000}
                    y={-50000}
                    width={100000}
                    height={100000}
                    fill={canvasBackground}
                    listening={false}
                />
                <MultiplayerCursors cursors={cursors} />
                {shapes.map((shape) => (
                    <ShapeRenderer
                        key={shape.id}
                        shape={shape}
                        isSelected={selectedShape === shape.id}
                        tool={tool}
                        updateShapes={updateShapes}
                        shapes={shapes}
                        setSelectedShape={setSelectedShape}
                    />
                ))}

            </Layer>
        </Stage>
    );
}

export default Canvas;
