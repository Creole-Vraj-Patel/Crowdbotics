import { FC, useState } from "react";
import "./App.css";

import Agents from "../Agents/Agents";
import Header from "../Header/Header";

const App: FC = () => {

  const [searchText, setSearchText] = useState<string>('');  
  const [count, setCount] = useState<number>(0);

  console.log(count);
  

  return (
    <div className="app">
      <Header setSearchText={setSearchText} setCount={setCount} count={count} />
      <Agents searchText={searchText} setCount={setCount} count={count} />
    </div>
  );
};

export default App;
