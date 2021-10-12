import type { FC } from "react";
import { useState, useEffect } from "react";
import Agent from "./Agent";
import { IAgent } from "../../types/Agent";
import axios from "axios";
import "./Agents.css";
import { Button } from "@mui/material";

type Props = {
  searchText: string;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
};

const Agents: FC<Props> = ({ searchText, count }) => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<IAgent[]>(
    agents.filter((agent) => {
      return agent.practiceAreas.includes(searchText);
    })
  );

  useEffect(() => {
    setFilteredAgents(
      agents.filter((agent) => {
        const lowerCasePracticeAreas = agent.practiceAreas
          .toString()
          .toLowerCase();
        return lowerCasePracticeAreas.includes(searchText.toLowerCase());
      })
    );
  }, [searchText]);

  useEffect(() => {
    async function fetchInitialData() {
      const response = await axios.get("/agents");
      setAgents(response.data);
    }
    fetchInitialData();
  }, [count]);

  return (
    <div className="agents">
      {filteredAgents.length === 0 && searchText
        ? `There is no Practice Area Like "${searchText}"`
        : filteredAgents.length === 0 && !searchText
        ? agents.map((agent) => <Agent key={agent.id} agent={agent} />)
        : filteredAgents.map((agent) => <Agent key={agent.id} agent={agent} />)}
    </div>
  );
};

export default Agents;
