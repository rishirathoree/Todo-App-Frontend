import React, { useMemo, useState } from 'react';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogOverlay,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDownIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch, type RootState } from '@/stores/stores';
import { addTodos, createTodo } from '@/stores/slices/todos';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { Calendar } from "@/components/ui/calendar"

const CreateModal: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const { } = useSelector((state: RootState) => state.todos.todos)

    const [create, setCreate] = useState({
        title: "Implement AI API Integration",
        description: "Connect the application with the AI API to enable intelligent features and data processing.",
        notes: "Connect the application with the AI API to enable intelligent features and data processing",
        dueDate: new Date(),
    })

    console.log(create, 'create')
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCreate({
            ...create,
            [e.target.name]: e.target.value
        })
    }

    const handleAdd = async () => {
        // dispatch(addTodos({
        //     title: create.title,
        //     description: create.description
        // }))
        await dispatch(createTodo(create))
        setOpen(false)
        toast.success("Task added successfully")
    }

    const { pending } = useSelector((state: RootState) => state.todos.todos)

    const isValid = useMemo(() => {
        return create.title && create.description && create.notes && create.dueDate
    }, [create])

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger>
                <Button
                    onClick={() => setOpen(true)}
                    size={"sm"} variant="outline">
                    <Plus />
                    Create Task
                </Button>
            </DialogTrigger>
            <DialogOverlay className={"!blur-none"} />
            <DialogContent className=" w-full !p-0 w-2/3">
                <div className="flex items-center justify-center p-10">
                    <div className="sm:mx-auto sm:max-w-2xl">
                        <h3 className="text-2xl tracking-tight font-semibold text-foreground dark:text-foreground">
                            Create your todo
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                            Create a task to keep track of what needs to be done
                        </p>
                        <div className="mt-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                <div className="col-span-full sm:col-span-6">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="title">
                                            Title
                                            <span className=" text-red-500">*</span>
                                        </FieldLabel>
                                        <Input
                                            type="text"
                                            onChange={handleChange}
                                            value={create.title}
                                            id="title"
                                            name="title"
                                            className='autofill:!bg-yellow-200'
                                            placeholder="Title"
                                            required
                                        />
                                    </Field>
                                </div>
                                <div className="col-span-full">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="description">Description</FieldLabel>
                                        <Input
                                            onChange={handleChange}
                                            value={create.description}
                                            id="description"
                                            name="description"
                                            placeholder="Enter Description"
                                        />
                                    </Field>
                                </div>
                                <div className="w-full col-span-full space-y-2">
                                    <Label htmlFor="date" className="px-1 w-full">
                                        Date of birth
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger className='w-full' asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="w-full justify-between font-normal"
                                            >
                                                {create.dueDate ? create.dueDate.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={create.dueDate}
                                                captionLayout="dropdown"
                                                onSelect={(date) => {
                                                    if (date) {
                                                        setCreate({
                                                            ...create,
                                                            dueDate: date,
                                                        });
                                                    }
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="col-span-full">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="notes">Notes</FieldLabel>
                                        <Textarea
                                            onChange={handleChange}
                                            value={create.notes}
                                            id="notes"
                                            name="notes"
                                            placeholder="Enter Description"
                                        />
                                    </Field>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <DialogFooter className="sm:justify-end w-full">
                    <DialogClose >
                        <div className="flex w-full items-end justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="whitespace-nowrap"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </DialogClose>
                    <Button
                        disabled={!isValid}
                        onClick={handleAdd}
                        type="submit" className="whitespace-nowrap">
                        {pending && <Spinner />}
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateModal;