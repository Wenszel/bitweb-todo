export default interface Todo {
    id: number;
    title: string;
    completed: boolean;
    important: boolean;
    dueTo?: string;
}