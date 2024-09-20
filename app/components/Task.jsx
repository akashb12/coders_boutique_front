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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Task = ({ taskData }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('')
    const [newTaskValue, setNewTaskValue] = useState("");
    const [status, setStatus] = useState("");
    const handleDeleteTask = async (id) => {
        await deleteTodo(id);
        router.refresh();
    };
    const setupData = (data) => {
        setOpen(true);
        setNewTaskValue(data.task);
        setStatus(data.status)
    }
    const handleUpdateTodos = async (id) => {
        let result = await editTodo({
            id: id,
            task: newTaskValue,
            status: status
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
            <TableRow key={taskData.id}>
                <TableCell className="font-medium">{taskData.task}</TableCell>
                <TableCell className="font-medium">{taskData.status}</TableCell>
                <TableCell className="flex justify-center">
                    <FiEdit
                        cursor='pointer'
                        className='text-blue-500'
                        size={18}
                        onClick={() => setupData(taskData)}
                    />
                    <FiTrash2
                        cursor='pointer'
                        className='text-red-500 ml-2'
                        size={18}
                        onClick={() => handleDeleteTask(taskData.id)}
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
                                Task
                            </Label>
                            <Input
                                id="description"
                                className="col-span-3"
                                value={newTaskValue}
                                onChange={(e) => setNewTaskValue(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            {/* <Label htmlFor="username" className="text-right">
                                Status
                            </Label>
                            <Input
                                id="description"
                                className="col-span-3"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            /> */}
                            <Label htmlFor="username" className="text-right">
                                Status
                            </Label>
                            <Select onValueChange={(value) => setStatus(value)}>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder={status} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={() => handleUpdateTodos(taskData.id)}>Update changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Task;