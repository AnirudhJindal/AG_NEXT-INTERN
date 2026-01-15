
import { CardsComponent } from "./cards";

export const CardsGrid = ({ tasks }: { tasks: any[] }) => {
  return (
    <div
      className="columns-1 sm:columns-2 lg:columns-3"
      style={{ columnGap: "12px" }}
    >
      {tasks.map((task) => (
        <div key={task._id} className="mb-3 break-inside-avoid">
          <CardsComponent
            title={task.title}
            description={task.description}
            category={task.category}
            priority={task.priority}
            status={task.status}
            dueDate={task.dueDate}
          />
        </div>
      ))}
    </div>
  );
};
