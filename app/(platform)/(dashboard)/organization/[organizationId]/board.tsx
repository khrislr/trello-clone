import { deleteBoard } from "@/actions/deleteBoard";
import FormDelete from "./form-delete";

interface BoardProps {
  title: string;
  id: string;
}

export default function Board({ title, id }: BoardProps) {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form action={deleteBoardWithId} className="flex items-center gap-x-2">
      {" "}
      <p> Board title: {title}</p>
      <FormDelete />
    </form>
  );
}
