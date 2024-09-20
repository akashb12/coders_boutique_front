import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Task from "./Task"

const TodoList = ({ tasks }) => {

    return (
        <Table>
            <TableCaption>A list of your Todos.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead >Tasks</TableHead>
                    <TableHead >Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.data.map((task) => (
                    <Task key={task.id} taskData={task} />
                ))}
            </TableBody>
        </Table>
    )
}

export default TodoList;
