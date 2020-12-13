import React from 'react';
import { connect } from 'react-redux';
import { 
    addData,  
    editData, 
    deleteData,
    deleteKategori
} from '../redux/action';
import swal from 'sweetalert';
import { Button, Input } from 'reactstrap';

class Home extends React.Component{
    state = {
        nama: "",
        usia: "",
        pekerjaan: "",
        selected: "",
        clicked: false,
        nilai: ""
    };

    onChangeInput = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value,
        });
    };

    addData = () => {
        const { nama, usia, pekerjaan } = this.state;
        const { addData, kategoriPekerjaan } = this.props;
        
        console.log(kategoriPekerjaan.length);
        var kerja = "";
        if(nama !== "" && usia !== "" && pekerjaan !== ""){
            if(kategoriPekerjaan.length > 0){
                for(let i = 0; i < kategoriPekerjaan.length; i++){
                    if(kategoriPekerjaan[i].pekerjaan === pekerjaan){
                        kerja = pekerjaan;
                    }
                };
            };
            addData({nama, usia, pekerjaan}, kerja);
            swal("Success!", "Data successfully added!", "success");
        }else{
            alert("Please fill in all the form!");
        };

        //kosongin input box setelah submit data
        this.setState({
            ...this.state,
            nama: "", usia:"", pekerjaan: ""
        });
    };
    
    Data = (selectedUser,idx) => {
        var newUser = selectedUser.map((val,i) => {
            if(i === idx){
                return (
                    <tr>
                        <td align="center">
                            <Input 
                                placeholder={val.nama}
                                type='text' 
                                className='form-control' 
                                id="nama"
                                value={this.state.nama}
                                onChange={this.onChangeInput}
                            />
                        </td>
                        <td align="center">
                            <Input 
                                placeholder={val.usia}
                                type='text' 
                                className='form-control' 
                                id="usia"
                                value={this.state.usia}
                                onChange={this.onChangeInput}
                            />
                        </td>
                        <td align="center">
                            <Input 
                                placeholder={val.pekerjaan}
                                type='text' 
                                className='form-control' 
                                id="pekerjaan"
                                value={this.state.pekerjaan}
                                onChange={this.onChangeInput}
                            />
                        </td>
                        <td align="center">
                            <Button 
                                color="primary" 
                                onClick={() => this.saveData(val.id)}
                                className="mx-2"
                            >
                                Save
                            </Button>
                            <Button 
                                color="danger" 
                                // onClick={}
                                className="mx-2"
                            > 
                                Cancel
                            </Button>
                        </td>
                    </tr>
                )
            }else{
                return (
                    <tr>
                        <td align="center">{val.nama}</td>
                        <td align="center">{val.usia}</td>
                        <td align="center">{val.pekerjaan}</td>
                        <td align="center">
                            <Button 
                                color="primary" 
                                onClick={() => this.editData(val.id)}
                                className="mx-2"
                            >
                                Edit
                            </Button>
                            <Button 
                                color="danger" 
                                onClick={() => this.deleteData(val.id)}
                                className="mx-2"
                            > 
                                Delete
                            </Button>
                        </td>
                    </tr>
                );
            }
        });
        return newUser;
    };

    renderData = () => {
        const { user } = this.props;
        if(this.state.selected === "All" || this.state.selected === ""){
            return (this.Data(user));
        } else {
            let theUser = user.filter((val) => {
                return (val.pekerjaan === this.state.selected);
            })
            return (this.Data(theUser));
        };
        
    };

    editData = (id) => {
        this.setState({
            ...this.state,
            clicked: true,
            nilai: (id-1)
        });
    };

    saveData = (id) => {
        const { nama, usia, pekerjaan } = this.state;
        const { editData } = this.props;
        if(nama !== "" && usia !== "" && pekerjaan !== ""){
            editData({nama, usia, pekerjaan},id);  
            swal("Success!", "Data successfully changed!", "success");
        }else{
            alert("Please fill in all the form!");
        };

        //kosongin input box setelah submit data
        this.setState({
            ...this.state,
            nama: "", usia:"", pekerjaan: "",
            clicked: false,
        });
    };

    cancelData = () => {
        this.setState({
            ...this.state,
            nama: "", usia: "", pekerjaan:"",
            clicked: false,
        });
    };

    renderCategory = () => {
        return this.props.kategoriPekerjaan.map((val) => {
            return(
                <option value={val.pekerjaan}>{val.pekerjaan}</option>
            );
        });
    };
    filterCategory = (e) => {
        console.log(e.target.value);
        this.setState({
            selected: e.target.value
        })
    };
    deleteData = (id) => {
        this.props.deleteData(id);
        this.props.deleteKategori(id);
    };
    deleteAll = () => {
        return this.props.user.map((val) => {
            return (this.deleteData(val.id));
        });
    };

    render(){
        return(
            <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select className='form-control' onChange={this.filterCategory}>
                            <option value="All">Filter By Pekerjaan</option>
                            {this.renderCategory()}
                        </select>
                    </div>
                    <div>
                        <Button color="danger" onClick={this.deleteAll}>
                            Delete All Data
                        </Button>
                    </div>
                </div>
                <table className='table mb-5'>
                    <thead>
                        <tr>
                            <td align="center">Nama</td>
                            <td align="center">Usia</td>
                            <td align="center">Pekerjaan</td>
                            <td colSpan={2} align="center">Act</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.clicked 
                            ? 
                            this.Data(this.props.user, this.state.nilai)
                            : 
                            this.renderData()
                        }
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-3'> 
                        <input 
                            type='text' 
                            className='form-control' 
                            placeholder='Nama'
                            id="nama"
                            value={this.state.nama}
                            onChange={this.onChangeInput}
                            disabled={this.state.clicked}
                        /> 
                    </div>
                    <div className='col-md-3'> 
                        <input 
                            type='text' 
                            className='form-control' 
                            placeholder='Usia'
                            id="usia"
                            value={this.state.usia}
                            onChange={this.onChangeInput}
                            disabled={this.state.clicked}
                        /> 
                    </div>
                    <div className='col-md-3'> 
                        <input 
                            type='text' 
                            className='form-control' 
                            placeholder='Pekerjaan'
                            id="pekerjaan"
                            value={this.state.pekerjaan}
                            onChange={this.onChangeInput}
                            disabled={this.state.clicked}
                        /> 
                    </div>
                    <div className='col-md-3'> 
                        <input 
                            type='button' 
                            className='form-control btn-info' 
                            value='add Data' 
                            onClick={this.addData}
                            disabled={this.state.clicked}
                        /> 
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        user: state.user.userData,
        kategoriPekerjaan: state.user.kategoriPekerjaan,
    };
};

export default connect(mapStatetoProps, { 
    addData,
    editData,
    deleteData,
    deleteKategori
}) (Home);