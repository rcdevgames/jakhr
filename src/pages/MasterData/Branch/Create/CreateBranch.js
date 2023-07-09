import AdminDashboard from "../../../AdminDashboard"
import FormMap from "./component/FormMap";

const CreateBranch = () => {
    return ( 
	 <AdminDashboard label="">
       <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Cabang</h2>
              </div>
              <div className="card-body">
              <FormMap />
               
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default CreateBranch;