"use client";
import { deleteTodo, editTodo } from "@/api";
import {
    TableRow,
    TableCell
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Task = ({ task }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('')
    const [newTaskValue, setNewTaskValue] = useState("");
    const handleDeleteTask = async (id) => {
        await deleteTodo(id);
        router.refresh();
    };
    const setupData = (description) => {
        setOpen(true);
        setNewTaskValue(description);
    }
    const handleUpdateTodos = async (id) => {
        let result = await editTodo({
            id: id,
            description: newTaskValue,
        });
        if (!result.status) {
            setError(result.message);
            return;
        }
        setOpen(false);
        setError("");
        router.refresh();
    }
    return (
        <>
            <TableRow key={task.id}>
                <TableCell className="font-medium">{task.description}</TableCell>
                <TableCell className="flex justify-center">
                    <FiEdit
                        cursor='pointer'
                        className='text-blue-500'
                        size={18}
                        onClick={() => setupData(task.description)}
                    />
                    <FiTrash2
                        cursor='pointer'
                        className='text-red-500 ml-2'
                        size={18}
                        onClick={() => handleDeleteTask(task.id)}
                    />
                </TableCell>
            </TableRow>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Todo</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                className="col-span-3"
                                value={newTaskValue}
                                onChange={(e) => setNewTaskValue(e.target.value)}
                            />
                            {error && <span className="text-red-600 col-span-3 text-center">{error}</span>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={() => handleUpdateTodos(task.id)}>Update changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Task;