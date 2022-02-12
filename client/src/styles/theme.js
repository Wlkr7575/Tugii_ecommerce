import {createTheme} from '@mui/material'
import { amber, deepOrange, green, lightBlue, lime, } from "@mui/material/colors";
const theme = createTheme({
    palette:{
        primary :amber,
        secondary:{
            main:'#f6df49',
            contrastText:"#383a48"
        },
        error:deepOrange,
        warning:lime,
        info:lightBlue,
        success:green
    }
})

export default theme