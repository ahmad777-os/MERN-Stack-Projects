import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const API_URL = "http://localhost:5000/api/projects";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then(res => setProjects(res.data));
  }, []);

  return (
    <div className="p-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map(p => (
        <ProjectCard key={p._id} project={p} />
      ))}
    </div>
  );
}
