import {Action} from './action'
import {user as userAction} from '../../type'
const initstate = {
    isloggedin:false,
    user:{
        email:'',
        password:'',
        name:'',
        proimg:'',
        isStaff:false,
        myOrders:[],
        myCart:[],
        isActive:false
    }
}
export const user =(state=initstate,action:Action)=>{
        switch (action.type) {
        case userAction.SIGNIN:
        case userAction.SIGNUP:             
            return {isloggedin:true,user:action.payload}
        case userAction.SET:
            return {isloggedin:true,user:action.payload}
        case userAction.LOGOUT:
            localStorage.removeItem('user')
            return {user:null,isloggedin:false}
        case userAction.AddCart:
            return {...action.payload}
        case userAction.REMOVEFROMCART:
            state.user.myCart = state.user.myCart.filter(p=>action.payload?.some(x=>x._id === p))
            return {...state}
        default:
            return state;
    }
}