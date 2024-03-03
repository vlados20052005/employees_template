import EmployeesListItem from "../employees-list-item/employees-list-item";

import "./employees-list.css";

const EmployeesList = ({ data, onDelete, onToggleProp }) => {
  return (
    <ul className="app-list list-group">
      {data.map((item) => {
        const { id, ...itemProps } = item;
        return (
          <EmployeesListItem
            onDelete={() => onDelete(id)}
            key={id}
            {...itemProps}
            onToggleProp={(e) =>
              onToggleProp(id, e.currentTarget.getAttribute("data-toggle"))
            }
          />
        );
      })}
    </ul>
  );
};

export default EmployeesList;
