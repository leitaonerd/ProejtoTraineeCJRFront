import Header from "../ui/header";
import PerfilInfo from "./PerfilInfo";

interface PerfilProps {
  isAuthenticated: boolean;
}

const PerfilAcoes: React.FC<PerfilProps> = ({ isAuthenticated }) => {
  return <div>{isAuthenticated ? <div></div> : <div></div>}</div>;
};

export default PerfilAcoes;
