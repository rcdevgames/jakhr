import AdminDashboard from "../../../AdminDashboard";
import FormMap from "./component/FormMap";
import { useNavigate,useParams } from "react-router-dom";

const CreateBranch = () => {
  const navigate = useNavigate();
  const {id}= useParams();
  console.log(id);
  return (
    <AdminDashboard label="">
      <section className="section">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3>Cabang</h3>
          </div>
          <div className="card-body">
            <FormMap navigate={navigate} id={id??null} />
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default CreateBranch;
