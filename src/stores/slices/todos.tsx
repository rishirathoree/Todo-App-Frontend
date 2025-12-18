import Api from "@/lib/axios.utils";
import { createAsyncThunk, createSlice,type PayloadAction, } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState: {
    todos: { pending: boolean; data: Task[]; error: null };
} = {
    todos: { pending: false, data:[], error: null },
}

interface AddTodoPayload {
    title: string;
    description: string;
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  notes: string;
}
interface todoCreateState {
    notes: string;
    title: string
    description: string
}

export const createTodo = createAsyncThunk("create/todo",async(data:todoCreateState,thunkAPI)=>{
  console.log(data,'data')
    try {
      const response = await Api.post("/todos/create",data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
})

export const GetTodos = createAsyncThunk("get/todos",async(queries:any,thunkAPI)=>{
  try {
    const response = await Api.get("/todos",queries)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteTodos = createAsyncThunk("delete/todos",async(id:string,thunkAPI)=>{
  try {
    const response = await Api.delete(`/todos/${id}`,{})
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<AddTodoPayload>) => {
    console.log(action.payload,'payloadd....')  
      state.todos.data.unshift({
        id: Date.now().toString(),
        title: action.payload.title,
        assignee: "Sarah Chen",
        status: "pending",
        priority: "medium",
        dueDate: new Date().toISOString().split("T")[0],
        notes: action.payload.description,
      });
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createTodo.pending, (state) => {
        state.todos.pending = true
    })
    .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.pending = false
        console.log(action.payload,'action.payload')
        state.todos.data.unshift(action.payload.todo)
    })
    .addCase(createTodo.rejected, (state,) => {
        state.todos.pending = false
    })

    // Get All Todos
    .addCase(GetTodos.pending, (state) => {
        state.todos.pending = true
    })
    .addCase(GetTodos.fulfilled, (state, action) => {
        state.todos.pending = false
        state.todos.data = action.payload.todo
    })
    .addCase(GetTodos.rejected, (state,) => {
        state.todos.pending = false
    })

    // delete
    .addCase(deleteTodos.pending, (state) => {
        state.todos.pending = true
    })
    .addCase(deleteTodos.fulfilled, (state, action) => {
        state.todos.pending = false
        console.log(action.payload)
        state.todos.data = state.todos.data.filter((todo) => todo.id !== action.payload.todo)
        toast.success("Task deleted successfully")
    })
    .addCase(deleteTodos.rejected, (state,) => {
        state.todos.pending = false
    })
  },
});

export const {addTodos} = todosSlice.actions
export default todosSlice.reducer