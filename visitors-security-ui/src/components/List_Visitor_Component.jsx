import React, { Component } from 'react'
import VisitorService from '../services/VisitorService'

class List_Visitor_Component extends Component {
    constructor(props) {
        super(props)

        this.state = {
                visitors: []
        }

        this.addVisitor = this.addVisitor.bind(this);
    }

    

        viewVisitor(id){
            this.props.history.push(`/view-visitor/${id}`);
        }

        componentDidMount(){
            VisitorService.getVsitors().then((res)=>{
                this.setState({visitors:res.data});
            });
        }

        addVisitor(){
            this.props.history.push('/add-visitor/_add');
        }

        render(){
            return(
                <div>
                 <h2 className="text-center">Visitor List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addVisitor}> Add Visitor</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Visitor First Name</th>
                                    <th> Visitor Last Name</th>
                                    <th> Visitor Telephone Number</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.visitors.map(
                                        visitor => 
                                        <tr key = {visitor.id}>
                                             <td> {visitor.f_Name} </td>   
                                             <td> {visitor.l_Name}</td>
                                             <td> {visitor.tel}</td>
                                             <td>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewVisitor(visitor.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
            )
        }
    
  
    
}
export default List_Visitor_Component