import React, { Component } from "react";
import "./app.css";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

class App extends Component {
  constructor(props) {
    super(props);
    const initialData = [
      { name: "Vlad", salary: 800, increase: true, like: true, id: 1 },
      { name: "Alex", salary: 1100, increase: false, like: false, id: 2 },
      { name: "Carl W.", salary: 20000, increase: false, like: false, id: 3 },
    ];

    // Check if data exists in localStorage
    const storedData = localStorage.getItem("data");
    const parsedData = storedData ? JSON.parse(storedData) : initialData;

    const maxId = Math.max(...parsedData.map((item) => item.id)) + 1;
    this.state = {
      data: parsedData,
      maxId: maxId,
      term: "",
      filter: "all",
    };
  }

  componentDidUpdate() {
    // Update localStorage whenever data changes
    const { data } = this.state;
    localStorage.setItem("data", JSON.stringify(data));
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return { data: data.filter((item) => item.id !== id) };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      like: false,
      id: this.state.maxId,
    };
    this.setState((prevState) => {
      const newArr = [...prevState.data, newItem];
      return { data: newArr, maxId: prevState.maxId + 1 };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "like":
        return items.filter((item) => item.like);
      case "more":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const increased = data.filter((item) => item.increase).length;
    const employees = data.length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo increased={increased} employees={employees} />
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
