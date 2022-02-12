import {user} from '../../type'
interface SignInAction {
    type:user.SIGNIN,
    payload?:Object
}
interface SignUpAction {
    type:user.SIGNUP,
    payload?:Object
}
interface SetAction {
    type:user.SET,
    payload?:Object
}
interface LogoutAction {
    type:user.LOGOUT,
    payload?:Object
}
interface AddCartAction {
    type:user.AddCart,
    payload?:[]
}
interface RemoveCartAction {
    type:user.REMOVEFROMCART,
    payload?:[{_id:''}]
}
export type Action = SignInAction|SignUpAction|SetAction|LogoutAction|AddCartAction|RemoveCartAction