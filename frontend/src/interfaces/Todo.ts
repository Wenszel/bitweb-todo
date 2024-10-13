export default interface Todo {
    id: number;
    title: string;
    completed: boolean;
    dueTo?: string;
}