"use client";
import { Button } from "@/components/ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addTodo } from "@/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddTask = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('')
    const [newTaskValue, setNewTaskValue] = useState("");
    const handleSubmitNewTodo = async () => {
        let result = await addTodo({
            task: newTaskValue,
            status:'pending'
        });
        if (!result.status) {
            setError(result.message);
            return;
        }
        setNewTaskValue("");
        setOpen(false);
        setError("");
        router.refresh();
    };
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="w-full">Add new task <AiOutlinePlus className='ml-2' size={18} /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Todo</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Task
                            </Label>
                            <Input
                                id="description"
                                className="col-span-3"
                                onChange={(e) => setNewTaskValue(e.target.value)}
                            />
                            {error && <span className="text-red-600 col-span-3 text-center">{error}</span>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleSubmitNewTodo}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddTask
