import React, { Component } from 'react'
import VisitorService from '../services/VisitorService';

class Create_Visitor extends Component{
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            f_Name: '',
            l_Name: '',
            tel: ''
        }
        this.changeF_NameHandler = this.changeF_NameHandler.bind(this);
        this.changeL_NameHandler = this.changeL_NameHandler.bind(this);
        this.saveVisitor = this.saveVisitor.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            VisitorService.getVisitorById(this.state.id).then( (res) =>{
                let visitor = res.data;
                this.setState({f_Name: visitor.f_Name,
                    l_Name: visitor.l_Name,
                    tel : visitor.tel
                });
            });
        }        
    }

    saveVisitor = (e) => {
        e.preventDefault();
        let visitor = {f_Name: this.state.f_Name, l_Name: this.state.l_Name, tel: this.state.tel};
        console.log('visitor => ' + JSON.stringify(visitor));

        if(this.state.id === '_add'){
            VisitorService.createVisitor(visitor).then(res =>{
                this.props.history.push('/visitors');
            });
        }else{
            VisitorService.getVisitorById(visitor, this.state.id).then( res => {
                this.props.history.push('/visitors');
            });
        }
    }

    changeF_NameHandler= (event) => {
        this.setState({f_Name: event.target.value});
    }

    changeL_NameHandler= (event) => {
        this.setState({l_Name: event.target.value});
    }

    changeTelHandler= (event) => {
        this.setState({tel: event.target.value});
    }

    cancel(){
        this.props.history.push('/visitors');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Visitors</h3>
        }else{
            return <h3 className="text-center">View Visitors</h3>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="f_Name" className="form-control" 
                                                value={this.state.f_Name} onChange={this.changeF_NameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="l_Name" className="form-control" 
                                                value={this.state.l_Name} onChange={this.changeL_NameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Telephone: </label>
                                            <input placeholder="Telephone" name="tel" className="form-control" 
                                                value={this.state.tel} onChange={this.changeTelHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveVisitor.bind(this)}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }


}

export default Create_Visitor