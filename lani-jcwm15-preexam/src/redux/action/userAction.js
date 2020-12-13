import Axios from "axios";
import swal from "sweetalert";
import { api_url } from "../../components/helpers/api_url"

export const addData = ({nama,usia,pekerjaan}, kerja) => {
    return (dispatch) => {
        Axios.post(`${api_url}/dataUser`, { 
            nama, usia, pekerjaan 
        })
        .then((res) => {
            dispatch(renderData());
        })
        .catch((err) => console.log(err));


        if(kerja === ""){
            Axios.post(`${api_url}/kategoriPekerjaan`, { pekerjaan })
            .then((res) => {
                dispatch(renderCategory());
            })
            .catch((err) => console.log(err));
        }
    };
};

export const renderData = () => {
    return (dispatch) => {
        Axios.get(`${api_url}/dataUser`)
        .then((respons) => {
            dispatch({
                type: "FETCH_USERDATA",
                payload: respons.data,
            })
        })
        .catch((err) => console.log(err));
    };
};

export const renderCategory = () => {
    return(dispatch) => {
        Axios.get(`${api_url}/kategoriPekerjaan`)
        .then((respons) => {
            dispatch({
                type: "FETCH_CATEGORIES",
                payload: respons.data
            });
        })
        .catch((err) => console.log(err));
    }
};

export const editData = ({nama, usia, pekerjaan},id) => {
    return(dispatch) => {
        Axios.patch(`${api_url}/dataUser/${id}`, {
            nama, usia, pekerjaan
        })
        .then((res) => {
            dispatch(renderData())
        })
        .catch((err) => console.log(err));
        
        Axios.patch(`${api_url}/kategoriPekerjaan/${id}`, { pekerjaan })
        .then((res) => {
            dispatch(renderCategory())
        })
        .catch((err) => console.log(err));
    };
};

export const deleteData = (id) => {
    return (dispatch) => {
        Axios.delete(`${api_url}/dataUser/${id}`)
        .then((res) => {
            dispatch(renderData());
            swal("Deleted", "Data successfully deleted!", "success");
        })
        .catch((err) => console.log(err))
    };
};

export const deleteKategori = (id) => {
    return (dispatch) => {
        Axios.delete(`${api_url}/kategoriPekerjaan/${id}`)
        .then((res) => {
            dispatch(renderCategory());
        })
        .catch((err) => console.log(err))
    }
};
